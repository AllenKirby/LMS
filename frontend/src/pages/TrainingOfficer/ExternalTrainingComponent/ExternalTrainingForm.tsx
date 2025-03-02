import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import ParticipantsList from "../ParticipantsList";
import { useState } from "react";

type ExternalTrainingForm = {
  modal: () => void;
};

const ExternalTrainingForm: React.FC<ExternalTrainingForm> = (props) => {
  const { modal } = props;
  const [counter, setCounter] = useState<number>(1);

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-50" />
      <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-end">
        <form className="w-2/5 h-full bg-f-light z-30 flex flex-col">
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
                  <select className="w-full"></select>
                </div>
                <div className="flex flex-col">
                  <label>Training Title</label>
                  <select className="w-full"></select>
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="w-1/2 flex flex-col">
                    <label>Start Date</label>
                    <input type="date" />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label>End Date</label>
                    <input type="date" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>Host</label>
                  <select className="w-full"></select>
                </div>
                <div className="flex flex-col">
                  <label>Venue</label>
                  <select className="w-full"></select>
                </div>
                <button
                  type="button"
                  className="w-full h-20 border-2 border-dashed rounded-md"
                >
                  Upload Necessary Document
                </button>
              </div>
            )}
            {counter === 2 && <ParticipantsList />}
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
