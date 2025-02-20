import { notFound } from "next/navigation";
import { Calendar, Share2 } from "lucide-react";
import Link from "next/link";
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
interface BlogPostProps {
  params: Promise<{ blogId: string }>;
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const resolvedParams = await params; // ✅ Await the promise
  // Fetch recent blog posts from API
  const fetchBlog = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${resolvedParams.blogId}`, {
        cache: 'no-store'
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  };
  const [blogRes] = await Promise.all([
 fetchBlog()
  ]);
const blog = blogRes?.blog as Blog;

if(!blog?._id) {
 return notFound();
   // Return early if blog not found to avoid unnecessary API call
}
  

  return (
    <div className="my-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              ← Back to Blog
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <time className="text-gray-500 flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(blog.date).toLocaleDateString()}
              </time>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose max-w-none mb-8 border-b pb-5">
              <p>{blog.excerpt}</p>
            </div>
            <div className="prose max-w-none mb-8">
              <p>{blog.content}</p>
            </div>

            <div className="border-t pt-8 flex justify-between items-center">
              <button className="text-blue-600 hover:text-blue-700 flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Share Article
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
