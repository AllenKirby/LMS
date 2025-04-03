//assets
import { MdOutlineCalendarToday } from "react-icons/md";
import { useSelector } from "react-redux";
import { SlOptions } from "react-icons/sl";

import { TrainingDataState } from '../../../types/CourseCreationTypes'
import { ExternalTrainingForm } from "../ExternalTrainingComponent";
import { ConfirmationModal } from "../../../Components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TrainingCard: React.FC = () => {
  const navigate = useNavigate()
  const externalTrainings = useSelector(
    (state: { externalTrainingData: TrainingDataState[] }) =>
      state.externalTrainingData
  );
  const [trainingData, setTrainingData] = useState<TrainingDataState>({
    training_title: '',
    training_setup: '',
    start_date: '',
    end_date: '',
    venue: '',
    training_provider: '',
    participants: []
  })

  console.log(externalTrainings)

  const isModalOpen = (data?: TrainingDataState) => {
    setEditTraingForm(!editTrainingForm)
    if(data) {
      setTrainingData(data)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
  const [ editTrainingForm, setEditTraingForm ] = useState<boolean>(false);
  const [ confirmation , setConfirmation ] = useState<boolean>(false);
  return (
    <>
      {externalTrainings.map((info, index) => (
        <section
          className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
          key={index}
        >
          <div 
            className="w-full h-full bg-black opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"
          ></div>
            <section 
              className="absolute opacity-0 group-hover:opacity-100 top-3 right-3 z-30 flex flex-col items-end gap-2"
              onMouseLeave={() => menuOpen && setMenuOpen(false)}
            >
              <button 
                className="bg-c-blue-5 w-10 h-5 rounded-full flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <SlOptions/>
              </button>
              {menuOpen && (
                  <div className="w-28 bg-white rounded-md flex flex-col p-1">
                    <button 
                      className="w-full text-p-sm rounded-md text-left pl-2 py-1 hover:bg-c-blue-5"
                      onClick={() => isModalOpen(info)}
                    >
                      Edit
                    </button>
                    <button 
                      className="w-full text-p-sm rounded-md text-left pl-2 py-1 hover:bg-red-500 hover:text-f-light hover:font-medium"
                      onClick={() => setConfirmation(!confirmation)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </section>
            <button 
              className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 w-full h-full"
              onClick={() => navigate(`/trainingofficer/courses/externaltraining/${info.id}`)}
            >
              View Training
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
      {editTrainingForm && (
        <ExternalTrainingForm 
          modal={() => setEditTraingForm(!editTrainingForm)}
          data={trainingData}
          flag={true}
        />
      )}
      {confirmation && (
        <ConfirmationModal 
          onClose={() => setConfirmation(!confirmation)}
          onConfirm={() => setConfirmation(!confirmation)}
          title="Remove Training?"
          label="Are You Sure? This Will Permanently Remove External Training"
        />
      )}
    </>
  );
};

export default TrainingCard;
