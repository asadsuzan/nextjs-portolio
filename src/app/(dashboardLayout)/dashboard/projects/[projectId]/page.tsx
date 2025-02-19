"use client";

import ProjectForm, { ProjectFormData } from "@/components/forms/ProjectForm";
import Spinner from "@/components/shared/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

const EditProjectPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<ProjectFormData | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.projectId); // Store resolved projectId in state
    };

    resolveParams();
  }, [params]); // Run only when `params` changes

  useEffect(() => {
    if (!projectId) return; // Wait until projectId is available

    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) throw new Error("Failed to fetch project");

        const data = await response.json();
        setProject(data?.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]); // Fetch project only after projectId is available

  const handleUpdate = async (updatedData: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) throw new Error("Failed to update project");
      
      const data = await response.json();
      alert('Project updated successfully')
      setProject(data.project);
    router.push('/dashboard/projects')
    } catch (error) {
      alert('Project updated Failed')
      router.push('/dashboard/projects')
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner/>;


  return (
    <div>
      <h1>Edit Project</h1>
 <ProjectForm initialData={project as ProjectFormData } onSubmit={handleUpdate} />
    </div>
  );
};

export default EditProjectPage;
