'use client'
import BlogForm from '@/components/forms/BlogForm'
import React from 'react'

const CreateBlogPage = () => {
  return (
    <div>
      <BlogForm onSubmit={()=>console.log('new')}/>
    </div>
  )
}

export default CreateBlogPage