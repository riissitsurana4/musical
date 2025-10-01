import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { rows: projects } = await sql`
      SELECT * FROM projects 
      WHERE author_email = ${session.user.email} 
      ORDER BY created_at DESC;
    `;

        return NextResponse.json(projects);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}