import { FiUsers, FiCalendar, FiBookOpen  } from "react-icons/fi";

const CourseCardView = () => {
  return (
    <section className="p-3 rounded-lg shadow-md bg-white flex flex-col gap-6 h-fit">
        <div>
            <img alt="Banner Img" className="w-full h-1/3 rounded-md"/>
            <article className="flex flex-col gap-3">
                <section className="flex items-center justify-between">
                    <h6 className="text-p-lg font-medium">Course Title</h6>
                    <p className="text-c-grey-50 text-p-sm flex items-center gap-1"><FiUsers/> No. Enrolled</p>
                </section>
                <p>"Course Description blah blah blah"</p>
            </article>
        </div>
        <div className="flex justify-between items-center">
            <article className="text-c-grey-50 flex items-center gap-3">
                <p className="flex items-center gap-1"><FiCalendar/> Date</p>
                <p className="flex items-center gap-1"><FiBookOpen/> No. Lesson</p>
            </article>
            <button className="px-3 py-2 rounded-full font-medium bg-c-grey-10">Edit course</button>
        </div>
    </section>
  )
}

export default CourseCardView