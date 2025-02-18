import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: { type: [String], required: true },
  year: { type: Number, required: true },
  content: { type: String, required: true },
  repoUrl: { type: String },
  liveUrl: { type: String },
  status:{
    type: String,
    enum: ["Archived", "Active"],
    default: "Active"
  }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
