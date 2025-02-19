import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Message from '@/models/Message'




interface Message {
    name: string;
    email: string;
    subject: string;
    date?: string;
    status?: string;
    body: string;
  }

// carte new message

export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB(); // Ensure DB is connected

    try {
        const data: Message = await req.json();
        if (!data.name || !data.email || !data.subject || !data.body) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const message: Message = await Message.create(data);

        return NextResponse.json({ message: "Message Sent successfully", body: message }, { status: 201 });
    } catch (error) {
        console.error("Error Sent message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET() {
    await connectDB();
    try {
        const messages = await Message.find({})
        return NextResponse.json({ message: "Project retrieves successfully", body: messages }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}