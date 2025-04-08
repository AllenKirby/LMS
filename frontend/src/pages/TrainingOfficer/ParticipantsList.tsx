import { FiSearch, FiFilter } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import { Trainees } from '../../types/CourseCreationTypes'
import { useState } from "react";

//Styling
import { SearchBar } from "../../assets/Util/InputStyle";

type ParticipantsListState = {
  trainees: {trainees: Trainees[]};
  handleCheckBox?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  participants?: (string | number)[]
}

  const ParticipantsList: React.FC<ParticipantsListState> = (props) => {
  const { trainees, handleCheckBox = () => {}, participants= [] } = props
  const location= useLocation()

  //Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredTrainees = trainees.trainees.filter((trainee) =>
    `${trainee.first_name} ${trainee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const totalPages = Math.ceil(filteredTrainees.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentTrainees = filteredTrainees.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageRange = 3; 
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);
  const btnContentColor = "bg-c-blue-50";

  return (
    <section className="w-full h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {location.pathname === '/trainingofficer/trainee' ? (<h1 className="text-h-h6 font-medium">Trainees</h1>) : (<h1 className="text-h-h6 font-medium">{`${participants.length} Selected Participants`}</h1>)}
        <div className="flex gap-2">
          <section className="flex items-center relative">
            <FiSearch size={20} className="absolute left-3 text-c-grey-50" />
            <input
              type="text"
              className={SearchBar}
              placeholder="Search course"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
            />
          </section>
          <button className="p-2 bg-c-grey-5 rounded-md"><FiFilter size={20}/></button>
        </div>
      </div>
      {currentTrainees.length > 0 ? 
        <>
          <table className="min-w-full table-auto border-collapse text-f-dark overflow-x-auto font-Poppins text-p-sm md:text-p-rg">
            <thead>
              <tr className="text-c-grey-50 h-14">
                {location.pathname === '/trainingofficer/trainee' ?
                  <></> :             
                  <th className="w-20 bg-white rounded-l-md border-r">
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
                }
                <th className={`pl-4 flex-1 text-start font-medium border-r ${location.pathname === '/trainingofficer/trainee' ? "rounded-l-md bg-c-grey-5" : "bg-white"}`}>Full Name</th>
                <th className={`pl-4 flex-1 text-start font-medium ${location.pathname === '/trainingofficer/courses/courseCreation/courseParticipants' ? "rounded-r-md bg-white" : "border-r bg-c-grey-5"}`}>Department</th>
                {location.pathname === '/trainingofficer/trainee' && 
                  <th className="pl-4 flex-1 text-start font-medium bg-c-grey-5 border-r ">Contact Number</th>
                }
                {location.pathname === '/trainingofficer/trainee' && 
                  <th className="pl-4 flex-1 text-start font-medium bg-c-grey-5 rounded-r-md">Email  Address</th>
                }
              </tr>
            </thead>
            <tbody>
              {currentTrainees.map((trainee, index) => (
                <tr key={index} className="h-14 cursor-pointer">
                  {location.pathname === '/trainingofficer/trainee' ?
                    <></> : 
                    <td 
                      className={`w-20 rounded-l-md text-center border-r ${index % 2 === 0 ? "bg-c-grey-5" : "bg-white"}`}
                    >
                      <input 
                        type="checkbox" 
                        value={trainee.email} 
                        checked={participants?.includes(trainee.email) || false}
                        onChange={handleCheckBox}
                        className="scale-150"/>
                    </td>
                  }
                  <td 
                    className={`pl-4 flex-1 text-start border-r 
                                ${location.pathname === '/trainingofficer/trainee' ? (index + 1) % 2 === 0 ? "bg-c-grey-5" : "bg-white"  : index % 2 === 0 ? "bg-c-grey-5" : "bg-white"}
                                ${location.pathname === '/trainingofficer/trainee' && "rounded-l-md"}
                              `}
                  >
                    {`${trainee.first_name} ${trainee.last_name}`}
                  </td>
                  <td 
                    className={`pl-4 flex-1 text-start 
                              ${location.pathname === '/trainingofficer/courses/courseCreation/courseParticipants' ? "rounded-r-md" : "border-r"} 
                              ${location.pathname === '/trainingofficer/trainee' ? (index + 1) % 2 === 0 ? "bg-c-grey-5" : "bg-white"  : index % 2 === 0 ? "bg-c-grey-5" : "bg-white"}`
                    }
                  >
                    {trainee.department || '--'}
                  </td>
                  {location.pathname === '/trainingofficer/trainee' && 
                    <td className={`pl-4 flex-1 text-start border-r ${(index + 1) % 2 === 0 ? "bg-c-grey-5" : "bg-white"}`}>
                      {trainee.contact}
                    </td>}
                  {location.pathname === '/trainingofficer/trainee' && 
                    <td className={`pl-4 flex-1 text-start rounded-r-md ${(index + 1) % 2 === 0 ? "bg-c-grey-5" : "bg-white"}`}>
                    {trainee.email}
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4 text-p-sm md:text-p-rg">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`h-8 w-8 md:h-10 md:w-10 mx-1 rounded ${
                currentPage === 1
                  ? "bg-gray-400 text-f-light"
                  : "bg-gray-200 text-f-gray2"
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(startPage + index)}
                className={`h-8 w-8 md:h-10 md:w-10 mx-1 rounded ${
                  currentPage === startPage + index
                    ? `${btnContentColor} text-f-light`
                    : "bg-gray-200 text-f-gray2"
                }`}
              >
                {startPage + index}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`h-8 w-8 md:h-10 md:w-10 mx-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-400 text-f-light"
                  : "bg-gray-200 text-f-gray2"
              }`}
            >
              &gt;
            </button>
          </div>
        </>
        :
        <div className="w-full h-full flex items-center justify-center">
          <p>Sorry we couldn't find that person!</p>
        </div>
      }
    </section>
  )
}

export default ParticipantsList