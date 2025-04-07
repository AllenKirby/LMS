import { useState } from 'react';

import { CiSquareInfo } from "react-icons/ci";
import { useSelector } from 'react-redux';

import { CourseData, MenuDataState, ModuleState } from '../../../types/CourseCreationTypes'

import { CourseContentOverview } from '../../../Components/index'

const Preview = () => {
  const[activeSection, setActiveSection] = useState<string>("Course");

  const courseOverview = useSelector((state: {courseData: CourseData}) => state.courseData)
  const courseContent = useSelector((state: {courseContent: MenuDataState[]}) => state.courseContent)
  const modules = useSelector((state: {moduleData: ModuleState[]}) => state.moduleData)

  const API_URL = import.meta.env.VITE_URL

  // console.log(courseContent)
  // console.log(modules)

  return (
    <section className="w-full h-full p-8 flex justify-center overflow-y-auto">
      <div className="w-3/5 h-fit flex flex-col gap-5">
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
                <tr key={index}>
                  <td>{`${item.first_name}${item.last_name}`}</td>
                </tr>
              ))}
            </div>
          }
          {activeSection === "Content" &&
            <>
              <h5 className='text-h-h5'>Here's what you'll learn!</h5>
              <CourseContentOverview courseContent={courseContent} modules={modules} page='preview'/>
            </>
          }
        </section>
      </div>
    </section>
  )
}

export default Preview