import { useSelector } from "react-redux";
import {ParticipantsList} from "./";

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

const Employees = () => {
  const trainees = useSelector((state: {trainees: {trainees: Trainees[]}}) => state.trainees)
  return (  
    <section className="w-full h-full shadow-md rounded-md px-12 py-7 bg-white">
      <ParticipantsList trainees={trainees}/>
    </section>
  );
};

export default Employees;
