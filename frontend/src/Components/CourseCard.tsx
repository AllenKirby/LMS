//assets
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CoursesState } from '../types/CourseCreationTypes' 
import { UserState } from '../types/UserTypes'
import { useEffect, useState } from "react";

interface TraineeCourses {
  course: CoursesState
}
type CourseCardState = {
  selectedDepartment: string | "";
}

const CourseCard: React.FC<CourseCardState> = (props) => {
  const { selectedDepartment } = props
  const navigate = useNavigate();
  const user = useSelector((state: {user: UserState}) => state.user)
  const courses = useSelector((state: {courses: TraineeCourses[] | CoursesState[]}) => state.courses)
  const [filteredCourses, setFilteredCourses] = useState<TraineeCourses[] | CoursesState[]>([])
  const API_URL = import.meta.env.VITE_URL

  useEffect(() => {
    if(courses) {
      if(selectedDepartment) {
        const filtered = courses.filter(item => user.user.role === 'training_officer' ? (item as CoursesState)?.department === selectedDepartment : (item as TraineeCourses)?.course?.department === selectedDepartment)
        if(filtered) {
          setFilteredCourses(filtered as CoursesState[] | TraineeCourses[])
        } else {
          setFilteredCourses([])
        }
      } else {
        setFilteredCourses(courses)
      }
    } else {
      setFilteredCourses([])
    }
  }, [selectedDepartment, courses])

  const convertDate = (rawDate: string) => {
    const date = new Date(rawDate);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  // const sortCourses = (array: CoursesState[]) => {
  //   if(array.length > 0) {
  //     return [...array].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  //   } else {
  //     return []
  //   }
  // };

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

  console.log(courses)

  return (
    <>
      {(user.user.role === 'training_officer' && filteredCourses) && 
        <>
          <h6 className="mt-5 text-p-rg font-semibold text-c-blue-50">Published Course ({publishedCourses(filteredCourses).length})</h6>
          <section className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-3 gap-10">
            {publishedCourses(filteredCourses).map((info, index) => (
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
                      src={`${API_URL}${user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.cover_image_url}`}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {user.user.role === 'training_officer' ? (info as CoursesState).department  : (info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 w-full">
                      {user.user.role === 'training_officer' ? (info as CoursesState).course_description  : (info as TraineeCourses).course.course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate(user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {user.user.role === 'training_officer' ? (info as CoursesState).participants_display.length  : (info as TraineeCourses).course.participants_display.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))}
          </section>
        </>
      }
      {(user.user.role === 'training_officer' && filteredCourses) && 
        <> 
          <h6 className="mt-5 text-p-rg font-semibold text-c-blue-50">Drafts ({draftsCourses(filteredCourses).length})</h6>
          <section className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {draftsCourses(filteredCourses).map((info, index) => (
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
                      src={`${API_URL}${user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.cover_image_url}`}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {user.user.role === 'training_officer' ? (info as CoursesState).department  : (info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 w-full">
                      {user.user.role === 'training_officer' ? (info as CoursesState).course_description  : (info as TraineeCourses).course.course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate(user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {user.user.role === 'training_officer' ? (info as CoursesState).participants_display.length  : (info as TraineeCourses).course.participants_display.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))}
          </section>
        </>
      }
      {(user.user.role === 'trainee' && filteredCourses) && 
        <> 
          <h6 className="mt-5 text-p-rg font-semibold text-c-blue-50">In Progress ({draftsCourses(filteredCourses).length})</h6>
          <section className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {draftsCourses(filteredCourses).map((info, index) => (
              <section
                className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
                key={index}
              >
                <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
                <button className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100"
                        onClick={() => navigate('/trainingofficer/courses/CourseView')}>
                    View Course
                </button>
                <div className="w-full h-full">
                  <figure className="w-full h-2/5">
                    <img
                      src={`${API_URL}${user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.cover_image_url}`}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {user.user.role === 'training_officer' ? (info as CoursesState).department  : (info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 w-full">
                      {user.user.role === 'training_officer' ? (info as CoursesState).course_description  : (info as TraineeCourses).course.course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate(user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {user.user.role === 'training_officer' ? (info as CoursesState).participants_display.length  : (info as TraineeCourses).course.participants_display.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))}
          </section>
        </>
      }
      {(user.user.role === 'trainee' && filteredCourses) && 
        <> 
          <h6 className="mt-5 text-p-rg font-semibold text-c-blue-50">Published Courses ({publishedCourses(filteredCourses).length})</h6>
          <section className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
            {publishedCourses(filteredCourses).map((info, index) => (
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
                      src={`${API_URL}${user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.cover_image_url}`}
                      alt="Course-img"
                      className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
                    />
                  </figure>
                  <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                    <section className="w-full">
                      <p className="text-p-sc font-medium text-c-green-50">
                        {user.user.role === 'training_officer' ? (info as CoursesState).department  : (info as TraineeCourses).course.department}
                      </p>
                      <h1 className="text-p-lg font-semibold w-full">{user.user.role === 'training_officer' ? (info as CoursesState).course_title  : (info as TraineeCourses).course.course_title}</h1>
                    </section>
                    <p className="text-p-rg text-c-grey-70 w-full">
                      {user.user.role === 'training_officer' ? (info as CoursesState).course_description  : (info as TraineeCourses).course.course_description}
                    </p>
                    <article className="w-full flex items-center justify-between text-p-sm">
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <MdOutlineCalendarToday size={15} />
                        {convertDate(user.user.role === 'training_officer' ? (info as CoursesState).cover_image_url  : (info as TraineeCourses).course.created_at)}
                      </p>
                      <p className="text-c-grey-70 flex items-center justify-center gap-1">
                        <LuUsers size={16} />
                        {user.user.role === 'training_officer' ? (info as CoursesState).participants_display.length  : (info as TraineeCourses).course.participants_display.length} Enrolled
                      </p>
                    </article>
                  </main>
                </div>
              </section>
            ))}
          </section>
        </>
      }
    </>
  );
};

export default CourseCard;
