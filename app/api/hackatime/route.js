import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// In-memory cache for rate limiting
const cache = new Map();
const RATE_LIMIT_SECONDS = 30;

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const slack_id = session.user.slack_id;
    const now = Date.now();
    
    console.log(`API called with type: ${type}, slack_id: ${slack_id}`);
    
    // Handle today's projects from database
    if (type === 'today') {
        return await getTodaysProjectTime(slack_id);
    }
    
    // Handle Hackatime projects for dropdown
    if (type === 'projects') {
        return await getHackatimeProjects(slack_id, now);
    }
    
    // Default: get today's Hackatime stats
    return await getHackatimeToday(slack_id, now);
}

// Get today's project time from database (projects submitted today)
async function getTodaysProjectTime(slack_id) {
    try {
        // Get today's date range
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        // Fetch projects submitted today with Hackatime data
        const todaysProjects = await prisma.project.findMany({
            where: {
                userSlackId: slack_id,
                createdAt: {
                    gte: startOfDay,
                    lt: endOfDay
                },
                hackatimeTime: {
                    not: null
                }
            },
            select: {
                name: true,
                hackatimeProject: true,
                hackatimeTime: true,
                createdAt: true
            }
        });

        // Calculate total time from today's submitted projects
        let totalSeconds = 0;
        let projectDetails = [];

        todaysProjects.forEach(project => {
            if (project.hackatimeTime) {
                const seconds = parseTimeToSeconds(project.hackatimeTime);
                totalSeconds += seconds;
                projectDetails.push({
                    name: project.name,
                    hackatimeProject: project.hackatimeProject,
                    time: project.hackatimeTime,
                    submittedAt: project.createdAt
                });
            }
        });

        const formattedTotalTime = formatSecondsToTime(totalSeconds);

        return NextResponse.json({
            timeToday: formattedTotalTime,
            projectCount: todaysProjects.length,
            projects: projectDetails,
            totalSeconds: totalSeconds,
            source: "submitted_projects"
        });

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ 
            timeToday: "0m",
            projectCount: 0,
            projects: [],
            error: "Failed to fetch today's project time" 
        }, { status: 500 });
    }
}

