import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"


const Courses: React.FC = () => {
  const [activeSection, setActiveState] = useState<string>("CO");

  return (
    <section className="w-full h-full flex flex-col">
      <header className="w-full h-auto pt-5 px-7 border-b-2">
        <div className="w-full mb-3">
          <h1 className="font-medium text-h-h6">Create Course</h1>
        </div>
        <div className="w-full flex items-center justify-between text-p-rg">
          <nav>
            <ul className="flex text-p-sm">
              <li className={`px-4 py-2 ${activeSection === "CO"? 
                "border-2 rounded-md bg-c-grey-5 border-c-blue-50 font-medium text-c-blue-50" 
                : 
                "text-c-grey-50"}
              `}><NavLink to='courseoverview' onClick={() => setActiveState("CO")}>Course Overview</NavLink></li>
              <li className={`px-4 py-2 ${activeSection === "CC"? 
                "border-2 rounded-md bg-c-grey-5 border-c-blue-50 font-medium text-c-blue-50" 
                : 
                "text-c-grey-50"}
              `}><NavLink to='coursecontent' onClick={() => setActiveState("CC")}>Course Content</NavLink></li>
              <li className={`px-4 py-2 ${activeSection === "Prev"? 
                "border-2 rounded-md bg-c-grey-5 border-c-blue-50 font-medium text-c-blue-50" 
                : 
                "text-c-grey-50"}
              `}><NavLink to='preview' onClick={() => setActiveState("Prev")}>Preview</NavLink></li>
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