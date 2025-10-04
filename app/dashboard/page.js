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

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
        setLoading(false);
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FontAwesomeIcon icon={faSpinner} className="text-4xl text-purple-500 animate-spin" />
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
    const projects = todaysStats.projects;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Welcome back, {session.user.name}! 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group bg-white rounded-l shadow-sm p-6 border border-gray-100 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faCode} className="text-white text-xl" />
                            </div>

                            <p className="text-2xl font-medium text-gray-700 uppercase">Today&apos;s Coding Time
                            <span className="text-xl font-bold text-gray-800 mt-1">: {timeToday}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white rounded-l shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faFolder} className="text-white text-xl" />
                            </div>
                            <p className="text-2xl font-medium text-gray-700 uppercase">Projects
                                <span className="text-xl font-bold text-gray-800 mt-1">: {projects.length}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white rounded-l shadow-sm  p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faTrophy} className="text-white text-xl" />
                            </div>
                            <p className="text-2xl font-medium text-gray-700 uppercase">Rewards Earned
                                <span className="text-xl font-bold text-gray-800 mt-1">: 0</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
