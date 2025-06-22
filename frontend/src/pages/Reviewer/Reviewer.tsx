import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from 'react-redux'

import CourseEvaluateCard from "./CourseEvaluateCard";
import TrainingEvaluateCard from "./TrainingEvaluateCard";
import { CourseData, TrainingDataState } from '../../types/CourseCreationTypes'

//Styling
import { TabButton } from "../../assets/Util/ButtonStyle";
import { PageSpacing } from "../../assets/Util/Spacing";
import { SearchBar } from "../../assets/Util/InputStyle";
import { Outlet } from "react-router-dom";

const Reviewer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'Course' | 'External Training'>("Course");
  const [activeTab, setActiveTab] = useState<string>(selectedTab);
  const [search, setSearch] = useState<string>('');
  const { default: tabDefault, active: tabActive } = TabButton;
  const courses = useSelector((state: {courses: CourseData[]}) => state.courses)
  const externalTrainings = useSelector((state: {externalTrainingData: TrainingDataState[]}) => state.externalTrainingData 
    );

  console.log(courses)
  console.log(externalTrainings)

  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => setActiveTab(selectedTab));
    } else {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  const searchTitle = (programArray: CourseData[] | TrainingDataState[], tab: 'Course' | 'External Training') => {
    if(tab === 'Course') {
      if(search.trim() === '') {
        return programArray;
      } else{
        const searchResult =  programArray.filter(course => (course as CourseData).course_title.toLowerCase().includes(search.toLowerCase()));
        if(searchResult && searchResult.length > 0) {
          return searchResult;
        } else {
          return [];
        }
      }
    } else {
      if(search.trim() === '') {
        return programArray;
      } else{
        const searchResult =  programArray.filter(training => (training as TrainingDataState).training_title.toLowerCase().includes(search.toLowerCase()));
        if(searchResult && searchResult.length > 0) {
          return searchResult;
        } else {
          return [];
        }
      }
    }
  }

  return (
    <section className={`${PageSpacing} flex-col`}>
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-h-h6 font-medium">{selectedTab}</h1>
        <section className="flex items-center relative">
          <FiSearch size={20} className="absolute left-3 text-c-grey-50" />
          <input
            type="text"
            className={SearchBar}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
          {activeTab === "Course" && 
            searchTitle(courses, selectedTab).map((course, index) => (
              <CourseEvaluateCard key={index} data={course as CourseData}/>
            ))
          }
          {activeTab === "External Training" && 
            searchTitle(externalTrainings, selectedTab).map((training, index) => (
              <TrainingEvaluateCard key={index} data={training as TrainingDataState}/>
            ))
          }
        </div>
      </main>
      <Outlet/>
    </section>
  );
};

export default Reviewer;
