import React, { useState, useEffect } from 'react'
import AddResume from './components/AddResume'
import { UserButton, useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

const Dashboard = () => {

  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
      })
      .catch(error => {
        console.error('Error fetching resumes:', error);
      });
  }

  return (
    <div>
      <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating AI Resume for your next Job role</p>
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 '>
          <AddResume />
          {resumeList.length > 0 && resumeList.map((resume, index) => {
            return <ResumeCardItem resume={resume} key={index} />;  
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
