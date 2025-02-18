'use client'
import { Edit, Trash, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlogManagement() {
  const router =  useRouter()
  // Temporary post data
  const posts = [
    {
      id: 1,
      title: "Optimizing React Performance",
      date: "2024-03-15",
      excerpt: "Best practices for optimizing React applications...",
      tags: ["React", "Performance"],
      status: "Active",
      views: 1200,
    },
    {
      id: 2,
      title: "TypeScript Patterns",
      date: "2024-03-10",
      excerpt: "Advanced TypeScript development patterns...",
      tags: ["TypeScript", "Best Practices"],
      status: "Draft",
      views: 800,
    },
  ];


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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tags</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Views</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      post.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{post.date}</td>
                <td className="px-6 py-4">{post.views}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-700" onClick={()=>router.push(`blogs/${131431}`)}>
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
