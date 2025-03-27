import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { CourseData } from '../types/CourseCreationTypes'


import { CourseContentOverview } from "./"
import { CiSquareInfo } from "react-icons/ci";

const CourseView = () => {
  const navigate = useNavigate();
  
  const courseOverview = useSelector((state: {courseData: CourseData}) => state.courseData)

  return (
    <section className="w-full h-full px-14 py-10 text-f-dark bg-content-bg flex gap-5">
        <div className='w-3/5 flex flex-col gap-5'>
            <nav className='flex items-center justify-between'>
                <section className='flex items-center gap-1'>
                    <button onClick={() => navigate(-1)}>&lt;</button>
                    <p>Course &gt;</p>
                    <p>Course Title</p>
                </section>
                <button className='px-2 py-1 rounded-md bg-f-dark text-f-light text-p-sm'>Edit Course</button>
            </nav>
            <article className='flex flex-col gap-5'>
                <h3 className='text-h-h3 font-medium'>Creative Design Essentials - UI/UX Design Course Bundle</h3>
                <section>
                    <p className='font-medium mb-1'>Description</p>
                    <p className='text-c-grey-80'>Meet our innovative network simulation and visualization tool, Cisco Packet Tracer. This virtual lab is an interactive way to practice networking, IoT, and cybersecurity – no hardware required! This course introduces you to the Cisco Packet Tracer simulation environment. Learn how to use Cisco Packet Tracer to visualize and simulate a network using everyday examples. </p>
                </section>
            </article>
            <hr />
            <p className='font-medium text-p-lg'>Course Content</p>
            <CourseContentOverview />
        </div>
        <div className='w-2/5 flex flex-col gap-5'>
            <img src="" alt="Banner Img" className="w-full h-2/6 object-fill rounded-lg bg-c-grey-30"/>
            <div className='w-full h-fit flex flex-row justify-between pr-10'>
                <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Department</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>{courseOverview.department}</p>
                </article>
                <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Date</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>May 13 - 20, 2025</p>
                </article>
                <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Visibility</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>{courseOverview.visibility.charAt(0).toUpperCase() + courseOverview.visibility.slice(1)}</p>              
                </article>                  
            </div>
            <p className='text-p-lg font-medium'>Paticipants (Number)</p>
            <table>
                <thead className='bg-white'>
                    <th>NAME</th>
                    <th>DEPARTMENT</th>
                    <th>POSITION</th>
                </thead>
                <tbody>
                  {courseOverview.participants_display?.map((item, index) => (
                    <p key={index}>{`${item.first_name}${item.last_name}`}</p>
                  ))}
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default CourseView