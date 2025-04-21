const TrainingEvaluationRecord = () => {
  const dummuyData = [];
  const dummyData = [
    {
      dateStarted: "2023-01-01",
      dateEnded: "2023-02-01",
      completionStatus: "Completed",
      finalScore: 85,
      followupSurvey: "Completed",
    },
    {
      dateStarted: "2023-03-01",
      dateEnded: "2023-04-01",
      completionStatus: "In Progress",
      finalScore: null,
      followupSurvey: null,
    },
  ];
  return (
    <section className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 ">
      <div className="w-2/3 h-2/3 z-40 rounded-md bg-white p-4 shadow-lg flex flex-col">
        <header>
          <p>Training Evaluation Record</p>
          <button className="p-3 rounded-md border">&times;</button>
        </header>
        <table className="min-w-full table-auto border-collapse text-f-dark overflow-x-auto font-Poppins text-p-sm md:text-p-rg">
          <thead>
            <tr className="text-c-grey-50 h-14">
              <th className="pl-4 flex-1 text-start font-medium border-r bg-white rounded-l-md">
                Date Started
              </th>
              <th className="pl-4 flex-1 text-start font-medium border-r bg-white">
                Date Ended
              </th>
              <th className="pl-4 flex-1 text-start font-medium border-r bg-white">
                Completion Status
              </th>
              <th className="pl-4 flex-1 text-start font-medium border-r bg-white">
                Final Score
              </th>
              <th className="pl-4 flex-1 text-start font-medium bg-white rounded-r-md">
                6-Month Follow-up Survey
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={index} className="h-14 cursor-pointer">
                <td
                  className={`pl-4 flex-1 text-start font-medium border-r rounded-l-md ${
                    index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                  }`}
                >
                  {item.dateStarted}
                </td>
                <td
                  className={`pl-4 flex-1 text-start font-medium border-r ${
                    index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                  }`}
                >
                  {item.dateEnded}
                </td>
                <td
                  className={`pl-4 flex-1 text-start font-medium border-r ${
                    index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                  }`}
                >
                  {item.completionStatus}
                </td>
                <td
                  className={`pl-4 flex-1 text-start font-medium border-r ${
                    index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                  }`}
                >
                  {item.finalScore !== null ? item.finalScore : "N/A"}
                </td>
                <td
                  className={`pl-4 flex-1 text-start font-medium border-r rounded-r-md ${
                    index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                  }`}
                >
                  {item.followupSurvey !== null ? item.followupSurvey : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TrainingEvaluationRecord;
