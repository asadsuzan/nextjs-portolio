"use client";

import { useForm } from "react-hook-form";
import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type BlogFormProps = {
  initialData?: BlogData | null;
  onSubmit: (data: BlogData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
};

export type BlogData = {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: "Active" | "Draft" | "Archived";
  
};

export default function BlogForm({ initialData, onSubmit, onCancel, isLoading }: BlogFormProps) {
  const defaultValues = initialData
    ? {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : "", // Convert date for editing
      }
    : {
        title: "",
        date: new Date().toISOString().split("T")[0], // Default to today's date for new blogs
        excerpt: "",
        tags: [],
        status: "Draft" as "Draft" | "Active" | "Archived",
        content: "",
      };

  const { register, handleSubmit, watch, setValue, reset } = useForm<BlogData>({ defaultValues });

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const currentTags = watch("tags");
    if (tagInput.trim() && !currentTags.includes(tagInput)) {
      setValue("tags", [...currentTags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      watch("tags").filter((t) => t !== tag)
    );
  };

  const submitHandler = (data: BlogData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-8">
              <Link
                href="/dashboard/blogs"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                ← Back to Blogs
              </Link>
            </div>
      <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Blog" : "Add New Blog"}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            {...register("date", { required: true })}
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Excerpt</label>
          <textarea
            {...register("excerpt", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Short description of the blog"
          />
        </div>

        {/* content */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Content of the blog"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-5 w-5 mr-1" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {watch("tags").map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                {tag}
                <X className="h-4 w-4 cursor-pointer text-red-500" onClick={() => handleRemoveTag(tag)} />
              </span>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>

          </select>
        </div>
  

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center"
            >
              <X className="h-5 w-5 mr-1" />
              Cancel
            </button>
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
           {
            isLoading ? <>
            Please wait 
            </> : <>
            <Save className="h-5 w-5 mr-1" />
            {initialData ? "Update Blog" : "Save Blog"}</>
           }
          </button>
        </div>
      </form>
    </div>
  );
}
