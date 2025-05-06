import { useEffect, useState } from "react";
import { FiEdit2, FiUpload } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../redux/CourseDataRedux";
import { CourseData } from "../../../types/CourseCreationTypes";

const departments = ["IT", "EOD", "AFD", "RIM", "EMU"];

const CourseOverview = () => {
  const dispatch = useDispatch();
  const courseData = useSelector((state: { courseData: CourseData }) => state.courseData);
  const API_URL = import.meta.env.VITE_URL;

  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.[0]) {
      const file = target.files[0];
      dispatch(updateField({ name: "cover_image_upload", value: file }));
    }
  };

  const uploadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg, .jpeg";
    input.addEventListener("change", handleImageUpload);
    input.click();
  };

  type Department = "IT" | "EOD" | "AFD" | "RIM" | "EMU" | "";

  const toggleDepartment = (dept: Department) => {
    const newSelection = courseData.department.includes(dept)
      ? courseData.department.filter((d) => d !== dept)
      : [...courseData.department, dept];

    dispatch(updateField({ name: "department", value: newSelection }));
  };


  useEffect(() => console.log(courseData), [courseData]);

  return (
    <section className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center overflow-y-auto">
        <section className="w-1/2 h-fit p-5 border border-c-grey-500 rounded-md bg-white">
          <div>
            <h1 className="text-h-h6 font-medium pb-3">Course Overview</h1>
          </div>

          {/* Cover Image */}
          <div className="w-full h-[200px] overflow-hidden relative">
            {(courseData.cover_image_upload || courseData.cover_image_url) ? (
              <div>
                <img
                  className="w-full h-full object-cover"
                  src={
                    courseData.cover_image_upload instanceof File
                      ? URL.createObjectURL(courseData.cover_image_upload)
                      : courseData.cover_image_url
                      ? `${API_URL}${courseData.cover_image_url}`
                      : ""
                  }
                  alt="Cover"
                />
                <button onClick={uploadFile} className="absolute right-5 top-5 bg-white p-2 rounded-md">
                  <FiUpload size={20} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-c-grey-20 rounded-md">
                <button onClick={uploadFile} className="w-full h-full flex flex-col items-center justify-center">
                  <FiUpload size={44} />
                  <p className="font-medium">Upload Cover Image</p>
                  <p className="text-c-grey-50">(Max. 20mb, Landscape)</p>
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="w-full flex items-center justify-between mt-5">
            <input
              type="text"
              value={courseData.course_title}
              onChange={(e) => dispatch(updateField({ name: "course_title", value: e.target.value }))}
              className="bg-transparent p-1 text-h-h6 outline-none border-b focus:border-c-green-20 w-full"
              placeholder="Course Title"
            />
            <FiEdit2 size={20} />
          </div>

          {/* Description */}
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Course Description</label>
            <textarea
              value={courseData.course_description}
              onChange={(e) => dispatch(updateField({ name: "course_description", value: e.target.value }))}
              placeholder="Input Course Description"
              className="mt-1 h-24 border rounded-md resize-none p-2 hover:border-c-grey-10 outline-c-green-30"
            />
          </div>

          {/* Department Multi-Select */}
          <div className="flex flex-col mt-5 relative">
            <label className="text-c-grey-50">Category / Department</label>
            <button
              onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
              className="mt-1 px-3 py-2 border rounded-md w-full flex items-center justify-between hover:border-c-grey-10 outline-c-green-30"
            >
              <span className="text-left">
                {Array.isArray(courseData.department) && courseData.department.length > 0
                  ? courseData.department.join(", ")
                  : "Select Department"}
              </span>
              <FaAngleDown size={16} />
            </button>
            {deptDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}/>
                <div className="absolute top-full mt-1 z-40 bg-white border rounded-md shadow-md w-full max-h-40 overflow-y-auto">
                  {departments.map((dept) => (
                    <>
                      <label key={dept} className="z-50 flex items-center gap-2 px-3 py-2 hover:bg-c-grey-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer hidden"
                          checked={courseData.department.includes(dept as Department)}
                          onChange={() => toggleDepartment(dept  as Department)}
                        /> 
                        <div className="w-full px-2 py-1 rounded-md transition-all peer-checked:bg-blue-500 peer-checked:text-white mb-1">
                            {dept}
                        </div>
                      </label>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Visibility */}
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Visibility Option</label>
            <select
              value={courseData.visibility}
              onChange={(e) => dispatch(updateField({ name: "visibility", value: e.target.value as "public" | "private" }))}
              className="mt-1 px-3 py-2 border rounded-md w-full h-fit hover:border-c-grey-10 outline-c-green-30"
            >
              <option value="" disabled>Select Visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CourseOverview;
