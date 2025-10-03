'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        <div className="bg-white">
           
        </div>
    );
}
