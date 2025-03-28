import { useEffect } from "react";

import { FiEdit2, FiUpload} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { updateField } from "../../../redux/CourseDataRedux";

import { CourseData } from '../../../types/CourseCreationTypes'

const CourseOverview = () => {
  const dispatch = useDispatch()
  const courseData = useSelector((state: {courseData: CourseData}) => state.courseData)
  const API_URL = import.meta.env.VITE_URL

  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
  
    if (target.files?.[0]) {
      const file = target.files[0];
  
      dispatch(updateField({name: 'cover_image_upload', value: file}))
    }
  };
  

  const uploadFile = () =>{
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png, .jpg, .jpeg'
    input.addEventListener('change', handleImageUpload)
    input.click();
  }

  useEffect(() => console.log(`${API_URL}${courseData.cover_image_url}`), [courseData])

  return (
    <section className="w-full h-full p-8">
      <div className="w-full h-full flex items-center justify-center gap-5">
        <section className="w-1/2 h-full p-5 border border-c-grey-500 rounded-md">
          <div>
            <h1 className="text-h-h6 font-medium pb-3">Course Overview</h1>
          </div>
          <div className="w-full h-[200px] overflow-hidden relative"> 
            {(courseData.cover_image_upload || courseData.cover_image_url) ? 
              <div>
                <img className="w-full h-full object-cover" src={courseData.cover_image_url ? `${API_URL}${courseData.cover_image_url}` : URL.createObjectURL(courseData.cover_image_upload)} alt="Base64 Image" />
                <button onClick={uploadFile} className="absolute right-5 top-5 bg-white p-2 rounded-md"><FiUpload size={20}/></button>
              </div>
              : 
              <div className="w-full h-full border-2 border-dashed border-c-blue-50 rounded-md">
                <button onClick={uploadFile} className="w-full h-full flex flex-col items-center justify-center">
                  <FiUpload size={44}/>
                  <p className="font-medium">Upload Cover Image</p>
                  <p className="text-c-grey-50">(Max. 20mb, Landscape)</p>
                </button>
              </div>}
          </div>
          <div className="w-full flex items-center justify-between mt-5">
            <input 
              type="text" 
              value={courseData.course_title}
              onChange={(e) => dispatch(updateField({name: 'course_title', value: e.target.value}))} 
              className="bg-transparent p-1 text-h-h6 font-medium outline-none" 
              placeholder="Course Title"/>
            <FiEdit2 size={20}/>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Course Description</label>
            <textarea 
              value={courseData.course_description}
              onChange={(e) => dispatch(updateField({name: 'course_description', value: e.target.value}))} 
              placeholder="Input Course Description" 
              className="h-24 border-2 rounded-md resize-none p-2"></textarea>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Category / Department</label>
            <select 
              value={courseData.department} 
              onChange={(e) => dispatch(updateField({name: 'department', value: e.target.value as "IT" | "EOD" | "AFD" | "RIM" | "EMU" | ""}))} 
              className="border-2 rounded-md p-2">
              <option value="" disabled>Select Department</option>
              <option value="IT">IT</option>
              <option value="EOD">EOD</option>
              <option value="AFD">AFD</option>
              <option value="EMU">EMU</option>
            </select>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Visibility Option</label>
            <select 
              value={courseData.visibility} 
              onChange={(e) => dispatch(updateField({name: 'visibility', value: e.target.value as 'public' | 'private'}))} 
              className="border-2 rounded-md p-2">
              <option value="" disabled>Select Visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </section>
      </div>
    </section>
  )
}

export default CourseOverview