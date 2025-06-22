import React, { useEffect, useState } from "react";
import EvaluateParticipants from "./EvaluateParticipants";
import { ActivityEffectivenessForm } from '../../Components'
import { SearchBar } from "../../assets/Util/InputStyle";
import { TabButton } from "../../assets/Util/ButtonStyle";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useReviewerHook } from "../../hooks";
import { pdf } from "@react-pdf/renderer";
import CoursesFunctions from "../../utils/CoursesFunctions";

interface DateState {
  start_date: string;
  end_date: string;
}

interface CoursesParticipants {
  dates: DateState;
  id: number;
  first_name: string;
  last_name: string;
  evaluation: string;
  email: string;
  department: string;
}

interface TrainingParticipants {
  id: number;
  first_name: string;
  last_name: string;
  evaluation: string;
  email: string;
  department: string;
}

const ViewParticipants: React.FC = () => {
  const { data } = useParams()
  const { id, type} = JSON.parse(decodeURIComponent(data ? data : ''));
  const [participants, setParticipants] = useState<TrainingParticipants[] | CoursesParticipants[]>([])
  const [userData, setUserData] = useState<{id: number; name: string}>({
    id: 0,
    name: ''
  });
  const [search, setSearch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>("Participants");
  const [programTitle, setProgramTitle] = useState<string>('')
  const [dates, setDates] = useState<{start_date: string, end_date:string}>({start_date: '', end_date: ''}); // This state is not used, consider removing it if unnecessary
  const { default: tabDefault, active: tabActive } = TabButton;
  const { retrieveCourseParticipants, retrieveTraniningParticipants, retrieveUserEvaluation} = useReviewerHook()
  const { convertDate, isSixMonthsAgoOrMore } = CoursesFunctions()
  const [openEvaluateModal, setOpenEvaluateModal] = useState<boolean>(false);

  const handleOpenEvaluateModal = (userID: number = 0, name: string = '') => {
    setUserData({id: userID, name: name})
    setOpenEvaluateModal(!openEvaluateModal);
  };

  const retrieveTParticipants = async() => {
    const response = await retrieveTraniningParticipants(Number(id))
    console.log(response.participants_display)
    setProgramTitle(response.training_title)
    setDates({start_date: response.start_date, end_date: response.end_date})
    setParticipants(response.participants_display)
  }
  const retrieveCParticipants = async() => {
    const response = await retrieveCourseParticipants(Number(id))
    console.log(response.participants_display)
    setProgramTitle(response.course_title)
    setParticipants(response.participants_display)
  }

  useEffect(() => {
    if(type === 'course') {
      retrieveCParticipants()
    } else {
      retrieveTParticipants()
    }
  }, [id, type])
  
  const filterDepartment = (participantsArray: CoursesParticipants[]) => {
    if(selectedDepartment.trim() === '' || selectedDepartment === 'All') {
      return participantsArray;
    } else{
      const filteredResult =  participantsArray.filter(participant => participant.department === selectedDepartment);
      if(filteredResult && filteredResult.length > 0) {
        return filteredResult;
      } else {
        return [];
      }
    }
  }

  const searchName = (participantsArray: CoursesParticipants[] | TrainingParticipants[]) => {
    if(search.trim() === '') {
      return participantsArray;
    } else{
      const searchResult =  participantsArray.filter(participant => participant.first_name.toLowerCase().includes(search.toLowerCase()) || participant.last_name.toLowerCase().includes(search.toLowerCase()));
      if(searchResult && searchResult.length > 0) {
        return searchResult;
      } else {
        return [];
      }
    }
  }

  const filteredParticipants = type === 'course' ? participants.filter(participant => (participant as CoursesParticipants).dates.start_date && (participant as CoursesParticipants).dates.end_date && isSixMonthsAgoOrMore((participant as CoursesParticipants).dates.end_date)) : [];
  const selectedParticipants = selectedTab === 'Participants' ? participants : filteredParticipants.filter(participant => participant.evaluation !== null);
  const finalParticipants = searchName(type === 'course' ? filterDepartment(selectedParticipants as CoursesParticipants[]) :  participants);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(finalParticipants.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentTrainees = finalParticipants.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageRange = 3;
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);
  const btnContentColor = "bg-c-blue-50";

  const handleOpenPdf = async (endpoint: string) => {
    console.log(endpoint)
    if(endpoint !== null) {
      const response = await retrieveUserEvaluation(endpoint)
      console.log(response)
      const blob = await pdf(
        <ActivityEffectivenessForm data={response}/>
      ).toBlob();

      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      return
    }
  };

  return (
    <section className="w-full h-full px-7 py-5 text-f-dark bg-content-bg flex flex-col">
      <header className="w-full h-fit flex items-center justify-between">
        <div className="flex flex-row gap-3">
          <button onClick={() => window.history.back()} className="flex flex-row items-center gap-1 font-medium">
            <IoArrowBackCircleOutline size={20}/>
          </button>
          <h1 className="text-h-h6 font-medium">{programTitle}</h1>
        </div>
        <div className="flex gap-3 items-center">
          {type === 'course' && (
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value as "" | "RO" | "EOD" | "AFD")}
              name="Categories"
              className="px-3 py-2 border rounded-md h-fit w-40 truncate "
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="">All</option>
              <option value="RIM">RO</option>
              <option value="EOD">EOD</option>
              <option value="AFD">AFD</option>
            </select>
          )}
          <section className="flex items-center relative">
            <FiSearch size={20} className="absolute left-3 text-c-grey-50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={SearchBar}
              placeholder="Search Participants"
            />
          </section>
        </div>
      </header>
      <nav className="w-full flex border-b">
        <button
          className={`${tabDefault} ${
            selectedTab === "Participants" && tabActive
          }`}
          onClick={() => setSelectedTab("Participants")}
        >
          Participants
        </button>
        {type === 'course' && (
          <button
            className={`${tabDefault} ${
              selectedTab === "After 6 Months Eval" && tabActive
            }`}
            onClick={() => setSelectedTab("After 6 Months Eval")}
          >
            After 6 Months Eval
          </button>
      )}
      </nav>
      <div className="overflow-auto max-h-[500px] mt-5">
        {selectedTab == "Participants" && (
          <>
            <table className="min-w-full table-auto border-collapse text-f-dark overflow-x-auto font-Poppins">
              <thead className="sticky top-0 h-12 text-gray-500 text-p-sm">
                <tr>
                  <th className="pl-4 flex-1 text-start bg-gray-200 rounded-tl-md border-b text-nowrap">
                    PARTICIPANT NAME
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap">
                    DEPARTMENT
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                    EMAIL ADDRESS
                  </th>
                  {type === 'course' && (
                    <>
                      <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                        Start Date
                      </th>
                      <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                        End Date
                      </th>
                    </>
                  )}
                  {type === 'training' && (
                    <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                      Evaluate
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentTrainees.map((trainee, index) => (
                  <tr
                    key={index}
                    className={`h-16 font-medium ${
                      index % 1 === 0 && "border-b"
                    }`}
                  >
                    <td className="pl-4 flex-1">
                      {" "}
                      {`${trainee.first_name} ${trainee.last_name}`}
                    </td>
                    <td className="pl-4 flex-1">
                      {trainee.department || "--"}
                    </td>
                    <td className="pl-4 flex-1">{trainee.email}</td>
                    {type === 'course' && 
                      (
                        <>
                          <td className="pl-4 flex-1">{(trainee as CoursesParticipants).dates.start_date ? convertDate((trainee as CoursesParticipants).dates.start_date) : '--'}</td>
                          <td className="pl-4 flex-1">{(trainee as CoursesParticipants).dates.end_date ? convertDate((trainee as CoursesParticipants).dates.end_date) : '--'}</td>
                        </>
                      )
                    }
                    {type === 'training' && (
                      isSixMonthsAgoOrMore(dates.end_date) ? (
                        <td className="pl-4 flex-1 flex items-center justify-center">
                          {trainee.evaluation === null ? (
                            <button 
                              onClick={() => handleOpenEvaluateModal(trainee.id, `${trainee.first_name} ${trainee.last_name}`)}
                              className="my-3 bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-gray-800 transition-all duration-200"
                            >
                              {`Evaluate ${trainee.first_name} ${trainee.last_name}`}
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleOpenPdf(trainee.evaluation)}
                              className="my-3 bg-green-100 text-green-700 font-medium px-4 py-2 rounded-md shadow-sm hover:bg-green-200 hover:text-green-900 transition-all duration-200"
                            >
                              Export Evaluation
                            </button>
                          )}
                        </td>
                      ) : (
                        <td className="pl-4 flex-1 font-medium text-red-500">Not Yet Eligible</td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {selectedTab == "After 6 Months Eval" && (
          <>
            <table className="min-w-full table-auto border-collapse text-f-dark overflow-x-auto font-Poppins">
              <thead className="sticky top-0 h-12 text-gray-500 text-p-sm">
                <tr>
                  <th className="pl-4 flex-1 text-start bg-gray-200 rounded-tl-md border-b text-nowrap">
                    PARTICIPANT NAME
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap">
                    DEPARTMENT
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                    EMAIL ADDRESS
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                    Evaluate
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTrainees.length > 0 ?
                  currentTrainees.map((trainee, index) => (
                    <tr
                      key={index}
                      className={`h-16 font-medium ${
                        index % 1 === 0 && "border-b"
                      }`}
                    >
                      <td className="pl-4 flex-1">
                        {" "}
                        {`${trainee.first_name} ${trainee.last_name}`}
                      </td>
                      <td className="pl-4 flex-1">
                        {trainee.department || "--"}
                      </td>
                      <td className="pl-4 flex-1">{trainee.email}</td>
                      <td className="pl-4 flex-1 flex items-center justify-center">
                        {trainee.evaluation === null ? (
                          <button 
                            onClick={() => handleOpenEvaluateModal(trainee.id, `${trainee.first_name} ${trainee.last_name}`)}
                            className="my-3 bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-gray-800 transition-all duration-200"
                          >
                            {`Evaluate ${trainee.first_name} ${trainee.last_name}`}
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleOpenPdf(trainee.evaluation)}
                            className="my-3 bg-green-100 text-green-700 font-medium px-4 py-2 rounded-md shadow-sm hover:bg-green-200 hover:text-green-900 transition-all duration-200"
                          >
                            Export Evaluation
                          </button>
                        )}
                      </td>
                    </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-20">
                      No participants available for evaluation.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
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
      {openEvaluateModal && (
        <EvaluateParticipants 
          onClose={handleOpenEvaluateModal} 
          userData={userData} 
          programID={Number(id)} 
          type={type}
          getCourseParticipants={retrieveCParticipants}
          getTrainingParticipants={retrieveTParticipants}/>
      )}
    </section>
  );
};

export default ViewParticipants;
