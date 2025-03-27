import { QuestionCard } from "../../Components/Trainee Components"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { TbAlignLeft } from "react-icons/tb";
import { useState } from "react";

const CourseTaking = () => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
     <section className="flex flex-row w-full h-full">
        <nav className="w-1/4 h-full flex flex-col px-10 py-5">
          <button className="flex flex-row items-center gap-1 font-medium">
            <IoArrowBackCircleOutline/>{" "}Go back
          </button>
          <section className="w-full rounded-md border">
            <header className={`w-full p-3 flex flex-row items-center justify-between text-f-light bg-c-blue-50 
                    ${!collapse ? "rounded-t-md" : "rounded-md"}`}
            >
              <p>Section title</p>
              <button 
                onClick={() => setCollapse(!collapse)}
                className={`${!collapse ? "rotate-0" : "rotate-180"}`}
              >
                  <FaAngleDown />
              </button>
            </header>
            <div className={`w-full p-3 bg-white rounded-b-md ${!collapse ? "block" : "hidden"}`}>
              <section className="flex flex-row items-center gap-2">
                <TbAlignLeft/>{" "} Module Title
              </section>
            </div>
          </section>
        </nav>
        <div className="border-l w-3/4 h-full">
            <QuestionCard QT="TrueOrFalse" />        
        </div>
    </section>
  )
}

export default CourseTaking