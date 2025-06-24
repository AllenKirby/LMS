import { useSelector } from "react-redux";
import {
  TrainingsPerMonth,
  CourseStatus,
  TopPerformer,
} from "./DashboardComponent";
import { UserState } from "../../types/UserTypes";
import { useTrainingOfficerHook } from '../../hooks/'
import { useEffect, useState } from "react";
import { TrainingDataState, CoursesState } from "../../types/CourseCreationTypes";
import CoursesFunctions from "../../utils/CoursesFunctions";

interface StatusCounts {
  pending: number;
  in_progress: number;
  completed: number;
  pending_survey: number;
}

interface CourseAnalytics {
  course_name: string;
  status_counts: StatusCounts
}

interface UserCourseAnalytics {
  first_name: string;
  last_name: string;
  user_profile: string;
  department: string;
  course_counts: StatusCounts
}

interface TopPerformerObject {
  [index: number]: UserCourseAnalytics;
}

interface CourseObject {
  [index: number]: CourseAnalytics;
}

interface DashboardData {
  userAnalytics: TopPerformerObject;
  courseAnalytics: CourseObject;
}

interface PerYearValues {
  [month: string]: number
}

interface PerYear {
  monthly: PerYearValues;
  quarterly: PerYearValues;
}

interface TrainingAnalytics {
  [year: string]: PerYear;
}

interface Trainees {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  sex: string;
  department: string;
  birth_date: string;
  contact: string;
  address: string;
}

