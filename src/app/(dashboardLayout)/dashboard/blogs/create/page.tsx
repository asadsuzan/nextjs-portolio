'use client'
import BlogForm, { BlogData } from '@/components/forms/BlogForm'
import React, { useState } from 'react'

const CreateBlogPage = () => {
const [isLoading, setIsLoading] = useState(false)
  const handleSave = async (data: BlogData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Failed to save blog')
      }
      alert('Blog saved successfully')
    } catch (error) {
      console.error('Error saving blog:', error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div>
      <BlogForm onSubmit={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default CreateBlogPage