import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import FileIcon from '../../../../assets/file.png'
import React, { useRef } from "react";

import { FileUploadState, DocumentState } from "../../../../types/CourseCreationTypes";
import {useTrainingOfficerHook} from "../../../../hooks";

type UploadContentState = {
    moduleID: string;
    setTitle: (moduleID: string, fileID: string, title: string) => void;
    deleteUploadContent: (moduleID: string, fileID: string) => void;
    data: FileUploadState | DocumentState;
    setFile: (id: string, fileID: string, value: File) => void;
    deleteFile: (id: string, fileID: string) => void;
    courseAction: 'create' | 'update' | '';
    deleteFileContent: (id: number) => void;
}

const UploadContent: React.FC<UploadContentState> = React.memo((props) => {
    const {moduleID, data, deleteUploadContent, setTitle, setFile, deleteFile, courseAction, deleteFileContent} = props
    const {deleteUserCourseDocument} = useTrainingOfficerHook()
    const inputFile = useRef<HTMLInputElement>(null)

    const uploadFile = () => {
        inputFile.current?.click();
    }

    const handleDelete = async(fileID: string | number) => {
        console.log('click')
        if(courseAction === 'update') {
            await deleteUserCourseDocument(Number(fileID))
            deleteFileContent(Number(fileID))
        } else {
            deleteFile(moduleID, String(fileID))
        }
    }

  return (
    <section className="w-full h-fit border rounded-md">
        <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
            <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Learning Materials (IMG, VIDEO, DOCUMENT)</p>
            <div className="flex items-center justify-center gap-2">
                <button><BiDownArrowAlt size={24} color="gray"/></button>
                <button><BiUpArrowAlt size={24} color="gray"/></button>
                <button onClick={() => deleteUploadContent(moduleID, (data as FileUploadState).fileID)}><RiDeleteBinLine size={24} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-3 flex flex-col gap-3">
            <input 
                type="text" 
                value={(data as FileUploadState).fileName || (data as DocumentState)?.values?.document_name}
                onChange={(e) => setTitle(moduleID, (data as FileUploadState).fileID, e.target.value)}
                className="w-full p-2" 
                placeholder="Untitled file name..." />
            <div className="w-full h-fit">
                {(data as FileUploadState).file || (data as DocumentState).values ? (
                    <div className="w-full flex items-center justify-center">
                        <div className="w-full border rounded-md flex items-center justify-center gap-3">
                            <img src={FileIcon} alt="File Icon" className="w-fit"/>
                            <div className="w-full flex flex-col">
                                <p className="font-medium">{(data as FileUploadState).fileName || (data as DocumentState)?.values?.document_name}</p>
                            </div>
                        </div>
                        <button className="w-fit px-3" onClick={() => handleDelete(courseAction === 'create' ? (data as FileUploadState).fileID : (data as DocumentState)?.values?.document_id)}>
                            <IoMdClose size={20}/>
                        </button>
                    </div>
                ) : (
                    <>
                        <input 
                            type="file" 
                            ref={inputFile}
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                setFile(moduleID, (data as FileUploadState).fileID, e.target.files[0]);
                                }
                            }} 
                            />
                        <button onClick={uploadFile} className="w-full h-60 border-dashed border-2 rounded-md border-c-blue-50 bg-c-blue-5 flex items-center justify-center">
                            <p className="flex flex-col items-center text-p-sm font-medium text-c-grey-50 gap-2"><FiUpload size={40}/> Upload your file</p>
                        </button>
                    </>
                )}
            </div>
        </div>
    </section>
  )
})

export default UploadContent