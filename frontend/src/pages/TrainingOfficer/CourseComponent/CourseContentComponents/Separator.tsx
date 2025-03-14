import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import { LessonState  } from '../../../../types/CourseCreationTypes'

type SeparatorState = {
    moduleID: string;
    data: LessonState;
    setContent: (moduleID: string, lessonID: string, field: string, content: string) => void;
    deleteSeparator: (moduleID: string, lessonID: string) => void;
}

const Separator: React.FC<SeparatorState> = (props) => {
    const { moduleID, data, setContent, deleteSeparator } = props
  return (
        <section className="w-full h-fit border rounded-md">
            <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
                <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Title/Description</p>
                <div className="flex items-center justify-center gap-2">
                    <button><BiDownArrowAlt size={24} color="gray"/></button>
                    <button><BiUpArrowAlt size={24} color="gray"/></button>
                    <button onClick={() => deleteSeparator(moduleID, data.lessonID)}><RiDeleteBinLine size={24} color="gray"/></button>
                </div>
            </header>
            <div className="w-full p-3 flex flex-col gap-2">
                <input 
                    type="text" 
                    value={data.title}
                    onChange={(e) => setContent(moduleID, data.lessonID, "title", e.target.value)}
                    className="w-full p-2 text-p-lg" 
                    placeholder="Untitled" />
                <textarea  
                    value={data.content}
                    onChange={(e) => setContent(moduleID, data.lessonID, "content", e.target.value)}
                    className="w-full p-2 h-52 resize-none" 
                    placeholder="Description text (optional)" />
            </div>
        </section>
  )
}

export default Separator