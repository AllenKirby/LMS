import { useNavigate } from "react-router-dom";

import { MdOutlineCalendarToday } from "react-icons/md";

import { CourseData } from '../../types/CourseCreationTypes'
import CoursesFunction from '../../utils/CoursesFunctions'
import CourseIMG from '../../assets/course-img.png'

type CourseEvaluateCardProp = {
  data: CourseData
}

const CourseEvaluateCard: React.FC<CourseEvaluateCardProp> = (props) => {
  const { data } = props

  const navigate = useNavigate();
  const { convertDate } = CoursesFunction()
  const API_URL = import.meta.env.VITE_URL

  return (
    <section
      className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
    >
      <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
      <button
        className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100"
        onClick={() => {
            const trainingData = {
              id: data.id,
              type: 'course'
            }
            const encoded = encodeURIComponent(JSON.stringify(trainingData));
            navigate(
              `/reviewer/program/course/${encoded} `
            )
          }
        }
      >
        View Participants
      </button>
      <div className="w-full h-full">
        <figure className="w-full h-2/5">
          <img
            src={data.cover_image_url ? `${API_URL}${data.cover_image_url}` : CourseIMG}
            alt="Course-img"
            className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
          />
        </figure>
        <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
          <section className="w-full">
            <p className="text-p-sc font-medium text-c-green-50">{data.department.join(', ')}</p>
            <h1 className="text-p-lg font-semibold w-full">{data.course_title}</h1>
          </section>
          <p className="text-p-rg text-c-grey-70 w-full h-20 truncate">
            {data.course_description}
          </p>
          <article className="w-full flex items-center justify-between text-p-sm">
            <p className="text-c-grey-70 flex items-center justify-center gap-1">
              <MdOutlineCalendarToday size={15} />
              {convertDate(data.created_at ? data.created_at : '')}
            </p>
          </article>
        </main>
      </div>
    </section>
  );
};

export default CourseEvaluateCard;
