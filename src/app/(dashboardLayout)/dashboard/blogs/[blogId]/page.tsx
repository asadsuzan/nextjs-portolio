"use client";

import BlogForm, { BlogData } from "@/components/forms/BlogForm";

import Spinner from "@/components/shared/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

const EdiBlogPage = ({ params }: { params: Promise<{ blogId: string }> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [blogId, setBlogId] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.blogId); // Store resolved projectId in state
    };

    resolveParams();
  }, [params]); // Run only when `params` changes

  useEffect(() => {
    if (!blogId) return; // Wait until projectId is available

    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        console.log(blogId)
        const response = await fetch(`/api/blogs/${blogId}`);
        if (!response.ok) throw new Error("Failed to fetch blog");

        const data = await response.json();
        setBlog(data?.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]); // Fetch project only after projectId is available

  const handleUpdate = async (updatedData: FieldValues) => {
    setIsLoading(true);
    console.log(blogId)
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      console.log(response)
      if (!response.ok) throw new Error("Failed to update project");
      
      const data = await response.json();
      alert('Blog updated successfully')
      setBlog(data.blog);
    router.push('/dashboard/blogs')
    } catch (error) {
      alert('Blog updated Failed')
      router.push('/dashboard/blogs')
      console.error("Error updating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner/>;


  return (
    <div>
      <h1>Edit Blog</h1>
      {blog && <BlogForm initialData={blog} onSubmit={handleUpdate} />}
 
    </div>
  );
};

export default EdiBlogPage;
