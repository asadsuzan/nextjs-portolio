import Link from "next/link";
import { Calendar, Search, Star } from "lucide-react";
import { AnimatedDiv } from "@/components/shared/AnimatedDiv";


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
const BlogPage =async () => {
 
  // const data = await fetch(`${process.env.BASE_URL}/api/blogs`,);
  // if (!data.ok) {
  //   throw new Error(`HTTP error! status: ${data.status}`);
  // }
  // const {blogs} = await data.json();
let blogs: Blog[] = [];
  try{
    const res = await fetch(`${process.env.BASE_URL}/api/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }
     blogs = data?.blogs as Blog[];
  }catch(error){
    console.error("Error retrieving blogs:", error);
  }

  return (
    <div className="my-3 bg-gradient-to-b from-blue-50 to-gray">
      <AnimatedDiv initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {blogs?.map((blog:Blog) => (
              <article
                key={blog._id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <time className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {new Date(blog.date).toLocaleDateString()}
                  </time>
                  <div className="flex gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.excerpt?.slice(0,200)}...</p>
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  Read More
                  <Star className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </AnimatedDiv>
 
    </div>
  );
};

export default BlogPage;