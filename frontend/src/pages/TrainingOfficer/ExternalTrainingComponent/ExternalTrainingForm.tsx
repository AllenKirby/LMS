import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import ParticipantsList from "../ParticipantsList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTrainingOfficerHook } from "../../../hooks";

type ExternalTrainingForm = {
  modal: () => void;
};

interface TrainingDataState {
  training_setup: string;
  training_title: string;
  start_date: string;
  end_date: string;
  host?: string;
  venue: string;
  participants: (string | number)[];
}

interface Trainees {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  sex: string;
  department: string;
  birth_date: string;
  contact: string;
  address: string;
}

const ExternalTrainingForm: React.FC<ExternalTrainingForm> = (props) => {
  const { modal } = props;
  const [trainingData, setTrainingData] = useState<TrainingDataState>({
    training_setup: '',
    training_title: '',
    start_date: '',
    end_date: '',
    host: '',
    venue: '',
    participants: []
  })
  const [counter, setCounter] = useState<number>(1);

  //redux
  const trainees = useSelector((state: {trainees: {trainees: Trainees[]}}) => state.trainees)
  const { createExternalTraining } = useTrainingOfficerHook()

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueArray  = event.target.value;
    const checked  = event.target.checked;

    if(Array.isArray(valueArray)) {
      setTrainingData({...trainingData, participants: valueArray})
    } else {
      const value  = Number(event.target.value);
      setTrainingData((prevData) => ({
        ...prevData, // Spread existing properties
        participants: checked
          ? [...prevData.participants, value] // ✅ Add value to array
          : prevData.participants.filter((val) => val !== value) // ✅ Remove value from array
      }));
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    await createExternalTraining(trainingData)
  }

  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-50" />
      <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-end">
        <form onSubmit={handleSubmit} className="w-2/5 h-full bg-f-light z-30 flex flex-col">
          <div className="w-full p-5 flex items-center justify-between border-b">
            <h1 className="font-medium text-h-h6">External Training</h1>
            <button type="button" onClick={modal}>
              <IoMdClose />
            </button>
          </div>
          <div className="w-full flex-1 overflow-y-auto p-6">
            {counter === 1 && (
              <div className="w-full h-fit">
                <div className="flex flex-col">
                  <label>Training Setup</label>
                  <select
                    value={trainingData.training_setup} 
                    onChange={(e) => setTrainingData({...trainingData, training_setup: e.target.value})} 
                    className="w-full">
                    <option value="" disabled>Select training setup</option>
                    <option value="Virtual">Virtual</option>
                    <option value="F2F">Face-to-Face</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label>Training Title</label>
                  <input
                    type="text"
                    value={trainingData.training_title} 
                    onChange={(e) => setTrainingData({...trainingData, training_title: e.target.value})} 
                    className="w-full">
                    
                  </input>
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="w-1/2 flex flex-col">
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      value={trainingData.start_date} 
                      onChange={(e) => setTrainingData({...trainingData, start_date: e.target.value})} />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label>End Date</label>
                    <input 
                      type="date"
                      value={trainingData.end_date} 
                      onChange={(e) => setTrainingData({...trainingData, end_date: e.target.value})}  />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>Speaker</label>
                  <input
                    type="text"
                    className="w-full"
                    value={trainingData.host}
                    onChange={(e) => setTrainingData({...trainingData, host: e.target.value})}>

                  </input>
                </div>
                <div className="flex flex-col">
                  <label>Venue</label>
                  <input 
                    type="text"
                    className="w-full"
                    value={trainingData.venue}
                    onChange={(e) => setTrainingData({...trainingData, venue: e.target.value})}>

                  </input>
                </div>
                <button
                  type="button"
                  className="w-full h-20 border-2 border-dashed rounded-md"
                >
                  Upload Necessary Document
                </button>
              </div>
            )}
            {counter === 2 && 
              <ParticipantsList 
                trainees={trainees} 
                handleCheckBox={handleCheckboxChange}
                participants={trainingData.participants}
                />
            }
          </div>
          <div
            className={`${
              counter === 2 ? "justify-between" : "justify-end"
            } w-full flex items-center p-5`}
          >
            <button
              type="button"
              onClick={decrement}
              className={`${counter === 2 ? "block" : "hidden"}`}
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={increment}
              className={`${
                counter === 2 ? "hidden" : "block"
              } flex items-center justify-center gap-2 font-medium`}
            >
              Select Participant <MdOutlineKeyboardArrowRight size={20} />
            </button>
            <button
              type="submit"
              className={`${
                counter === 2 ? "block" : "hidden"
              } flex items-center justify-center gap-2 font-medium`}
            >
              Set Training <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExternalTrainingForm;
