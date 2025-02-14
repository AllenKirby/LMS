import MyCourseCard from "../../Components/MyCourseCard";
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiGrid2H, CiTextAlignLeft  } from "react-icons/ci";

const MyCourse = () => {
  return (
    <section className="w-full h-full px-9 flex flex-col gap-5 bg-gray-50 overflow-y-auto">
      <section className="w-full flex flex-col mt-5">
        <div className="flex items-center justify-between w-full mb-2">
          <p className="text-h-h6 font-medium text-f-black">My Courses</p>
          <div className="flex gap-2">
            <button className="rounded w-8 h-8 bg-gray-300 flex items-center justify-center">
              <FiSearch size={18} />
            </button>
            <button className="rounded w-8 h-8 bg-gray-300 flex items-center justify-center">
              <FiFilter size={18} />
            </button>
            <button className="rounded w-16 h-8 bg-gray-300 flex items-center justify-center gap-1 px-0">
              <CiTextAlignLeft className="text-black-700" size={18} strokeWidth={1} />
              <div className="bg-white rounded p-1 flex items-center justify-center">
                <CiGrid2H className="text-black-700" size={18} strokeWidth={1} />
              </div>
            </button>


            <button className="rounded w-auto px-3 py-2 h-8 bg-gray-300 flex items-center justify-center gap-2">
              <IoMdAddCircleOutline size={18} />
              <span className="text-sm font-medium">New Course</span>
            </button>

            
          </div>
        </div>
        
        <nav className="px-2">
          <ul className="flex gap-8 border-b border-gray-200 py-1 px-2">
            <li className="text-f-gray">All</li>
            <li className="text-f-gray">Category 1</li>
            <li className="text-f-gray">Category 2</li>
            <li className="text-f-gray">Category 3</li>
          </ul>
          
        </nav>

        <div className="flex flex-row items-center justify-between w-full">
          
        </div>

        {/* MyCourseCard Grid - 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full mt-4 ">
          <MyCourseCard />
          <MyCourseCard />
          <MyCourseCard />
          <MyCourseCard />
          <MyCourseCard />
          <MyCourseCard />
        </div>
      </section>
    </section>
  );
};

export default MyCourse;
