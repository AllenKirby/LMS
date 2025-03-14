import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { useRef } from "react";

interface UploadContentData { 
    type: "uploadedFile"; 
    fileID: string; 
    fileName: string; 
    file: File | null; 
}

type UploadContentState = {
    moduleID: string;
    setTitle: (moduleID: string, fileID: string, title: string) => void;
    deleteUploadContent: (moduleID: string, fileID: string) => void;
    data: UploadContentData
}

const UploadContent: React.FC<UploadContentState> = (props) => {
    const {moduleID, data, deleteUploadContent, setTitle} = props
    const inputFile = useRef<HTMLInputElement>(null)

    const uploadFile = () => {
        inputFile.current?.click();
    }
  return (
    <section className="w-full h-fit border rounded-md">
        <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
            <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Learning Materials (IMG, VIDEO, DOCUMENT)</p>
            <div className="flex items-center justify-center gap-2">
                <button><BiDownArrowAlt size={24} color="gray"/></button>
                <button><BiUpArrowAlt size={24} color="gray"/></button>
                <button onClick={() => deleteUploadContent(moduleID, data.fileID)}><RiDeleteBinLine size={24} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-3 flex flex-col gap-3">
            <input 
                type="text" 
                value={data.fileName}
                onChange={(e) => setTitle(moduleID, data.fileID, e.target.value)}
                className="w-full p-2" 
                placeholder="Untitled file name..." />
            <div className="w-full h-fit">
                <input 
                    type="file" 
                    ref={inputFile}
                    className="hidden"
                    // onChange={(e) => {
                    //     if (e.target.files && e.target.files[0]) {
                    //       setFile(menuID, moduleID, data.fileID, e.target.files[0]);
                    //     }
                    //   }} 
                    />
                <button onClick={uploadFile} className="w-full h-60 border-dashed border-2 rounded-md border-c-blue-50 bg-c-blue-5 flex items-center justify-center">
                    <p className="flex flex-col items-center text-p-sm font-medium text-c-grey-50 gap-2"><FiUpload size={40}/> Upload your file</p>
                </button>
            </div>
        </div>
    </section>
  )
}

export default UploadContent