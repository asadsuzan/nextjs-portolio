'use client'
import { BlogData } from "@/components/forms/BlogForm";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";
import { Edit, Trash, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BlogResponse = {
  _id: string;
} & BlogData;
export default function BlogManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogResponse []>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router =  useRouter()

   useEffect(()=>{
    const fetchBlogs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/blogs')
        const data = await response.json()
      
      setBlogs(data?.blogs)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  
   },[])

   const handleDelete = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
  
    setDeletingId(blogId);
  
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
  
      // Remove deleted project from state
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center" onClick={()=>router.push('blogs/create')}>
          <Plus className="h-5 w-5 mr-2" />
          New Blog
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Excerpt</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tags</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Content</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {blogs?.map((blog) => (
              <tr key={blog._id}>
                <td className="px-6 py-4 font-medium">{blog.title}</td>
                <td className="px-6 py-4 font-medium truncate max-w-[200px]" title={blog?.excerpt}>{blog.excerpt}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      blog.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{new Date(blog?.date).toDateString()}</td>
                <td className="px-6 py-4 truncate max-w-[200px]" title={blog.content}>{blog.content}</td>
  
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-700" onClick={()=>router.push(`blogs/${blog._id}`)}>
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-700" onClick={() => handleDelete(blog._id)}>
                  {deletingId === blog._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      
        </table>
            {
        blogs.length === 0 && !isLoading && (
       <EmptyState />
        )
      }
      </div>
    </div>
  );
}
