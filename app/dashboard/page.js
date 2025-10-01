'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [timeToday, setTimeToday] = useState(0);

    useEffect(() => {
        if (status === "authenticated") {
            Promise.all([
                fetch("/api/my-projects").then((res) => res.json()),
                fetch("/api/hackatime").then((res) => res.json())
            ]).then(([projectData, timeData]) => {
                setProjects(projectData);
                if (timeData.timeToday) {
                    setTimeToday(timeData.timeToday);
                }
            }).catch(error => {
                console.error("Failed to load dashboard data:", error);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [status]);
    if (status === "loading" || loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }
    return (
       <div>
        </div>
    );
}
