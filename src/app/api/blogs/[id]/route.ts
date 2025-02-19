import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

import Blog from "@/models/Blogs";



interface RequestParams {
    params: {
        id: string;
    };
}

export async function GET(req: NextRequest, { params }: RequestParams) {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json({message:"Blog retrieved success" , blog:blog}, { status: 200 });
}


export async function PUT(req: NextRequest, { params }: RequestParams) {
  await connectDB();
  try {
    const data = await req.json();
    const updatedBlog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}


export async function DELETE(req: NextRequest, { params }: RequestParams) {
  await connectDB();
  const deletedBlog = await Blog.findByIdAndDelete(params.id);
  if (!deletedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
}
