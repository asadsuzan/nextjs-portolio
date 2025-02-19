import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Project from '../../../../models/Projects'



interface RequestParams {
  params: Promise<{ id: string }>;
}
export async function GET(req: NextRequest, { params }: RequestParams) {
    await connectDB();
    const  resolvedParams = await params
    const project = await Project.findById(resolvedParams.id);
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({message:"Project retrieved success" , project:project}, { status: 200 });
}

// UPDATE a project
export async function PUT(req: NextRequest, { params }: RequestParams) {
  await connectDB();
  const  resolvedParams = await params;
  try {
    const data = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(resolvedParams.id, data, { new: true });
    if (!updatedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// DELETE a project
export async function DELETE(req: NextRequest, { params }: RequestParams) {
  await connectDB();
  const  resolvedParams = await params
  const deletedProject = await Project.findByIdAndDelete(resolvedParams.id);
  if (!deletedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json({ message: "Project deleted" }, { status: 200 });
}
