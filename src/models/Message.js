import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Defaults to current date
    status: {
      type: String,
      enum: ["Unread", "Read", "Replied"],
      default: "Unread",
    },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
