import ActivityEffectivenessForm from "./ActivityEffectivenessForm";

interface EvaluateParticipantsProps {
  onClose: () => void;
  userData: {id: number, name: string};
  programID: number;
  type: 'course' | 'training';
  getCourseParticipants: () => void; 
  getTrainingParticipants: () => void;
}

const EvaluateParticipants: React.FC<EvaluateParticipantsProps> = (props) => {
  const { onClose, userData, programID, type, getCourseParticipants, getTrainingParticipants } = props
 

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
          <div className="flex-1 overflow-y-auto">
            <ActivityEffectivenessForm 
              name={userData.name} 
              userID={userData.id} 
              programID={programID} 
              type={type}
              onClose={onClose}
              getCourseParticipants={getCourseParticipants}
              getTrainingParticipants={getTrainingParticipants}/>
          </div>
        </main>
      </div>
    </section>
  );
};

export default EvaluateParticipants;
