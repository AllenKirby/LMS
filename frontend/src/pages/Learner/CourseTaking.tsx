import { QuestionCard, CourseContentComponent, SurveyForm } from "../../Components/Trainee Components"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { TbAlignLeft } from "react-icons/tb";
import { CiLock } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTraineeHook } from "../../hooks";
import { ModuleState, MenuDataState, ModulePreview } from '../../types/CourseCreationTypes'
import { UserState } from '../../types/UserTypes'
import { useSelector } from "react-redux";

const CourseTaking = () => {
  const { id } = useParams()
  //states
  const [collapse, setCollapse] = useState<boolean>(false);
  const [menus, setMenus] = useState<MenuDataState[]>([])
  const [score, setScore] = useState<{totalScore: number, userScore: number, percentage: string}>({totalScore: 0, userScore: 0, percentage: ''})
  const [answers, setAnswers] = useState<{ answers: {[key: string]: string | string[]} }>({answers:{}}); 
  const [result, setResult] = useState<{ [key: string]: string }>({}); 
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  const [showSurveyForm, setShowSurveyForm] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [selectedModule, setSelectedModule] = useState<ModuleState>({
    menuID: 0,
    id: 0,
    moduleID: '',
    title: '',
    content: [],
    participant_module_progress: '',
    position: 0,
    section: 0,
    key_answers: [],
    submitted_answers: {},
    required: false
  });
  //redux
  const user = useSelector((state: {user: UserState}) => state.user)
  //hooks
  const { getCourseContent, getSingleModule } = useTraineeHook()
  const { submitAnswers, updateModuleStatus } = useTraineeHook()
  //local storage
  //const activeModule = JSON.parse(localStorage.getItem("IDs") || '{}');

  useEffect(() => {
    if (selectedModule && selectedModule.submitted_answers) {
      setAnswers({ answers: selectedModule.submitted_answers });
      setResult(compareAnswers(selectedModule.submitted_answers));
    }
  }, [selectedModule]);  

  useEffect(() => {
    if(result) {
      const questions = selectedModule.content.filter(item => item.type === 'questionnaire').length
      const correctCount = Object.values(result).filter(value => value === "Correct").length;
      //get percentage
      const percentage = correctCount / questions * 100
      const finalPercentage = percentage.toFixed(2)
      //get total score
      const scores = selectedModule.content.map(item => item.type === 'questionnaire' && Number(item.questionPoint))
      const correctKeys = Object.entries(result).filter(([, value]) => value === "Correct").map(([key]) => key);
      const matchingPoints = selectedModule.content.filter(q => q.type === 'questionnaire' && correctKeys.includes(q.questionnaireID)).map(q => q.type === 'questionnaire' && Number(q.questionPoint));
      const sumTotalScores = scores.filter(num => typeof num === "number").reduce((acc, num) => acc + num, 0);
      const sumUserScores = matchingPoints.filter(num => typeof num === "number").reduce((acc, num) => acc + num, 0);
              
      setScore({totalScore: sumTotalScores, userScore: sumUserScores, percentage: finalPercentage.toString()})
    }
  }, [result])

  const handleSubmit = async () => {
    await submitAnswers(selectedModule.id, user.user.id, answers);
    setResult(compareAnswers());
  };

  const compareAnswers = (answersData = answers.answers) => {
    const keyAnswers = selectedModule?.key_answers?.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {}
    ) ?? {};
  
    const userAnswers = answersData ?? {};
    const comparisonResult: { [key: string]: string } = {};
  
    Object.keys(keyAnswers).forEach((id) => {
      const correct = keyAnswers[id];
      const user = userAnswers[id];
  
      if (user === undefined) {
        comparisonResult[id] = "No answer provided";
      } else if (Array.isArray(correct) && Array.isArray(user)) {
        // Check if every correct answer is included in user's answers
        const allIncluded = correct.every((item) => user.includes(item));
        const sameLength = correct.length === user.length;
  
        comparisonResult[id] =
          allIncluded && sameLength ? "Correct" : "Incorrect";
      } else if (
        typeof correct === "string" &&
        typeof user === "string"
      ) {
        comparisonResult[id] = correct === user ? "Correct" : "Incorrect";
      } else {
        comparisonResult[id] = "Incorrect";
      }
    });
  
    return comparisonResult;
  };

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

  const handleClickNext = async () => {
    const data = {
      participant_module_progress: "completed",
      module: Number(selectedModule.id),
      participant: Number(user.user.id)
    };
    await updateModuleStatus(data);
  
    const isLastModule = currentModuleIndex >= menus[currentMenuIndex]?.modules.length - 1;
    const isLastMenu = currentMenuIndex >= menus.length - 1;
  
    if (!isLastModule) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else if (!isLastMenu) {
      setCurrentModuleIndex(0);
      setCurrentMenuIndex(currentMenuIndex + 1);
    } else {
      console.log("End of course reached.");
    }
  };
  

  const handleClickPrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1); // Go to previous module in current menu
    } else {
      if (currentMenuIndex > 0) {
        const previousMenuIndex = currentMenuIndex - 1;
        const lastModuleIndex = menus[previousMenuIndex].modules.length - 1;
  
        setCurrentMenuIndex(previousMenuIndex); // Go to previous menu
        setCurrentModuleIndex(lastModuleIndex); // Go to last module in previous menu
      } else {
        console.log("Already at the first module."); // Edge case: no previous module
      }
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
    const getModuleDetails = async () => {
      const moduleID = menus[currentMenuIndex]?.modules[currentModuleIndex]?.id;
      if (!moduleID) return;
  
      const response = await getSingleModule(user.user.id, moduleID);
      
      if (firstLoad) {
        if (response.participant_module_progress === 'completed') {
          const isLastModule = currentModuleIndex >= menus[currentMenuIndex].modules.length - 1;
          const isLastMenu = currentMenuIndex >= menus.length - 1;
  
          if (!isLastModule) {
            setCurrentModuleIndex(prev => prev + 1);
          } else if (!isLastMenu) {
            setCurrentMenuIndex(prev => prev + 1);
            setCurrentModuleIndex(0);
          } else {
            setSelectedModule(response); // All modules completed
            setFirstLoad(false);
          }
        } else {
          setSelectedModule(response);
          setFirstLoad(false);
        }
      } else {
        setSelectedModule(response);
      }
    };
  
    if (user.user.id && menus.length > 0) {
      getModuleDetails();
    }
  }, [currentMenuIndex, currentModuleIndex, menus]);
  

  console.log(selectedModule)

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
                {item.modules.map((module: ModulePreview, index) => (
                  <div onClick={() => {
                      if(!module.required)  {
                        setCurrentModuleIndex(index) 
                        setShowSurveyForm(false)
                      } else {
                        return null
                      }
                    }} key={module.id} className="flex flex-row items-center gap-2 cursor-pointer">
                    <TbAlignLeft/>{" "} {module.title}{" "}{module.required ? <CiLock color="red"/> : ""}
                  </div>
                ))}
              </div>
            </section>
          ))}
          <button onClick={() => setShowSurveyForm(true)} className="px-4 py-3 flex items-center justify-between rounded-md bg-c-grey-20 font-medium">Survey Form <CiLock size={24}/></button>
        </nav>
        {selectedModule && (
          <div className="border-l w-3/4 h-full flex-1 overflow-y-auto">
            <div className="w-full h-20 bg-c-green-50 flex items-center p-5">
              <h6 className="text-f-light text-h-h6">{!showSurveyForm ? selectedModule.title : 'Survey Form'}</h6>
            </div>
            <div className="flex flex-col items-end gap-5 p-10">
              {showSurveyForm ? (
                <SurveyForm/>
              ) : (
                <>
                  {selectedModule.content && selectedModule.content.map(item => {
                    switch(item.type) {
                      case 'questionnaire':
                        return (
                          <QuestionCard 
                            data={answers}
                            content={item}
                            addChoice={handleRadioChange}
                            addMultipleChoice={handleCheckboxChange}
                            correctAnswer={result}/>
                        )
                      case 'separator':
                        return (
                          <CourseContentComponent content={item}/>
                        )
                      case 'document':
                        return (
                          <CourseContentComponent content={item}/>
                        )
                    }
                  })}
                  {(selectedModule.submitted_answers && Object.keys(selectedModule.submitted_answers).length > 0 || result && Object.entries(result).some(([, value]) => value === "Correct")) && (
                    <div className="w-full flex flex-col items-center justify-center">
                      <div 
                        className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-f-light mb-2 border-4 border-double
                        ${parseFloat(score.percentage) < 30 ? "bg-red-500 border-red-200"
                          : parseFloat(score.percentage) >= 30 && parseFloat(score.percentage) <= 70
                        ? "bg-amber-500 border-amber-200" : "bg-c-blue-50 border-c-blue-10"}`}
                      >
                        <p className="font-medium text-center">You Score</p>
                        <p className="text-h-h5 font-semibold text-center">{score.userScore}/{score.totalScore}</p>
                      </div>
                      {parseFloat(score.percentage) < 30
                        ? <p className="text-p-rg font-medium text-red-500">Better luck next time</p>
                        : parseFloat(score.percentage) >= 30 && parseFloat(score.percentage) <= 70
                        ? <p className="text-p-rg font-medium text-amber-500">You're doing okay</p>
                        : <p className="text-p-rg font-medium text-c-blue-50">Great job!</p>
                      }
                      <p className="text-p-sm font-medium text-c-grey-50">Your Performance: {score.percentage}%</p>
                    </div>
                  )}
                  {(selectedModule.content.some(item => item.type === "questionnaire") && Object.values(result).every(value => value !== "Correct" && value !== "Incorrect"))&& (
                    <div className="w-full flex items-center justify-center">
                      <button onClick={handleSubmit} className="w-fit h-fit px-8 py-2 rounded-full text-f-light text-p-lg bg-c-blue-50 hover:bg-c-blue-40 active:text-c-blue-70">
                        Submit Quiz
                      </button>
                    </div>
                  )}
                  <div className="w-full flex items-center justify-between">
                    <button onClick={handleClickPrevious} disabled={currentModuleIndex === 0 && currentMenuIndex === 0} className={`${currentModuleIndex === 0 && currentMenuIndex === 0 ? 'bg-gray-100 text-gray-500' : 'bg-c-green-50'} w-fit font-medium px-5 py-2 rounded-md text-f-light`}>Previous</button>
                    {(selectedModule.content.some(item => item.type !== "questionnaire") || score.userScore !== 0 && score.totalScore !== 0 && score.percentage) && (
                      <button onClick={handleClickNext} disabled={currentModuleIndex === menus?.[currentMenuIndex]?.modules?.length - 1 && currentMenuIndex === menus?.length - 1} className={`${currentModuleIndex === menus?.[currentMenuIndex]?.modules?.length - 1 && currentMenuIndex === menus?.length - 1 ? 'bg-gray-100 text-gray-500' : 'bg-c-green-50'} w-fit font-medium px-5 py-2 rounded-md text-f-light`}>Next</button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
    </section>
  )
}

export default CourseTaking