//icons
import { BsQuestionSquareFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";

import React, { useEffect, useState, useRef, useMemo} from "react";

import { v4 as uuidv4 } from 'uuid'
import JoditEditor from "jodit-react";

import { QuestionnaireState, ChoicesState,  } from '../../../../types/CourseCreationTypes'

type QuestionnaireDataState = {
    data: QuestionnaireState
    moduleID: string
    setQuestion: (id: string, questionnaireID: string, field: string, dataString: string | boolean) => void;
    addChoice: (id: string, questionnaireID: string, dataString: ChoicesState) => void;
    setChoice: (id: string, questionnaireID: string, choiceID: string, dataString: string) => void;
    deleteQuestionnaire: (id: string, contentID: string) => void;
    deleteChoice: (id: string, questionnaireID: string, choiceID: string) => void;
    setKeyAnswer: (id: string, questionnaireID: string, dataString: string, type: "" | "Multiple Choice" | "Text Answer" | "Check Box" | "True or False") => void;
    keyAnswers?: {[key: string]: string | string[]}[]
}

const Questionnaire: React.FC<QuestionnaireDataState> = React.memo((props) => {
    const { 
        data,
        moduleID,
        setQuestion,
        addChoice,
        setChoice,
        deleteQuestionnaire,
        deleteChoice,
        setKeyAnswer,
        keyAnswers
    } = props
    const [customSelectOpen, setCustomSelectOpen] = useState<boolean>(false);
    const editor = useRef(null)

    // useEffect(() => {
    //     deleteAllChoices(moduleID, data.questionnaireID)
    // }, [data.choiceType])

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
    const value = foundItem ? foundItem[data.questionnaireID] : '';

    const configTitle = useMemo(() => ({
        height: 150,
        minHeight: 120,
        maxHeight: 200,
        placeholder: 'Enter the Title here...',
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', 'font', 'eraser', 'image'
        ],
        removeButtons: [
            'source', 'brush', 'paragraph', 'fontsize', 'ul', 'ol', 
            'indent', 'outdent', 'left', 'center', 'right', 'justify',
            'lineHeight', 'superscript', 'subscript', 'cut', 'copy', 'paste',
            'copyformat', 'hr', 'table', 'link', 'symbol', 'dots', 'find',
            'selectall', 'file', 'video', 'print', 'about', 'preview',
            'spellcheck', 'className', 'fullsize', 'undo', 'redo'
        ],
        disablePlugins: [
            'mobile', 'speechRecognize', 'class-span', 'wrapNodes',
            'pasteStorage', 'clipboard', 'symbols', 'table',
            'video', 'file', 'print', 'search', 'about',
            'fullsize', 'preview', 'spellcheck'
        ],
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: false,
        iframe: false,
        allowTags: {
            bold: true,
            italic: true,
            underline: true,
            strike: true,
            font: true,
            span: false,
            div: false
        }
    }), []);


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
                <select value={data.questionnaireType} onChange={(e) => setQuestion(moduleID, data.questionnaireID, "questionnaireType", e.target.value)} className="outline-c-green-30 p-2 rounded-md border-gray-200 border">
                    <option value="exam/quiz">Exam/Quiz</option>
                    <option value="personal_info">Personal Information</option>
                </select>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={data.required} onChange={(e) => setQuestion(moduleID, data.questionnaireID, "required", e.target.checked)}/>
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-teal-600 rounded-full peer-focus:ring-2 peer-focus:ring-teal-500 transition-colors duration-300"></div>
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full"></div>
                </label>
                <button><BiDownArrowAlt size={20} color="gray"/></button>
                <button><BiUpArrowAlt size={20} color="gray"/></button>
                <button onClick={() => deleteQuestionnaire(moduleID, data.questionnaireID)}><RiDeleteBinLine size={20} color="gray"/></button>
            </div>
        </header>
        <div className="w-full p-5 flex flex-col gap-4">
            <section className="flex flex-col gap-2 ">
                <p className="flex gap-1 items-center text-f-dark font-medium"><BsQuestionSquareFill/> Question Number</p>
                <div className="w-full">
                    {/* <textarea 
                        value={data.question}
                        onChange={(e) => setQuestion(moduleID, data.questionnaireID, "question", e.target.value)}
                        className="w-full p-2 rounded-md bg-c-grey-5 resize-none outline-c-green-30" 
                        placeholder="Enter question here..."
                        rows={3} 
                    /> */}
                    <JoditEditor ref={editor} config={configTitle} value={data.question} onChange={(e) => setQuestion(moduleID, data.questionnaireID, "question", e)} />
                    {/* <button className="text-c-grey-50 h-fit"><CiImageOn size={24}/></button> */}
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
                {data.choiceType === 'Check Box' ? 
                    <div className="relative">
                        <button 
                            className="px-2 h-10 w-48 rounded-md bg-c-grey-5 flex items-center justify-between"
                            onClick={() => setCustomSelectOpen(!customSelectOpen)}
                        >
                            <p className="text-c-grey-50">{value.length > 0 ? value.join(', ') : ''}</p>
                            <FaAngleDown size={20} className="text-f-dark cursor-pointer"/>
                        </button>
                        <div
                            className={`${customSelectOpen ? "block" : "hidden"} fixed inset-0 z-30`}
                            onClick={() => setCustomSelectOpen(!customSelectOpen)}
                            />
                        <div className={`${customSelectOpen ? "block" : "hidden"} px-2 pt-1 h-fit z-40 w-48 rounded-md bg-c-grey-5 absolute mt-1 shadow-sm`}>
                            {data.choices.map((c) => (
                                c.choice && 
                                <label className="cursor-pointer w-full" key={c.choiceID}>
                                    <input 
                                        type="checkbox" 
                                        className="peer hidden" 
                                        value={c.choice}
                                        name={`choice-${c.choiceID}`}
                                        onChange={(e) => setKeyAnswer(moduleID, data.questionnaireID, e.target.value, data.choiceType )}
                                    />
                                    <div className="w-full px-2 py-1 rounded-md transition-all peer-checked:bg-blue-500 peer-checked:text-white mb-1">
                                        {c.choice}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    :
                    <select 
                        value={value} 
                        onChange={(e) => setKeyAnswer(moduleID, data.questionnaireID, e.target.value, data.choiceType )}
                        className="px-2 outline-none rounded-md bg-c-grey-5 h-10">
                        <option disabled value="">Correct Answer</option>
                        {data.choices.map((c) => (
                            c.choice && <option key={c.choiceID} value={c.choice}>{c.choice}</option>
                        ))}
                    </select>
                }
            </section>
            <section className="flex items-center gap-3">
                <p className="text-c-grey-50 font-medium text-p-sm">Question Point</p>
                <input type="number" value={data.questionPoint} onChange={(e) => setQuestion(moduleID, data.questionnaireID, "questionPoint", e.target.value)} className="px-2 h-10 w-20 rounded-md border"/>
            </section>
        </footer>
    </section>
  )
})

export default Questionnaire