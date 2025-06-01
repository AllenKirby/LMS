import React, { useState } from "react";

import EvaluateParticipants from "./EvaluateParticipants";

import { PrimaryRegularA, TabButton } from "../../assets/Util/ButtonStyle";

const ViewParticipants: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Participants");
  const { default: tabDefault, active: tabActive } = TabButton;

  const [openEvaluateModal, setOpenEvaluateModal] = useState<boolean>(false);

  const handleOpenEvaluateModal = () => {
    setOpenEvaluateModal(!openEvaluateModal);
  };

  const filteredTrainees = [
    {
      first_name: "John",
      last_name: "Doe",
      department: "Engineering",
      contact: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      department: "Marketing",
      contact: "987-654-3210",
      email: "jane.smith@example.com",
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      department: "HR",
      contact: "555-123-4567",
      email: "alice.johnson@example.com",
    },
    {
      first_name: "Bob",
      last_name: "Brown",
      department: "Sales",
      contact: "555-987-6543",
      email: "bob.brown@example.com",
    },
    {
      first_name: "Charlie",
      last_name: "Davis",
      department: "IT",
      contact: "555-555-5555",
      email: "charlie.davis@example.com",
    },
    {
      first_name: "Eva",
      last_name: "Martin",
      department: "Finance",
      contact: "555-111-2222",
      email: "eva.martin@example.com",
    },
    {
      first_name: "Lucas",
      last_name: "Garcia",
      department: "Engineering",
      contact: "555-222-3333",
      email: "lucas.garcia@example.com",
    },
    {
      first_name: "Mia",
      last_name: "Martinez",
      department: "Legal",
      contact: "555-444-5555",
      email: "mia.martinez@example.com",
    },
    {
      first_name: "Noah",
      last_name: "Wilson",
      department: "Sales",
      contact: "555-666-7777",
      email: "noah.wilson@example.com",
    },
    {
      first_name: "Lily",
      last_name: "Anderson",
      department: "Operations",
      contact: "555-888-9999",
      email: "lily.anderson@example.com",
    },
  ];

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(filteredTrainees.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentTrainees = filteredTrainees.slice(
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

  return (
    <section className="w-full h-full px-7 py-5 text-f-dark bg-content-bg flex flex-col">
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-h-h6 font-medium">Training Title</h1>
        <button className={PrimaryRegularA} onClick={handleOpenEvaluateModal}>
          Evaluate Participants
        </button>
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
        <button
          className={`${tabDefault} ${
            selectedTab === "After 6 Months Eval" && tabActive
          }`}
          onClick={() => setSelectedTab("After 6 Months Eval")}
        >
          After 6 Months Eval
        </button>
      </nav>
      <div className="w-full mt-5">
        {selectedTab == "Participants" ? (
          <>
            <table className="min-w-full table-auto border-collapse text-f-dark overflow-x-auto font-Poppins">
              <thead className="h-12 text-gray-500 text-p-sm">
                <tr>
                  <th className="pl-4 flex-1 text-start bg-gray-200 rounded-tl-md border-b text-nowrap">
                    PARTICIPANT NAME
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap">
                    DEPARTMENT
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap">
                    CONTACT NUMBER
                  </th>
                  <th className="pl-4 flex-1 text-start bg-gray-200 border-b text-nowrap rounded-tr-md">
                    EMAIL ADDRESS
                  </th>
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
                    <td className="pl-4 flex-1">{trainee.contact || "--"}</td>
                    <td className="pl-4 flex-1">{trainee.email}</td>
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
        ) : (
          <div>Survey Chart</div>
        )}
      </div>
      {openEvaluateModal && (
        <EvaluateParticipants onClose={handleOpenEvaluateModal} />
      )}
    </section>
  );
};

export default ViewParticipants;
