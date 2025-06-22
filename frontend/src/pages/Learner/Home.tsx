import { TraineeCourseCard } from "../../Components/Trainee Components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { UserState } from "../../types/UserTypes";
import { CoursesState, TrainingDataState } from '../../types/CourseCreationTypes'

import  CoursesFunctions  from '../../utils/CoursesFunctions'

interface TraineeCourses {
  course: CoursesState
  participant_status: string
}

interface TraineeTrainings {
  training_details: TrainingDataState;
  training: number;
  status: string;
}

const Home: React.FC = () => {
  const [activeButtonCourse, setActiveButtonCourse] = useState<string>("");
  const [selectedFilters, setSelectedFilters]= useState<string>('Latest')

  const user = useSelector((state: {user: UserState}) => state.user);
  const courses = useSelector((state: {courses: TraineeCourses[]}) => state.courses)
  const externalTrainings = useSelector(
    (state: { externalTrainingData: TraineeTrainings[] }) =>
      state.externalTrainingData
  );

  const {filterCoursesStatus, sortCourses, getCurrentTimeOfDay} = CoursesFunctions()

  const toTitleCase =(str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  const completedCourses = courses.filter((course) => course.participant_status === "completed");
  const now = new Date()
  const upcomingTrainings = externalTrainings.filter((training) => training?.training_details?.start_date ?? new Date(training?.training_details?.start_date) > now)

  return (
    <section className="w-full h-full py-7 px-5 flex flex-row gap-5 bg-content-bg">
      <div className="w-full h-full overflow-y-auto flex flex-col gap-5 px-5">
        <section className="w-full flex flex-col gap-5">
          <article>
            <p className="text-p-sm font-medium text-f-gray">{getCurrentTimeOfDay()}</p>
            <h2 className="text-h-h5 font-medium text-f-black">
              Welcome back, {user?.user.first_name}!
            </h2>
          </article>
          <section className="flex flex-row space-x-4">
            <div className="flex flex-col gap-3 flex-1 h-fit shadow-md rounded-lg p-4 bg-white">
              <p className="text-p-sm font-medium text-f-gray">
                Course Enrolled
              </p>
              <div className="w-12 h-12 px-5 font-medium flex items-center justify-center">
                <h1 className="text-h-h5">{courses.length}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 h-fit shadow-md rounded-lg p-4 bg-white">
              <p className="text-p-sm font-medium text-f-gray">
                Course Completed
              </p>
              <div className="w-12 h-12 px-5 font-medium flex items-center justify-center">
                <h1 className="text-h-h5">{completedCourses.length}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 h-fit shadow-md rounded-lg p-4 bg-white">
              <p className="text-p-sm font-medium text-f-gray">
                Upcoming Training
              </p>
              <div className="w-12 h-12 px-5 font-medium flex items-center justify-center">
                <h1 className="text-h-h5">{upcomingTrainings.length}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 h-fit shadow-md rounded-lg p-4 bg-white">
              <p className="text-p-sm font-medium text-f-gray">Trainings</p>
              <div className="w-12 h-12 px-5 font-medium flex items-center justify-center">
                <h1 className="text-h-h5">{externalTrainings.length}</h1>
              </div>
            </div>
          </section>
        </section>
        <section className="flex flex-col h-full gap-3">
          <div className="flex justify-between">
            <p className="text-h-h6 font-medium text-f-dark">Course Overview</p>
            <select value={selectedFilters} onChange={(e) => setSelectedFilters(e.target.value)} className="text-f-dark px-2 py-1 bg-white shadow-md rounded-md">
              Filter
              <option disabled>Select Filter</option>
              <option value="Latest">Latest</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          <nav className="flex flex-row w-full h-fit border-b">
            {["", "in progress", "completed", "Saved"].map((index) => (
              <button
                key={index}
                onClick={() => setActiveButtonCourse(index)}
                className={`font-medium text-p-sm px-5 pb-1 ${
                  activeButtonCourse === index
                    ? "border-c-green-50 text-c-green-50 border-b-2"
                    : "border-c-grey-10 text-c-grey-50"
                }`}
              >
                {!index ? 'All' : toTitleCase(index)}
              </button>
            ))}
          </nav>
          <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filterCoursesStatus(activeButtonCourse, courses).length > 0 ? sortCourses(filterCoursesStatus(activeButtonCourse, courses), user, selectedFilters).map(item => (
               <TraineeCourseCard data={item as TraineeCourses}/>
            )) : 
            (
              <div className="absolute w-full h-full flex items-center justify-center">
                <h1 className="font-medium">No Courses Found</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
