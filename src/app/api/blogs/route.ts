import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Project from '../../../models/Projects'
import { BlogData } from "@/components/forms/BlogForm";
import Blog from "@/models/Blogs";




// carte new project

export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB(); // Ensure DB is connected

    try {
        const data: BlogData = await req.json();
        if (!data.title || !data.excerpt  || !data.date || !data.content || !data.status || !data.tags.length) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProject: typeof Project = await Blog.create(data);

        return NextResponse.json({ message: "Blog added successfully", Blog: newProject }, { status: 201 });
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



// GET all projects & POST new project
export async function GET() {
    await connectDB();
    try {
        const blogs = await Blog.find({})
        return NextResponse.json({ message: "Blog retrieves successfully", blogs: blogs }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}