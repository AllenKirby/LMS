import { MdOutlineCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { TrainingDataState } from '../../types/CourseCreationTypes'
import CoursesFunctions from "../../utils/CoursesFunctions";

import Upcoming from '../../assets/Upcoming.png'
import Ongoing from '../../assets/Ongoing.png'
import Completed from '../../assets/Completed.png'

type TrainingEvaluateCardProps = {
  data: TrainingDataState
}

const TrainingEvaluateCard: React.FC<TrainingEvaluateCardProps> = (props) => {
  const { data } = props
  const navigate = useNavigate();
  const { convertDate, isSixMonthsAgoOrMore } = CoursesFunctions()

  const trainingStatus = (start_date: string, end_date: string) => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const now = new Date();

    if(startDate > now) {
      return Upcoming
    } else if(endDate < now) {
      return Completed
    } else if(now >= startDate && now <= endDate) {
      return Ongoing
    } else {
      return 
    }

  }

  return (
    <section className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer">
      <div className="w-full h-full bg-black opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
      <button
        className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 w-full h-full"
        onClick={() => {
            const trainingData = {
              id: data.id,
              type: 'training'
            }
            const encoded = encodeURIComponent(JSON.stringify(trainingData));
            navigate(
              `/reviewer/program/training/${encoded} `
            )
          }
        }
      >
        View Participants
      </button>
      <div className="w-full h-full">
        <figure className="w-full h-2/5">
          <img
            src={trainingStatus(data.start_date, data.end_date)}
            alt="Status-img"
            className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-10 to-c-green-20"
          />
        </figure>
        <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
          <section className="w-full">
            <p className="text-p-sc font-medium text-c-green-50">
              {(data.training_setup === "virtual" &&
                "Virtual") ||
                (data.training_setup === "f2f" &&
                  "Face To Face")}
            </p>
            <h1 className="text-p-lg font-semibold w-full">{data.training_title}</h1>
            <p className="text-p-rg text-c-grey-70 w-full">{data.venue}</p>
          </section>
          <div className="w-full">
            {isSixMonthsAgoOrMore(data.end_date) ? (
              <p className="text-green-500 font-medium">Ready to Evaluate</p>
              ) : (
                <p className="text-red-500 font-medium">Not Yet Eligible</p>
              )
            }
          </div>
          <article className="w-full flex flex-col gap-1 text-p-sm">
            <p className="text-f-dark font-medium">Date</p>
            <p className="text-c-grey-70 flex items-center gap-1">
              <MdOutlineCalendarToday size={15} />
              {convertDate(data.start_date)} - <MdOutlineCalendarToday size={15} />
              {convertDate(data.end_date)}
            </p>
          </article>
        </main>
      </div>
    </section>
  );
};

export default TrainingEvaluateCard;
