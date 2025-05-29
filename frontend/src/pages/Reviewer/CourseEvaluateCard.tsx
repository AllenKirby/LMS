import { useNavigate } from "react-router-dom";

import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";

const CourseEvaluateCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section
      key={""}
      className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
    >
      <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
      <button
        className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100"
        onClick={() =>
          navigate(
            `/trainingofficer/courses/ID` // Replace ID with actual course ID // ViewParticipants.tsx`
          )
        }
      >
        View Participants
      </button>
      <div className="w-full h-full">
        <figure className="w-full h-2/5">
          <img
            // src={
            //   (info as CoursesState).cover_image_url
            //     ? `${API_URL}${(info as CoursesState).cover_image_url}`
            //     : CourseIMG
            // }
            alt="Course-img"
            className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
          />
        </figure>
        <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
          <section className="w-full">
            <p className="text-p-sc font-medium text-c-green-50">Department</p>
            <h1 className="text-p-lg font-semibold w-full">Course Title</h1>
          </section>
          <p className="text-p-rg text-c-grey-70 w-full h-20 truncate">
            Course Description
          </p>
          <article className="w-full flex items-center justify-between text-p-sm">
            <p className="text-c-grey-70 flex items-center justify-center gap-1">
              <MdOutlineCalendarToday size={15} />
              Created At
            </p>
            <p className="text-c-grey-70 flex items-center justify-center gap-1">
              <LuUsers size={16} />
              No. of Enrolled
            </p>
          </article>
        </main>
      </div>
    </section>
  );
};

export default CourseEvaluateCard;
