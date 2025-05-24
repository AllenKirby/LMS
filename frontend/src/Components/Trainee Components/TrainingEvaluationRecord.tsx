import { useEffect, useState } from "react";
import useTrainingOfficer from "../../hooks/useTrainingOfficerHook";

interface EvaluationRecord {
  date_started: string;
  date_ended: string;
  course: number;
  final_score: number;
  follow_up: string;
  participant_status: string;
  participant: { id: number; email: string; first_name: string; last_name: string };
}

type EvaluationRecordState = {
  modal: () => void;
  courseID: number;
};

const TrainingEvaluationRecord: React.FC<EvaluationRecordState> = (props) => {
  const { modal, courseID } = props;
  const { getEvaluationRecord } = useTrainingOfficer();
  const [evaluationRecords, setEvaluationRecords] = useState<EvaluationRecord[]>([]);

  useEffect(() => {
    const getEvaluation = async () => {
      const response = await getEvaluationRecord(courseID);
      console.log(response);
      setEvaluationRecords(response);
    };
    getEvaluation();
  }, [courseID]);

  const convertDate = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    } else {
      return null;
    }
  };

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-2/3 h-2/3 z-40 rounded-md bg-white p-4 shadow-lg flex flex-col overflow-hidden">
        <header className="flex items-center justify-between">
          <p className="text-lg font-semibold">Training Evaluation Record</p>
          <button onClick={modal} className="p-3 rounded-md border text-lg">&times;</button>
        </header>

        <div className="flex-grow overflow-y-auto mt-4">
          <table className="min-w-full table-auto border-collapse text-f-dark font-Poppins text-p-sm md:text-p-rg">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-c-grey-50 h-14">
                <th className="pl-4 text-start font-medium border-r bg-white rounded-l-md">Date Started</th>
                <th className="pl-4 text-start font-medium border-r bg-white">Date Ended</th>
                <th className="pl-4 text-start font-medium border-r bg-white">Name</th>
                <th className="pl-4 text-start font-medium border-r bg-white">Completion Status</th>
                <th className="pl-4 text-start font-medium border-r bg-white">Final Score</th>
                <th className="pl-4 text-start font-medium bg-white rounded-r-md">6-Month Follow-up Survey</th>
              </tr>
            </thead>
            <tbody>
              {evaluationRecords.map((item, index) => (
                <tr key={index} className="h-14 cursor-pointer">
                  <td
                    className={`pl-4 text-start font-medium border-r rounded-l-md ${
                      index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                    }`}
                  >
                    {convertDate(item.date_started) || "--"}
                  </td>
                  <td
                    className={`pl-4 text-start font-medium border-r ${
                      index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                    }`}
                  >
                    {convertDate(item.date_ended) || "--"}
                  </td>
                  <td
                    className={`pl-4 text-start font-medium border-r ${
                      index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                    }`}
                  >
                    {item.participant.first_name} {item.participant.last_name}
                  </td>
                  <td
                    className={`pl-4 text-start font-medium border-r ${
                      index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                    }`}
                  >
                    {toTitleCase(item.participant_status) || "--"}
                  </td>
                  <td
                    className={`pl-4 text-start font-medium border-r ${
                      index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                    }`}
                  >
                    {item.final_score !== null ? item.final_score : "N/A"}
                  </td>
                  <td
                    className={`pl-4 text-start font-medium border-r rounded-r-md ${
                      index % 2 === 0 ? "bg-c-grey-5" : "bg-white"
                    }`}
                  >
                    {item.follow_up !== null ? item.follow_up : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TrainingEvaluationRecord;
