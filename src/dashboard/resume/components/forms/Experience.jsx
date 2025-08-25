import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useContext } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: ''
};

const Experience = () => {
    const [experienceList, setExperienceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.Experience?.length > 0) {
            setExperienceList(resumeInfo.Experience);
        }
    }, [resumeInfo]);

    useEffect(() => {
        setResumeInfo(prevInfo => ({
            ...prevInfo,
            Experience: experienceList
        }));
    }, [experienceList, setResumeInfo]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...experienceList];
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]);
    };

    const RemoveExperience = () => {
        setExperienceList(prevList => prevList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList.map(({ id, ...rest }) => rest)
            }
        };
        try {
            await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            toast('Details updated!');
        } catch (error) {
            toast('Server Error, Please try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleRichTextEditor = (value, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index] = { ...newEntries[index], [name]: value.toString() }; // Ensure it's a string
        setExperienceList(newEntries);
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your Previous Job Experience</p>

            <div>
                {experienceList.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input 
                                name="title" 
                                value={item.title} 
                                onChange={(event) => handleChange(index, event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input 
                                name="companyName" 
                                value={item.companyName} 
                                onChange={(event) => handleChange(index, event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input 
                                name="city" 
                                value={item.city} 
                                onChange={(event) => handleChange(index, event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input 
                                name="state" 
                                value={item.state} 
                                onChange={(event) => handleChange(index, event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input 
                                type="date" 
                                name="startDate" 
                                value={item.startDate} 
                                onChange={(event) => handleChange(index, event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input 
                                type="date" 
                                name="endDate" 
                                value={item.endDate} 
                                onChange={(event) => handleChange(index, event)} 
                            />
                        </div>
                        <div className='col-span-2'>
                            <RichTextEditor 
                                index={index}
                                value={item.workSummery} 
                                onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummery', index)} 
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewExperience} className="text-primary">+ Add More Experience</Button>
                    <Button variant="outline" onClick={RemoveExperience} className="text-primary">- Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
};

export default Experience;
