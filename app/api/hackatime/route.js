import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slack_id = session.user.slack_id;
    const today = new Date().toISOString().split('T')[0];
    

    const url = `https://hackatime.hackclub.com/api/v1/users/${slack_id}/stats`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();

        const sessionToday = data.data?.sessions?.find(s => s.date === today);
        const timeToday = sessionToday ? sessionToday.text : "0m";

        return NextResponse.json({ timeToday });
    } catch (error) {
        console.error("Failed to fetch from Hack-a-Time:", error);
        return NextResponse.json({ error: "Failed to fetch time.", timeToday: "0m" }, { status: 500 });
    }
}