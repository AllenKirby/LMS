import { useState } from "react";
import { useSelector } from "react-redux";
import { CourseCard } from "../../Components/";
import { Outlet, useParams } from "react-router-dom";
import { TrainingCard } from "../TrainingOfficer/CourseComponent";
import { TrainingDataState } from "../../types/CourseCreationTypes";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { BiCategoryAlt, BiFilterAlt } from "react-icons/bi";

interface Filters {
  course: boolean;
  externalCourse: boolean;
  all: boolean;
  in_progress: boolean;
  completed: boolean;
  saved: boolean;
  sort: string;
}

const MyCourse = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    course: true,
    externalCourse: true,
    all: true,
    in_progress: true,
    completed: true,
    saved: false,
    sort: "Latest",
  });

  const externalTrainings = useSelector(
    (state: { externalTrainingData: TrainingDataState[] }) => state.externalTrainingData
  );

  const [activeButtonCourse, setActiveButtonCourse] = useState<"" | "RO" | "EOD" | "AFD">("");
  const { id } = useParams();
  const [collapse, setCollapse] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFilters((prev) => ({ ...prev, sort: value }));
  };

  const courseTypeOptions: { label: string; key: keyof Filters }[] = [
    { label: "Course", key: "course" },
    { label: "External Training", key: "externalCourse" },
  ];

  const statusOptions: { label: string; key: keyof Filters }[] = [
    { label: "All", key: "all" },
    { label: "In Progress", key: "in_progress" },
    { label: "Completed", key: "completed" },
    { label: "Saved", key: "saved" },
  ];

  return (
    <>
      {!id ? (
        <section className="w-full h-full flex flex-row gap-5 bg-content-bg">
          <div
            className={`md:relative absolute ${
              collapse ? "border-none" : "border-r border-c-grey-20 z-30"
            } w-fit h-full`}
          >
            {collapse && (
              <button
                onClick={() => setCollapse(!collapse)}
                className="rounded-full h-fit mt-4 ml-4 p-2 bg-c-grey-5 hover:bg-c-grey-10"
              >
                <RiExpandRightLine size={20} />
              </button>
            )}
            <nav
              className={`${
                collapse ? "w-0 overflow-hidden" : "w-fit px-10 py-5"
              } h-full flex flex-col overflow-auto gap-5 bg-white`}
            >
              <header className="flex items-center justify-between gap-10">
                <h6 className="text-f-dark text-h-h6 font-semibold">
                  Course Library
                </h6>
                <button
                  onClick={() => setCollapse(!collapse)}
                  className="rounded-full h-fit p-2 bg-c-grey-5 hover:bg-c-grey-10"
                >
                  <RiExpandLeftLine size={20} />
                </button>
              </header>

              {/* Department Filter */}
              <section className="w-full flex flex-col gap-3">
                <header className="flex gap-2 items-center border-b pb-3 border-c-grey-20">
                  <BiCategoryAlt size={20} />
                  <p className="text-p-lg">Categories</p>
                </header>
                <div className="flex-1 flex flex-col">
                  {["" , "RO" , "EOD" , "AFD"].map((category) => (
                    <button
                      key={category}
                      className={`w-full rounded-md text-p-sm p-2 text-start font-medium ${
                        activeButtonCourse === category
                          ? "text-c-blue-50 border border-c-blue-50 bg-c-blue-5"
                          : "bg-none text-c-grey-50"
                      }`}
                      onClick={() => setActiveButtonCourse(category as "" | "RO" | "EOD" | "AFD")}
                    >
                      {!category ? "All" : category}
                    </button>
                  ))}
                </div>
              </section>

              {/* Filter Panel */}
              <section className="w-full flex flex-col gap-3">
                <header className="flex gap-2 items-center border-b pb-3 border-c-grey-20">
                  <BiFilterAlt size={20} />
                  <p className="text-p-lg">Filters</p>
                </header>
                <div className="flex-1 flex flex-col gap-2">
                  {/* Course Type Checkboxes */}
                  <div className="w-full flex flex-col">
                    {courseTypeOptions.map(({ label, key }) => (
                      <label
                        key={label}
                        htmlFor={label}
                        className="w-full text-p-sm py-1 text-start flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={label}
                          name={key}
                          checked={Boolean(selectedFilters[key])}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        {label}
                      </label>
                    ))}
                  </div>

                  {/* Status Checkboxes */}
                  <div className="w-full flex flex-col">
                    <p className="text-p-sm font-medium text-c-green-50">Status</p>
                    {statusOptions.map(({ label, key }) => (
                      <label
                        key={label}
                        htmlFor={label}
                        className="w-full text-p-sm py-1 text-start flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={label}
                          name={key}
                          checked={Boolean(selectedFilters[key])}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        {label}
                      </label>
                    ))}
                  </div>

                  {/* Sort By Radio Buttons */}
                  <div className="w-full flex flex-col">
                    <p className="text-p-sm font-medium text-c-green-50">Sort By</p>
                    {["Latest", "A-Z", "Z-A"].map((filter) => (
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

          {/* Main Course Display */}
          <section className="w-4/5 h-full flex-1 overflow-y-auto px-10 md:px-0">
          {selectedFilters.course || selectedFilters.externalCourse ? (
            <>
              {selectedFilters.course && (
                <CourseCard selectedDepartment={activeButtonCourse} selectedFilters={selectedFilters} />
              )}

              {selectedFilters.externalCourse && (
                <>
                  <h6 className="mt-5 text-p-lg font-semibold text-c-blue-50">
                    External Trainings (
                    {externalTrainings && externalTrainings.length > 0
                      ? externalTrainings.length
                      : 0}
                  )
                  </h6>
                  <section className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-10">
                    <TrainingCard />
                  </section>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h6 className="text-p-lg font-semibold text-c-grey-50">
                No courses available for the selected filters.
              </h6>
            </div>
          )}
          </section>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default MyCourse;
