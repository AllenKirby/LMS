import { Outlet } from "react-router-dom"

const CourseContainer = () => {
  return (
    <section className="w-full h-full">
      <Outlet/>
    </section>
  )
}

export default CourseContainer