import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCardItem = ({resume}) => {
  return (

    <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>
      <div className="p-14 bg-secondary flex justify-center items-center h-[280px] w-[250px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary">
        <Notebook/>
      </div>
      <h2 className='text-center my-2 w-[250px]'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem
