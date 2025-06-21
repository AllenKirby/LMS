import React, { useState } from "react"
import { useSelector } from "react-redux";
import Empty from '../assets/Empty.png'

import { CoursesState } from '../types/CourseCreationTypes' 
import { ResourcesViewModal } from "../Components";

interface TraineeCourses {
  course: CoursesState
}

const Resources = () => {
  const [viewResource, setViewResource] = useState<boolean>(false);
  const courses = useSelector((state: {courses?: TraineeCourses[] | CoursesState[]}) => state.courses || []);
  const [courseID, setCourseID] = useState<number>(0)
    
  const handleViewResources = (id: number = 0) => {
    setCourseID(id)
    setViewResource(!viewResource)
  };

  return (
    <section className="w-full h-full px-7 py-5 text-f-dark bg-content-bg overflow-y-auto">
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
        {courses.length === 0 ? (
          <>
            <h1 className="col-span-5 text-center text-c-grey-50 text-lg py-60">No resources available.</h1>
          </>
        ) : (
          courses.map((item, index) => (
              <section
                key={index}
                className="h-[160px] flex flex-col justify-start rounded-xl bg-white shadow-md group cursor-pointer p-3"
                onClick={() => handleViewResources((item as CoursesState).id ? (item as CoursesState).id : (item as TraineeCourses).course.id)}
              > 
                  <h1 className="text-p-rg text-f-dark font-semibold text-lg">{(item as CoursesState).course_title ? (item as CoursesState).course_title : (item as TraineeCourses).course.course_title}</h1>
                  <h2 className="text-gray-500">{(item as CoursesState).department ? (item as CoursesState).department.join(', ') : (item as TraineeCourses).course.department.join(', ')}</h2>
              </section>
            )
          )
        )}
      </div>
      {viewResource && <ResourcesViewModal onClose={handleViewResources} id={courseID}/>}
    </section>
  )
}

export default Resources