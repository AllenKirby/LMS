import React from "react";

const CourseStatus: React.FC = () => {
  const dummy = [
    {
      title: "Introduction to Programming",
      status: { done: 10, started: 20, notStarted: 30 },
    },
    {
      title: "Data Structures & Algorithms",
      status: { done: 15, started: 25, notStarted: 20 },
    },
    {
      title: "Web Development Basics",
      status: { done: 12, started: 18, notStarted: 25 },
    },
    {
      title: "Database Management Systems",
      status: { done: 8, started: 22, notStarted: 30 },
    },
    {
      title: "Object-Oriented Programming",
      status: { done: 14, started: 19, notStarted: 27 },
    },
    {
      title: "Software Engineering",
      status: { done: 9, started: 23, notStarted: 28 },
    },
    {
      title: "Cybersecurity Fundamentals",
      status: { done: 11, started: 21, notStarted: 26 },
    },
    {
      title: "Artificial Intelligence Basics",
      status: { done: 13, started: 17, notStarted: 29 },
    },
    {
      title: "Mobile App Development",
      status: { done: 10, started: 24, notStarted: 26 },
    },
    {
      title: "Cloud Computing Essentials",
      status: { done: 7, started: 20, notStarted: 33 },
    },
  ];

  return (
    <section className="w-full h-full">
      {dummy.map((course, index) => {
        const total =
          course.status.done + course.status.started + course.status.notStarted;
        return (
          <div key={index} className="w-full mb-3">
            <p className="font-p-rg font-medium">{course.title}</p>
            <div className="w-full flex gap-1">
              <div
                className="bg-gradient-to-r from-c-green-90 to-c-green-60 rounded-md text-f-light py-3 px-4 font-medium"
                style={{ width: `${(course.status.done / total) * 100}%` }}
              >
                {course.status.done}
              </div>
              <div
                className="bg-gradient-to-r from-c-green-60 to-c-green-30 rounded-md text-f-light py-3 px-4 font-medium"
                style={{ width: `${(course.status.started / total) * 100}%` }}
              >
                {course.status.started}
              </div>
              <div
                className="bg-gradient-to-r from-c-green-30 to-c-green-10 rounded-md text-f-dark py-3 px-4 font-medium"
                style={{
                  width: `${(course.status.notStarted / total) * 100}%`,
                }}
              >
                {course.status.notStarted}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CourseStatus;
