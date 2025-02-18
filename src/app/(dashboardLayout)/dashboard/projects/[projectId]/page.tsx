'use client'
import ProjectForm from '@/components/forms/ProjectForm'
import React from 'react'

const EditProjectPage = () => {
    const defaultProject = {
      title: "fsfsags",
      description: "gdsgdsgdsg",
      tech: ['dgdsg'],
      year: new Date().getFullYear(),
      content: "dsgdsg",
      repoUrl: "dsgdsgd",
      liveUrl: "dgdsgds",
    };
    
  return (
    <div>
        <ProjectForm initialData={defaultProject} onSubmit={()=>console.log('edit project')} />
    </div>
  )
}

export default EditProjectPage