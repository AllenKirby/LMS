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
    <section className="w-full h-full px-7 py-5 text-f-dark bg-[#F3F4F5]">
      <header className="flex justify-between items-center">
        <section className="flex items-center gap-3">
          <button className="flex items-center justify-center" onClick={() => navigate('/trainingofficer/courses/course')}
          >&lt;</button>
          <h1 className="text-h-h6 font-medium">{data?.training_title}</h1>
        </section>
        <div className="flex gap-3">
          <select
            name="Categories"
            className="px-3 py-2 border rounded-md h-fit w-40 truncate "
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="FA">For All</option>
            <option value="EOD">EOD</option>
            <option value="EMU">EMU</option>
          </select>
          <section className="flex items-center relative group">
            <FiSearch size={20} className="absolute left-3" />
            <input
              type="text"
              className="px-3 py-2 border rounded-md h-fit pl-10"
              placeholder="Search course"
            />
          </section>
        </div>
      </header>
      <main className="w-full grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 pt-5 gap-10">
        <ExternalParticipantCard data={data ? data : null} id={Number(id)}/>
      </main>
    </section>
  );
};

export default ExternalTrainingView;
