import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Blog title
    excerpt: { type: String, required: true }, // Short description
    date: { type: Date, required: true }, // Date of publication
    content: { type: String, required: true }, // Full blog content
    tags: { type: [String], default: [] }, // Tags for categorization
    tech: { type: [String], required: true }, // Related technologies
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"], // Blog status
      default: "Active",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

