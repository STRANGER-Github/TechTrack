import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { LoaderCircle, StarIcon } from 'lucide-react';
import { toast } from 'sonner'; 
import { AIChatSession } from './../../../../../service/AIModel';

const Summery = ({ enabledNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const prompt = "Job Title :  {jobTitle}, Depends on job title give me summary for my resume within 5-6 lines in JSON format with field experienceeLevel and Summary according Experiece Level for Fresher, Mid-Level, Experienced."

    const [aiGeneratedSummeryList,setAiGeneratedSummeryList]=useState();
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const [loading, setLoading] = useState(false);

   
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            summery: summery
        }));
    }, [summery, setResumeInfo]); 

    const GenerateSummaryFromAI=async()=>{
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT)
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummeryList(JSON.parse([result.response.text()]));
        setLoading(false);
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = { data: { summery } };

        try {
            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            console.log(resp);
            enabledNext(true);
            toast("Data Updated");
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your Job Title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button size="sm" variant="outline" 
                        onClick={()=>GenerateSummaryFromAI()}
                        className="border-primary text-primary flex gap-2" type="button"> <StarIcon className='w-4 h-4'/>    Generate from AI
                        </Button>
                    </div>

                    <Textarea
                        className="mt-5"
                        required
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />

                    <div className='mt-2 flex justify-end'>
                        <Button disabled={loading} type="submit">
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList && ( <div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList.map((item,index)=>(
                    <div key={index}>
                        <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>
        )}
        </div>
    );
};

export default Summery;
