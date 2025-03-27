import { CiCalendar, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const TraineeCourseCard = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex-1 aspect-square group">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg cursor-pointer"
        onClick={() => navigate('/trainingofficer/courses/CourseView')}
      >
      </div>  
      <section className="w-full h-full bg-white rounded-lg flex flex-col group">
          <div className="w-full h-1/2 bg-c-grey-10 rounded-t-lg"></div>
          <div className="w-full flex-1 p-5 flex flex-col justify-between">
              <article>
                  <p className="text-p-sm font-medium text-c-green-50">Category</p>
                  <p className="text-p-lg font-semibold">Cybersecurity Awareness Workshop</p>
              </article>
              <p>Understand cybersecurity threats and best the a practices to protect your organization’s data...</p>
              <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1"><CiCalendar/> Date</p>
                  <p className="flex items-center gap-1"><CiUser/> No. Enrolled</p>
              </div>
          </div>
      </section>
    </section>
  )
}

export default TraineeCourseCard

