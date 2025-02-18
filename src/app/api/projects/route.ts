import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Project from '../../../models/Projects'

 

interface ProjectRequest {
    title: string;
    description: string;
    tech: string;
    year: number;
}




export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB(); // Ensure DB is connected

    try {
        const data: ProjectRequest = await req.json();
        if (!data.title || !data.description || !data.tech || !data.year) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProject: typeof Project = await Project.create(data);

        return NextResponse.json({ message: "Project added successfully", project: newProject }, { status: 201 });
    } catch (error) {
        console.error("Error saving project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
