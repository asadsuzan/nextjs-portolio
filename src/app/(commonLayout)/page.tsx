import Link from "next/link";
import Image from "next/image";
import { Briefcase, Code2, Globe, Mail, Rocket, Star } from "lucide-react";
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

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  date: Date;
  content: string;
  tags: string[]; // Assuming tags are strings
  tech: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
const HomePage =async () => {

  // Fetch featured projects from API
  const fetchFeaturedProjects = async () => {
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

  // Fetch recent blog posts from API
  const fetchRecentPosts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blogs`, {
        cache: 'no-store'
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  };
 // Fetch data in parallel
 const [featuredProjectsRes, recentPostsRes] = await Promise.all([
  fetchFeaturedProjects(),
  fetchRecentPosts()
]);
const featuredProjects:Project[] = featuredProjectsRes?.project?.slice(0,2) || []
const recentPosts:Blog[]= recentPostsRes?.blogs?.slice(0,2) || []


  return (
    <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left lg:flex items-center justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Full-Stack Developer
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Building digital experiences that combine creativity with technical excellence
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/projects"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    View Projects
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  <Image
                    src="/developer-image.jpg" // Replace with your image
                    alt="Developer Photo"
                    fill
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Code2, title: "Frontend Development", skills: "React, Next.js, TypeScript" },
                { icon: Briefcase, title: "Backend Development", skills: "Node.js, Python, REST APIs" },
                { icon: Globe, title: "DevOps & Cloud", skills: "AWS, Docker, CI/CD" },
              ].map((skill, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                  <skill.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-600">{skill.skills}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
              <Link href="/projects" className="text-blue-600 hover:text-blue-700 flex items-center">
                View All Projects
                <Star className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div key={project._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
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
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Recent Blog Posts</h2>
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 flex items-center">
                View All Posts
                <Star className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.map((post) => (
                <div key={post._id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post._id}`}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-xl mb-8">Have a project in mind? Let&apos;s create something amazing!</p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
            </Link>
          </div>
        </section>
     


    </div>
  );
};

export default HomePage;