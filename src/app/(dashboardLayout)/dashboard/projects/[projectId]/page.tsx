"use client";

import ProjectForm, { ProjectFormData } from "@/components/forms/ProjectForm";
import React, { useEffect, useState } from "react";

const EditProjectPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<ProjectFormData | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  
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

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>No project found</p>;

  return (
    <div>
      <h1>Edit Project</h1>
      <ProjectForm initialData={project} onSubmit={() => console.log("edit project")} />
    </div>
  );
};

export default EditProjectPage;
