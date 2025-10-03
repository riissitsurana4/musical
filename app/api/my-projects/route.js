import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { rows: projects } = await pool.query(`
            SELECT p.*, u.name as author_name 
            FROM projects p
            JOIN users u ON u.slack_id = $1
            WHERE p.user_id = u.id
            ORDER BY p.created_at DESC
        `, [session.user.slack_id]);
        
        return NextResponse.json(projects);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
    }
}