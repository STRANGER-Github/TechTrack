import React, { useEffect, useContext } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const Education = () => {

const [loading,setLoading] = useState(false);

const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

const [educationalList,setEducationalList] = useState([{
    
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
    
}])

const handleChange = (event,index) => {
    const newEntries = educationalList.slice();
    const {name,value} = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
}

const AddNewEducation = () => {
    setEducationalList([...educationalList,{
    
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
    }])}

const RemoveEducation = () => {
    setEducationalList(educationalList.slice(0,-1))
}

const onSave = () => {

}

useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        education:educationalList
    })
},[educationalList])



  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Educational Qualification</h2>
                <p>Add Your Education Details</p>

            <div>
                {educationalList.map((item,index)=>(
                    <div>
                        <div className='grid grid-cols-2 gap-3 p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input name="universityName" onChange={(e)=>handleChange(e,index)} />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input name="degree" onChange={(e)=>handleChange(e,index)} />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input name="major" onChange={(e)=>handleChange(e,index)} />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input type="date" name="startDate" onChange={(e)=>handleChange(e,index)} />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input type="date" name="endDate" onChange={(e)=>handleChange(e,index)} />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea name="description" onChange={(e)=>handleChange(e,index)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Button variant="outline" onClick={AddNewEducation} className="text-primary">+ Add More Education</Button>
                                <Button variant="outline" onClick={RemoveEducation} className="text-primary">- Remove</Button>
        
                            </div>
                                <Button disabled={loading} onClick={()=>onSave()}>
                                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                                </Button>
                        </div>
    </div>
  )
}


export default Education
