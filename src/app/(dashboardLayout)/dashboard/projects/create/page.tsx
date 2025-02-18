'use client'
import ProjectForm from '@/components/forms/ProjectForm'
import React from 'react'

const CrateProjectPage = () => {
  return (
    <div>
        <ProjectForm onSubmit={()=>console.log('add project')}/>
    </div>
  )
}

export default CrateProjectPage