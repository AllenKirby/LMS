import { useState, useEffect } from "react";
import { CourseCard } from "../../Components";
import { TrainingCard } from "./CourseComponent";
import { FiSearch } from "react-icons/fi";
import ExternalTrainingForm from "./ExternalTrainingComponent/ExternalTrainingForm";

//Styling
import { PrimaryRegularA, TabButton } from "../../assets/Util/ButtonStyle";
import { PageSpacing } from "../../assets/Util/Spacing";
import { SearchBar } from "../../assets/Util/InputStyle";
import { useNavigate } from "react-router-dom";

const Course: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Course");
  const [activeTab, setActiveTab] = useState<string>(selectedTab);
  const [isTrainingModalOpen, setTrainingModalOpen] = useState<boolean>(false);
  const { default: tabDefault, active: tabActive } = TabButton;
  const navigate = useNavigate()

  const handleToggle = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() =>
        setTrainingModalOpen(!isTrainingModalOpen)
      );
    } else {
      setTrainingModalOpen(!isTrainingModalOpen);
    }
  };

  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => setActiveTab(selectedTab));
    } else {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  return (
    <section className={`${PageSpacing} flex-col`}>
      <header className="flex justify-between items-center">
        <h1 className="text-h-h6 font-medium">{selectedTab}</h1>
        <div className="flex gap-3">
          <select
            name="Categories"
            className="px-3 py-2 border rounded-md h-fit w-40 truncate "
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="FA">For All</option>
            <option value="EOD">EOD</option>
            <option value="EMU">EMU</option>
          </select>
          <section className="flex items-center relative">
            <FiSearch size={20} className="absolute left-3 text-c-grey-50" />
            <input
              type="text"
              className={SearchBar}
              placeholder="Search course"
            />
          </section>
          <button
            className={PrimaryRegularA}
            onClick={() => {
              if (activeTab === "Course") {
                navigate('../courseCreation/courseOverview')
              } else if (activeTab === "External Training") {
                handleToggle();
              }
            }}
          >
            {activeTab === "Course" ? "Create Course" : "New Training"}
          </button>
        </div>
      </header>
      <nav className="w-full flex border-b">
        <button
          className={`${tabDefault} ${
            selectedTab === "Course" &&
            tabActive
          }`}
          onClick={() => setSelectedTab("Course")}
        >
          Courses
        </button>
        <button
         className={`${tabDefault} ${
            selectedTab === "External Training" &&
            tabActive
          }`}
          onClick={() => setSelectedTab("External Training")}
        >
          External Training
        </button>
      </nav>
      <main className="w-full flex-1  overflow-y-auto">
        <>
          {activeTab === "Course" && <CourseCard />}
        </>
        <section className="w-full grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
          {activeTab === "External Training" && <TrainingCard />}
        </section>
      </main>
      {isTrainingModalOpen && <ExternalTrainingForm modal={handleToggle} flag={false}/>}
    </section>
  );
};

export default Course;
