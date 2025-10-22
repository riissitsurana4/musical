'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClock, faCode, faSpinner, faFolder, faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [todaysStats, setTodaysStats] = useState({
        timeToday: "0m",
        projectCount: 0,
        projects: []
    });
    const [totalProjects, setTotalProjects] = useState(0);
    const [hackatimeToday, setHackatimeToday] = useState("0m");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchDashboardData();
        }
    }, [session]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const todayResponse = await fetch('/api/hackatime?type=today');
            const todayData = await todayResponse.json();
            setTodaysStats(todayData);

            const hackatimeResponse = await fetch('/api/hackatime');
            const hackatimeData = await hackatimeResponse.json();
            setHackatimeToday(hackatimeData.timeToday || "0m");

            const projectsResponse = await fetch('/api/my-projects');
            const projectsData = await projectsResponse.json();
            setTotalProjects(projectsData.length);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
        setLoading(false);
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
                    <p className="text-gray-600">You need to be logged in to access the dashboard.</p>
                </div>
            </div>
        );
    }

    const timeToday = todaysStats.timeToday;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    Welcome back, {session.user.name}! 
                </h2>
                <button
                    onClick={() => router.push('/dashboard/projects')}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Submit Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faCode} className="text-black text-xl" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Today&apos;s Coding Time</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{timeToday}</p>
                            <p className="text-xs text-gray-400 mt-1">Active coding session</p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faFolder} className="text-black text-xl" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Projects Built</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalProjects}</p>
                            <p className="text-xs text-gray-400 mt-1">Total submissions</p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faTrophy} className="text-black text-xl" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Achievements</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                            <p className="text-xs text-gray-400 mt-1">Rewards unlocked</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
