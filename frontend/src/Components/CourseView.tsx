import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  MenuDataState,
  CoursesState,
  CourseData,
} from "../types/CourseCreationTypes";
import { UserState } from "../types/UserTypes";
import { useTraineeHook, useTrainingOfficerHook } from "../hooks/";
import { TrainingEvaluationRecord } from "./Trainee Components";
import { CourseContentOverview } from "./";
import { CiSquareInfo, CiCalendar, CiUser } from "react-icons/ci";
import { FiEdit2, FiTrash2, FiArrowLeft, FiFile } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import CourseIMG from "../assets/course-img.png";
import { useEffect, useState } from "react";
import { setCourseData } from "../redux/CourseDataRedux";
import { setID } from "../redux/CourseIDRedux";
import { setAction } from "../redux/CourseActionRedux";
import { deleteCourseRedux } from '../redux/CoursesRedux';

interface TraineeCourses {
  course: CoursesState;
  participant_status: "in progress" | "pending" | "completed";
}

const CourseView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_URL;
  const user = useSelector((state: { user: UserState }) => state.user);
  const courses = useSelector(
    (state: { courses: TraineeCourses[] | CoursesState[] }) => state.courses
  );
  const [selectedCourse, setSelectedCourse] = useState<
    TraineeCourses | CoursesState
  >({
    course: {
      id: 0,
      course_title: "",
      course_description: "",
      department: [],
      visibility: "",
      cover_image_url: "",
      created_at: "",
      course_status: "",
      participants_display: [],
      submitted: true,
    },
    participant_status: "pending",
  });
  const [menus, setMenus] = useState<MenuDataState[]>([]);
  const { getCourse, updateCourseStatus } = useTraineeHook();
  const { deleteCourse } = useTrainingOfficerHook();
  const [viewEvaluation, setViewEvaluation] = useState<boolean>(false);

  useEffect(() => {
    const getCourseDetails = async () => {
      if (id) {
        const response = await getCourse(Number(id));
        setMenus(response);
        const filteredCourse = courses.find((item) =>
          user.user.role === "trainee"
            ? (item as TraineeCourses).course.id === Number(id)
            : (item as CoursesState).id === Number(id)
        );
        if (filteredCourse) {
          setSelectedCourse(filteredCourse as TraineeCourses | CoursesState);
        }
      }
    };
    getCourseDetails();
  }, [id, courses]);

  const removeCourse = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      dispatch(deleteCourseRedux(id));
      window.history.back();
    }
  };

  const editCourse = () => {
    navigate("../courseCreation/courseOverview");
    dispatch(setID((selectedCourse as CoursesState).id));
    dispatch(setCourseData(selectedCourse as CourseData));
    dispatch(setAction("update"));
  };

  const takeCourse = async () => {
    const finalID = `${id}|${(selectedCourse as TraineeCourses).course.course_title}`;
    await updateCourseStatus(
      (selectedCourse as TraineeCourses).course.id,
      user.user.id,
      { participant_status: "in progress" }
    );
    navigate(`/trainee/mycourses/${finalID}/learn`);
  };

  const openEvaluation = () => {
    setViewEvaluation(!viewEvaluation);
  };

  const isTraineeCourse = (course: TraineeCourses | CoursesState): course is TraineeCourses => {
    return (course as TraineeCourses).course !== undefined;
  };

  const getCourseStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      "in progress": "bg-blue-100 text-blue-800",
      "pending": "bg-yellow-100 text-yellow-800",
      "completed": "bg-green-100 text-green-800",
      "draft": "bg-gray-100 text-gray-800",
      "published": "bg-purple-100 text-purple-800"
    };
    
    const statusClass = statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <section className="w-full h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden min-h-full">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-c-green-60 to-c-green-80 p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 hover:bg-c-green-70 p-2 rounded-lg transition-colors"
            >
              <FiArrowLeft size={20} />
              <span className="font-medium">Back to Courses</span>
            </button>
            
            <div className="flex gap-3">
              {user.user.role === "training_officer" && (
                <>
                  <button
                    onClick={editCourse}
                    className="flex items-center gap-2 bg-white text-c-green-70 px-4 py-2 rounded-lg font-medium hover:bg-c-green-5 transition-colors"
                  >
                    <FiEdit2 size={18} />
                    Edit Course
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/trainingofficer/courses/viewresponses/${(selectedCourse as CoursesState).id}`)
                    }
                    className="flex items-center gap-2 bg-transparent border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-c-green-70 transition-colors"
                  >
                    <FiFile size={18} />
                    View Responses
                  </button>
                  <button
                    onClick={() => removeCourse((selectedCourse as CoursesState).id)}
                    className="flex items-center gap-2 bg-transparent border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-c-green-70 transition-colors"
                  >
                    <FiTrash2 size={18} />
                    Delete
                  </button>
                </>
              )}
              {user.user.role === "trainee" && (
                <button
                  onClick={takeCourse}
                  disabled={(selectedCourse as TraineeCourses).participant_status === "completed"}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${
                    (selectedCourse as TraineeCourses).participant_status === "completed"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white text-c-green-70 hover:bg-c-green-5"
                  }`}
                >
                  {(selectedCourse as TraineeCourses).participant_status === "pending"
                    ? "Start Course"
                    : (selectedCourse as TraineeCourses).participant_status === "in progress"
                    ? "Continue Learning"
                    : "Course Completed"}
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                {user.user.role === "trainee"
                  ? (selectedCourse as TraineeCourses).course.course_title
                  : (selectedCourse as CoursesState).course_title}
              </h1>
              {user.user.role === 'trainee' && getCourseStatusBadge((selectedCourse as TraineeCourses).participant_status)}
            </div>
            
            <p className="text-c-green-10 max-w-3xl">
              {user.user.role === "trainee"
                ? (selectedCourse as TraineeCourses).course.course_description
                : (selectedCourse as CoursesState).course_description}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="w-full md:w-2/3 p-8 border-r">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {user.user.role === "trainee"
                  ? (selectedCourse as TraineeCourses).course.course_description
                  : (selectedCourse as CoursesState).course_description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Content</h2>
              <CourseContentOverview courseContent={menus} page="viewcourse" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-6 bg-gray-50">
            <div className="mb-6">
              <img
                src={
                  (selectedCourse as TraineeCourses)?.course?.cover_image_url || 
                  (selectedCourse as CoursesState)?.cover_image_url 
                    ? `${API_URL}${
                        user.user.role === "trainee"
                          ? (selectedCourse as TraineeCourses).course.cover_image_url
                          : (selectedCourse as CoursesState).cover_image_url
                      }` 
                    : CourseIMG
                }
                alt="Course Cover"
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-700 mb-3">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CiSquareInfo className="text-c-green-50 mt-1" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm font-medium">
                        {(() => {
                          const dept = user.user.role === "trainee"
                            ? (selectedCourse as TraineeCourses).course.department
                            : (selectedCourse as CoursesState).department;
                          return Array.isArray(dept) ? dept.join(", ") : String(dept);
                        })()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CiCalendar className="text-c-green-50 mt-1" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Created Date</p>
                      <p className="text-sm font-medium">
                        {new Date(
                          user.user.role === "trainee"
                            ? (selectedCourse as TraineeCourses).course.created_at
                            : (selectedCourse as CoursesState).created_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CiUser className="text-c-green-50 mt-1" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Visibility</p>
                      <p className="text-sm font-medium">
                        {user.user.role === "trainee"
                          ? (selectedCourse as TraineeCourses)?.course?.visibility
                              ?.charAt(0)
                              ?.toUpperCase() +
                            (selectedCourse as TraineeCourses)?.course?.visibility?.slice(1)
                          : (selectedCourse as CoursesState)?.visibility
                              ?.charAt(0)
                              ?.toUpperCase() +
                            (selectedCourse as CoursesState)?.visibility?.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-700">
                    Participants ({isTraineeCourse(selectedCourse) 
                      ? selectedCourse.course.participants_display.length 
                      : selectedCourse.participants_display.length})
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={openEvaluation}
                      className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                    >
                      <HiOutlineChartBar size={14} />
                      Standings
                    </button>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 text-gray-500 font-medium">Name</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-medium">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {user.user.role === "trainee"
                        ? (
                            selectedCourse as TraineeCourses
                          ).course.participants_display?.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-2 px-3">{`${item.first_name} ${item.last_name}`}</td>
                              <td className="py-2 px-3">{item.department}</td>
                            </tr>
                          ))
                        : (selectedCourse as CoursesState).participants_display?.map(
                            (item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-3">{`${item.first_name} ${item.last_name}`}</td>
                                <td className="py-2 px-3">{item.department}</td>
                              </tr>
                            )
                          )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewEvaluation && (
        <TrainingEvaluationRecord 
          modal={openEvaluation} 
          courseID={(selectedCourse as CoursesState).id}
        />
      )}
    </section>
  );
};

export default CourseView;