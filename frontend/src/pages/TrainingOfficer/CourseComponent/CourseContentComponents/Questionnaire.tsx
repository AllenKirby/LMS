import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";


const Questionnaire = () => {
    const [answerType, setAnswerType] = useState<string>('Multiple Choice')
  return (
    <section className="w-full h-fit border rounded-md">
        <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
            <div className="flex items-center justify-center gap-3">
                <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Question 1</p>
                <select value={answerType} onChange={(e) => setAnswerType(e.target.value)} className="p-2 outline-none rounded-md">
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="Check Box">Check Box</option>
                    <option value="Text Answer">Text Answer</option>
                    <option value="True or False">True or False</option>
                </select>
            </div>
            <div className="flex items-center justify-center gap-2">
                <button><BiDownArrowAlt size={24} color="gray"/></button>
                <button><BiUpArrowAlt size={24} color="gray"/></button>
                <button><RiDeleteBinLine size={24} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-3 flex flex-col gap-3">
            <div className="w-full flex items-center justify-center">
                <input type="text" className="w-full p-2" placeholder="Enter question here..." />
                <button className="px-2"><CiImageOn size={20}/></button>
            </div>
            <div className="text-p-sm flex flex-col gap-3">
                {answerType === 'Multiple Choice' && (
                    <div className="w-full flex items-center justify-center gap-2">
                        <input type="radio" className="w-fit"/>
                        <input type="text" className="w-full p-1 outline-none focus:border-b" placeholder="Option 1"/>
                        <button><CiImageOn size={20} className="w-fit" color="gray"/></button>
                        <button><IoMdClose size={20} className="w-fit" color="gray"/></button>
                    </div>
                )}
                {answerType === 'Check Box' && (
                    <div className="w-full flex items-center justify-center gap-2">
                        <input type="checkbox" className="w-fit"/>
                        <input type="text" className="w-full p-1 outline-none focus:border-b" placeholder="Option 1"/>
                        <button><CiImageOn size={20} className="w-fit" color="gray"/></button>
                        <button><IoMdClose size={20} className="w-fit" color="gray"/></button>
                    </div>
                )}
                {answerType === 'Text Answer' && (
                    <textarea className="w-full p-2 resize-none" placeholder="Enter Answer here..."></textarea>
                )}
                {answerType === 'True or False' && (
                    <div className="w-full flex items-center justify-start gap-10"> 
                        <div className="flex gap-1">
                            <input type="radio" />
                            <label>True</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" />
                            <label>False</label>
                        </div>
                    </div>
                )}
                {(answerType === 'Multiple Choice' || answerType === 'Check Box') && (<button className="w-fit flex items-center justify-center gap-2"><FiPlus size={20}/>Option</button>)}
            </div>
        </div>
        <footer className="w-full flex items-center justify-start gap-3 border-t p-3 bg-c-grey-5 rounded-b-md">
            <p>Correct Answer</p>
            <select value={'Option 1'} className="p-2 outline-none rounded-md">
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
            </select>
        </footer>
    </section>
  )
}

export default Questionnaire