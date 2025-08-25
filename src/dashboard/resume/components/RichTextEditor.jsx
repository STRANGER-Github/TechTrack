import { Loader, LoaderCircle, Star } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { AIChatSession } from '../../../../service/AIModel';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'

const PROMPT = '{positionTitle}, Depends on Position title give me 5 - 6 bullet points for my experience in resume, give me result in HTML format, avoid printing project title just need points'

const RichTextEditor = ({onRichTextEditorChange,index}) => {
  
  const [value,setValue] = useState('<ul>');
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [loading,setLoading] = useState(false);
  const GenerateSummeryFromAI = async() => {
    setLoading(true);
    if(!resumeInfo.experience[index].title){
      toast('Please Add Position Title First', {type:'error'});
      return;
    }
    const prompt=PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text())
    const resp= result.response.text();
    setValue(resp.replace('[', '').replace(']', ''));
    setLoading(false);
  }

  return (
    <div>

      <div className='flex justify-between items-center my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size='sm' 
        onClick={GenerateSummeryFromAI}
        className="flex gap-2 border-primary text-primary">
          {loading? <LoaderCircle className='animate-spin'/> :
          <>
          <Star className='h-4 w-4' />Generate from AI
          </>  
          }
          </Button>
      </div>

        <EditorProvider>
            <Editor value={value} onChange={(e)=>{
                setValue(e.target.value)
                onRichTextEditorChange(e);
            }} >

        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
        </Toolbar>

            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor
