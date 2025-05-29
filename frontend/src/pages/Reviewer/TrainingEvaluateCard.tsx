import { MdOutlineCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TrainingEvaluateCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer">
      <div className="w-full h-full bg-black opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
      <button
        className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 w-full h-full"
        onClick={() =>
          navigate(
            `/trainingofficer/courses/externaltraining/ID ` // Replace ID with actual course ID // ViewParticipants.tsx
          )
        }
      >
        View Participants
      </button>
      <div className="w-full h-full">
        <figure className="w-full h-2/5">
          <img
            alt="Status-img"
            className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-10 to-c-green-20"
          />
        </figure>
        <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
          <section className="w-full">
            <p className="text-p-sc font-medium text-c-green-50">
              {/* {((info as TrainingDataState).training_setup === "virtual" &&
                "Virtual") ||
                ((info as TrainingDataState).training_setup === "f2f" &&
                  "Face To Face")} */}
            </p>
            <h1 className="text-p-lg font-semibold w-full">Training Title</h1>
            <p className="text-p-rg text-c-grey-70 w-full">Venue</p>
          </section>
          <article className="w-full flex flex-col gap-1 text-p-sm">
            <p className="text-f-dark font-medium">Date</p>
            <p className="text-c-grey-70 flex items-center gap-1">
              <MdOutlineCalendarToday size={15} />
              Start Date - <MdOutlineCalendarToday size={15} />
              End Date
            </p>
          </article>
        </main>
      </div>
    </section>
  );
};

export default TrainingEvaluateCard;
