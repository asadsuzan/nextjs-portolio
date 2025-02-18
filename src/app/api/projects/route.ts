import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Project from '../../../models/Projects'



interface ProjectRequest {
    title: string;
    description: string;
    tech: string;
    year: number;
    content: string,
    liveUrl: string,
    repoUrl: string

}


// carte new project

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



// GET all projects & POST new project
export async function GET() {
    await connectDB();
    try {
        const projects = await Project.find({})
        return NextResponse.json({ message: "Project retrieves successfully", project: projects }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}