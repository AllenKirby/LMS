import { FiSearch, FiFilter } from "react-icons/fi";
import { useLocation } from "react-router-dom";

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

type ParticipantsListState = {
  trainees: {trainees: Trainees[]};
  handleCheckBox?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  participants?: (string | number)[]
}

const ParticipantsList: React.FC<ParticipantsListState> = (props) => {
  const { trainees, handleCheckBox = () => {}, participants= [] } = props
  const location= useLocation()

  console.log(trainees)

  return (
    <section className="w-full h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {location.pathname === '/trainingofficer/trainee' ? (<h1 className="text-h-h6 font-medium">Trainees</h1>) : (<h1 className="text-h-h6 font-medium">{`${participants.length} Selected Participants`}</h1>)}
        <div className="flex gap-2">
          <button className="p-2 bg-c-grey-5 rounded-md"><FiSearch size={20}/></button>
          <button className="p-2 bg-c-grey-5 rounded-md"><FiFilter size={20}/></button>
        </div>
      </div>
      <table className="w-full flex-1 border">
        <thead className="bg-c-blue-5">
          <tr className="rounded-t-md">
            <th className="p-3 border-r-2">
              <input type="checkbox" 
                checked={trainees.trainees.length === (participants?.length || 0)} 
                onChange={() => {
                  if (!props.handleCheckBox) return;
                  if (trainees.trainees.length !== (participants?.length || 0)) {
                    props.handleCheckBox({
                      target: { checked: true, value: trainees.trainees.map((t) => t.email) }
                    } as unknown as React.ChangeEvent<HTMLInputElement>);
                  } else {
                    props.handleCheckBox({
                      target: { checked: false, value: [] }
                    } as unknown as React.ChangeEvent<HTMLInputElement>);
                  }
                }} 
                className="scale-150"/>
            </th>
            {location.pathname === '/trainingofficer/trainee' && <th className="p-3 border-r-2">Trainee ID</th>}
            <th className="p-3 border-r-2">Full Name</th>
            <th className="p-3 border-r-2">Department</th>
            {location.pathname === '/trainingofficer/trainee' && <th className="p-3 border-r-2">Contact Number</th>}
            {location.pathname === '/trainingofficer/trainee' && <th className="p-3 border-r-2">Email  Address</th>}
          </tr>
        </thead>
        <tbody>
          {trainees.trainees.map((trainee, index) => (
            <tr key={index}>
              <td className="p-3 border-r-2 text-center">
                <input 
                  type="checkbox" 
                  value={trainee.email} 
                  checked={participants?.includes(trainee.email) || false}
                  onChange={handleCheckBox}
                  className="scale-150"/>
              </td>
              {location.pathname === '/trainingofficer/trainee' && <td className="p-3 border-r-2 text-center">{trainee.id}</td>}
              <td className="p-3 border-r-2 text-center">{`${trainee.first_name} ${trainee.last_name}`}</td>
              <td className="p-3 border-r-2 text-center">{trainee.department || '--'}</td>
              {location.pathname === '/trainingofficer/trainee' && <td className="p-3 border-r-2 text-center">{trainee.contact}</td>}
              {location.pathname === '/trainingofficer/trainee' && <td className="p-3 border-r-2 text-center">{trainee.email}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ParticipantsList