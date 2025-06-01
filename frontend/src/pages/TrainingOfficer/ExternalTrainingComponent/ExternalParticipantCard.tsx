import React, { useState } from "react";

import { TrainingDataState } from '../../../types/CourseCreationTypes'
import ParticipantUploadedDocument from './ParticipantUploadedDocument'

type ExternalParticipantCardState = {
  data: TrainingDataState | null;
  id: number
}

const ExternalParticipantCard: React.FC<ExternalParticipantCardState> = React.memo((props) => {
  const { data, id } = props
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
    
  const handleUploadToggle = (participantId: number) => {
    setSelectedParticipantId(selectedParticipantId === participantId ? null : participantId);
  };

  return (
    <>
      {data?.participants_display?.map((info, index) => (
        <section
          className="w-full h-[160px] flex flex-col justify-between rounded-xl bg-white shadow-md group cursor-pointer text-c-grey-50 p-3"
          key={index}
          onClick={() => handleUploadToggle(info.id)}
        >
          <p className="w-full text-p-sc font-medium text-end">{info.status && info.status.charAt(0).toUpperCase() + info.status.slice(1)}</p>
          <article>
            <h6 className="text-p-rg font-medium text-f-dark">{`${info.first_name} ${info.last_name}`}</h6>
            <p className="text-p-sm">{info.department}</p>
          </article>
          {selectedParticipantId === info.id && (
            <ParticipantUploadedDocument 
              onClose={() => setSelectedParticipantId(null)} 
              key={info.id} 
              data={info} 
              trainingID={id}
            />
          )}
        </section>
      ))}
    </>
  );
});

export default ExternalParticipantCard;