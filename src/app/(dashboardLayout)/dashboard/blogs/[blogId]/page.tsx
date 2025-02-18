'use client'
import BlogForm, { BlogData } from '@/components/forms/BlogForm'
import React from 'react'

const UpdateBlogPage = () => {
    const initialData:BlogData= {
        title: "title",
        date: new Date().toISOString().split("T")[0], // Default to today's date
        excerpt: "react",
        tags: ['asad','adaafa'],
        status: "Draft",
        views: 21,
      }
  return (
    <div>
        <BlogForm initialData={initialData} onSubmit={()=>console.log('update')}/>
    </div>
  )
}

export default UpdateBlogPage