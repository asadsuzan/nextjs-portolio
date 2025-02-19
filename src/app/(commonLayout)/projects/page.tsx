import Link from "next/link";
import { Briefcase, Search, Star } from "lucide-react";
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


const ProjectsPage = async() => {

  const fetchProjects = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/projects`, {
        cache: 'no-store'
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      return [];
    }
  };
  const data = await fetchProjects();
  const projects = data?.project as Project[];


 
  return (
    <div>
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
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
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
    

    </div>
  );
};

export default ProjectsPage;