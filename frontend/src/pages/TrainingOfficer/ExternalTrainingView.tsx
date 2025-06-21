import { FiSearch } from "react-icons/fi";
import {
  ExternalParticipantCard,
} from "./ExternalTrainingComponent";
import { useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { TrainingDataState } from '../../types/CourseCreationTypes'
import { useTrainingOfficerHook } from '../../hooks'
const ExternalTrainingView: React.FC = () => {
  const navigate = useNavigate();

    const [data, setData] = useState<TrainingDataState>()
  
    const { retrieveExternalParticipants } = useTrainingOfficerHook()
    const { id } = useParams()
  
    useEffect(() => {
      const retrieveParticipants = async() => {
        if(!id) return
        const numericId = Number(id)
        const response = await retrieveExternalParticipants(numericId)
        if(response) {
          setData(response)
        }
      }
      retrieveParticipants()
    }, [id])

  return (
    <section className="w-full h-full px-7 py-5 text-f-dark bg-[#F3F4F5] flex flex-col">
      <header className="w-full  h-fit flex justify-between items-center">
        <section className="flex items-center gap-3">
          <button className="flex items-center justify-center" onClick={() => navigate('/trainingofficer/courses/course')}
          >&lt;</button>
          <h1 className="text-h-h6 font-medium">{data?.training_title}</h1>
        </section>
      </header>
      <main className="w-full flex-1 overflow-y-auto grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 pt-5 gap-10">
        <ExternalParticipantCard data={data ? data : null} id={Number(id)}/>
      </main>
    </section>
  );
};

export default ExternalTrainingView;
