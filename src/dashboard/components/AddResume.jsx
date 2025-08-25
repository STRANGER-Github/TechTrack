import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation=useNavigate();
    const onCreate = async () => {
        setLoading(true);
        try {
            const uuid = uuidv4();
            const data = {
                data: {
                    title: resumeTitle,
                    resumeId: uuid,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    userName: user?.fullName,
                },
            };

            const resp = await GlobalApi.CreateNewResume(data);
            console.log(resp.data.data.documentId);
            setOpenDialog(false);
            navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit"); // Close dialog on success
        } catch (error) {
            console.error("Error creating resume:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                className="p-14 py-24 flex justify-center items-center border bg-secondary rounded-lg h-[280px] w-[250px] hover:scale-105 border-dashed transition-all hover:shadow-md cursor-pointer"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input
                                className="my-2"
                                placeholder="Ex: Data Analyst"
                                value={resumeTitle}
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button
                                variant="ghost"
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={onCreate}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddResume;
















// import { PlusSquare } from 'lucide-react';
// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { v4 as uuidv4 } from 'uuid';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";

// const AddResume = () => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [resumeTitle, setResumeTitle] = useState();

//     const onCreate = () => {
//         const uuid = uuidv4();
//         console.log(resumeTitle, uuid);
//         setOpenDialog(false); // Close dialog after creating
//     };

//     return (
//         <div>
//             <div
//                 className="p-14 py-24 flex justify-center items-center border bg-secondary rounded-lg h-[280px] w-[250px] hover:scale-105 border-dashed transition-all hover:shadow-md cursor-pointer"
//                 onClick={() => setOpenDialog(true)}
//             >
//                 <PlusSquare />
//             </div>
//             <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Create New Resume</DialogTitle>
//                         <DialogDescription>
//                             <p>Add a title for your new resume</p>
//                             <Input
//                                 className="my-2"
//                                 placeholder="Ex: Data Analyst"
//                                 onChange={(e) => setResumeTitle(e.target.value)}
//                             />
//                         </DialogDescription>
//                         <div className="flex justify-end gap-5">
//                             <Button
//                                 variant="ghost"
//                                 onClick={() => setOpenDialog(false)}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 disabled={!resumeTitle}
//                                 onClick={() => onCreate()}
//                             >
//                                 Create
//                             </Button>
//                         </div>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default AddResume;
