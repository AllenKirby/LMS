import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEdit2, FiUpload } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../redux/CourseDataRedux";
import { CourseData } from "../../../types/CourseCreationTypes";

const departments = ["" , "RO" , "EOD" , "AFD"];

// Define validation schema
const schema = yup.object().shape({
  course_title: yup.string().required("Course title is required"),
  course_description: yup.string().required("Course description is required"),
  visibility: yup.string().required("Visibility option is required"),
});

const CourseOverview = () => {
  const dispatch = useDispatch();
  const courseData = useSelector(
    (state: { courseData: CourseData }) => state.courseData
  );
  const API_URL = import.meta.env.VITE_URL;

  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      course_title: courseData.course_title,
      course_description: courseData.course_description,
      visibility: courseData.visibility,
    },
  });

  // Update form values when courseData changes
  useEffect(() => {
    setValue("course_title", courseData.course_title);
    setValue("course_description", courseData.course_description);
    setValue("visibility", courseData.visibility);
  }, [courseData, setValue]);

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

  type Department = "" | "RO" | "EOD" | "AFD";

  const toggleDepartment = (dept: Department) => {
    const newSelection = courseData.department.includes(dept)
      ? courseData.department.filter((d) => d !== dept)
      : [...courseData.department, dept];

    dispatch(updateField({ name: "department", value: newSelection }));
  };

  // Handle field changes with validation
  const handleFieldChange = async (
    fieldName: keyof typeof schema.fields,
    value: string
  ) => {
    dispatch(updateField({ name: fieldName, value }));
    setValue(fieldName, value);
    await trigger(fieldName);
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
            {courseData.cover_image_upload || courseData.cover_image_url ? (
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
                <button
                  onClick={uploadFile}
                  className="absolute right-5 top-5 bg-white p-2 rounded-md"
                >
                  <FiUpload size={20} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-c-grey-20 rounded-md">
                <button
                  onClick={uploadFile}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <FiUpload size={44} />
                  <p className="font-medium">Upload Cover Image</p>
                  <p className="text-c-grey-50">(Max. 20mb, Landscape)</p>
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="w-full flex items-center justify-between mt-5">
            <div className="w-full">
              <input
                type="text"
                {...register("course_title")}
                value={courseData.course_title}
                onChange={(e) =>
                  handleFieldChange("course_title", e.target.value)
                }
                className="bg-transparent p-1 text-h-h6 outline-none border-b focus:border-c-green-20 w-full"
                placeholder="Course Title"
              />
              {errors.course_title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.course_title.message}
                </p>
              )}
            </div>
            <FiEdit2 size={20} />
          </div>

          {/* Description */}
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Course Description</label>
            <textarea
              {...register("course_description")}
              value={courseData.course_description}
              onChange={(e) =>
                handleFieldChange("course_description", e.target.value)
              }
              placeholder="Input Course Description"
              className="mt-1 h-24 border rounded-md resize-none p-2 hover:border-c-grey-10 outline-c-green-30"
            />
            {errors.course_description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course_description.message}
              </p>
            )}
          </div>

          {/* Department Multi-Select */}
          <div className="flex flex-col mt-5 relative">
            <label className="text-c-grey-50">Category / Department</label>
            <button
              onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
              className="mt-1 px-3 py-2 border rounded-md w-full flex items-center justify-between hover:border-c-grey-10 outline-c-green-30"
            >
              <span className="text-left">
                {Array.isArray(courseData.department) &&
                courseData.department.length > 0
                  ? courseData.department.join(", ")
                  : "Select Department"}
              </span>
              <FaAngleDown size={16} />
            </button>
            {deptDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                />
                <div className="absolute bottom-12 mt-1 z-40 bg-white border rounded-md shadow-md w-full max-h-40 overflow-y-auto">
                  {departments.map((dept) => (
                    <>
                      <label
                        key={dept}
                        className="z-50 flex items-center gap-2 px-3 py-2 hover:bg-c-grey-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="peer hidden"
                          checked={courseData.department.includes(
                            dept as Department
                          )}
                          onChange={() => toggleDepartment(dept as Department)}
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
              {...register("visibility")}
              value={courseData.visibility}
              onChange={(e) => handleFieldChange("visibility", e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md w-full h-fit hover:border-c-grey-10 outline-c-green-30"
            >
              <option value="" disabled>
                Select Visibility
              </option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {errors.visibility && (
              <p className="text-red-500 text-sm mt-1">
                {errors.visibility.message}
              </p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default CourseOverview;
