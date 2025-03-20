//assets
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CoursesState } from '../types/CourseCreationTypes' 

const CourseCard: React.FC = () => {
  const courses = useSelector((state: {courses: CoursesState[]}) => state.courses)
  const API_URL = import.meta.env.VITE_URL

  const convertDate = (rawDate: string) => {
    const date = new Date(rawDate);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const navigate = useNavigate();
  return (
    <>
      {courses.map((info, index) => (
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
                src={`${API_URL}${info.cover_image_url}`}
                alt="Course-img"
                className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
              />
            </figure>
            <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
              <section className="w-full">
                <p className="text-p-sc font-medium text-c-green-50">
                  {info.department}
                </p>
                <h1 className="text-p-lg font-semibold w-full">{info.course_title}</h1>
              </section>
              <p className="text-p-rg text-c-grey-70 w-full">
                {info.course_description}
              </p>
              <article className="w-full flex items-center justify-between text-p-sm">
                <p className="text-c-grey-70 flex items-center justify-center gap-1">
                  <MdOutlineCalendarToday size={15} />
                  {convertDate(info.created_at)}
                </p>
                <p className="text-c-grey-70 flex items-center justify-center gap-1">
                  <LuUsers size={16} />
                  {info.participants_display.length} Enrolled
                </p>
              </article>
            </main>
          </div>
        </section>
      ))}
    </>
  );
};

export default CourseCard;