const Dashboard = () => {
  const user = useSelector((state: {user: UserState}) => state.user)
  const { getDashboardData, getChartData, getTrainingAnalytics } = useTrainingOfficerHook()
  const [chartData, setChartData] = useState<DashboardData>({
    userAnalytics: [],
    courseAnalytics: []
  })
  const [trainingChartData, setTrainingChartData] = useState<TrainingAnalytics>({})
  const trainees = useSelector((state: {trainees: {trainees: Trainees[]}}) => state.trainees)
  const externalTrainings = useSelector((state: { externalTrainingData: TrainingDataState[] }) => state.externalTrainingData);
  const courses = useSelector((state: {courses: CoursesState[]}) => state.courses)
  const { getCurrentTimeOfDay } = CoursesFunctions()

  const retrieveDashboardData = async () => {
    const response = await getDashboardData();
    const courseAnalytics = await getChartData(response.course_analytics);
    const userAnalytics = await getChartData(response.user_course_analytics);
    setChartData({
      userAnalytics: userAnalytics,
      courseAnalytics: courseAnalytics
    });
  }

  const trainingAnalytics = async() => {
    const response = await getTrainingAnalytics()
    setTrainingChartData(response)
  }

  const getUpcomingTrainings = (traninings: TrainingDataState[]) => {
    return traninings.filter(training => {
      const trainingDate = new Date(training.start_date);
      const today = new Date();
      return trainingDate > today;
    })
  }

  const getCompletedTrainings = (traninings: TrainingDataState[]) => {
    return traninings.filter(training => {
      const trainingDate = new Date(training.end_date);
      const today = new Date();
      return trainingDate < today;
    })
  }

  useEffect (() => {
    if (user.user) {
      retrieveDashboardData()
      trainingAnalytics()
    }
  }, [user.user]);

  const [chartFilter, setChartFilter] = useState<{year: string; categories: 'monthly' | 'quarterly'}>({
    year: '',
    categories: 'monthly'
  })

  const years = Object.keys(trainingChartData)

  useEffect(() => {
    if (years.length > 0 && chartFilter.year === '') {
      setChartFilter(prev => ({
        ...prev,
        year: years[0] // You can also use years[years.length - 1] for latest
      }))
    }
  }, [trainingChartData])

  return (
    <section className="w-full h-full flex flex-col p-4 md:p-10 gap-6 md:gap-10 text-f-dark bg-[#f0f0f0] overflow-y-auto">
      <div className="w-full flex flex-col lg:flex-row gap-6 md:gap-10">
        <section className="w-full lg:w-1/3 h-full rounded-lg p-5 flex flex-col gap-3 bg-white">
          <article className="w-full h-fit flex justify-between">
            <section>
              <p className="text-c-grey-50">{getCurrentTimeOfDay()}</p>
              <h6 className="text-p-lg font-medium -mt-1 text-xl">
                Welcome back, {user.user.first_name}!
              </h6>
            </section>
          </article>

          <div className="h-full flex flex-col gap-5 text-f-light">
            <section className="h-1/2 flex flex-col sm:flex-row gap-5">
              <div className="flex-1 rounded-md bg-gradient-to-r from-sky-300 to-teal-400 p-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl">{getUpcomingTrainings(externalTrainings).length}</h1>
                <h6 className="text-p-lg font-medium text-center">Upcoming Trainings</h6>
              </div>
              <div className="flex-1 rounded-md bg-gradient-to-r from-purple-300 to-red-400 p-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl">{trainees.trainees.length || 0}</h1>
                <h6 className="text-p-lg font-medium text-center">Active Trainees</h6>
              </div>
            </section>
            <section className="h-1/2 flex flex-col sm:flex-row gap-5">
              <div className="flex-1 rounded-md bg-gradient-to-r from-yellow-300 to-orange-400 p-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl">{courses.length}</h1>
                <h6 className="text-p-lg font-medium text-center">Courses Available</h6>
              </div>
              <div className="flex-1 rounded-md bg-gradient-to-r from-blue-300 to-violet-400 p-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl">{getCompletedTrainings(externalTrainings).length}</h1>
                <h6 className="text-p-lg font-medium text-center">Completed Trainings</h6>
              </div>
            </section>
          </div>
        </section>
        <section className="w-full lg:w-2/3 rounded-lg p-5 flex flex-col gap-3 bg-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <h6 className="text-p-lg font-medium">Trainings Per Month</h6>
            <div className="flex gap-2">
              <select
                value={chartFilter.year}
                onChange={(e) => setChartFilter({ ...chartFilter, year: e.target.value })}
                className="px-3 py-1 text-sm"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={chartFilter.categories}
                onChange={(e) => setChartFilter({ ...chartFilter, categories: e.target.value as 'monthly' | 'quarterly' })}
                className="px-3 py-1 text-sm"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full">
            {
              chartFilter.year &&
              trainingChartData[chartFilter.year] &&
              trainingChartData[chartFilter.year][chartFilter.categories] ? (
                <TrainingsPerMonth data={trainingChartData[chartFilter.year][chartFilter.categories]} />
              ) : (
                <p className="text-center text-sm text-f-gray py-10">No data available</p>
              )
            }
          </div>
        </section>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6 md:gap-10">
        <section className="w-full lg:w-2/3 h-fit flex flex-col rounded-lg p-5 bg-white">
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3">
            <article>
              <h6 className="text-p-lg font-medium">Course Status</h6>
              <p className="text-f-gray text-sm">This chart shows the number of participants categorized by their current status.</p>
            </article>
            <div className="flex flex-wrap gap-3 text-sm">
              <p className="flex items-center gap-1 font-medium">
                <div className="p-2 rounded-sm bg-c-green-60"></div>
                Completed
              </p>
              <p className="flex items-center gap-1 font-medium">
                <div className="p-2 rounded-sm bg-c-green-30"></div>
                In Progress
              </p>
              <p className="flex items-center gap-1 font-medium">
                <div className="p-2 rounded-sm bg-c-green-10"></div>
                Pending
              </p>
              <p className="flex items-center gap-1 font-medium">
                <div className="p-2 rounded-sm bg-c-green-5"></div>
                Pending Survey
              </p>
            </div>
          </header>
          <div className="w-full max-h-80 overflow-y-auto">
            <CourseStatus courses={chartData.courseAnalytics} />
          </div>
        </section>
        <section className="w-full lg:w-1/3 h-fit rounded-lg bg-white p-5 flex flex-col overflow-hidden">
          <article className="pb-3">
            <h6 className="text-p-lg font-medium">Top Performer</h6>
            <p className="text-f-gray text-sm">This chart highlights the top participants ranked by the number of completed courses.</p>
          </article>
          <section className="flex-1 overflow-y-auto max-h-80">
            <TopPerformer performers={chartData.userAnalytics} />
          </section>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
