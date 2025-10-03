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
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto px-8 py-16">
           
        </div>
    );
}
