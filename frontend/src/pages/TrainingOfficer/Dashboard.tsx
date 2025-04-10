import {
  PopularCourse,
  CalendarView,
  CourseStatus,
  TopPerformer,
} from "./DashboardComponent";

const Dashboard = () => {
  return (
    <section className="w-full h-full flex flex-col md:flex-row p-4 md:p-10 gap-4 md:gap-10 text-f-dark bg-[#f0f0f0] overflow-y-auto">
      <div className="w-full md:w-2/3 h-fit md:h-full flex flex-col gap-4 md:gap-10">
        <section className="w-full h-fit md:h-2/5 flex flex-col md:flex-row gap-4 md:gap-10">
          <div className="w-full md:w-2/3 rounded-lg p-5 flex flex-col gap-3 bg-white">
            <article className="w-full h-fit md:h-1/5 flex justify-between">
              <section>
                <p className="text-c-grey-50">Good morning</p>
                <h6 className="text-p-lg font-medium -mt-1">
                  Welcome back, Username!
                </h6>
              </section>
              <p className="text-c-grey-50">Date</p>
            </article>
            <div className="w-full h-fit md:h-4/5 flex flex-col gap-5">
              <section className="w-full h-fit md:h-1/2 flex gap-5">
                <div className="w-1/2 h-full p-3 rounded-md bg-gradient-to-r from-sky-300 to-teal-400"></div>
                <div className="w-1/2 h-full p-3 rounded-md bg-gradient-to-r from-purple-300 to-red-400"></div>
              </section>
              <section className="w-full h-fit md:h-1/2 flex gap-5">
                <div className="w-1/2 h-full p-3 rounded-md bg-gradient-to-r from-yellow-300 to-orange-400"></div>
                <div className="w-1/2 h-full p-3 rounded-md bg-gradient-to-r from-blue-300 to-violet-400"></div>
              </section>
            </div>
          </div>
          <div className="w-full md:w-1/3 rounded-lg p-5 flex flex-col gap-3 bg-white">
            <h6 className="text-p-lg font-medium">Popular Course</h6>
            <div className="w-full h-full">
              <PopularCourse />
            </div>
          </div>
        </section>
        <section className="w-full h-fit md:h-3/5 flex flex-col rounded-lg p-5 bg-white">
          <header className="flex justify-between h-1/6">
            <article>
              <h6 className="text-p-lg font-medium">Course Status</h6>
              <p className="text-c-grey-50 -mt-1">
                View all progressing course.{" "}
                <span className="text-c-blue-50 cursor-pointer">See all</span>
              </p>
            </article>
            <div className="flex gap-3">
              <p className="flex items-center gap-1 text-p-sm font-medium">
                {" "}
                <div className="p-2 rounded-sm bg-c-green-60"></div>
                Done
              </p>
              <p className="flex items-center gap-1 text-p-sm font-medium">
                {" "}
                <div className="p-2 rounded-sm bg-c-green-30"></div>
                Started
              </p>
              <p className="flex items-center gap-1 text-p-sm font-medium">
                {" "}
                <div className="p-2 rounded-sm bg-c-green-10"></div>
                Not Started
              </p>
            </div>
          </header>
          <div className="w-full h-5/6 overflow-y-auto">
            <CourseStatus />
          </div>
        </section>
      </div>
      <div className="w-full md:w-1/3 h-fit md:h-full flex flex-col gap-4 md:gap-10">
        <section className="w-full h-2/5 rounded-lg bg-white">
          <CalendarView />
        </section>
        <section className="w-full h-3/5 rounded-lg bg-white p-5">
          <article className="w-full h-1/6">
            <h6 className="text-p-lg font-medium">Course Status</h6>
            <p className="text-c-grey-50 -mt-1">
              View all progressing course.{" "}
              <span className="text-c-blue-50 cursor-pointer">See all</span>
            </p>
          </article>
          <section className="w-full h-5/6 overflow-y-auto">
            <TopPerformer />
          </section>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
