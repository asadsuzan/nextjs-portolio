"use client";

import { FieldValues, useForm } from "react-hook-form";
import {  useState } from "react";
import {  Clock, Plus, Save, X } from "lucide-react";
import Link from "next/link";

export type ProjectFormData = {
  title: string;
  description: string;
  tech: string[];
  year: number;
  content: string;
  repoUrl: string;
  liveUrl: string;
  status:'Active'|'Archived'
};

const defaultProject: ProjectFormData = {
  title: "",
  description: "",
  tech: [],
  year: new Date().getFullYear(),
  content: "",
  repoUrl: "",
  liveUrl: "",
  status:'Active'
}  

export default function ProjectForm({ initialData = defaultProject, onSubmit, onCancel, isLoading = false }: { initialData?: ProjectFormData, onSubmit: (data: FieldValues) => void, onCancel?: () => void, isLoading?: boolean }) {
  const { register, handleSubmit, setValue, watch, reset, } = useForm({
    defaultValues: initialData
  });

  const [techInput, setTechInput] = useState("");

  const handleAddTech = () => {
    const currentTech = watch("tech");
    if (techInput.trim() && !currentTech.includes(techInput)) {
      setValue("tech", [...currentTech, techInput]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech:string) => {
    setValue(
      "tech",
      watch("tech").filter((t) => t !== tech)
    );
  };

  const submitHandler = (data:FieldValues) => {

    onSubmit(data);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-8">
              <Link
                href="/dashboard/projects"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                ← Back to Projects
              </Link>
            </div>
      <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Project" : "Add New Project"}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input {...register("title", { required: true })} type="text" className="w-full border p-2 rounded-lg" placeholder="Project Title" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <input {...register("description", { required: true })} type="text" className="w-full border p-2 rounded-lg" placeholder="Short description" />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tech Stack</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
              placeholder="Add technology"
            />
            <button type="button" onClick={handleAddTech} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {watch("tech")?.map((tech) => (
              <span key={tech} className="bg-gray-200 px-2 py-1 rounded-lg flex items-center gap-1">
                {tech}
                <X className="h-4 w-4 cursor-pointer text-red-500" onClick={() => handleRemoveTech(tech)} />
              </span>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Year</label>
          <input {...register("year", { required: true })} type="number" className="w-full border p-2 rounded-lg" />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea {...register("content", { required: true })} className="w-full border p-2 rounded-lg" rows={3} placeholder="Project details" />
        </div>

        {/* Repo URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Repository URL</label>
          <input {...register("repoUrl")} type="url" className="w-full border p-2 rounded-lg" placeholder="GitHub/Repo link" />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Live URL</label>
          <input {...register("liveUrl")} type="url" className="w-full border p-2 rounded-lg" placeholder="Live project link" />
        </div>
        {/* status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
        <select {...register("status", { required: true })} className="border p-2 rounded-lg">
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
        </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              <X className="h-5 w-5" /> Cancel
            </button>
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            {
              isLoading? (
               <div className="flex gap-2 items-center">
                  <Clock className="h-5 w-5" /> Please wait...
               </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Save className="h-5 w-5" /> {initialData ? "Update Project" : "Save Project"}
                </div>
              )
            }
           
          </button>
        </div>
      </form>
    </div>
  );
}
