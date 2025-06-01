import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import CourseEvaluateCard from "./CourseEvaluateCard";
import TrainingEvaluateCard from "./TrainingEvaluateCard";

//Styling
import { TabButton } from "../../assets/Util/ButtonStyle";
import { PageSpacing } from "../../assets/Util/Spacing";
import { SearchBar } from "../../assets/Util/InputStyle";

const Reviewer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Course");
  const [activeTab, setActiveTab] = useState<string>(selectedTab);
  const [search, setSearch] = useState<{ courses: string; trainings: string }>({
    courses: "",
    trainings: "",
  });
  const { default: tabDefault, active: tabActive } = TabButton;

  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => setActiveTab(selectedTab));
    } else {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  return (
    <section className={`${PageSpacing} flex-col`}>
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-h-h6 font-medium">{selectedTab}</h1>
        <section className="flex items-center relative">
          <FiSearch size={20} className="absolute left-3 text-c-grey-50" />
          <input
            type="text"
            className={SearchBar}
            value={activeTab === "Course" ? search.courses : search.trainings}
            onChange={(e) => {
              const value = e.target.value;
              if (activeTab === "Course") {
                setSearch({ ...search, courses: value });
              } else {
                setSearch({ ...search, trainings: value });
              }
            }}
            placeholder={
              activeTab === "Course"
                ? "Search Course Title"
                : "Search Training Title"
            }
          />
        </section>
      </header>
      <nav className="w-full flex border-b">
        <button
          className={`${tabDefault} ${selectedTab === "Course" && tabActive}`}
          onClick={() => setSelectedTab("Course")}
        >
          Courses
        </button>
        <button
          className={`${tabDefault} ${
            selectedTab === "External Training" && tabActive
          }`}
          onClick={() => setSelectedTab("External Training")}
        >
          External Training
        </button>
      </nav>
      <main className="w-full flex-1  overflow-y-auto">
        <div className="w-full grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
          {activeTab === "Course" && <CourseEvaluateCard />}
          {activeTab === "External Training" && <TrainingEvaluateCard />}
        </div>
      </main>
    </section>
  );
};

export default Reviewer;
