import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: false 
});

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.slack_id) {
        return NextResponse.json({ error: "User not properly authenticated" }, { status: 401 });
    }

    try {
        const { rows: projects } = await pool.query(`
            SELECT * FROM projects 
            WHERE author_slack_id = $1 
            ORDER BY created_at DESC
        `, [session.user.slack_id]);
        
        return NextResponse.json(projects);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
    }
}