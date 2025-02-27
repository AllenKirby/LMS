import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { Menu, Questionnaire, Separator, UploadContent } from './CourseContentComponents'

import { FiEdit2, FiPlus, FiUpload } from "react-icons/fi";
import { RxText } from "react-icons/rx";

interface ChoicesState {
  choiceID: string;
  choice: string;
}

type ModuleContent = 
  | { type: "separator"; lessonID: string; title: string; content: string; }
  | { type: "uploadedFile"; fileID: string; fileName: string; file: File | null; }
  | { 
      type: "questionnaire"; 
      questionnaireID: string; 
      question: string; 
      choiceType: 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | ''; 
      choices: ChoicesState[]; 
      answer: string; };

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
    { menuID: "1", title: "Introduction", modules: [{ moduleID: uuidv4(), title: "", content: [] }] },
    { menuID: "2", title: "Training Proper", modules: [{ moduleID: uuidv4(), title: "", content: [] }] },
    { menuID: "3", title: "Post Test", modules: [{ moduleID: uuidv4(), title: "", content: [] }] }
  ])

  const [selectMenu, setSelectedMenu] = useState<string>('')
  const [selectModule, setSelectedModule] = useState<string>('')

  useEffect(() => {
    if (menuData.length > 0) {
      const firstMenu = menuData[0];
      setSelectedMenu(firstMenu.menuID);
  
      if (firstMenu.modules.length > 0) {
        setSelectedModule(firstMenu.modules[0].moduleID);
      }
    }
  }, []);

  useEffect(() => {
    console.log(menuData)
  }, [menuData])

  const selectMenuID = (menuID: string) => {
    setSelectedMenu(menuID)
  }

  const selectModuleID = (moduleID: string) => {
    setSelectedModule(moduleID)
  }

  const addContent= (menuID: string, moduleID: string, newContent: ModuleContent) => {
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

  const selectChoiceType = (menuID: string, moduleID: string, questionnaireID: string, choiceType: 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | '') => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(c => 
                        c.type === "questionnaire" && c.questionnaireID === questionnaireID 
                          ? {
                              ...c, choiceType: choiceType
                          } 
                          : c
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const addChoice = (menuID: string, moduleID: string, questionnaireID: string, newChoice: ChoicesState) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(c => 
                        c.type === "questionnaire" && c.questionnaireID === questionnaireID 
                          ? {
                              ...c, choices: [...c.choices, newChoice]
                          } 
                          : c
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  };

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

  const deleteQuestions = (menuID: string, moduleID: string, questionnaireID: string) => {
    setMenuData(prev =>
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? {
                      ...module,
                      content: module.content.filter(
                        c => c.type !== "questionnaire" || c.questionnaireID !== questionnaireID
                      ) 
                    }
                  : module
              )
            }
          : menu
      )
    );
  };

  const deleteChoices = (menuID: string, moduleID: string, questionnaireID: string, choiceID: string) => {
    setMenuData(prev =>
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? {
                      ...module,
                      content: module.content.map(c =>
                        c.type === 'questionnaire' && c.questionnaireID === questionnaireID
                          ? {
                              ...c,
                              choices: c.choices.filter(choice => choice.choiceID !== choiceID)
                            }
                          : c 
                      )
                    }
                  : module
              )
            }
          : menu
      )
    );
  };

  const deleteSeparator = (menuID: string, moduleID: string, lessonID: string) => {
    setMenuData(prev =>
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? {
                      ...module,
                      content: module.content.filter(
                        s => s.type !== "separator" || s.lessonID !== lessonID
                      ) 
                    }
                  : module
              )
            }
          : menu
      )
    );
  };

  const deleteUploadContent = (menuID: string, moduleID: string, fileID: string) => {
    setMenuData(prev =>
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? {
                      ...module,
                      content: module.content.filter(
                        uc => uc.type !== "uploadedFile" || uc.fileID !== fileID
                      ) 
                    }
                  : module
              )
            }
          : menu
      )
    );
  };

  const setModuleTitle = (menuID: string, moduleID: string, moduleTitle: string) => {
    setMenuData(prev => 
      prev.map(m =>
        m.menuID === menuID
          ? {
              ...m,
              modules: m.modules.map(module =>
                module.moduleID === moduleID
                  ? { ...module, title: moduleTitle }
                  : module
              )
            }
          : m
      )
    )
  }

  const setCorrectAnswer = (menuID: string, moduleID: string, questionnaireID: string, correctAnswer: string) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(c => 
                        c.type === "questionnaire" && c.questionnaireID === questionnaireID 
                          ? {
                              ...c, answer: correctAnswer
                          } 
                          : c
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const setQuestions = (menuID: string, moduleID: string, questionnaireID: string, question: string) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(c => 
                        c.type === "questionnaire" && c.questionnaireID === questionnaireID 
                          ? {
                              ...c, question: question
                          } 
                          : c
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const setChoices = (menuID: string, moduleID: string, questionnaireID: string, choiceID: string, question: string) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(c => 
                        c.type === "questionnaire" && c.questionnaireID === questionnaireID 
                          ? {
                              ...c, 
                              choices: c.choices.map(choice =>
                                choice.choiceID === choiceID 
                                ? {
                                  ...choice, choice: question
                                } : choice
                              )
                          } 
                          : c
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const setTitleLesson = (menuID: string, moduleID: string, lessonID: string, title: string) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(s => 
                        s.type === "separator" && s.lessonID === lessonID 
                          ? {
                              ...s, title: title
                          } 
                          : s
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const setContent = (menuID: string, moduleID: string, lessonID: string, content: string) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(s => 
                        s.type === "separator" && s.lessonID === lessonID 
                          ? {
                              ...s, content: content
                          } 
                          : s
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const setFileName = (menuID: string, moduleID: string, fileID: string, fileName: string) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(uc => 
                        uc.type === "uploadedFile" && uc.fileID === fileID 
                          ? {
                              ...uc, fileName: fileName
                          } 
                          : uc
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }

  const setFile = (menuID: string, moduleID: string, fileID: string, file: File ) => {
    setMenuData(prev => 
      prev.map(menu =>
        menu.menuID === menuID
          ? {
              ...menu,
              modules: menu.modules.map(module =>
                module.moduleID === moduleID
                  ? { 
                      ...module,
                      content: module.content.map(uc => 
                        uc.type === "uploadedFile" && uc.fileID === fileID 
                          ? {
                              ...uc, file: file
                          } 
                          : uc
                      )
                  }
                  : module
              ),
            }
          : menu
      )
    );
  }
  
  console.log(selectMenu, selectModule)

  //map the questionnaire, separator and upload file
  const selectedMenuMap = menuData.find(menu => menu.menuID === selectMenu);
  const selectedModule = selectedMenuMap?.modules.find(module => module.moduleID === selectModule);

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
            deleteModule={DeleteModule}
            selectMenu={selectMenuID}
            selectModule={selectModuleID}
            />
          <Menu 
            key={menuData[1].menuID}
            menuID={menuData[1].menuID}
            addModule={AddModule}
            menuData={menuData[1]}
            deleteModule={DeleteModule}
            selectMenu={selectMenuID}
            selectModule={selectModuleID}
          />
          <Menu 
            key={menuData[2].menuID}
            menuID={menuData[2].menuID}
            addModule={AddModule}
            menuData={menuData[2]}
            deleteModule={DeleteModule}
            selectMenu={selectMenuID}
            selectModule={selectModuleID}
          />
        </div>
      </div>
      <div className="w-3/4 h-fit">
        <div className='w-full h-full border rounded-md overflow-hidden'>
          <div className='w-full flex items-center justify-between p-3 border-b'>
            <input type="text" value={selectedModule?.title} onChange={(e) => setModuleTitle(selectMenu, selectModule, e.target.value)} className="bg-transparent p-1 text-h-h6 font-medium outline-none" placeholder="Module Title"/>
            <button>
              <FiEdit2 size={20} className='text-c-grey-50'/>
            </button>
          </div>
          <div className='w-full p-5 h-full overflow-y-auto flex flex-col gap-5'>
            {selectedModule?.content.map((item, index) => {
              switch(item.type) {
                case 'questionnaire': 
                  return (
                    <Questionnaire 
                      key={index}
                      addChoice={addChoice}
                      data={item}
                      menuID={selectMenu}
                      moduleID={selectModule}
                      choiceType={selectChoiceType}
                      deleteQuestion={deleteQuestions}
                      deleteChoice={deleteChoices}
                      selectAnswer={setCorrectAnswer}
                      setQuestion={setQuestions}
                      setChoice={setChoices}/>
                  )
                case 'uploadedFile': 
                  return (
                    <UploadContent 
                      key={index}
                      menuID={selectMenu}
                      moduleID={selectModule}
                      data={item}
                      setTitle={setFileName}
                      deleteUploadContent={deleteUploadContent}
                      setFile={setFile}/>
                  )
                case 'separator': 
                  return (
                    <Separator 
                      key={index}
                      setTitle={setTitleLesson}
                      menuID={selectMenu}
                      moduleID={selectModule}
                      data={item}
                      setContent={setContent}
                      deleteSeparator={deleteSeparator}/>
                  )
              }
            })}
            <div className='w-full flex items-center justify-center gap-3'>
              <button onClick={() => addContent(selectMenu, selectModule, {type: "questionnaire", questionnaireID: uuidv4(), question: '', choiceType: 'Multiple Choice', choices: [], answer: ''})} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
              <button onClick={() => addContent(selectMenu, selectModule, {type: "uploadedFile", fileID: uuidv4(), fileName: '', file: null})} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiUpload size={20}/></button>
              <button onClick={() => addContent(selectMenu, selectModule, {type: "separator", lessonID: uuidv4(), title: '', content: ''})} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><RxText  size={20}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseContent