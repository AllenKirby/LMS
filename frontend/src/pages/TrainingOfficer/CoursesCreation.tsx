import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import ExternalTrainingForm from "./ExternalTrainingComponent/ExternalTrainingForm";
import store from "../../redux/store";
import { ConfirmationModal } from "../../Components";
import { useTrainingOfficerHook } from "../../hooks";

import { useDispatch, useSelector } from "react-redux";
import { resetCourseData, updateField } from "../../redux/CourseDataRedux";
import { resetCourseContent } from "../../redux/CourseContentDataRedux";
import { resetCourseID } from "../../redux/CourseIDRedux";
import { resetModuleData } from "../../redux/ModuleDataRedux";
import {resetIDs} from '../../redux/IDsRedux'

import { FaCircleCheck } from "react-icons/fa6";

import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io";

interface CourseData {
  cover_image_upload: File;
  course_title: string;
  course_description: string;
  department: "IT" | "EOD" | "AFD" | "RIM" | "EMU" | "";
  visibility: "public" | "private" | "";
  participants: string[];
  submitted: true | false
}

const Courses: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [activeSection, setActiveState] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const courseID = useSelector((state: {courseID: number}) => state.courseID)
  const courseOverviewData = useSelector(
    (state: { courseData: CourseData }) => state.courseData
  );
  const courseAction = useSelector(
    (state: { courseAction: string }) => state.courseAction)
  const { handleAddCourse, handleUpdateCourse, publishCourse } = useTrainingOfficerHook();

  const modal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirmToggle = () => {
    setConfirmationOpen(!isConfirmationOpen);
  };

  const handleNavigationRequest = (path: string) => {
    setPendingNavigation(path);
    setConfirmationOpen(true);
  };

  const handlePublish = async() => {
    await publishCourse(courseID)
    dispatch(resetCourseData())
    dispatch(resetCourseContent())
    dispatch(resetCourseID())
    dispatch(resetModuleData())
    navigate('/trainingofficer/courses/course')
  }

  const handleConfirmNavigation = async () => {
    if (pendingNavigation) {
      if(courseOverviewData.submitted) {
        await handleUpdateCourse(courseID, courseOverviewData)
      } else {
        dispatch(updateField({name: 'submitted', value: true}))

        await new Promise((resolve) => setTimeout(resolve, 0));

      // Get the updated state from Redux
        const updatedCourseOverviewData = store.getState().courseData;
        await handleAddCourse(updatedCourseOverviewData);
      }
      navigate(pendingNavigation);
      setActiveState(pendingNavigation);
      setPendingNavigation(null);
    }
    setConfirmationOpen(false);
  };

  useEffect(() => {
    setActiveState(location.pathname);
  }, [location]);

  const stepPaths = [
    "/trainingofficer/courses/courseCreation/courseOverview",
    "/trainingofficer/courses/courseCreation/courseParticipants",
    "/trainingofficer/courses/courseCreation/courseContent",
    "/trainingofficer/courses/courseCreation/preview",
  ];
  
  const steps = [
    { title: "Course Overview", next: "Select Participant" },
    { title: "Select Participant", next: "Course Creation" },
    { title: "Course Creation", next: "Preview" },
    { title: "Preview", next: "" },
  ];

  const currentStepIndex = stepPaths.indexOf(location.pathname);

  const handleBack = () => {
    dispatch(resetCourseData())
    dispatch(resetCourseContent())
    dispatch(resetCourseID())
    dispatch(resetModuleData())
    dispatch(resetIDs())
    navigate('/trainingofficer/courses/course')
  }

  return (
    <section className="w-full h-screen top-0 left-0 fixed inset-1 flex flex-col bg-content-bg">
      <header className="w-full h-fit">
        <section className="w-full h-fit flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-1">
            <button onClick={handleBack}>
              <IoIosArrowRoundBack size={24} />
            </button>
            <h6 className="text-p-lg font-medium">{courseAction === 'create' ? 'Create Course' : 'Edit Course'}</h6>
          </div>
          <div className="flex items-center gap-2 w-1/6">
            <p className="text-c-grey-50">Step {currentStepIndex + 1}:</p>
            <p className="flex items-center gap-1 font-medium text-c-green-50">
              <FaCircleCheck size={16} className="text-c-blue-50" />{" "}
              {steps[currentStepIndex].title}
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 w-2/5">
            <p className="text-p-sm text-c-grey-50">
              {steps[currentStepIndex].next ? `Next: ${steps[currentStepIndex].next}` : ""}
            </p>
            <nav className="flex items-center gap-2 border-l border-c-grey-20 pl-3">
              <button
                className="px-2 py-2 rounded-md bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  window.history.back();
                }}
                disabled={activeSection === "/trainingofficer/courses/courseCreation/courseOverview"}
              >
                <IoIosArrowBack />
              </button>
              <section>
                {activeSection === "/trainingofficer/courses/courseCreation/courseOverview" && 
                  <button 
                    className="px-3 py-1 rounded-md bg-c-blue-50 text-f-light"
                  >
                    <NavLink to="courseParticipants">Continue</NavLink>
                  </button>
                }
                {activeSection === "/trainingofficer/courses/courseCreation/courseParticipants" && 
                  <button 
                    disabled={!courseOverviewData}
                    className={`px-3 py-1 rounded-md bg-c-blue-50 text-f-light 
                              ${!courseOverviewData && "cursor-not-allowed opacity-50"}`}
                    onClick={() => 
                      handleNavigationRequest(
                        "/trainingofficer/courses/courseCreation/courseContent"
                      )                      
                    }
                    >
                      Continue
                  </button>
                }
                {activeSection === "/trainingofficer/courses/courseCreation/courseContent" && 
                  <button 
                    className="px-3 py-1 rounded-md bg-c-blue-50 text-f-light"
                  >
                    <NavLink to="preview">Continue</NavLink>
                  </button>
                }
                {activeSection === "/trainingofficer/courses/courseCreation/preview" && 
                  <button 
                    className="px-3 py-1 rounded-md bg-c-blue-50 text-f-light"
                    onClick={handlePublish}
                  >
                    Publish Course
                  </button>
                }
              </section>
            </nav>
          </div>
        </section>
        <div className="w-full h-1 flex gap-1">
          {steps.map((_, index) => (
            <div key={index} className={`flex-1 h-1 rounded-full ${index <= currentStepIndex ? "bg-c-green-50" : "bg-c-grey-10"}`}></div>
          ))}
        </div>
      </header>
      <div className="w-full flex-1 overflow-y-auto">
        <Outlet />
      </div>
      {isModalOpen && <ExternalTrainingForm modal={modal} flag={false}/>}
      {isConfirmationOpen && (
        <ConfirmationModal
          onClose={handleConfirmToggle}
          onConfirm={handleConfirmNavigation}
          title="Save Draft?"
          label="Your changes will be saved as a draft. You can continue editing later."
        />
      )}
    </section>
  );
};

export default Courses;
