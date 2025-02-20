import Link from "next/link";
import { Briefcase, Search, Star } from "lucide-react";
import { AnimatedDiv } from "@/components/shared/AnimatedDiv";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  year: number;
  content: string;
  repoUrl: string;
  liveUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const ProjectsPage = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const projects = data?.project as Project[];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray">
      <AnimatedDiv
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Projects</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">
                  {project.description?.slice(0, 200)}...
                </p>
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
                <Link
                  href={`/projects/${project._id}`}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  View Details
                  <Star className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
};

export default ProjectsPage;
