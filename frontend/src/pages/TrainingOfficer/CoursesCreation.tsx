import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import ExternalTrainingForm from "./ExternalTrainingComponent/ExternalTrainingForm";
import { ConfirmationModal } from "../../Components";
import { useTrainingOfficerHook } from "../../hooks";

import { useSelector } from "react-redux";

import { GoLock } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";

import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io";

interface CourseData {
  cover_image_upload: string;
  course_title: string;
  course_description: string;
  department: "IT" | "EOD" | "AFD" | "RIM" | "EMU" | "";
  visibility: "public" | "private" | "";
}

const Courses: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveState] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const courseOverviewData = useSelector(
    (state: { courseData: CourseData }) => state.courseData
  );
  const { handleAddCourse } = useTrainingOfficerHook();

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

  const handleConfirmNavigation = async () => {
    if (pendingNavigation) {
      await handleAddCourse(courseOverviewData);
      navigate(pendingNavigation);
      setActiveState(pendingNavigation);
      setPendingNavigation(null);
    }
    setConfirmationOpen(false);
  };

  useEffect(() => {
    setActiveState(location.pathname);
  }, [location]);

  const [count, setCount] = useState<number>(0);
  const steps = [
    {
      title: "Course Overview",
      next: "Select Participant",
      path: "courseParticipants",
    },
    {
      title: "Select Participant",
      next: "Course Creation",
      path: "/trainingofficer/courses/courseCreation/courseContent",
    },
    { title: "Course Creation", next: "Preview", path: "preview" },
    { title: "Preview", next: "", path: "" },
  ];

  return (
    <section className="w-full h-full flex flex-col">
      <header className="w-full h-fit">
        <section className="w-full h-fit flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-1">
            <button onClick={() => window.history.back()}>
              <IoIosArrowRoundBack size={24} />
            </button>
            <h6 className="text-p-lg font-medium">Create Course</h6>
          </div>
          <div className="flex items-center gap-2 w-1/6">
            <p className="text-c-grey-50">Step {count + 1}:</p>
            <p className="flex items-center gap-1 font-medium text-c-green-50">
              <FaCircleCheck size={16} className="text-c-blue-50" />{" "}
              {steps[count].title}
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 w-1/5">
            <p className="text-p-sm text-c-grey-50">
              {steps[count].next ? `Next: ${steps[count].next}` : ""}
            </p>
            <nav className="flex items-center gap-2 border-l border-c-grey-20 pl-3">
              <button
                className="px-2 py-2 rounded-md bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setCount((prevCount) => prevCount - 1);
                  window.history.back();
                }}
                disabled={count === 0}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="px-3 py-1 rounded-md bg-c-blue-50 text-f-light"
                disabled={count === 3}
              >
                {count === 0 && (
                  <NavLink
                    to="courseParticipants"
                    onClick={() => setCount((prevCount) => prevCount + 1)}
                  >
                    Continue
                  </NavLink>
                )}
                {count === 1 && (
                  <button
                    disabled={!courseOverviewData}
                    onClick={() => {
                      handleNavigationRequest(
                        "/trainingofficer/courses/courseCreation/courseContent"
                      );
                      setCount((prevCount) => prevCount + 1);
                    }}
                  >
                    Continue
                  </button>
                )}
                {count === 2 && (
                  <NavLink
                    to="preview"
                    onClick={() => setCount((prevCount) => prevCount + 1)}
                  >
                    Continue
                  </NavLink>
                )}
                {count === 3 && <button onClick={modal}>Publish Course</button>}
              </button>
            </nav>
          </div>
        </section>
        <section className="w-full h-fit flex gap-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index <= count ? "bg-c-green-50" : "bg-c-grey-10"
              }`}
            ></div>
          ))}
        </section>
      </header>
      <header className="w-full h-auto pt-5 px-7 border-b-2">
        <div className="w-full flex items-center justify-between text-p-rg py-2">
          <nav>
            <ul className="flex text-p-sm">
              <button
                className={`px-3 py-2 flex items-center gap-1 ${
                  activeSection ===
                  "/trainingofficer/courses/courseCreation/courseOverview"
                    ? "border-2 rounded-md bg-c-grey-5 border-c-blue-50 font-medium text-c-blue-50"
                    : "text-c-grey-50"
                }
              `}
              >
                {courseOverviewData ? (
                  <FaCircleCheck size={16} className="text-c-blue-50" />
                ) : (
                  <FaCircleCheck size={16} className="text-c-grey-30" />
                )}{" "}
                <NavLink to="courseOverview"> Course Overview</NavLink>
              </button>
              <button
                disabled={!courseOverviewData}
                className={`px-3 py-2 flex items-center gap-1 ${
                  activeSection ===
                  "/trainingofficer/courses/courseCreation/courseContent"
                    ? "border-2 rounded-md bg-c-grey-5 border-c-blue-50 font-medium text-c-blue-50"
                    : "text-c-grey-50"
                } 
                  ${
                    courseOverviewData ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                onClick={() =>
                  handleNavigationRequest(
                    "/trainingofficer/courses/courseCreation/courseContent"
                  )
                }
              >
                {courseOverviewData ? (
                  <FaCircleCheck size={16} className="text-c-blue-50" />
                ) : (
                  <GoLock size={16} />
                )}{" "}
                Course Content
              </button>
              <button
                className={`px-3 py-2 flex items-center gap-1 ${
                  activeSection ===
                  "/trainingofficer/courses/courseCreation/preview"
                    ? "border-2 rounded-md bg-c-grey-5 border-c-blue-50 font-medium text-c-blue-50"
                    : "text-c-grey-50"
                }
              `}
              >
                <GoLock size={16} />
                <NavLink to="preview">Preview</NavLink>
              </button>
            </ul>
          </nav>
          <button onClick={modal}>Upload Course</button>
        </div>
      </header>
      <div className="w-full flex-1 overflow-y-auto py-7 px-10">
        <Outlet />
      </div>
      {isModalOpen && <ExternalTrainingForm modal={modal} />}
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
