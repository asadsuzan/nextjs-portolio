'use client'
import { ProjectFormData } from "@/components/forms/ProjectForm";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";
import { Edit, Trash, Plus, Loader2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TProjectResponse = {
  _id: string;
} & ProjectFormData;

export default function ProjectManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [projects, setProjects] = useState<TProjectResponse[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data?.project || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(projectId);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      // Remove deleted project from state
      setProjects((prev) => prev.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center" 
          onClick={() => router.push('projects/create')}>
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Technology</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Year</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Content</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Repo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Live</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects?.map((project) => (
              <tr key={project._id}>
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3 truncate max-w-[200px]" title={project.description}>
                  {project.description}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">{project.year}</td>
                <td className="px-4 py-3 truncate max-w-[250px]" title={project.content}>
                  {project.content}
                </td>
                <td className="px-4 py-3">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    Repo <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </td>
                <td className="px-4 py-3">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center">
                    Live <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-sm rounded-full ${project.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700" onClick={() => router.push(`projects/${project._id}`)}>
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-700" onClick={() => handleDelete(project._id)} disabled={deletingId === project._id}>
                    {deletingId === project._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="h-5 w-5" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && !isLoading && <EmptyState />}
      </div>
    </div>
  );
}
