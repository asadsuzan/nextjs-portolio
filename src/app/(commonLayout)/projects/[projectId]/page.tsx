import { notFound } from "next/navigation";
import { Briefcase, Github, Globe,  } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
  params: Promise<{ projectId: string }>;
}

const ProjectDetails = async({ params }: ProjectProps) => {
  const resolvedParams = await params; 
  // Temporary data - replace with real data fetching
  const project = {
    id: 1,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution",
    tech: ["React", "Node.js", "MongoDB"],
    year: 2024,
    content: `A comprehensive e-commerce platform built with modern technologies...`,
    repoUrl: "#",
    liveUrl: "#",
  };

  if (parseInt(resolvedParams.projectId) !== 1) return notFound();

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                href="/projects"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                ← Back to Projects
              </Link>
            </div>

            <div className="mb-8">
              <Briefcase className="h-12 w-12 text-blue-600 mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mb-8">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Globe className="h-5 w-5 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
              <p className="text-gray-600 whitespace-pre-line">
                {project.content}
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProjectDetails;