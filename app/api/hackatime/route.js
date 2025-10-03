import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// In-memory cache for rate limiting
const cache = new Map();
const RATE_LIMIT_SECONDS = 30;

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slack_id = session.user.slack_id;
    const now = Date.now();
    
    // Check rate limit
    const cacheKey = `hackatime_${slack_id}`;
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
        const todayUrl = `https://hackatime.hackclub.com/api/hackatime/v1/users/${slack_id}/statusbar/today`;
        
        const todayResponse = await fetch(todayUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        
        if (!todayResponse.ok) {
            if (todayResponse.status === 404) {
                const errorData = { timeToday: "Not registered", error: "User not found in Hackatime" };
                cache.set(cacheKey, { timeToday: errorData.timeToday, timestamp: now });
                return NextResponse.json(errorData);
            } else if (todayResponse.status === 401) {
                return NextResponse.json({ 
                    timeToday: "Invalid API key", 
                    error: "Invalid Hackatime API key" 
                });
            }
            throw new Error(`Error fetching today's time: ${todayResponse.statusText}`);
        }
        
        const todayData = await todayResponse.json();
        let timeToday = "0m";
        
        if (todayData.data?.grand_total?.text) {
            timeToday = todayData.data.grand_total.text;
        } else if (todayData.data?.grand_total?.total_seconds) {
            const totalSeconds = todayData.data.grand_total.total_seconds;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            timeToday = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        }
        
        // Cache the successful response
        cache.set(cacheKey, { timeToday: timeToday, timestamp: now });
        
        // Clean up old cache entries
        for (const [key, value] of cache.entries()) {
            if (now - value.timestamp > 3600000) {
                cache.delete(key);
            }
        }
        
        return NextResponse.json({ timeToday, cached: false });
        
    } catch (error) {
        console.error("Hackatime API error:", error);
        
        if (cachedData) {
            return NextResponse.json({ 
                timeToday: cachedData.timeToday,
                cached: true,
                error: "API temporarily unavailable, showing cached data"
            });
        }
        
        return NextResponse.json({ 
            error: "Failed to fetch time from Hackatime.", 
            timeToday: "0m" 
        }, { status: 500 });
    }
}