//assets
import { MdOutlineCalendarToday } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { SlOptions } from "react-icons/sl";

import { TrainingDataState } from '../../../types/CourseCreationTypes'
import { UserState } from '../../../types/UserTypes'
import { ExternalTrainingForm, ParticipantUploadedDocument } from "../ExternalTrainingComponent";
import { ConfirmationModal } from "../../../Components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTrainingOfficerHook } from "../../../hooks";
import { deleteTrainingRedux } from '../../../redux/ExternalTrainingDataRedux'

import Upcoming from '../../../assets/Upcoming.png'
import Ongoing from '../../../assets/Ongoing.png'
import Completed from '../../../assets/Completed.png'

interface TraineeTrainings {
  training_details: TrainingDataState;
  training: number;
  status: string;
}

type TrainingCardState = {
  searchString?: string;
}

const TrainingCard: React.FC<TrainingCardState> = (props) => {
  const {searchString = ""} = props

  const navigate = useNavigate()
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
  const [ editTrainingForm, setEditTraingForm ] = useState<boolean>(false);
  const [ confirmation , setConfirmation ] = useState<boolean>(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<number | null>(null);
  const user = useSelector((state: {user: UserState}) => state.user)
  const externalTrainings = useSelector(
    (state: { externalTrainingData?: TrainingDataState[] | TraineeTrainings[] }) =>
      state.externalTrainingData || []
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
  const [filteredTrainings, setFilteredTrainings] = useState<TrainingDataState[] | TraineeTrainings[]>([])
  const [trainingID, setTrainingID] = useState<number>(0)
  const { deleteTraining } = useTrainingOfficerHook()
  const dispatch = useDispatch()

  useEffect(() => {
    if (externalTrainings) {
      let filtered = [...externalTrainings];

      // Apply search filter if searchString exists
      if (searchString && user.user.role === 'training_officer') {
        filtered = filtered.filter(training =>
          (training as TrainingDataState).training_title.toLowerCase().includes(searchString.toLowerCase())
        );
      }

      setFilteredTrainings(filtered as TrainingDataState[]);
    } else {
      setFilteredTrainings([]);
    }
  }, [externalTrainings, searchString]);

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

  const handleUploadToggle = (participantId: number, trainingId: number) => {
    if (selectedParticipantId === participantId && selectedTraining === trainingId) {
      setSelectedParticipantId(null);
      setSelectedTraining(null);
    } else {
      setSelectedParticipantId(participantId);
      setSelectedTraining(trainingId);
    }
  };

  const handleDeleteTraining = async() => {
    await deleteTraining(trainingID)
    dispatch(deleteTrainingRedux(trainingID))
    setConfirmation(!confirmation)
  }

  const sortTraining = (array: TraineeTrainings[] | TrainingDataState[]) => {
    const clonedArray = [...array];
    if(user.user.role === 'training_officer') {
      return clonedArray.sort((a, b) => new Date((b as TrainingDataState).start_date).getTime() - new Date((a as TrainingDataState).start_date).getTime());
    } else {
      return clonedArray.sort((a, b) => new Date((b as TraineeTrainings).training_details.start_date).getTime() - new Date((a as TraineeTrainings).training_details.start_date).getTime());
    }
  } 

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
    <>
      {filteredTrainings.length === 0 && (
        <p className="text-center col-span-5 text-c-grey-50 w-full py-16">
          No trainings available.
        </p>
      )}
      {filteredTrainings && user.user.role === 'training_officer' && (
        
        sortTraining(filteredTrainings).map((info, index) => (
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
                        onClick={() => isModalOpen(info as TrainingDataState)}
                      >
                        Edit
                      </button>
                      <button 
                        className="w-full text-p-sm rounded-md text-left pl-2 py-1 hover:bg-red-500 hover:text-f-light hover:font-medium"
                        onClick={() => {setConfirmation(!confirmation); setTrainingID(Number((info as TrainingDataState).id))}}
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </section>
              <button 
                className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100 w-full h-full"
                onClick={() => navigate(`/trainingofficer/courses/externaltraining/${(info as TrainingDataState).id}`)}
              >
                View Training
              </button>
            <div className="w-full h-full">
              <figure className="w-full h-2/5">
                <img
                  src={trainingStatus((info as TrainingDataState).start_date, (info as TrainingDataState).end_date)}
                  alt="Status-img"
                  className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-10 to-c-green-20"
                />
              </figure>
              <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                <section className="w-full">
                  <p className="text-p-sc font-medium text-c-green-50">
                    {((info as TrainingDataState).training_setup === "virtual" && "Virtual") ||
                      ((info as TrainingDataState).training_setup === "f2f" && "Face To Face")}
                  </p>
                  <h1 className="text-p-lg font-semibold w-full">
                    {(info as TrainingDataState).training_title}
                  </h1>
                  <p className="text-p-rg text-c-grey-70 w-full">{(info as TrainingDataState).venue}</p>
                </section>
                <article className="w-full flex flex-col gap-1 text-p-sm">
                  <p className="text-f-dark font-medium">Date</p>
                  <p className="text-c-grey-70 flex items-center gap-1">
                    <MdOutlineCalendarToday size={15} />
                    {formatDate((info as TrainingDataState).start_date)} -{" "}
                    <MdOutlineCalendarToday size={15} />
                    {formatDate((info as TrainingDataState).end_date)}
                  </p>
                </article>
              </main>
            </div>
          </section>
        ))
      )}
      {externalTrainings && user.user.role === 'trainee' && (
        sortTraining(externalTrainings).map((info, index) => (
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
                {user.user.role === 'training_officer' && (<button 
                  className="bg-c-blue-5 w-10 h-5 rounded-full flex items-center justify-center"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <SlOptions/>
                </button>)}
                {menuOpen && (
                    <div className="w-28 bg-white rounded-md flex flex-col p-1">
                      <button 
                        className="w-full text-p-sm rounded-md text-left pl-2 py-1 hover:bg-c-blue-5"
                        onClick={() => isModalOpen((info as TraineeTrainings).training_details)}
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
                onClick={() => handleUploadToggle(user.user.id, Number((info as TraineeTrainings).training_details.id))}
              >
                View Training
              </button>

            <div className="w-full h-full">
              <figure className="w-full h-2/5">
                <img
                  src={trainingStatus((info as TraineeTrainings).training_details.start_date, (info as TraineeTrainings).training_details.end_date)}
                  alt="Status-img"
                  className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-10 to-c-green-20"
                />
              </figure>
              <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
                <section className="w-full">
                  <p className="text-p-sc font-medium text-c-green-50">
                    {((info as TraineeTrainings).training_details.training_setup === "virtual" && "Virtual") ||
                      ((info as TraineeTrainings).training_details.training_setup === "f2f" && "Face To Face")}
                  </p>
                  <h1 className="text-p-lg font-semibold w-full">
                    {(info as TraineeTrainings).training_details.training_title}
                  </h1>
                  <p className="text-p-rg text-c-grey-70 w-full truncate">{(info as TraineeTrainings).training_details.venue}</p>
                </section>
                <article className="w-full flex flex-col gap-1 text-p-sm">
                  <p className="text-f-dark font-medium">Date</p>
                  <p className="text-c-grey-70 flex items-center gap-1">
                    {formatDate((info as TraineeTrainings).training_details.start_date)} -{" "}
                    {formatDate((info as TraineeTrainings).training_details.end_date)}
                  </p>
                </article>
              </main>
            </div>
            {selectedParticipantId === user.user.id && selectedTraining === (info as TraineeTrainings).training_details.id && (
              <ParticipantUploadedDocument 
                onClose={() => {
                  setSelectedParticipantId(null);
                  setSelectedTraining(null);
                }}
                key={(info as TraineeTrainings).training_details.id}
                data={{
                  id: user.user.id,
                  first_name: user.user.first_name,
                  last_name: user.user.last_name,
                  email: user.user.email,
                  status: (info as TraineeTrainings).status
                }} 
                trainingID={Number((info as TraineeTrainings).training_details.id)} 
                trainingData={(info as TraineeTrainings).training_details}
              />
            )}
          </section>
        ))
      )}
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
          onConfirm={handleDeleteTraining}
          title="Remove Training?"
          label="Are You Sure? This Will Permanently Remove External Training"
        />
      )}
    </>
  );
};

export default TrainingCard;
