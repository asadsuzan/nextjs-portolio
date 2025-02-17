import Link from "next/link";
import { Calendar, Search, Star } from "lucide-react";


const BlogPage = () => {
  // Temporary data - replace with real data
  const posts = [
    {
      id: 1,
      title: "Optimizing React Performance",
      date: "2024-03-15",
      excerpt: "Best practices for optimizing React applications...",
      tags: ["React", "Performance"],
    },
    {
      id: 2,
      title: "TypeScript Patterns",
      date: "2024-03-10",
      excerpt: "Advanced TypeScript development patterns...",
      tags: ["TypeScript", "Best Practices"],
    },
  ];

  return (
    <div>
   
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <time className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  Read More
                  <Star className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
 
    </div>
  );
};

export default BlogPage;