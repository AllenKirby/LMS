//assets
import CourseImg from '../assets/course-img.png'
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";

const CourseCard: React.FC = () => {
  return (
    <section className="w-full h-52 mt-3 flex items-center justify-center gap-3 shadow-md rounded-md p-4 bg-white">
      <figure className="w-1/4 h-full">
        <img src={CourseImg} alt="Course-img" className='w-full h-full'/>
      </figure>
      <main className="w-3/4 h-full flex flex-col items-center justify-between">
        <section className='w-full h-auto'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='font-medium'>Cybersecurity Awareness Workshop</h1>
            <h2 className='text-f-gray text-sm flex items-center justify-center gap-1'><LuUsers size={15}/>24 Enrolled</h2>
          </div>
          <div className='w-full pt-3'>
            <p className='text-sm'>"Understand cybersecurity threats and best practices to protect your organization’s data."</p>
          </div>
        </section>
        <div className='w-full flex items-center justify-between'>
          <section className='flex gap-2 text-f-gray text-sm'>
            <p className='flex items-center justify-center gap-1'><MdOutlineCalendarToday size={15}/>February 2, 2025</p>
            <p className='flex items-center justify-center gap-1'><IoBookOutline size={15}/>4 Lessons</p>
          </section>
          <button className='px-5 py-2 rounded-full bg-black text-white text-sm'>Start Course</button>
        </div>
      </main>
    </section>
  )
}

export default CourseCard