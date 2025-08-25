import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailsPreview from './Preview/PersonalDetailsPreview'
import SummeryPreview from './Preview/SummeryPreview'
import ExperiencePreview from './Preview/ExperiencePreview'
import EducationalPreview from './Preview/EducationalPreview'
import SkillsPreciew from './Preview/SkillsPreciew'

const ResumePreview = () => {

    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' 
    style={
        {borderColor:resumeInfo?.themeColor}
    }>
      {/* Personal Details  */}

        <PersonalDetailsPreview resumeInfo={resumeInfo}/>

      {/* Summary  */}

        <SummeryPreview resumeInfo={resumeInfo}/>
      
      {/* Professional Experience  */}

        <ExperiencePreview resumeInfo={resumeInfo}/>

      {/* Education  */}

        <EducationalPreview resumeInfo={resumeInfo}/>

      {/* Skills  */}

        <SkillsPreciew resumeInfo={resumeInfo}/>



    </div>
  )
}

export default ResumePreview
