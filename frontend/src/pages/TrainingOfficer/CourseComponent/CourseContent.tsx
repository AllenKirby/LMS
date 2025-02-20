import { useEffect, useState } from 'react';
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
    menuID: string; 
    title: string;
    position: number;
    modules: {moduleID: string, title: string, position: number}[];
    }[]>([])

  const [selectMenu, setSelectedMenu] = useState<string>('')

  useEffect(() => {
    console.log(addMenu)
  }, [addMenu])

  const selectMenuID = (menuID: string) => {
    setSelectedMenu(menuID)
  }

  const addQuestion = () => {
    setAddQuestionnaire([...addQuestionnaire, {id: uuidv4(), question: '', choices: [], choicesType: 'Multiple Choice'}]);
  };

  const addMenuComponent = () => {
    setAddMenu([...addMenu, {menuID: uuidv4(), title: '', position: addMenu.length + 1, modules:[]}]);
  };

  const deleteQuestion = (id: string) => {
    setAddQuestionnaire(prev => prev.filter(q => q.id !== id));
  };

  const deleteMenu= (id: string) => {
    setAddMenu(prev => prev.filter(m => m.menuID !== id));
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

  const AddModule = (menuID: string) => {
    setAddMenu(prev => 
      prev.map(m =>
        m.menuID === menuID
          ? {
              ...m,
              modules: [...m.modules, { moduleID: uuidv4(), title: "", position: m.modules.length + 1 }], 
            }
          : m
      )
    )
  }

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

  const DeleteModule = (menuID: string, moduleID: string) => {
    setAddMenu(prev =>
      prev.map(m =>
        m.menuID === menuID
          ? {
              ...m,
              modules: m.modules.filter(module => module.moduleID !== moduleID), // Remove choice
            }
          : m
      )
    );
  }

  const setDataQuestionnaire = (questionID: string, type:string , value: string, choiceID: string = '') => {
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

  const setDataMenu = (type: string, menuID: string, value: string) => {
    if(type === 'menuTitle') {
      setAddMenu(prev =>
        prev.map(menu => 
          menu.menuID === menuID ? { ...menu, title: value } : menu
        )
      );
    }
  }

  const selectedMenu = addMenu.find(m => m.menuID === selectMenu);

  return (
    <section className="w-full h-full flex flex-row gap-5">
      <div className="w-1/4 h-full">
        <div className="w-full pb-3">
          <h1 className="font-medium text-h-h6">Course Menu</h1>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
          {addMenu.map((m) => (
            <Menu 
              key={m.menuID}
              deleteMenu={deleteMenu}
              menuID={m.menuID}
              setData={setDataMenu}
              addModule={AddModule}
              modules={m.modules}
              setSelectedMenu={selectMenuID}
              deleteModule={DeleteModule}
              />
          ))}
          <button onClick={addMenuComponent} className="h-fit w-fit p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
        </div>
      </div>
      <div className="w-3/4 h-fit">
        {selectedMenu && selectedMenu.modules.length > 0 ? (
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
                  setData={setDataQuestionnaire} 
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
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <p className='font-medium text-lg'>No Module Found</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CourseContent