// Get Hackatime projects for dropdown (using correct API)
async function getHackatimeProjects(slack_id, now) {
    const cacheKey = `hackatime_projects_${slack_id}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
        const timeSinceLastRequest = (now - cachedData.timestamp) / 1000;
        if (timeSinceLastRequest < RATE_LIMIT_SECONDS) {
            return NextResponse.json({ 
                projects: cachedData.projects,
                cached: true
            });
        }
    }

    const apiKey = process.env.HACKATIME_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ 
            projects: [],
            error: "Hackatime API key not configured" 
        });
    }

    try {
        // Use the correct project details endpoint from the docs
        const projectsUrl = `https://hackatime.hackclub.com/api/v1/users/${slack_id}/projects/details`;
        
        console.log(`Fetching projects for user: ${slack_id} from ${projectsUrl}`);
        
        const response = await fetch(projectsUrl, {
            // Note: This endpoint doesn't require auth according to docs
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.error(`Hackatime API response: ${response.status} ${response.statusText}`);
            if (response.status === 404) {
                return NextResponse.json({ 
                    projects: [],
                    error: "User not found in Hackatime. Make sure you're registered and have some coding time tracked." 
                });
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Hackatime projects response:', data);
        
        let projects = [];
        
        // Extract projects from the response (based on actual API structure)
        if (data.projects && Array.isArray(data.projects)) {
            projects = data.projects
                .filter(project => project.total_seconds > 0) // Only projects with actual time
                .map(project => ({
                    name: project.name,
                    time: formatSecondsToTime(project.total_seconds),
                    repo_url: project.repo_url,
                    languages: project.languages
                }))
                .slice(0, 20); // Limit to 20 projects
        }
        
        console.log(`Found ${projects.length} projects`);
        
        // Cache the response
        cache.set(cacheKey, {
            projects: projects,
            timestamp: now
        });
        
        return NextResponse.json({ 
            projects,
            cached: false,
            source: "hackatime_api"
        });
        
    } catch (error) {
        console.error("Hackatime projects API error:", error);
        
        // If we have cached data, return it even if the API fails
        if (cachedData) {
            return NextResponse.json({ 
                projects: cachedData.projects,
                cached: true,
                error: "API temporarily unavailable, showing cached data"
            });
        }
        
        return NextResponse.json({ 
            projects: [],
            error: `Failed to fetch projects: ${error.message}` 
        }, { status: 500 });
    }
}

// Get today's Hackatime time (using stats endpoint with today's date)
async function getHackatimeToday(slack_id, now) {
    const cacheKey = `hackatime_today_${slack_id}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
        const timeSinceLastRequest = (now - cachedData.timestamp) / 1000;
        
        if (timeSinceLastRequest < RATE_LIMIT_SECONDS) {
            const remainingTime = RATE_LIMIT_SECONDS - Math.floor(timeSinceLastRequest);
            return NextResponse.json({ 
                timeToday: cachedData.timeToday,
                cached: true,
                remainingCooldown: remainingTime
            });
        }
    }

    const apiKey = process.env.HACKATIME_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ 
            timeToday: "API key required", 
            error: "Hackatime API key not configured" 
        });
    }

    try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Use the stats endpoint with today's date range
        const statsUrl = `https://hackatime.hackclub.com/api/v1/users/${slack_id}/stats?start_date=${todayStr}&end_date=${todayStr}`;
        
        console.log(`Fetching today's stats for user: ${slack_id} from ${statsUrl}`);
        
        const response = await fetch(statsUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`Response status: ${response.status} for stats endpoint`);
        
        if (!response.ok) {
            console.error(`Hackatime API response: ${response.status} ${response.statusText}`);
            
            // Fallback: try the current user endpoint
            return await tryCurrentUserEndpoint(apiKey, cacheKey, now);
        }
        
        const data = await response.json();
        console.log('Hackatime stats response:', data);
        
        let timeToday = "0m";
        
        // Parse the response from stats endpoint
        if (data.total_seconds && data.total_seconds > 0) {
            timeToday = formatSecondsToTime(data.total_seconds);
        } else if (data.human_readable_total && data.human_readable_total !== "0s") {
            timeToday = data.human_readable_total;
        }
        
        // Cache the successful response
        cache.set(cacheKey, { timeToday: timeToday, timestamp: now });
        cleanupCache(now);
        
        return NextResponse.json({ 
            timeToday, 
            cached: false, 
            source: "hackatime_stats_api",
            endpoint_used: "stats_today",
            date_queried: todayStr,
            raw_data: data
        });
        
    } catch (error) {
        console.error("Hackatime stats API error:", error);
        
        // Try fallback endpoint
        return await tryCurrentUserEndpoint(apiKey, cacheKey, now);
    }
}

// Fallback function to try current user endpoint
async function tryCurrentUserEndpoint(apiKey, cacheKey, now) {
    try {
        const todayUrl = `https://hackatime.hackclub.com/api/v1/users/current/statusbar/today`;
        
        console.log(`Trying fallback current user endpoint: ${todayUrl}`);
        
        const response = await fetch(todayUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fallback current user response:', data);
        
        let timeToday = "0m";
        
        if (data.data && data.data.grand_total) {
            if (data.data.grand_total.text && data.data.grand_total.text !== "Start coding to track your time") {
                timeToday = data.data.grand_total.text;
            } else if (data.data.grand_total.total_seconds > 0) {
                timeToday = formatSecondsToTime(data.data.grand_total.total_seconds);
            }
        }
        
        cache.set(cacheKey, { timeToday: timeToday, timestamp: now });
        cleanupCache(now);
        
        return NextResponse.json({ 
            timeToday, 
            cached: false, 
            source: "hackatime_api",
            endpoint_used: "current_user_fallback",
            raw_data: data
        });
        
    } catch (error) {
        console.error("Both endpoints failed:", error);
        
        return NextResponse.json({ 
            error: `All endpoints failed: ${error.message}`, 
            timeToday: "0m",
            debug_info: {
                api_key_prefix: apiKey ? apiKey.substring(0, 8) + "..." : "undefined"
            }
        }, { status: 500 });
    }
}

// Helper functions
function parseTimeToSeconds(timeStr) {
    if (!timeStr) return 0;
    
    let totalSeconds = 0;
    
    const hoursMatch = timeStr.match(/(\d+)h/);
    if (hoursMatch) {
        totalSeconds += parseInt(hoursMatch[1]) * 3600;
    }
    
    const minutesMatch = timeStr.match(/(\d+)m/);
    if (minutesMatch) {
        totalSeconds += parseInt(minutesMatch[1]) * 60;
    }
    
    const secondsMatch = timeStr.match(/(\d+)s/);
    if (secondsMatch) {
        totalSeconds += parseInt(secondsMatch[1]);
    }
    
    return totalSeconds;
}

function formatSecondsToTime(seconds) {
    if (seconds === 0) return "0m";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

function cleanupCache(now) {
    for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > 3600000) { // 1 hour
            cache.delete(key);
        }
    }
}