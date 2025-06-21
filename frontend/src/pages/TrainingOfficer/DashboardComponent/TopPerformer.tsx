import React, { useState } from "react";
import UserIMG from '../../../assets/user.jpg';

interface StatusCounts {
  pending: number;
  in_progress: number;
  completed: number;
  pending_survey: number;
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

type TopPerformerArray = [string, UserCourseAnalytics][];

type TopPerformerProps = {
  performers: TopPerformerObject
}

const TopPerformer: React.FC<TopPerformerProps> = (props) => {
  const { performers } = props;
  const [imageErrors, setImageErrors] = useState<{ [index: number]: boolean }>({});

  const sortPerformers = (topPerformer: TopPerformerArray) => {
    return topPerformer.sort((a, b) => {
      const aCompleted = a[1].course_counts.completed || 0;
      const bCompleted = b[1].course_counts.completed || 0;
      return bCompleted - aCompleted;
    });
  }

  return (
    <section className="w-full h-full">
      {sortPerformers(Object.entries(performers)).map((perfomer, index) => {
        const data = perfomer[1];
        return (
          <div
            className="bg-c-grey-10 rounded-md p-3 flex gap-3 mb-5"
            key={index}
          >
            <img 
              src={imageErrors[index] ? UserIMG : data.user_profile}
              onError={() =>
                setImageErrors((prev) => ({ ...prev, [index]: true }))
              }
              alt="profile" 
              className="w-20 h-20 rounded-md object-contain bg-f-light"
            />
            <section>
              <article>
                <p className="font-medium">{`${data.first_name} ${data.last_name}`}</p>
                <p className="text-p-sm text-c-grey-50 -mt-1">
                  {data.department || "Department not specified"}
                </p>
              </article>
              <div className="flex gap-3 mt-2">
                <div className="px-2 py-1 w-fit text-p-sm bg-white shadow-sm rounded-sm">
                  {data.course_counts.completed || 0} Completed
                </div>
                <div className="px-2 py-1 w-fit text-p-sm bg-white shadow-sm rounded-sm">
                  Pending: {(data.course_counts.pending || 0) + (data.course_counts.pending_survey || 0) + (data.course_counts.in_progress || 0)}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
};

export default TopPerformer;
