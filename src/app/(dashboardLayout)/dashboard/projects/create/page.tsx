'use client'
import ProjectForm from '@/components/forms/ProjectForm'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form';


const CrateProjectPage = () => {
  const [isLoading,setIsLoading] = useState(false)
  const submitHandler = async (data:FieldValues) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
  
      setIsLoading(false);
      console.log(error)
      alert("Something went wrong");
    }
  };

  return (
    <div>
        <ProjectForm onSubmit={submitHandler} isLoading={isLoading}/>
    </div>
  )
}

export default CrateProjectPage