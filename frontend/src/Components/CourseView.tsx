import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

import { MenuDataState, CoursesState, CourseData } from '../types/CourseCreationTypes'
import { UserState } from '../types/UserTypes'
import { useTraineeHook, useTrainingOfficerHook } from '../hooks/'

import { CourseContentOverview, } from "./"
import { CiSquareInfo } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { setCourseData } from '../redux/CourseDataRedux';
import { setID } from '../redux/CourseIDRedux';

interface TraineeCourses {
    course: CoursesState;
    participant_status: 'in progress' | 'pending' | 'completed';
  }

const CourseView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()
    const API_URL = import.meta.env.VITE_URL
    const user = useSelector((state: {user: UserState}) => state.user)
    //const courseOverview = useSelector((state: {courseData: CourseData}) => state.courseData)
    const courses = useSelector((state: {courses: TraineeCourses[] | CoursesState[]}) => state.courses)
    const [selectedCourse, setSelectedCourse] = useState<TraineeCourses | CoursesState>({
        course: {
            id: 0,
            course_title: '',
            course_description: '',
            department: '', 
            visibility: '', 
            cover_image_url: '', 
            created_at: '',
            course_status: '', 
            participants_display: [],
            submitted: true
        },
        participant_status: 'pending'
    }) 
    const [menus, setMenus] = useState<MenuDataState[]>([]) 
    const { getCourse, updateCourseStatus } = useTraineeHook()
    const { deleteCourse } = useTrainingOfficerHook()

  useEffect(() => {
    const getCourseDetails = async() => {
        if(id) {
            const response = await getCourse(Number(id))
            setMenus(response)
            console.log(courses)
            const filteredCourse = courses.find(item => user.user.role === 'trainee' ? (item as TraineeCourses).course.id === Number(id) : (item as CoursesState).id === Number(id))
            if(filteredCourse){
                console.log(filteredCourse)
                setSelectedCourse(filteredCourse as TraineeCourses | CoursesState)
            }
        }
    }
    getCourseDetails()
  }, [id, courses])

  const removeCourse = async(id: number) => {
    await deleteCourse(id)
    window.history.back()
  } 

  const editCourse = () => {
    console.log(selectedCourse)
    navigate('../courseCreation/courseOverview')
    dispatch(setID((selectedCourse as CoursesState).id))
    dispatch(setCourseData(selectedCourse as CourseData))
  }

  const takeCourse = async() => {
    console.log((selectedCourse as TraineeCourses).course.id)
    await updateCourseStatus((selectedCourse as TraineeCourses).course.id, user.user.id, {participant_status: 'in progress'})
    navigate(`/trainee/mycourses/${id}/learn`)
  }

  console.log((selectedCourse as TraineeCourses).participant_status)

  return (
    <section className="w-full h-full px-14 py-10 text-f-dark bg-content-bg flex gap-5">
        <div className='w-3/5 flex flex-col gap-5'>
            <nav className='flex items-center justify-between'>
                <section className='flex items-center gap-1'>
                    <button onClick={() => window.history.back()}>&lt;</button>
                    <p>Course &gt;</p>
                    <p>Course Title</p>
                </section>
                <section className='flex gap-2'>
                    {user.user.role === 'training_officer' && <button onClick={editCourse} className='px-2 py-1 rounded-md bg-f-dark text-f-light text-p-sm'>Edit Course</button>}
                    {user.user.role === 'training_officer' && <button onClick={() => removeCourse((selectedCourse as CoursesState).id)} className='px-2 py-1 rounded-md bg-red-500 text-f-light text-p-sm'>Delete Course</button>}
                    {(user.user.role === 'trainee' && (selectedCourse as TraineeCourses).participant_status === 'pending') && <button onClick={takeCourse} className='px-2 py-1 rounded-md bg-f-dark text-f-light text-p-sm'>Start Course</button>}
                    {(user.user.role === 'trainee' && (selectedCourse as TraineeCourses).participant_status === 'in progress') && <button onClick={takeCourse} className='px-2 py-1 rounded-md bg-f-dark text-f-light text-p-sm'>Resume Course</button>}
                </section>
            </nav>
            <article className='flex flex-col gap-5'>
                <h3 className='text-h-h3 font-medium'>{user.user.role === 'trainee' ? (selectedCourse as TraineeCourses).course.course_title : (selectedCourse as CoursesState).course_title}</h3>
                <section>
                    <p className='font-medium mb-1'>Description</p>
                    <p className='text-c-grey-80'>{user.user.role === 'trainee' ? (selectedCourse as TraineeCourses).course.course_description : (selectedCourse as CoursesState).course_description}</p>
                </section>
            </article>
            <hr />
            <p className='font-medium text-p-lg'>Course Content</p>
            <CourseContentOverview courseContent={menus} page='viewcourse'/>
        </div>
        <div className='w-2/5 flex flex-col gap-5'>
            <img src={`${API_URL}${user.user.role === 'trainee' ? (selectedCourse as TraineeCourses).course.cover_image_url : (selectedCourse as CoursesState).cover_image_url}`} alt="Banner Img" className="w-full h-2/6 object-fill rounded-lg bg-c-grey-30"/>
            <div className='w-full h-fit flex flex-row justify-between pr-10'>
                <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Department</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>{user.user.role === 'trainee' ? (selectedCourse as TraineeCourses).course.department : (selectedCourse as CoursesState).department}</p>
                </article>
                <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Date</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>May 13 - 20, 2025</p>
                </article>
                <article className='w-fit flex flex-col gap-1'>
                    <p className='text-p-sc text-c-green-50'>Visibility</p>
                    <p className='text-p-sm flex items-center gap-1 font-medium'><CiSquareInfo size={16}/>{user.user.role === 'trainee' ? (selectedCourse as TraineeCourses)?.course?.visibility?.charAt(0)?.toUpperCase() + (selectedCourse as TraineeCourses)?.course?.visibility?.slice(1) : (selectedCourse as CoursesState)?.visibility?.charAt(0)?.toUpperCase() + (selectedCourse as CoursesState)?.visibility?.slice(1) }</p>              
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
                  {user.user.role === 'trainee' ? 
                    (selectedCourse as TraineeCourses).course.participants_display?.map((item, index) => (
                        <p key={index}>{`${item.first_name}${item.last_name}`}</p>
                    )) : 
                    (selectedCourse as CoursesState).participants_display?.map((item, index) => (
                        <p key={index}>{`${item.first_name}${item.last_name}`}</p>
                    ))
                  }
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default CourseView