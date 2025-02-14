import CourseImg from '../assets/course-img.png'
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import React from 'react';

const MyCourseCard: React.FC = () => {
  return (
    <div className='items-center justify-center'>
    <section className="w-full mt-3 flex gap-3 shadow-sm rounded p-4 bg-[#eaeaea] ">
      
      <main className="w-full h-full flex flex-col">
        <figure className="w-[20px ] h-[140px] ">
            <img src={CourseImg} alt="Course-img" className='w-full h-full'/>
        </figure>
        <section className='w-full h-[100px]'>
          <div className='w-full flex items-center justify-between '>
            <h1 className='font-medium'>Cybersecurity Awareness Workshop</h1>
            <h2 className='text-f-gray text-sm flex items-center justify-center gap-1 text-nowrap'><LuUsers size={15}/>24 Enrolled</h2>
          </div>
          <div className='w-full pt-3'>
            <p className='text-sm'>"Understand cybersecurity threats and best practices to protect your organization’s data."</p>
          </div>
        </section>
        <div className='w-full flex items-center justify-between pt-10'>
          <section className='flex flex-wrap gap-2 text-f-gray text-sm'>
            <p className='flex items-center justify-center gap-1 text-nowrap'><MdOutlineCalendarToday size={15}/>February 2, 2025</p>
            <p className='flex items-center justify-center gap-1 text-nowrap'><IoBookOutline size={15}/>4 Lessons</p>
          </section>
          <button className='px-5 py-2 rounded-full bg-black text-white text-sm text-nowrap'>Edit Course</button>
        </div>
      </main>
    </section>
    </div>
  )
}

export default MyCourseCard