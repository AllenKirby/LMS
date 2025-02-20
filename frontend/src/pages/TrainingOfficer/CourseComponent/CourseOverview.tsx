import { useEffect, useState } from "react";

import { FiUpload, FiEdit2, FiSearch, FiFilter } from "react-icons/fi";

import { useTrainingOfficerHook } from '../../../hooks'

interface OverviewData {
  cover_image_upload: string,
  course_title: string;
  course_description: string;
  department: 'IT' | 'EOD' | 'AFD' | 'RIM' | 'EMU' | '';
  visibility: 'public' | 'private' | '';
}

const CourseOverview = () => {
  const [ overviewData, setOverviewData ] = useState<OverviewData>({
    cover_image_upload: '',
    course_title: '',
    course_description: '',
    department: '',
    visibility: ''
  })

  const { handleAddCourse } = useTrainingOfficerHook()

  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
  
    if (target.files?.[0]) {
      const file = target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          setOverviewData((prevState) => ({
            ...prevState,
            cover_image_upload: base64String,
          }));
        }
      };
  
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = () =>{
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png, .jpg, .jpeg'
    input.addEventListener('change', handleImageUpload)
    input.click();
  }

  useEffect(() => {
    const sendOverviewData = async() => {
      if(Object.values(overviewData).every(value => value !== "")) {
        await handleAddCourse(overviewData)
      }
    }
    sendOverviewData()
  }, [overviewData])

  return (
    <section className="w-full h-auto">
      <div className="flex flex-row gap-5">
        <section className="w-1/2 h-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-h-h6 font-medium">0 Participants</h1>
            <div className="flex gap-2">
              <button className="p-2 bg-c-grey-5 rounded-md"><FiSearch size={20}/></button>
              <button className="p-2 bg-c-grey-5 rounded-md"><FiFilter size={20}/></button>
            </div>
          </div>
          <table className="w-full border">
            <thead className="bg-c-blue-5">
              <tr className="rounded-t-md">
                <th className="p-3 border-r-2"><input type="checkbox" className="scale-150"/></th>
                <th className="p-3 border-r-2">Full Name</th>
                <th className="p-3 border-r-2">Position</th>
                <th className="p-3">Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
                <td className="p-3 border-r-2 text-center">Allen Kirby</td>
                <td className="p-3 border-r-2 text-center">Intern</td>
                <td className="p-3 border-r-2 text-center">IT</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="w-1/2 h-auto p-3 border border-c-grey-500 rounded-md">
          <div>
            <h1 className="text-h-h6 font-medium">Course Overview</h1>
          </div>
         <div className="w-full h-[200px] overflow-hidden"> 
            {overviewData.cover_image_upload ? 
            <img className="w-full object-cover" src={`data:image/png;base64,${overviewData.cover_image_upload}`} alt="Base64 Image" />
              : 
              <div className="w-full border-2 border-dashed p-20 border-c-blue-50 rounded-md">
                <button onClick={uploadFile} className="w-full h-full flex flex-col items-center justify-center">
                  <FiUpload size={44}/>
                  <p className="font-medium">Upload Cover Image</p>
                  <p className="text-c-grey-50">(Max. 20mb, Landscape)</p>
                </button>
              </div>}
          </div>
          <div className="w-full py-4 flex items-center justify-between">
            <input 
              type="text" 
              value={overviewData.course_title}
              onChange={(e) => setOverviewData({...overviewData, course_title: e.target.value})} 
              className="bg-transparent p-1 text-h-h6 font-medium outline-none" 
              placeholder="Course Title"/>
            <FiEdit2 size={20}/>
          </div>
          <div className="flex flex-col">
            <label className="text-c-grey-50">Course Description</label>
            <textarea 
              value={overviewData.course_description}
              onChange={(e) => setOverviewData({...overviewData, course_description: e.target.value})} 
              placeholder="Input Course Description" 
              className="h-24 border-2 rounded-md resize-none p-2"></textarea>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Category / Department</label>
            <select 
              value={overviewData.department} 
              onChange={(e) => setOverviewData({...overviewData, department: e.target.value as 'IT' | 'EOD' | 'AFD' | 'RIM' | 'EMU' | ''})} 
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
              value={overviewData.visibility} 
              onChange={(e) => setOverviewData({...overviewData, visibility: e.target.value as 'public' | 'private' | ''})} 
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