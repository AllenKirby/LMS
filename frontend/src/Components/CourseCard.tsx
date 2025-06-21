//assets
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CoursesState } from '../types/CourseCreationTypes' 
import { UserState } from '../types/UserTypes'
import React, { useEffect, useState } from "react";

import CourseIMG from '../assets/course-img.png'
import CoursesFunctions from "../utils/CoursesFunctions";

interface TraineeCourses {
  course: CoursesState
  participant_status: string
}

interface Filters {
  course: boolean;
  externalCourse: boolean;
  all: boolean;
  in_progress: boolean;
  completed: boolean;
  saved: boolean;
  sort: string;
}

type CourseCardState = {
  selectedDepartment: ("" | "RO" | "EOD" | "AFD");
  selectedFilters: Filters;
  searchString?: string;
}

const CourseCard: React.FC<CourseCardState> = React.memo((props) => {
  const { selectedDepartment, selectedFilters, searchString = "" } = props
  const navigate = useNavigate();
  const user = useSelector((state: {user: UserState}) => state.user)
  const courses = useSelector((state: {courses: TraineeCourses[] | CoursesState[]}) => state.courses)
  const [filteredCourses, setFilteredCourses] = useState<TraineeCourses[] | CoursesState[]>([])
  const API_URL = import.meta.env.VITE_URL
  const { convertDate, sortCourses } = CoursesFunctions()

  useEffect(() => {
    if (courses) {
      let filtered = [...courses];
      
      // Filter by department if selected
      if (selectedDepartment && selectedDepartment.length > 0) {
        filtered = filtered.filter(item => 
          user.user.role === 'training_officer' 
            ? (item as CoursesState)?.department.includes(selectedDepartment) 
            : (item as TraineeCourses)?.course?.department.includes(selectedDepartment)
        );
      }

      // Apply search filter if searchString exists
      if (searchString && user.user.role === 'training_officer') {
        filtered = filtered.filter(course =>
          (course as CoursesState).course_title.toLowerCase().includes(searchString.toLowerCase())
        );
      }

      setFilteredCourses(filtered as TraineeCourses[] | CoursesState[]);
    } else {
      setFilteredCourses([]);
    }
  }, [selectedDepartment, courses, searchString]);

  const draftsCourses = (array: CoursesState[] | TraineeCourses[]) => {
    return array.filter(item => 
      user.user.role === 'training_officer' 
        ? (item as CoursesState)?.course_status === 'draft' 
        : (item as TraineeCourses)?.course?.course_status === 'draft'
    );
  }; 

  const publishedCourses = (array: CoursesState[] | TraineeCourses[]) => {
    return array.filter(item => 
      user.user.role === 'training_officer' 
        ? (item as CoursesState)?.course_status === 'published' 
        : (item as TraineeCourses)?.course?.course_status === 'published'
    );
  };

  const filteredCourseStatus = (array:  TraineeCourses[], status: string) => {
    return array.filter(item => (item as TraineeCourses)?.participant_status === status
    );
  }

  console.log(filteredCourses)

  return (
    <>
      {(user.user.role === 'training_officer' && filteredCourses) && 
        <>
          <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">Published Course ({publishedCourses(filteredCourses).length})</h6>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-3 gap-10">
            {sortCourses(publishedCourses(filteredCourses) as CoursesState[], user).length > 0 ? (sortCourses(publishedCourses(filteredCourses) as CoursesState[], user).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100"
                        onClick={() => navigate(`/trainingofficer/courses/courseview/${(info as CoursesState).id}`)}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={(info as CoursesState).cover_image_url ? `${API_URL}${(info as CoursesState).cover_image_url}` : CourseIMG}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {(info as CoursesState).department.join(", ")}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{(info as CoursesState).course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 w-full h-20 truncate">
                      {(info as CoursesState).course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate((info as CoursesState).created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {(info as CoursesState)?.participants_display?.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))) : (
              <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
                No Courses available.
              </p>
            )}
          </section>
        </>
      }
      {(user.user.role === 'training_officer' && filteredCourses) && 
        <> 
          <hr className="my-10 border-t border-c-grey-30" />
          <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">Drafts ({draftsCourses(filteredCourses).length})</h6>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {sortCourses(draftsCourses(filteredCourses) as CoursesState[], user).length > 0 ? (sortCourses(draftsCourses(filteredCourses) as CoursesState[], user).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100"
                        onClick={() => navigate(`/trainingofficer/courses/courseview/${(info as CoursesState).id}`)}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={(info as CoursesState).cover_image_url ? `${API_URL}${(info as CoursesState).cover_image_url}` : CourseIMG}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {(info as CoursesState).department.join(", ")}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{(info as CoursesState).course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 w-full h-20 truncate">
                      {(info as CoursesState).course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate((info as CoursesState).created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {(info as CoursesState)?.participants_display?.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))) : (
              <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
                No Courses available.
              </p>
            )}
          </section>
        </>
      }
      {(user.user.role === 'trainee' && filteredCourses && selectedFilters.in_progress) && 
        <> 
          <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">In Progress ({filteredCourseStatus(filteredCourses as TraineeCourses[], 'in progress').length})</h6>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {sortCourses(filteredCourseStatus(filteredCourses as TraineeCourses[], 'in progress'), user, selectedFilters.sort).length > 0 ? (sortCourses(filteredCourseStatus(filteredCourses as TraineeCourses[], 'in progress'), user, selectedFilters.sort).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 h-full w-full"
                        onClick={() => navigate(`/trainee/mycourses/${(info as TraineeCourses).course.id}`)}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={(info as TraineeCourses).course.cover_image_url ? `${API_URL}${(info as TraineeCourses).course.cover_image_url}` : CourseIMG}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {(info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <pre className="text-p-rg text-c-grey-70 h-20 w-full truncate">
                      {(info as TraineeCourses).course.course_description}
                    </pre>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate((info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {(info as TraineeCourses)?.course?.participants_display?.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))) : (
              <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
                No Courses available.
              </p>
            )}
          </section>
        </>
      }
      {(user.user.role === 'trainee' && filteredCourses && selectedFilters.in_progress) && 
        <> 
          <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">Pending Survey ({filteredCourseStatus(filteredCourses as TraineeCourses[], 'pending survey').length})</h6>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {sortCourses(filteredCourseStatus(filteredCourses as TraineeCourses[], 'pending survey'), user, selectedFilters.sort).length > 0 ? (sortCourses(filteredCourseStatus(filteredCourses as TraineeCourses[], 'pending survey'), user, selectedFilters.sort).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 h-full w-full"
                        onClick={() => navigate(`/trainee/mycourses/${(info as TraineeCourses).course.id}`)}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={(info as TraineeCourses).course.cover_image_url ? `${API_URL}${(info as TraineeCourses).course.cover_image_url}` : CourseIMG}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {(info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <pre className="text-p-rg text-c-grey-70 h-20 w-full truncate">
                      {(info as TraineeCourses).course.course_description}
                    </pre>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate((info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {(info as TraineeCourses)?.course?.participants_display?.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))) : (
              <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
                No Courses available.
              </p>
            )}
          </section>
        </>
      }
      {(user.user.role === 'trainee' && filteredCourses && selectedFilters.completed) && 
        <> 
          <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">Completed ({filteredCourseStatus(filteredCourses as TraineeCourses[], 'completed').length})</h6>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {sortCourses(filteredCourseStatus(filteredCourses as TraineeCourses[], 'completed'), user, selectedFilters.sort).length > 0 ? (sortCourses(filteredCourseStatus(filteredCourses as TraineeCourses[], 'completed'), user, selectedFilters.sort).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 h-full w-full"
                        onClick={() => navigate(`/trainee/mycourses/${(info as TraineeCourses).course.id}`)}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={(info as TraineeCourses).course.cover_image_url ? `${API_URL}${(info as TraineeCourses).course.cover_image_url}` : CourseIMG}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {(info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <pre className="text-p-rg text-c-grey-70 h-20 w-full truncate">
                      {(info as TraineeCourses).course.course_description}
                    </pre>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate((info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {(info as TraineeCourses)?.course?.participants_display?.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))) : (
              <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
                No Courses available.
              </p>
            )}
          </section>
        </>
      }
      {(user.user.role === 'trainee' && filteredCourses && selectedFilters.all) && 
        <> 
          <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">Published Courses ({publishedCourses(filteredCourses).length})</h6>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {sortCourses(publishedCourses(filteredCourses) as TraineeCourses[], user, selectedFilters.sort).length > 0 ? (sortCourses(publishedCourses(filteredCourses) as TraineeCourses[], user, selectedFilters.sort).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100"
                      onClick={() => navigate(`/trainee/mycourses/${(info as TraineeCourses).course.id}`)}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={(info as TraineeCourses).course.cover_image_url ? `${API_URL}${(info as TraineeCourses).course.cover_image_url}` : CourseIMG}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {(info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 h-20 w-full truncate">
                      {(info as TraineeCourses).course.course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate((info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {(info as TraineeCourses)?.course?.participants_display?.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))) : (
              <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
                No Courses available.
              </p>
            )}
          </section>
        </>
      }
    </>
  );
});

export default CourseCard;
