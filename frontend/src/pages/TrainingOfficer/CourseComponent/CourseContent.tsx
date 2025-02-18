import { Menu, Questionnaire, UploadContent, Separator } from './CourseContentComponents'

import { FiEdit2, FiPlus, FiUpload } from "react-icons/fi";
import { RxText } from "react-icons/rx";

const CourseContent = () => {
  return (
    <section className="w-full h-full flex flex-row gap-5">
      <div className="w-1/4 h-full">
        <div className="w-full pb-3">
          <h1 className="font-medium text-h-h6">Course Menu</h1>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
          <Menu/>
          <Menu/>
          <Menu/>
          <button className="h-fit w-fit p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
        </div>
      </div>
      <div className="w-3/4 h-full">
        <div className='w-full h-full border rounded-md overflow-hidden'>
          <div className='w-full flex items-center justify-between p-3 border-b'>
            <input type="text" className="bg-transparent p-1 text-h-h6 font-medium outline-none" placeholder="Module Title"/>
            <button>
              <FiEdit2 size={20} className='text-c-grey-50'/>
            </button>
          </div>
          <div className='w-full p-5 h-full overflow-y-auto flex flex-col gap-5'>
            <Questionnaire/>
            <UploadContent/>
            <Separator/>
            <div className='w-full flex items-center justify-center gap-'>
              <button className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/></button>
              <button className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiUpload size={20}/></button>
              <button className="p-2 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><RxText  size={20}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseContent