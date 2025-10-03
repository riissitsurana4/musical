'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFolder, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [timeToday, setTimeToday] = useState("0m");

    useEffect(() => {
        if (status === "authenticated") {
            Promise.all([
                fetch("/api/my-projects").then((res) => res.json()),
                fetch("/api/hackatime").then((res) => res.json())
            ]).then(([projectData, timeData]) => {
                setProjects(Array.isArray(projectData) ? projectData : []);
                setTimeToday(timeData.timeToday || "0m");
            }).catch(error => {
                console.error("Error fetching data:", error);
                setProjects([]);
                setTimeToday("0m");
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [status]);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Welcome back, {session.user.name}! 
            </h2>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group bg-white rounded-xl shadow-sm p-6 border border-gray-100 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faCode} className="text-white text-xl" />
                            </div>

                            <p className="text-2xl font-medium text-gray-700 uppercase">Today's Coding Time
                            <span className="text-xl font-bold text-gray-800 mt-1">: {timeToday}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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

                <div className="group bg-white rounded-xl shadow-sm  p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faTrophy} className="text-white text-xl" />
                            </div>
                            <p className="text-2xl font-medium text-gray-700 uppercase">Rewards Earned:
                                <span className="text-xl font-bold text-gray-800 mt-1">: 0</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
