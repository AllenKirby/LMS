import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";


const UploadContent = () => {
  return (
    <section className="w-full h-fit border rounded-md">
        <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
            <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Learning Materials (IMG, VIDEO, DOCUMENT)</p>
            <div className="flex items-center justify-center gap-2">
                <button><BiDownArrowAlt size={24} color="gray"/></button>
                <button><BiUpArrowAlt size={24} color="gray"/></button>
                <button><RiDeleteBinLine size={24} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-3 flex flex-col gap-3">
            <input type="text" className="w-full p-2" placeholder="Untitled file name..." />
            <div className="w-full h-fit">
                <button className="w-full h-60 border-dashed border-2 rounded-md border-c-blue-50 bg-c-blue-5 flex items-center justify-center">
                    <p className="flex flex-col items-center text-p-sm font-medium text-c-grey-50 gap-2"><FiUpload size={40}/> Upload your file</p>
                </button>
            </div>
        </div>
    </section>
  )
}

export default UploadContent