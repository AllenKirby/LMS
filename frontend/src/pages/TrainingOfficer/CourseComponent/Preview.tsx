import { useState } from 'react';

import { CiSquareInfo } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowForward  } from "react-icons/io";
import { useSelector } from 'react-redux';

import { CourseContentState, CourseData, ModuleState } from '../../../types/CourseCreationTypes'

const Preview = () => {
  const[activeSection, setActiveSection] = useState<string>("Course");
  const[sectionTabCollapse, setSectionTabCollapse] = useState<boolean>(false);
  const[moduleTabCollapse, setModuleTabCollapse] = useState<boolean>(false);

  const courseOverview = useSelector((state: {courseData: CourseData}) => state.courseData)
  const courseContent = useSelector((state: {courseContent: CourseContentState[]}) => state.courseContent)
  const modules = useSelector((state: {moduleData: ModuleState[]}) => state.moduleData)

  const API_URL = import.meta.env.VITE_URL

  console.log(courseOverview)
  console.log(courseContent)
  console.log(modules)

  return (
    <section className="w-full h-full p-8 flex justify-center">
      <div className="w-3/5 flex flex-col gap-5">
        <img src={`${API_URL}${courseOverview.cover_image_url}`} alt="Banner Image"
             className="w-full h-80 rounded-lg bg-c-grey-30" />
        <nav className="w-full h-fit flex flex-row gap-3 border-b">
          {["Course", "Participants", "Content"].map((section) => (
            <button key={section} 
                    className={`pb-2 px-2 text-p-sm ${activeSection === section && "font-medium border-b-2 border-c-green-50 text-c-green-50"}`}
                    onClick={() => setActiveSection(section)}>
              {section}
            </button>
          ))}
        </nav>
        <section className='w-full h-fit flex flex-col gap-5 text-f-dark'>
          {activeSection === "Course" &&
            <>
              <h5 className='text-h-h5 font-medium'>{courseOverview.course_title}</h5>
              <div className='w-full h-fit flex flex-row gap-10'>
                  <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Department</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>{courseOverview.department}</p>
                  </article>
                  <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Date</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>May 13 - 20, 2025</p>
                  </article>
                  <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Visibility</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>{courseOverview.visibility.charAt(0).toUpperCase() + courseOverview.visibility.slice(1)}</p>
                  </article>
              </div>
              <article>
                <p className='font-medium'>Description</p>
                <p className='text-c-grey-80'>{courseOverview.course_description}</p>
              </article>
            </>
          }
          {activeSection === "Participants" && 
            <div>
              {courseOverview.participants_display?.map((item, index) => (
                <p key={index}>{`${item.first_name}${item.last_name}`}</p>
              ))}
            </div>
          }
          {activeSection === "Content" &&
            <>
              <h5 className='text-h-h5'>Here's what you'll learn!</h5>
              {courseContent.map((item, index) => (
                <section key={index} className="flex flex-col w-full h-fit rounded-md border">
                  <header className={`flex flex-row justify-between items-center p-5 ${sectionTabCollapse && "border-b"}`}>
                    <article className='flex items-center gap-1'>
                      <div className='h-8 w-8 rounded-full border bg-red-50'></div>
                      <p className='font-medium'>{item.title}</p>
                    </article>
                    <button className='h-6 w-6 rounded-md flex items-center justify-center text-f-light bg-c-green-50'
                            onClick={() => setSectionTabCollapse(!sectionTabCollapse)}>
                      <IoIosArrowDown size={16} className={sectionTabCollapse ? "rotate-180" : "rotate-0"}/>
                    </button>
                  </header>
                  <div className={`w-full flex flex-col transition-all duration-300 ease-in-out
                    ${sectionTabCollapse ? "h-fit opacity-100 py-3" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    {modules.filter(module => module.menuID === item.id).map((moduleItem, index) => (
                        <section key={index} className='px-6'>
                          <header className='flex gap-2 items-center'>
                            <button className='h-5 w-5 rounded-full border flex items-center justify-center'
                                    onClick={() => setModuleTabCollapse(!moduleTabCollapse)}>
                              <IoIosArrowForward size={12} className={moduleTabCollapse ? "rotate-90" : "rotate-0"}/>
                            </button>
                            <p>{moduleItem.title}</p>
                          </header>
                          <div className={`flex flex-col gap-1 transition-all duration-300 ease-in-out
                              ${moduleTabCollapse ? "h-fit opacity-100 px-1 py-3" : "max-h-0 opacity-0 overflow-hidden"}`}>
                            {moduleItem.content.map((contentItem, index) => (
                              <article key={index} className='flex items-center gap-2'>
                                <div className='w-4 h-4 rounded-full border bg-red-700'></div>
                                <p className='w-1/5 text-p-sm text-c-grey-50 truncate'>{contentItem.type === 'separator'? contentItem.title : contentItem.type === 'uploadedFile' ? contentItem.fileName : contentItem.question}</p>
                              </article>
                            ))}
                          </div>
                        </section>
                        ))
                      }
                    </div>
                  </section>
                ))
              }
            </>
          }
        </section>
      </div>
    </section>
  )
}

export default Preview