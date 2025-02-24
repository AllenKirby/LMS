import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { Menu, Questionnaire } from './CourseContentComponents'

import { FiEdit2, FiPlus, FiUpload } from "react-icons/fi";
import { RxText } from "react-icons/rx";

interface ChoicesState {
  choiceID: string;
  choice: string;
}

type ModuleContent = 
  | { type: "separator"; lessonID: string; title: string; content: string; }
  | { type: "uploadedFile"; fileID: string; fileName: string; fileUrl: string; }
  | { type: "questionnaire"; questionnaireID: string; question: string; choices: ChoicesState[]; answer: string; };

interface ModuleState {
  moduleID: string;
  title: string;
  content: ModuleContent[]
}

interface MenuDataState {
  menuID: string; 
  title: string;
  modules: ModuleState[];
}

const CourseContent = () => {

  const [menuData, setMenuData] = useState<MenuDataState[]>([
    { menuID: "1", title: "Introduction", modules: [] },
    { menuID: "2", title: "Training Proper", modules: [] },
    { menuID: "3", title: "Post Test", modules: [] }
  ])

  const [selectMenu, setSelectedMenu] = useState<string>('')
  const [selectModule, setSelectedModule] = useState<string>('')

  useEffect(() => {
    console.log(menuData)
  }, [menuData])

  const selectMenuID = (menuID: string) => {
    setSelectedMenu(menuID)
  }

  const selectModuleID = (moduleID: string) => {
    setSelectedModule(moduleID)
  }

  const addQuestion = (menuID: string, moduleID: string, newContent: ModuleContent) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { ...module, content: [...module.content, newContent] }
                  : module
              ),
            }
          : menu
      )
    );
  };

  // const deleteQuestion = (id: string) => {
  //   setAddQuestionnaire(prev => prev.filter(q => q.id !== id));
  // };

  // const AddChoice = (questionID: string) => {
  //   setAddQuestionnaire(prev =>
  //     prev.map(q =>
  //       q.id === questionID
  //         ? {
  //             ...q,
  //             choices: [...q.choices, { id: uuidv4(), choice: "" }], 
  //           }
  //         : q
  //     )
  //   );
  // };

  const AddModule = (menuID: string) => {
    setMenuData(prev => 
      prev.map(m =>
        m.menuID === menuID
          ? {
              ...m,
              modules: [...m.modules, { moduleID: uuidv4(), title: "", content: [] }], 
            }
          : m
      )
    )
  }

  // const DeleteChoice = (questionID: string, choiceID: string) => {
  //   setAddQuestionnaire(prev =>
  //     prev.map(q =>
  //       q.id === questionID
  //         ? {
  //             ...q,
  //             choices: q.choices.filter(choice => choice.id !== choiceID), // Remove choice
  //           }
  //         : q
  //     )
  //   );
  // };

  const DeleteModule = (menuID: string, moduleID: string) => {
    setMenuData(prev =>
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

  // const setDataQuestionnaire = (questionID: string, type:string , value: string, choiceID: string = '') => {
  //   if(type === 'question') {
  //     setAddQuestionnaire(prev =>
  //       prev.map(question => 
  //         question.id === questionID ? { ...question, question: value } : question
  //       )
  //     );
  //   } 
  //   if(type === 'choices') {
  //     if(choiceID && value) {
  //       setAddQuestionnaire(prev =>
  //         prev.map(q =>
  //             q.id === questionID ? { ...q,
  //               choices: q.choices.map(choice =>
  //                 choice.id === choiceID ? { ...choice, choice: value } : choice
  //               ),
  //             }
  //           : q
  //         )
  //       );
  //     } else {
  //       const newChoices = [
  //         {id: uuidv4(), choice: 'True'},
  //         {id: uuidv4(), choice: 'False'}
  //       ]
  //       setAddQuestionnaire((prev) =>
  //         prev.map((q) =>
  //           q.id === questionID
  //             ? {
  //                 ...q,
  //                 choices: newChoices, 
  //               }
  //             : q
  //         )
  //       );
  //     }
  //   }
  //   if (type === 'choicesType') {
  //     setAddQuestionnaire(prev =>
  //       prev.map(question => 
  //         question.id === questionID ? { ...question, choicesType: value as "Multiple Choice" | "Check Box" | "True or False" | "Text Answer" } : question
  //       )
  //     );
  //   }
  // };

  const selectedMenu = menuData.find(m => m.menuID === selectMenu);

  return (
    <section className="w-full h-full flex flex-row gap-5">
      <div className="w-1/4 h-full">
        <div className="w-full pb-3">
          <h1 className="font-medium text-h-h6">Course Menu</h1>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
          <Menu 
            key={menuData[0].menuID}
            menuID={menuData[0].menuID}
            addModule={AddModule}
            menuData={menuData[0]}
            setSelectedMenu={selectMenuID}
            deleteModule={DeleteModule}
            />
          <Menu 
            key={menuData[1].menuID}
            menuID={menuData[1].menuID}
            addModule={AddModule}
            menuData={menuData[1]}
            setSelectedMenu={selectMenuID}
            deleteModule={DeleteModule}
          />
          <Menu 
            key={menuData[2].menuID}
            menuID={menuData[2].menuID}
            addModule={AddModule}
            menuData={menuData[2]}
            setSelectedMenu={selectMenuID}
            deleteModule={DeleteModule}
          />
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
              {/* {addQuestionnaire.map((q) => (
                <Questionnaire 
                  key={q.id} 
                  questionId={q.id} 
                  deleteQuestion={deleteQuestion} 
                  setData={setDataQuestionnaire} 
                  choices={q.choices}
                  addChoices={AddChoice}
                  deleteChoices={DeleteChoice}/>
              ))} */}
              {/* <UploadContent/> */}
              {/* <Separator/>  */}
              <div className='w-full flex items-center justify-center gap-3'>
                <button className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
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