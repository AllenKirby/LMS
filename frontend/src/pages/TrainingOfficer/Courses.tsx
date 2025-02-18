import { NavLink, Outlet } from "react-router-dom"

const Courses: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col">
      <header className="w-full h-auto pt-5 px-7 border-b-2">
        <div className="w-full mb-5">
          <h1 className="font-medium text-h-h6">Create Course</h1>
        </div>
        <div className="w-full px-7 py-2 flex items-center justify-between">
          <nav>
            <ul className="flex gap-5">
              <NavLink to='courseoverview'>Course Overview</NavLink>
              <NavLink to='coursecontent'>Course Content</NavLink>
              <NavLink to='preview'>Preview</NavLink>
            </ul>
          </nav>
          <button>Upload Course</button>
        </div>
      </header>
      <div className="w-full flex-1 overflow-y-auto py-7 px-10">
        <Outlet/>
      </div>
    </section>
  )
}

export default Courses