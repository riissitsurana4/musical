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

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Project ID is required" }, 
                { status: 400 }
            );
        }

        
        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(id),
                userSlackId: session.user.slack_id,
            },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found or you don't have permission to delete it" }, 
                { status: 404 }
            );
        }

        await prisma.project.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { 
            id,
            name, 
            description, 
            repositoryUrl, 
            hackatimeProject, 
            hackatimeTime 
        } = await request.json();

        if (!id || !name || !description) {
            return NextResponse.json(
                { error: "ID, name and description are required" }, 
                { status: 400 }
            );
        }

       
        const existingProject = await prisma.project.findFirst({
            where: {
                id: parseInt(id),
                userSlackId: session.user.slack_id,
            },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found or you don't have permission to edit it" }, 
                { status: 404 }
            );
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description,
                repositoryUrl,
                hackatimeProject,
                hackatimeTime,
            },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}