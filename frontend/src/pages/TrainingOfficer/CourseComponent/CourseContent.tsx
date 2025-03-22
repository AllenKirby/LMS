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
  setFile
} from '../../../redux/ModuleDataRedux';

import { CourseContentState, ModuleState, ChoicesState } from '../../../types/CourseCreationTypes'

const CourseContent = () => {
  //redux
  const courseContentData = useSelector((state: {courseContent: CourseContentState[]}) => state.courseContent)
  const courseID = useSelector((state: {courseID: number}) => state.courseID)
  const modules = useSelector((state: {moduleData: ModuleState[]}) => state.moduleData)
  const dispatch = useDispatch()
  
  console.log(courseContentData)

  //states
  const [selectedMenu, setSelectedMenu] = useState<number>(0)
  const [selectedModule, setSelectedModule] = useState<string>('')

  //hooks
  const { handleAddMenu, handleAddModule, handleUpdateModule, handleDeleteModule, isLoading } = useTrainingOfficerHook()

  const setMenuID = (id: number) => {
    setSelectedMenu(id)
  }

  const setModuleID = (id: string) => {
    setSelectedModule(id)
  }

  const AddModule = (id: number) => {
    dispatch(setModule({menuID: id, moduleID: uuidv4(), title: '', content: [], submitted: false, id: 0}))
  }

  const DeleteModule = (id: string) => {
    dispatch(deleteModule(id))
  }

  const SetQuestion = (id: string, questionnaireID: string, fieldString: string, dataString: string) => {
    dispatch(setQuestion({moduleID: id, questionnaireID: questionnaireID, field: fieldString as "choiceType" | "question" | "answer", value: dataString}))
  }

  const AddChoice = (id: string, questionnaireID: string, dataString: ChoicesState) => {
    dispatch(addChoice({moduleID: id, questionnaireID: questionnaireID, value: dataString}))
  }
  
  const SetChoice = (id: string, questionnaireID: string, choiceID: string, dataString: string) => {
    dispatch(setChoice({moduleID: id, questionnaireID: questionnaireID, choiceID: choiceID, value: dataString}))
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
    await handleDeleteModule(id)
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

  //map the questionnaire, separator and upload file
  const selectedModuleMap = modules.find(modules => modules.menuID === selectedMenu && modules.moduleID === selectedModule);

  useEffect(() => {
    console.log(modules)
  }, [modules])
  
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
              modules={modules}
              setMenuID={setMenuID}
              setModuleID={setModuleID}
              deleteModule={DeleteModule}
              deleteModulePermanent={DeleteModulePermanent}
              />
          ))}
        </div>
        <div className='w-full h-fit flex items-center justify-center py-3'>
          <button onClick={() => handleAddMenu(courseID)} disabled={isLoading}>Add Menu</button>
        </div>
      </div>
      <div className="w-3/4 h-full bg-white">
        {selectedModuleMap ? (
          <div className='w-full h-full border rounded-md overflow-hidden flex flex-col'>
            <div className='w-full h-fit flex items-center justify-between py-3 px-5 border-b'>
              <div className='flex flex-row gap-2'>
                <input 
                  value={selectedModuleMap?.title} 
                  onChange={(e) => dispatch(setModuleTitle({moduleID: selectedModule, title: e.target.value}))} 
                  type="text" 
                  className="bg-transparent p-1 text-h-h6 font-medium outline-none" 
                  placeholder="Module Title"/>
              </div>
              {selectedModuleMap?.submitted ? (
                  <button onClick={() => handleUpdateModule(selectedModuleMap.id, selectedModuleMap)}>
                    <FiSave size={20} className='text-f-gray'/>
                  </button>
                ) : (
                  <button onClick={() => handleAddModule(selectedMenu, selectedModuleMap)}>
                    <FiSave size={20} className='text-f-gray'/>
                  </button>
              )}
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
                        />
                    )
                  case 'uploadedFile': 
                    return (
                      <UploadContent 
                        key={index}
                        data={item}
                        deleteUploadContent={DeleteContent}
                        moduleID={selectedModule}
                        setTitle={SetFileName}
                        setFile={SetFile}
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
                <button onClick={() => dispatch(setContent({moduleID: selectedModule, newContent: {type: "questionnaire", questionnaireID: uuidv4(), question: '', choiceType: 'Multiple Choice', choices: [], answer: '', questionPoint: 0}}))} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
                <button onClick={() => dispatch(setContent({moduleID: selectedModule, newContent: {type: "uploadedFile", fileID: uuidv4(), fileName: '', file: null}}))} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiUpload size={20}/></button>
                <button onClick={() => dispatch(setContent({moduleID: selectedModule, newContent: {type: "separator", lessonID: uuidv4(), title: '', content: ''}}))} className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><RxText  size={20}/></button>
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