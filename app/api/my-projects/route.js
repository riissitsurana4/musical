import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                userSlackId: session.user.slack_id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { 
            name, 
            description, 
            repositoryUrl, 
            hackatimeProject, 
            hackatimeTime 
        } = await request.json();

        if (!name || !description) {
            return NextResponse.json(
                { error: "Name and description are required" }, 
                { status: 400 }
            );
        }

        const project = await prisma.project.create({
            data: {
                name,
                description,
                repositoryUrl,
                hackatimeProject,
                hackatimeTime,
                userSlackId: session.user.slack_id,
            },
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}