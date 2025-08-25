import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const PersonalDetail = ({ enabledNext }) => {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    // ✅ Initialize with an empty object to prevent 'undefined' issues
    const [formData, setFormData] = useState({});  
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(params);  
    }, [params]);  // ✅ Add dependency array to avoid infinite re-renders

    const handleInputChange = (e) => {
        enabledNext(false);
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value  
        }));

        setResumeInfo(prevResume => ({
            ...prevResume,
            [name]: value
        }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = { data: formData };

        try {
            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            console.log(resp);
            enabledNext(true);
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setLoading(false);
            toast("Data Updated!")
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with Basic Information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetail;
