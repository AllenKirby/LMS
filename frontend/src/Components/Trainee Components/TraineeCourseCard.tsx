import { CiCalendar, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { CoursesState } from '../../types/CourseCreationTypes'

import CourseIMG from '../../assets/course-img.png'
import CoursesFunctions from "../../utils/CoursesFunctions";

interface TraineeCourses {
  course: CoursesState
  participant_status: string
}

type TraineeCourseCardState = {
  data: TraineeCourses
}

const TraineeCourseCard: React.FC<TraineeCourseCardState> = (props) => {
  const { data } = props
  const API_URL = import.meta.env.VITE_URL
  const navigate = useNavigate();
  const { convertDate } = CoursesFunctions()

  const course = data?.course;

  if (!course) return null;

  return (
    <section className="relative flex-1 aspect-square group">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg cursor-pointer"
        onClick={() => navigate('/trainingofficer/courses/CourseView')}
      >
      </div>  
      <section className="w-full h-full bg-white rounded-lg flex flex-col group">
          <img src={data.course.cover_image_url ? `${API_URL}${data.course.cover_image_url}` : CourseIMG} className="w-full h-1/2 bg-c-grey-10 rounded-t-lg"/>
          <div className="w-full flex-1 p-5 flex flex-col justify-between">
              <article>
                  <p className="text-p-sm font-medium text-c-green-50">{data.course.department}</p>
                  <p className="text-p-lg font-semibold">{data.course.course_title}</p>
              </article>
              <p>{data.course.course_description}</p>
              <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1"><CiCalendar/> {convertDate(data.course.created_at)}</p>
                  <p className="flex items-center gap-1"><CiUser/> {data.course.participants_display.length} Enrolled</p>
              </div>
          </div>
      </section>
    </section>
  )
}

export default TraineeCourseCard

