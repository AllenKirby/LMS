import React from "react";

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

interface CourseObject {
  [index: number]: CourseAnalytics;
}

type CourseStatusProps = {
  courses: CourseObject
}

const CourseStatus: React.FC<CourseStatusProps> = (props) => {
  const { courses } = props;

  return (
    <section className="w-full h-full">
      {Object.entries(courses).map((course, index) => {
        const data = course[1]
        const total = data.status_counts.completed || 0 + data.status_counts.in_progress || 0 + data.status_counts.pending || 0 + data.status_counts.pending_survey || 0;
        return (
          <div key={index} className="w-full mb-3">
            <p className="font-p-rg font-medium">{data.course_name}</p>
            <div className="w-full flex gap-1">
              <div
                className="bg-gradient-to-r from-c-green-90 to-c-green-60 rounded-md text-f-light py-3 px-4 font-medium"
                style={{ width: `${(data.status_counts.completed / total) * 100}%` }}
              >
                {data.status_counts.completed || 0}
              </div>
              <div
                className="bg-gradient-to-r from-c-green-60 to-c-green-30 rounded-md text-f-light py-3 px-4 font-medium"
                style={{ width: `${(data.status_counts.in_progress / total) * 100}%` }}
              >
                {data.status_counts.in_progress || 0}
              </div>
              <div
                className="bg-gradient-to-r from-c-green-30 to-c-green-10 rounded-md text-f-dark py-3 px-4 font-medium"
                style={{
                  width: `${(data.status_counts.pending / total) * 100}%`,
                }}
              >
                {data.status_counts.pending || 0}
              </div>
              <div
                className="bg-gradient-to-r from-c-green-10 to-c-green-5 rounded-md text-f-dark py-3 px-4 font-medium"
                style={{
                  width: `${(data.status_counts.pending_survey / total) * 100}%`,
                }}
              >
                {data.status_counts.pending_survey || 0}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CourseStatus;
