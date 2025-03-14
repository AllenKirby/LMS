import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { TrainingDataState } from '../../../types/CourseCreationTypes'
import ParticipantUploadedDocument from './ParticipantUploadedDocument'

const ExternalParticipantCard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
    // Decode the data parameter
    const dataString = searchParams.get("data");
    const data: TrainingDataState = dataString ? JSON.parse(dataString) : {};

    console.log(data)

    // const handleUploadToggle = () => {
    //     setUploadOpen(!uploadOpen);
    // };
    
    const handleUploadToggle = () => {
      if(document.startViewTransition) {
        document.startViewTransition(() => setUploadOpen(!uploadOpen));
      } else {
        setUploadOpen(!uploadOpen);
      }
    };

  return (
    <>
      {data?.participants_display?.map((info, index) => (
        <section
          className="w-full h-[160px] flex flex-col justify-between rounded-xl bg-white shadow-md group cursor-pointer text-c-grey-50 p-3"
          key={index}
          onClick={handleUploadToggle}
        >
          <p className="w-full text-p-sc font-medium text-end">{info.status && info.status.charAt(0).toUpperCase() + info.status.slice(1)}</p>
          <article>
            <h6 className="text-p-rg font-medium text-f-dark">{`${info.first_name} ${info.last_name}`}</h6>
            <p className="text-p-sm">{info.department}</p>
          </article>
          {uploadOpen && <ParticipantUploadedDocument onClose={handleUploadToggle}/>}
        </section>
      ))}
    </>
  );
};

export default ExternalParticipantCard;
