import { QuestionCard, CourseContentComponent } from "../../Components/Trainee Components"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { TbAlignLeft } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTraineeHook } from "../../hooks";
import { CourseContentState, ModuleState } from '../../types/CourseCreationTypes'

const CourseTaking = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const { id } = useParams()
  const { getCourseContent, getSingleModule } = useTraineeHook()
  const [menus, setMenus] = useState<CourseContentState[]>([])
  const [selectedModule, setSelectedModule] = useState<ModuleState>({
    menuID: 0,
    id: 0,
    moduleID: '',
    title: '',
    content: [], 
    position: 0,
    section: 0,
    key_answer: []
  });

  const [answers, setAnswers] = useState<{ answers: {[key: string]: string | string[]} }>({answers:{}}); 

  const handleRadioChange = (questionID: string, choice: string) => {
    setAnswers((prev) => ({
      answers: {
        ...prev.answers,
        [questionID]: choice, 
      }
    }));
  };
  
  const handleCheckboxChange = (questionID: string, choice: string) => {
    setAnswers((prev) => {
      const selectedChoices = Array.isArray(prev.answers?.[questionID]) ? (prev.answers[questionID] as string[]) : [];
      
      return {
        answers: {
          ...prev.answers,
          [questionID]: selectedChoices.includes(choice)
            ? selectedChoices.filter((id) => id !== choice)
            : [...selectedChoices, choice], 
        }
      };
    });
  };
  

  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);

  const handleClick = () => {
    if (currentModuleIndex < menus[currentMenuIndex].modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else {
      setCurrentModuleIndex(0);
      setCurrentMenuIndex((prev) => (prev < menus.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    const getCourseDetails = async() => {
      const response = await getCourseContent(Number(id))
      setMenus(response)
    }
    getCourseDetails()
  }, [id])

  useEffect(() => {
    console.log(answers)
  }, [answers])

  useEffect(() => {
    const getModuleDetails = async() => {
      const response = await getSingleModule(menus[currentMenuIndex]?.modules[currentModuleIndex]?.id)
      console.log(response)
      setSelectedModule(response)
    }
    getModuleDetails()
  }, [menus, currentMenuIndex, currentModuleIndex])

  return (
     <section className="flex flex-row w-full h-full">
        <nav className="w-1/4 h-full flex flex-col px-10 py-5">
          <button onClick={() => window.history.back()} className="flex flex-row items-center gap-1 font-medium">
            <IoArrowBackCircleOutline/>{" "} Go back
          </button>
          {menus && menus.map((item) => (
            <section key={item.id} className="w-full rounded-md border my-2">
              <header className={`w-full p-3 flex flex-row items-center justify-between text-f-light bg-c-blue-50 
                      ${!collapse ? "rounded-t-md" : "rounded-md"}`}
              >
                <p>{item.title}</p>
                <button 
                  onClick={() => setCollapse(!collapse)}
                  className={`${!collapse ? "rotate-0" : "rotate-180"}`}
                >
                    <FaAngleDown />
                </button>
              </header>
              <div className={`w-full p-3 bg-white rounded-b-md ${!collapse ? "block" : "hidden"}`}>
                {item.modules.map((module) => (
                  <section key={module.id} className="flex flex-row items-center gap-2">
                    <TbAlignLeft/>{" "} {module.title}
                  </section>
                ))}
              </div>
            </section>
        ))}
        </nav>
        {selectedModule && (
          <div className="border-l w-3/4 h-full flex-1 overflow-y-auto">
            <div className="w-full h-20 bg-c-green-50 flex items-center p-5">
              <h6 className="text-f-light text-h-h6">{selectedModule.title}</h6>
            </div>
            <div className="flex flex-col items-end gap-5 p-10">
              {selectedModule.content && selectedModule.content.map(item => {
                switch(item.type) {
                  case 'questionnaire':
                    return (
                      <QuestionCard 
                        data={answers}
                        content={item}
                        addChoice={handleRadioChange}
                        addMultipleChoice={handleCheckboxChange}/>
                    )
                  case 'separator':
                    return (
                      <CourseContentComponent content={item}/>
                    )
                }
              })}
              <button onClick={handleClick} className="w-fit font-medium px-5 py-2 rounded-md bg-c-green-50 text-f-light">Next</button>
            </div>
          </div>
        )}
    </section>
  )
}

export default CourseTaking