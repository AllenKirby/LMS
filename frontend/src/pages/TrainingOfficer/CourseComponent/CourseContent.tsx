import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { Menu, Questionnaire, Separator, UploadContent } from './CourseContentComponents'
import { useTrainingOfficerHook } from '../../../hooks'

import { FiPlus, FiUpload, FiSave } from "react-icons/fi";
import { RxText } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { 
  setModule, 
  setContent, 
  setModuleTitle,
  setQuestion,
  addChoice,
  setChoice,
  deleteModule,
  deleteContent,
  deleteChoice,
  setLesson,
  setFileName,
  deleteAllChoicesFromQuestionnaire,
  setFile,
  deleteFile,
  setKeyAnswer,
  setRequired,
  setModules
} from '../../../redux/ModuleDataRedux';
import {setMenuID, setModuleID} from '../../../redux/IDsRedux'

import { MenuDataState, ModuleState, ChoicesState, CourseActionType, IDsState } from '../../../types/CourseCreationTypes'

const CourseContent = () => {
  //redux
  const courseContentData = useSelector((state: {courseContent: MenuDataState[]}) => state.courseContent)
  const courseID = useSelector((state: {courseID: number}) => state.courseID)
  const modules = useSelector((state: {moduleData: ModuleState[]}) => state.moduleData)
  const courseAction = useSelector((state: {courseAction: CourseActionType}) => state.courseAction)
  const { menuID, moduleID } = useSelector((state: {IDs: IDsState}) => state.IDs)
  const dispatch = useDispatch()

  //states
  const [selectedModuleMap, setSelectedModuleMap] = useState<ModuleState>({
    menuID: 0,
    id: 0,
    moduleID: '',
    title: '',
    content: [],
    submitted: true,
    required: false,
    position: 0,
    section: 0,
    key_answers: []
  });
  //hooks
  const { handleAddMenu, handleAddModule, handleUpdateModule, handleDeleteModule, deleteMenu, getSpecificModule, isLoading } = useTrainingOfficerHook()

  const MenuID = (id: number) => {
    dispatch(setMenuID(id))
  }

  const ModuleID = (id: string | number) => {
    dispatch(setModuleID(id))
  }

  const AddModule = (id: number) => {
    dispatch(setModule({menuID: id, moduleID: uuidv4(), title: '', content: [], submitted: false, id: 0, required: false, position: 0}))
  }

  const DeleteModule = (id: string) => {
    dispatch(deleteModule(id))
  }

  const SetQuestion = (id: string, questionnaireID: string, fieldString: string, dataString: string) => {
    dispatch(setQuestion({moduleID: id, questionnaireID: questionnaireID, field: fieldString as "choiceType" | "question", value: dataString}))
  }

  const AddChoice = (id: string, questionnaireID: string, dataString: ChoicesState) => {
    dispatch(addChoice({moduleID: id, questionnaireID: questionnaireID, value: dataString}))
  }
  
  const SetChoice = (id: string, questionnaireID: string, choiceID: string, dataString: string) => {
    dispatch(setChoice({moduleID: id, questionnaireID: questionnaireID, choiceID: choiceID, value: dataString}))
  }

  const SetKeyAnswers = (id: string, questionnaireID: string, dataString: string, type: "" | "Multiple Choice" | "Text Answer" | "Check Box" | "True or False") => {
    dispatch(setKeyAnswer({moduleID: id, questionnaireID: questionnaireID, value: dataString, type: type}))
  }

  const DeleteContent = (id: string, contentID: string) => {
    dispatch(deleteContent({moduleID: id, contentID: contentID}))
  }

  const DeleteChoice = (id: string, questionnaireID: string, choiceID: string) => {
    dispatch(deleteChoice({moduleID: id, questionnaireID: questionnaireID, choiceID: choiceID}))
  }

  const DeleteAllChoice = (id: string, questionnaireID: string) => {
    dispatch(deleteAllChoicesFromQuestionnaire({moduleID: id, questionnaireID: questionnaireID}))
  }

  const DeleteModulePermanent = async(id: number) => {
    await handleDeleteModule(id, courseID)
  }

  const SetContent = (id: string, lessonID: string, field: string, value: string) => {
    dispatch(setLesson({moduleID: id, lessonID: lessonID, field: field as "content" | "title" , value: value}))
  }

  const SetFileName = (id: string, fileID: string, value: string) => {
    dispatch(setFileName({moduleID: id, fileID: fileID, value: value}))
  }

  const SetFile = (id: string, fileID: string, value: File) => {
    dispatch(setFile({moduleID: id, fileID: fileID, value: value}))
  }

  const DeleteFile = (id: string, fileID: string) => {
    dispatch(deleteFile({moduleID: id, fileID: fileID}))
  }

  const removeMenu = async(id: number) => {
    await deleteMenu(id)
  }

  const getModule = async(id: number) => {
    return await getSpecificModule(id)
  }

  useEffect(() => {
    console.log(selectedModuleMap)
  }, [selectedModuleMap])

  useEffect(() => {
    const fetchModule = async () => {
      if (courseAction === 'create') {
        const module = modules.find(
          module => module.menuID === Number(menuID) && module.moduleID === moduleID
        );
        if (module) {
          setSelectedModuleMap(module);
        }
        return;
      }

      try {
        if(modules.length === 0) {
          const IDs = courseContentData.flatMap(menu => menu.modules.map(module => module.id));
          const fetchedModules = [];

          for (const id of IDs) {
            const fetchedModule = await getModule(Number(id));
            fetchedModules.push(fetchedModule);
          }
          console.log(fetchedModules)
          dispatch(setModules(fetchedModules));
        }
        
        const module = modules.find(
          module => module.menuID === Number(menuID) && module.moduleID === moduleID
        );
        
        if (module) {
          setSelectedModuleMap(module);
        }
      } catch (error) {
        console.error('Failed to fetch modules:', error);
      }
    };
  
    fetchModule();
  }, [menuID, moduleID, courseContentData, modules]);

  const deleteDocContent = async(id: number) => {
    setSelectedModuleMap((prevModule) => ({
      ...prevModule,
      content: prevModule.content.filter((item) => item.values.document_id !== id)
    }))
  }
  
  return (
    <section className="w-full h-full flex flex-row">
      <div className="w-1/4 h-full p-8">
        <div className="w-full pb-3">
          <h1 className="font-medium text-h-h6">Course Menu</h1>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
          {courseContentData.map((item, index) => (
            <Menu 
              key={index}
              menuData={item}
              addModule={AddModule}
              setMenuID={MenuID}
              setModuleID={ModuleID}
              modules={modules}
              deleteMenu={removeMenu}
              deleteModule={DeleteModule}
              deleteModulePermanent={DeleteModulePermanent}
              courseAction={courseAction}
              />
          ))}
        </div>
        <div className='w-full h-fit flex items-center justify-center py-3'>
          <button onClick={() => handleAddMenu(courseID)} disabled={isLoading}>Add Menu</button>
        </div>
      </div>
      <div className="w-3/4 h-full bg-white">
        {menuID && moduleID ? (
          <div className='w-full h-full border rounded-md overflow-hidden flex flex-col'>
            <div className='w-full h-fit flex items-center justify-between py-3 px-5 border-b'>
              <div className='flex flex-row gap-2 w-full'>
                <input 
                  value={selectedModuleMap?.title} 
                  onChange={(e) => dispatch(setModuleTitle({moduleID: String(moduleID), title: e.target.value}))} 
                  type="text" 
                  className="bg-transparent p-1 text-h-h6 font-medium outline-none w-full" 
                  placeholder="Module Title"/>
              </div>
              <div className='flex flex-row gap-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={selectedModuleMap?.required} className="sr-only peer" onChange={(e) => dispatch(setRequired({moduleID: selectedModuleMap.moduleID, value: e.target.checked}))}/>
                  <div className="w-11 h-6 bg-gray-300 peer-checked:bg-teal-600 rounded-full peer-focus:ring-2 peer-focus:ring-teal-500 transition-colors duration-300"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full"></div>
                </label>
                {selectedModuleMap?.submitted ? (
                    <button onClick={() => handleUpdateModule(selectedModuleMap.id, selectedModuleMap)}>
                      <FiSave size={20} className='text-f-gray'/>
                    </button>
                  ) : (
                    <button onClick={() => menuID && handleAddModule(menuID, selectedModuleMap)}>
                      <FiSave size={20} className='text-f-gray'/>
                    </button>
                )}
              </div>
            </div>
            <div className='w-full p-5 h-full overflow-y-auto flex flex-col gap-5'>
              {selectedModuleMap?.content.map((item, index) => {
                switch(item.type) {
                  case 'questionnaire': 
                    return (
                      <Questionnaire 
                        key={index}
                        data={item}
                        moduleID={selectedModuleMap.moduleID}
                        setQuestion={SetQuestion}
                        addChoice={AddChoice}
                        setChoice={SetChoice}
                        deleteQuestionnaire={DeleteContent}
                        deleteChoice={DeleteChoice}
                        deleteAllChoices={DeleteAllChoice}
                        setKeyAnswer={SetKeyAnswers}
                        keyAnswers={selectedModuleMap.key_answers}
                      />
                    )
                  case 'uploadedFile': 
                    return (
                      <UploadContent 
                        key={index}
                        data={item}
                        deleteUploadContent={DeleteContent}
                        moduleID={String(moduleID)}
                        setTitle={SetFileName}
                        setFile={SetFile}
                        deleteFile={DeleteFile}
                        courseAction={courseAction}
                        deleteFileContent={deleteDocContent}
                        />
                    )
                  case 'document': 
                    return (
                      <UploadContent 
                        key={index}
                        data={item}
                        deleteUploadContent={DeleteContent}
                        moduleID={String(moduleID)}
                        setTitle={SetFileName}
                        setFile={SetFile}
                        deleteFile={DeleteFile}
                        courseAction={courseAction}
                        deleteFileContent={deleteDocContent}
                        />
                    )
                  case 'separator': 
                    return (
                      <Separator 
                        key={index}
                        moduleID={selectedModuleMap.moduleID}
                        data={item}
                        deleteSeparator={DeleteContent}
                        setContent={SetContent}
                        />
                    )
                }
              })}
              <div className='w-full flex items-center justify-center gap-3'>
                <button onClick={() => dispatch(setContent({moduleID: String(moduleID), newContent: {type: "questionnaire", questionnaireID: uuidv4(), question: '', choices: [], choiceType: 'Multiple Choice', questionPoint: 0}}))} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
                <button onClick={() => dispatch(setContent({moduleID: String(moduleID), newContent: {type: "uploadedFile", fileID: uuidv4(), fileName: '', file: null}}))} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiUpload size={20}/></button>
                <button onClick={() => dispatch(setContent({moduleID: String(moduleID), newContent: {type: "separator", lessonID: uuidv4(), title: '', content: ''}}))} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><RxText  size={20}/></button>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <h1 className='text-h-h6 font-medium'>No Module Selected</h1>
          </div>
        )}
      </div>
    </section>
  )
}

export default CourseContent