import { useState } from "react";
import { useSelector } from "react-redux";

import { CourseCard } from '../../Components/'
import { Outlet, useParams } from "react-router-dom";
import { TrainingCard } from "../TrainingOfficer/CourseComponent";
import { TrainingDataState } from '../../types/CourseCreationTypes'

interface Filters {
  course: boolean;
  externalCourse: boolean;
  all: boolean;
  inProgress: boolean;
  completed: boolean;
  saved: boolean;
  sort: string;
}

const MyCourse = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    course: true,
    externalCourse: true,
    all: false,
    inProgress: false,
    completed: false,
    saved: false,
    sort: "Relevance",
  });
  const externalTrainings = useSelector(
    (state: { externalTrainingData: TrainingDataState[] }) =>
      state.externalTrainingData
  );
  const [activeButtonCourse, setActiveButtonCourse] = useState<string>("");
  const {id} = useParams()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFilters((prev) => ({ ...prev, sort: value }));
  };

  const formatKey = (key: string) => {
    return key
      .replace(/\s(.)/g, (match) => match.toUpperCase()) // Capitalize after space
      .replace(/\s/g, "") // Remove spaces
      .replace(/^(.)/, (match) => match.toLowerCase()); // Ensure first letter is lowercase
  };

  const [collapse, setCollapse] = useState<boolean>(false);
  
  return (
    <>
      {!id ? (
        <section className="w-full h-full flex flex-row gap-5 bg-content-bg">
          <div className={`md:relative absolute ${collapse ? "border-none" : "border-r border-c-grey-20  z-30"} w-fit h-full `}>
            {collapse && <button 
              onClick={() => setCollapse(!collapse)}
              className="bg-red-500 p-3 rounded-full h-fit mt-5 ml-2"
            ></button>}
            <nav
              className={`${
                collapse ? 'w-0 overflow-hidden' : 'w-fit px-10 py-5'
              } h-full flex flex-col gap-5 bg-white`}
            >
              <header className="flex items-center justify-between gap-10">
                <h6 className="text-f-dark text-h-h6 font-semibold">Course Library</h6>
                <button 
                  onClick={() => setCollapse(!collapse)}
                  className="bg-red-500 p-3 rounded-full h-fit"
                ></button>
              </header>
              <section className="w-full flex flex-col gap-3">
                <header className="flex gap-2 items-center border-b pb-3 border-c-grey-20">
                  <div className="p-3 rounded-md bg-c-grey-50 w-fit h-fit"></div>
                  <p className="text-p-lg">Categories</p>
                </header>
                <div className="flex-1 flex flex-col">
                  {["", "EMU", "RID", "EOD", "AFD", "IT"].map((category) => (
                    <button
                      key={category}
                      className={`w-full rounded-md text-p-sm p-2 text-start font-medium ${
                        activeButtonCourse === category
                          ? "bg-c-blue-10 text-f-dark"
                          : "bg-none text-c-grey-50"
                      }`}
                      onClick={() => setActiveButtonCourse(category)}
                    >
                      {!category ? 'All' : category}
                    </button>
                  ))}
                </div>
              </section>
              <section className="w-full flex flex-col gap-3">
                <header className="flex gap-2 items-center border-b pb-3 border-c-grey-20">
                  <div className="p-3 rounded-md bg-c-grey-50 w-fit h-fit"></div>
                  <p className="text-p-lg">Filters</p>
                </header>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="w-full flex flex-col">
                    {["Course", "External Training"].map((category) => (
                      <label
                        key={category}
                        htmlFor={category}
                        className="w-full text-p-sm py-1 text-start flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={category}
                          name={category.toLowerCase().replace(" ", "")}
                          checked={
                            selectedFilters[formatKey(category)  as keyof Filters] as boolean
                          }
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
      
                  {/* Status Filter */}
                  <div className="w-full flex flex-col">
                    <p className="text-p-sm font-medium text-c-green-50">Status</p>
                    {["All", "In Progress", "Completed", "Saved"].map((status) => (
                      <label
                        key={status}
                        htmlFor={status}
                        className="w-full text-p-sm py-1 text-start flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={status}
                          name={status.toLowerCase().replace(" ", "")}
                          checked={
                            selectedFilters[formatKey(status) as keyof Filters] as boolean
                          }
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        {status}
                      </label>
                    ))}
                  </div>
      
                  <div className="w-full flex flex-col">
                    <p className="text-p-sm font-medium text-c-green-50">Sort By</p>
                    {["Relevance", "Latest", "A-Z", "Z-A"].map((filter) => (
                      <label
                        key={filter}
                        htmlFor={filter}
                        className="w-full text-p-sm py-1 text-start flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={filter}
                          name="sort"
                          value={filter}
                          checked={selectedFilters.sort === filter}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        {filter}
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            </nav>
          </div>
          <section className="w-4/5 h-full flex-1 overflow-y-auto px-10 md:px-0">
            {selectedFilters.course && <CourseCard selectedDepartment={activeButtonCourse}/>}
            {selectedFilters.externalCourse && 
              <>
                <h6 className="mt-5 text-p-rg font-semibold text-c-blue-50">External Trainings ({externalTrainings && externalTrainings.length > 0 ? externalTrainings.length : 0})</h6>
                <section className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
                  <TrainingCard/>
                </section>
              </>
            }
          </section>
        </section>
      ): (
        <Outlet/>
      )}
    </>
  );
};

export default MyCourse;
