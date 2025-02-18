'use client'
import ProjectForm from '@/components/forms/ProjectForm'
import React from 'react'
import { FieldValues } from 'react-hook-form';


const CrateProjectPage = () => {
  const submitHandler = async (data:FieldValues) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Project added successfully!");
        console.log(result)
      
      } else {
        alert(result.error);
        console.log(result)
      }
    } catch (error) {

      console.log(error)
      alert("Something went wrong");
    }
  };
  
  return (
    <div>
        <ProjectForm onSubmit={submitHandler}/>
    </div>
  )
}

export default CrateProjectPage