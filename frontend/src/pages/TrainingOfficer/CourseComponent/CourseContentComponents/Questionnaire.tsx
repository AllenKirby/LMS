//icons
import { BsQuestionSquareFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import { useEffect} from "react";

import { v4 as uuidv4 } from 'uuid'

import { QuestionnaireState, ChoicesState,  } from '../../../../types/CourseCreationTypes'

type QuestionnaireDataState = {
    data: QuestionnaireState
    moduleID: string
    setQuestion: (id: string, questionnaireID: string, field: string, dataString: string) => void;
    addChoice: (id: string, questionnaireID: string, dataString: ChoicesState) => void;
    setChoice: (id: string, questionnaireID: string, choiceID: string, dataString: string) => void;
    deleteQuestionnaire: (id: string, contentID: string) => void;
    deleteChoice: (id: string, questionnaireID: string, choiceID: string) => void;
    deleteAllChoices: (id: string, questionnaireID: string) => void;
    setKeyAnswer: (id: string, questionnaireID: string, dataString: string) => void;
    keyAnswers?: {[key: string]: string}[]
}

const Questionnaire: React.FC<QuestionnaireDataState> = (props) => {
    const { 
        data,
        moduleID,
        setQuestion,
        addChoice,
        setChoice,
        deleteQuestionnaire,
        deleteChoice,
        deleteAllChoices,
        setKeyAnswer,
        keyAnswers
    } = props

    console.log(keyAnswers)

    useEffect(() => {
        deleteAllChoices(moduleID, data.questionnaireID)
    }, [data.choiceType])

    useEffect(() => {
        if(data.choiceType === 'True or False') {
            const hasTrue = data.choices?.some(choice => choice.choice === 'True');
            const hasFalse = data.choices?.some(choice => choice.choice === 'False');

            if (!hasTrue || !hasFalse) {
                const bool = [
                    { choiceID: uuidv4(), choice: 'True' },
                    { choiceID: uuidv4(), choice: 'False' }
                ];
                bool.forEach(item => addChoice(moduleID, data.questionnaireID, item));
            }
        }
        if(data.choiceType === 'Text Answer') {
            const hasTextAnswer = data.choices?.some(choice => choice.choice === '');
        
            if (!hasTextAnswer) {
                addChoice(moduleID, data.questionnaireID, { choiceID: uuidv4(), choice: '' });
            }
        }
    }, [data.choiceType])

    const foundItem = keyAnswers?.find(item => Object.keys(item).some(key => key === data.questionnaireID));
    const value = foundItem ? foundItem[data.questionnaireID] : "";


  return (
    <section className="w-full h-fit border border-c-grey-20 rounded-lg">
        <header className="w-full flex items-center justify-between border-b p-3 rounded-t-md">
            <select 
                value={data.choiceType}
                onChange={(e) => setQuestion(moduleID, data.questionnaireID, "choiceType", e.target.value)}
                className="px-2 py-1 outline-none rounded-md bg-c-grey-5 font-medium text-p-sm">
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="Check Box">Check Box</option>
                <option value="Text Answer">Text Answer</option>
                <option value="True or False">True or False</option>
             </select>
            <div className="flex items-center justify-center gap-2">
                <button><BiDownArrowAlt size={20} color="gray"/></button>
                <button><BiUpArrowAlt size={20} color="gray"/></button>
                <button onClick={() => deleteQuestionnaire(moduleID, data.questionnaireID)}><RiDeleteBinLine size={20} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-5 flex flex-col gap-4">
            <section className="flex flex-col gap-2 ">
                <p className="flex gap-1 items-center text-f-dark font-medium"><BsQuestionSquareFill/> Question Number</p>
                <div className="w-full flex gap-2">
                    <textarea 
                        value={data.question}
                        onChange={(e) => setQuestion(moduleID, data.questionnaireID, "question", e.target.value)}
                        className="w-full p-2 rounded-md bg-c-grey-5 resize-none outline-c-green-30" 
                        placeholder="Enter question here..."
                        rows={3} 
                    />
                    <button className="text-c-grey-50 h-fit"><CiImageOn size={24}/></button>
                </div>
            </section>
            <div className="text-p-sm flex flex-col gap-2">
                <div className="w-full h-fit text-p-sm text-c-grey-50 font-medium">
                    {data.choiceType === 'Text Answer' ? "Answer Field" : "Choices"}<span className="text-red-500">*</span>
                </div>
                {data.choiceType === 'Multiple Choice' && (
                     data.choices.map((c, index) => (
                        <div key={c.choiceID} className="w-full flex items-center justify-center gap-2">
                            <input type="radio" className="w-fit"/>
                            <input 
                                type="text" 
                                className="w-full p-2 rounded-sm bg-c-grey-5 outline-none" 
                                placeholder={`Option ${index + 1}`}
                                value={c.choice}
                                onChange={(e) => setChoice(moduleID, data.questionnaireID, c.choiceID, e.target.value)}
                                />
                            <button 
                                onClick={() => deleteChoice(moduleID, data.questionnaireID, c.choiceID)}
                                >
                                <IoMdClose size={20} className="w-fit" color="gray"/>
                            </button>
                        </div>
                    ))
                )}
                {data.choiceType === 'Check Box' && (
                    data.choices.map((c, index) => (
                        <div key={c.choiceID} className="w-full flex items-center justify-center gap-2">
                            <input type="checkbox" className="w-fit"/>
                            <input 
                                type="text" 
                                className="w-full p-2 rounded-sm bg-c-grey-5 outline-none" 
                                placeholder={`Option ${index + 1}`}
                                value={c.choice}
                                onChange={(e) => setChoice(moduleID, data.questionnaireID, c.choiceID, e.target.value)}
                                />
                            <button 
                                onClick={() => deleteChoice(moduleID, data.questionnaireID, c.choiceID)}
                                >
                                    <IoMdClose size={20} className="w-fit" color="gray"/>
                            </button>
                        </div>
                    ))
                )}
                {data.choiceType === 'Text Answer' && (
                    <textarea 
                        className="w-full p-2 rounded-md bg-c-grey-5 resize-none outline-c-green-30" 
                        placeholder="Enter Answer here..."
                        rows={5}>
                    </textarea>
                )}
                {data.choiceType === 'True or False' && (
                    <div className="w-full flex flex-col justify-center gap-2"> 
                        <div className="flex gap-1">
                            <input type="radio" />
                            <p 
                                className="w-full p-2 rounded-sm bg-c-grey-5 outline-none" 
                            >
                                True
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" />
                            <p 
                                className="w-full p-2 rounded-sm bg-c-grey-5 outline-none" 
                            >
                                False
                            </p>
                        </div>
                    </div>
                )}
                {(data.choiceType === 'Multiple Choice' || data.choiceType === 'Check Box') &&
                    <button 
                        onClick={() => addChoice(moduleID, data.questionnaireID, {choiceID: uuidv4(), choice: ''})}
                        className="w-fit flex items-center justify-center gap-1 font-medium pl-5"
                    >
                        <FiPlus size={16}/>Option
                    </button>
                }
            </div>
        </div>
        <footer className="w-full flex items-center gap-5 border-t border-c-grey-20 p-3 rounded-b-md">
            <section className="flex items-center gap-3">
                <p className="text-c-grey-50 font-medium text-p-sm">Correct Answer</p>
                <select 
                    value={value} 
                    onChange={(e) => setKeyAnswer(moduleID, data.questionnaireID, e.target.value)}
                    className="px-2 outline-none rounded-md bg-c-grey-5 h-10">
                    <option disabled value="">Correct Answer</option>
                    {data.choices.map((c) => (
                        c.choice && <option key={c.choiceID} value={c.choice}>{c.choice}</option>
                    ))}
                </select>
            </section>
            <section className="flex items-center gap-3">
                <p className="text-c-grey-50 font-medium text-p-sm">Question Point</p>
                <input type="number" value={data.questionPoint} onChange={(e) => setQuestion(moduleID, data.questionnaireID, "questionPoint", e.target.value)} className="px-2 h-10 w-20 rounded-md border"/>
            </section>
        </footer>
    </section>
  )
}

export default Questionnaire