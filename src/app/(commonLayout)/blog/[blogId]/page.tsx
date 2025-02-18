import { notFound } from "next/navigation";
import { Calendar, Share2 } from "lucide-react";
import Link from "next/link";


const BlogPost = ({ params }: { params: { blogId: string } }) => {
  // Temporary data - replace with real data fetching
  const post = {
    id: 1,
    title: "Optimizing React Performance",
    date: "2024-03-15",
    content: `In this comprehensive guide, we'll explore various techniques...`,
    tags: ["React", "Performance"],
  };

  if (parseInt(params.blogId) !== 1) return notFound();

  return (
    <div >
    
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
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                <div className="flex gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <div className="prose max-w-none mb-8">
                <p>{post.content}</p>
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