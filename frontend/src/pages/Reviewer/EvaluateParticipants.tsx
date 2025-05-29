import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import ActivityEffectivenessForm from "./ActivityEffectivenessForm";

interface EvaluateParticipantsProps {
  onClose: () => void;
}

const EvaluateParticipants: React.FC<EvaluateParticipantsProps> = ({
  onClose,
}) => {
  const dummyData = [
    {
      NAME: "John",
    },
    {
      NAME: "Jane",
    },
    {
      NAME: "Alice",
    },
    {
      NAME: "Bob",
    },
    {
      NAME: "Charlie",
    },
    {
      NAME: "Eva",
    },
    {
      NAME: "Lucas",
    },
    {
      NAME: "Mia",
    },
    {
      NAME: "Noah",
    },
    {
      NAME: "Lily",
    },
  ];

  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    dummyData[0].NAME
  );

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-3/5 h-4/5 flex flex-col bg-white rounded-md shadow-lg">
        <header className="w-full border-b flex items-center justify-between px-4 py-3">
          <h6 className="font-semibold">EVALUATE PARTICIPANT</h6>
          <button onClick={onClose} className="w-10 h-10 rounded-md border">
            &times;
          </button>
        </header>
        <main className="w-full h-full flex flex-row overflow-hidden">
          <aside className="w-1/4 h-full border-r overflow-y-auto px-4 py-2">
            {dummyData.map((trainees, index) => (
              <button
                key={index}
                className={`w-full flex flex-row items-center justify-between gap-5 px-3 py-2 rounded-md ${
                  selectedParticipant === trainees.NAME
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedParticipant(trainees.NAME)}
              >
                {trainees.NAME}
                {/*Kulay green pag naevaluate na*/}
                <FaCircleCheck className="text-gray-200" />
              </button>
            ))}
          </aside>
          <div className="flex-1 overflow-y-auto">
            <ActivityEffectivenessForm name={selectedParticipant} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default EvaluateParticipants;
