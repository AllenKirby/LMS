//icons
import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import { useEffect} from "react";

import { v4 as uuidv4 } from 'uuid'

interface ChoicesState {
    choiceID: string;
    choice: string;
}
  
type ModuleContent = 
| { type: "separator"; lessonID: string; title: string; content: string; }
| { type: "uploadedFile"; fileID: string; fileName: string; fileUrl: string; }
| { type: "questionnaire"; questionnaireID: string; question: string; choiceType: string; choices: ChoicesState[]; answer: string; };
  

type QuestionnaireState = {
    addChoice: (menuID: string, moduleID: string, questionnaireID: string, newChoice: ChoicesState) => void;
    data: ModuleContent;
    menuID: string;
    moduleID: string;
    choiceType: (menuID: string, moduleID: string, questionnaireID: string, choiceType: 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | '') => void
    deleteQuestion: (menuID: string, moduleID: string, questionnaireID: string) => void;
    deleteChoice: (menuID: string, moduleID: string, questionnaireID: string, choiceID: string) => void;
    selectAnswer: (menuID: string, moduleID: string, questionnaireID: string, correctAnswer: string) => void
}

const Questionnaire: React.FC<QuestionnaireState> = (props) => {
    const { addChoice, data, menuID, moduleID, choiceType, deleteQuestion, deleteChoice, selectAnswer } = props

    const choicesType = data.type === "questionnaire" ? data.choiceType : ""
    const questionnaireID = data.type === "questionnaire" ? data.questionnaireID : "";

    console.log(choicesType)

    useEffect(() => {
        if(choicesType === 'True or False' && data.type === 'questionnaire') {
            const bool = [
                {choiceID: uuidv4(), choiceType: choicesType, choice: 'True'},
                {choiceID: uuidv4(), choiceType: choicesType, choice: 'False'}
            ]
            bool.map((item,) => 
                addChoice(menuID, moduleID, data.questionnaireID, item)
            )
        }
        if(choicesType === 'Text Answer' && data.type === 'questionnaire') {
            addChoice(menuID, moduleID, data.questionnaireID, {choiceID: uuidv4(), choice: ''})
        }
    }, [])

  return (
    <section className="w-full h-fit border rounded-md">
        <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
            <div className="flex items-center justify-center gap-3">
                <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Question 1</p>
                <select value={choicesType} onChange={(e) => choiceType(menuID, moduleID, questionnaireID, e.target.value as 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | '')} className="p-2 outline-none rounded-md">
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="Check Box">Check Box</option>
                    <option value="Text Answer">Text Answer</option>
                    <option value="True or False">True or False</option>
                </select>
            </div>
            <div className="flex items-center justify-center gap-2">
                <button><BiDownArrowAlt size={24} color="gray"/></button>
                <button><BiUpArrowAlt size={24} color="gray"/></button>
                <button onClick={() => deleteQuestion(menuID, moduleID, questionnaireID)}><RiDeleteBinLine size={24} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-3 flex flex-col gap-3">
            <div className="w-full flex items-center justify-center">
                <input type="text" className="w-full p-2" placeholder="Enter question here..." />
                <button className="px-2"><CiImageOn size={20}/></button>
            </div>
            <div className="text-p-sm flex flex-col gap-3">
                {choicesType === 'Multiple Choice' && data.type === 'questionnaire' && (
                     data.choices.map((c, index) => (
                        <div key={c.choiceID} className="w-full flex items-center justify-center gap-2">
                            <input type="radio" className="w-fit"/>
                            <input 
                                type="text" 
                                className="w-full p-1 outline-none focus:border-b" 
                                placeholder={`Option ${index + 1}`}
                                />
                            <button><CiImageOn size={20} className="w-fit" color="gray"/></button>
                            <button onClick={() => deleteChoice(menuID, moduleID, questionnaireID, c.choiceID)}><IoMdClose size={20} className="w-fit" color="gray"/></button>
                        </div>
                    ))
                )}
                {choicesType === 'Check Box' && data.type === 'questionnaire' && (
                    data.choices.map((c, index) => (
                        <div key={c.choiceID} className="w-full flex items-center justify-center gap-2">
                            <input type="checkbox" className="w-fit"/>
                            <input 
                                type="text" 
                                className="w-full p-1 outline-none focus:border-b" 
                                placeholder={`Option ${index + 1}`}/>
                            <button><CiImageOn size={20} className="w-fit" color="gray"/></button>
                            <button onClick={() => deleteChoice(menuID, moduleID, questionnaireID, c.choiceID)}><IoMdClose size={20} className="w-fit" color="gray"/></button>
                        </div>
                    ))
                )}
                {choicesType === 'Text Answer' && (
                    <textarea className="w-full p-2 resize-none" placeholder="Enter Answer here..."></textarea>
                )}
                {choicesType === 'True or False' && (
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
                {(choicesType === 'Multiple Choice' || choicesType === 'Check Box') && 
                    data.type === "questionnaire" && (
                        <button 
                            onClick={() => addChoice(menuID, moduleID, data.questionnaireID, {choiceID: uuidv4(), choice: ''})} 
                            className="w-fit flex items-center justify-center gap-2"
                        >
                            <FiPlus size={20}/>Option
                        </button>
                )}
            </div>
        </div>
        <footer className="w-full flex items-center justify-start gap-3 border-t p-3 bg-c-grey-5 rounded-b-md">
            <p>Correct Answer</p>
            <select value={data.type === "questionnaire" ? data.answer : ""} onChange={(e) => selectAnswer(menuID, moduleID, questionnaireID, e.target.value)} className="p-2 outline-none rounded-md">
                <option disabled value="">Select Correct Answer</option>
                {data.type === 'questionnaire' &&
                    data.choices.map((c) => (
                        <option key={c.choiceID} value={c.choice}>{c.choice}</option>
                    )
                )}
            </select>
        </footer>
    </section>
  )
}

export default Questionnaire