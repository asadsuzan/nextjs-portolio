import React from 'react'

const ProjectDetailsPage = async({params}:{params:{projectId:string}}) => {
    const {projectId} =  params
    
  return (
    <div>
        project details page for {projectId}
    </div>
  )
}

export default ProjectDetailsPage