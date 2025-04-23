import React, { useState } from "react"
import { useSelector } from "react-redux";

import { CoursesState } from '../types/CourseCreationTypes' 
import { ResourcesViewModal } from "../Components";

interface TraineeCourses {
  course: CoursesState
}

const Resources = () => {
  const [viewResource, setViewResource] = useState<boolean>(false);
  const courses = useSelector((state: {courses: TraineeCourses[] | CoursesState[]}) => state.courses)
  const [courseID, setCourseID] = useState<number>(0)

  console.log(courses)
    
  const handleViewResources = (id: number = 0) => {
    setCourseID(id)
    setViewResource(!viewResource)
  };

  return (
    <section className="w-full h-full px-7 py-5 text-f-dark bg-content-bg grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
      {courses.map((item, index) => (
        <React.Fragment key={index}>
          <article
            className="w-full h-[160px] flex flex-col justify-between rounded-xl bg-white shadow-md group cursor-pointer p-3"
            onClick={() => handleViewResources((item as TraineeCourses).course.id)}
          >
              <p className="text-p-rg text-f-dark font-semibold">{(item as TraineeCourses).course.course_title}</p>
              <div className="font-medium text-p-sm text-c-grey-50">
                <p>3 Files</p>
                <p>1 Image</p>
                <p>2 Video Links</p>
              </div>
          </article>
        </React.Fragment>
      ))}
      {viewResource && <ResourcesViewModal onClose={handleViewResources} id={courseID}/>}
    </section>
  )
}

export default Resources