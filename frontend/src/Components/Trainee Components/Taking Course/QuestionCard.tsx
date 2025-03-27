import { QuestionnaireState } from "../../../types/CourseCreationTypes";

interface QuestionCardProps {
  content: QuestionnaireState;
  addChoice: (questionID: string, choice: string) => void;
  addMultipleChoice: (questionID: string, choice: string) => void;
  data: { answers: {[key: string]: string | string[]} };
}

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { content, addChoice, addMultipleChoice, data } = props;

  const selectedAnswer = data[content.questionnaireID] ?? ""; // Default to empty string
  const selectedAnswers = Array.isArray(data[content.questionnaireID]) ? data[content.questionnaireID] : []; // Default to empty array

  return (
    <section className="w-full rounded-lg bg-white border border-c-grey-20 text-f-dark">
      <header className="w-full p-5 font-medium border-b">Question No.</header>
      <div className="w-full h-fit p-5 flex flex-col gap-5">
        <p className="text-p-lg">{content.question}</p>
        <div className="flex flex-col gap-3">
          {/* Multiple Choice */}
          {content.choiceType === "Multiple Choice" && (
            <>
              {content.choices.map((item) => (
                <div className="flex items-center gap-2 w-full" key={item.choiceID}>
                  <input
                    type="radio"
                    name={`choice-${content.questionnaireID}`}
                    onChange={() => addChoice(content.questionnaireID, item.choice)}
                    checked={selectedAnswer === item.choice} // Default prevents undefined errors
                  />
                  <label className={`p-3 border rounded-lg flex-1 ${selectedAnswer === item.choice ? "bg-c-blue-5" : ""}`}>
                    {item.choice}
                  </label>
                </div>
              ))}
            </>
          )}

          {/* Check Box */}
          {content.choiceType === "Check Box" && (
            <>
              <p className="text-p-sm font-medium text-c-grey-50">
                3 Correct Answers <span className="text-red-500">*</span>
              </p>
              {content.choices.map((item) => (
                <div className="flex items-center gap-2 w-full" key={item.choiceID}>
                  <input
                    type="checkbox"
                    onChange={() => addMultipleChoice(content.questionnaireID, item.choice)}
                    checked={selectedAnswers.includes(item.choice)} // Safe check
                  />
                  <label className={`p-3 border rounded-lg flex-1 ${selectedAnswers.includes(item.choice) ? "bg-c-blue-5" : ""}`}>
                    {item.choice}
                  </label>
                </div>
              ))}
            </>
          )}

          {/* True or False */}
          {content.choiceType === "True or False" && (
            <>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="radio"
                  id="true"
                  name={`TorF-${content.questionnaireID}`}
                  onChange={() => addChoice(content.questionnaireID, "True")}
                  checked={selectedAnswer === "True"}
                />
                <label htmlFor="true" className={`p-3 border rounded-lg flex-1 ${selectedAnswer === "True" ? "bg-c-blue-5" : ""}`}>
                  True
                </label>
              </div>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="radio"
                  id="false"
                  name={`TorF-${content.questionnaireID}`}
                  onChange={() => addChoice(content.questionnaireID, "False")}
                  checked={selectedAnswer === "False"}
                />
                <label htmlFor="false" className={`p-3 border rounded-lg flex-1 ${selectedAnswer === "False" ? "bg-c-blue-5" : ""}`}>
                  False
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionCard;
