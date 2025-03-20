//assets
import { MdOutlineCalendarToday } from "react-icons/md";
import { useSelector } from "react-redux";

import { TrainingDataState } from '../../../types/CourseCreationTypes'
import { useNavigate } from "react-router-dom";

const TrainingCard: React.FC = () => {
  const navigate = useNavigate()
  const externalTrainings = useSelector(
    (state: { externalTrainingData: TrainingDataState[] }) =>
      state.externalTrainingData
  );

  console.log(externalTrainings)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      {externalTrainings.map((info, index) => (
        <section
          onClick={() => navigate(`/trainingofficer/courses/externaltraining/${info.id}`)}
          className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
          key={index}
        >
          <div className="w-full h-full bg-black opacity-0 group-hover:opacity-10 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
          <div className="absolute opacity-0 group-hover:opacity-100 top-3 right-3 bg-white w-10 h-5 gap-1 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-black rounded-full"></div>
              <div className="h-1 w-1 bg-black rounded-full"></div>
              <div className="h-1 w-1 bg-black rounded-full"></div>
            </div>
            <h6 className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100">
              View Training
            </h6>
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
                  {(info.training_setup === "virtual" && "Virtual") ||
                    (info.training_setup === "f2f" && "Face To Face")}
                </p>
                <h1 className="text-p-lg font-semibold w-full">
                  {info.training_title}
                </h1>
                <p className="text-p-rg text-c-grey-70 w-full">{info.venue}</p>
              </section>
              <article className="w-full flex flex-col gap-1 text-p-sm">
                <p className="text-f-dark font-medium">Date</p>
                <p className="text-c-grey-70 flex items-center gap-1">
                  <MdOutlineCalendarToday size={15} />
                  {formatDate(info.start_date)} -{" "}
                  <MdOutlineCalendarToday size={15} />
                  {formatDate(info.end_date)}
                </p>
              </article>
            </main>
          </div>
        </section>
      ))}
    </>
  );
};

export default TrainingCard;
