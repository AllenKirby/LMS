import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { Menu, Questionnaire } from './CourseContentComponents'

import { FiEdit2, FiPlus, FiUpload } from "react-icons/fi";
import { RxText } from "react-icons/rx";


const CourseContent = () => {

  const [addQuestionnaire, setAddQuestionnaire] = useState<{ 
    id: string; 
    question: string; 
    choices: { id: string; choice: string }[];
    choicesType: 'Multiple Choice' | 'Check Box' | 'True or False' | 'Text Answer' 
  }[]>([])

  const [addMenu, setAddMenu] = useState<{ 
    id: string; 
    menuTitle: string;
    }[]>([])

  const addQuestion = () => {
    setAddQuestionnaire([...addQuestionnaire, {id: uuidv4(), question: '', choices: [], choicesType: 'Multiple Choice'}]);
  };

  const addMenuComponent = () => {
    setAddMenu([...addMenu, {id: uuidv4(), menuTitle: ''}]);
  };

  const deleteQuestion = (id: string) => {
    setAddQuestionnaire(prev => prev.filter(q => q.id !== id));
  };

  const AddChoice = (questionID: string) => {
    setAddQuestionnaire(prev =>
      prev.map(q =>
        q.id === questionID
          ? {
              ...q,
              choices: [...q.choices, { id: uuidv4(), choice: "" }], 
            }
          : q
      )
    );
  };

  const DeleteChoice = (questionID: string, choiceID: string) => {
    setAddQuestionnaire(prev =>
      prev.map(q =>
        q.id === questionID
          ? {
              ...q,
              choices: q.choices.filter(choice => choice.id !== choiceID), // Remove choice
            }
          : q
      )
    );
  };

  const setData = (questionID: string, type:string , value: string, choiceID: string = '') => {
    if(type === 'question') {
      setAddQuestionnaire(prev =>
        prev.map(question => 
          question.id === questionID ? { ...question, question: value } : question
        )
      );
    } 
    if(type === 'choices') {
      if(choiceID && value) {
        setAddQuestionnaire(prev =>
          prev.map(q =>
              q.id === questionID ? { ...q,
                choices: q.choices.map(choice =>
                  choice.id === choiceID ? { ...choice, choice: value } : choice
                ),
              }
            : q
          )
        );
      } else {
        const newChoices = [
          {id: uuidv4(), choice: 'True'},
          {id: uuidv4(), choice: 'False'}
        ]
        setAddQuestionnaire((prev) =>
          prev.map((q) =>
            q.id === questionID
              ? {
                  ...q,
                  choices: newChoices, 
                }
              : q
          )
        );
      }
    }
    if (type === 'choicesType') {
      setAddQuestionnaire(prev =>
        prev.map(question => 
          question.id === questionID ? { ...question, choicesType: value as "Multiple Choice" | "Check Box" | "True or False" | "Text Answer" } : question
        )
      );
    }
  };

  return (
    <section className="w-full h-full flex flex-row gap-5">
      <div className="w-1/4 h-full">
        <div className="w-full pb-3">
          <h1 className="font-medium text-h-h6">Course Menu</h1>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
          {addMenu.map((m) => (
            <Menu key={m.id}/>
          ))}
          <button onClick={addMenuComponent} className="h-fit w-fit p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
        </div>
      </div>
      <div className="w-3/4 h-fit">
        <div className='w-full h-full border rounded-md overflow-hidden'>
          <div className='w-full flex items-center justify-between p-3 border-b'>
            <input type="text" className="bg-transparent p-1 text-h-h6 font-medium outline-none" placeholder="Module Title"/>
            <button>
              <FiEdit2 size={20} className='text-c-grey-50'/>
            </button>
          </div>
          <div className='w-full p-5 h-full overflow-y-auto flex flex-col gap-5'>
            {addQuestionnaire.map((q) => (
              <Questionnaire 
                key={q.id} 
                questionId={q.id} 
                deleteQuestion={deleteQuestion} 
                setData={setData} 
                choices={q.choices}
                addChoices={AddChoice}
                deleteChoices={DeleteChoice}/>
            ))}
            {/* <UploadContent/> */}
            {/* <Separator/>  */}
            <div className='w-full flex items-center justify-center gap-3'>
              <button onClick={addQuestion} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
              <button className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiUpload size={20}/></button>
              <button className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><RxText  size={20}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseContent