import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


import Message from "@/models/Message";


interface RequestParams {
    params: Promise<{ id: string }>;
  }




export async function DELETE(req: NextRequest, { params }: RequestParams) {
  await connectDB();
    const  resolvedParams = await params
  const deletedMessage = await Message.findByIdAndDelete(resolvedParams.id);
  if (!deletedMessage) return NextResponse.json({ error: "message not found" }, { status: 404 });
  return NextResponse.json({ message: "message deleted" }, { status: 200 });
}



export async function PUT(req: NextRequest, { params }: RequestParams) {
    await connectDB();
    const  resolvedParams = await params;
    try {
      const data = await req.json();
      
      // Ensure only valid fields are updated
      const { status } = data;
      if (!["Unread", "Read", "Replied"].includes(status)) {
        return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
      }
  
      const updatedMessage = await Message.findByIdAndUpdate(
        resolvedParams.id,
        { status },
        { new: true }
      );
  
      if (!updatedMessage) {
        return NextResponse.json({ error: "Message not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedMessage, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
  }