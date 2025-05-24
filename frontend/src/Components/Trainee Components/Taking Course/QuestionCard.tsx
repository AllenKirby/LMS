import HTMLReactParser from "html-react-parser";
import { QuestionnaireState } from "../../../types/CourseCreationTypes";
import React from "react";

interface QuestionCardProps {
  content: QuestionnaireState;
  addChoice: (questionID: string, choice: string) => void;
  addMultipleChoice: (questionID: string, choice: string) => void;
  data: { answers: { [key: string]: string | string[] } };
  correctAnswer: { [key: string]: string };
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(({
  content,
  addChoice,
  addMultipleChoice,
  data,
  correctAnswer,
}) => {
  const selectedAnswer = data.answers[content.questionnaireID] ?? "";
  const selectedAnswers = Array.isArray(data.answers[content.questionnaireID])
    ? data.answers[content.questionnaireID]
    : [];

  const answerStatus = correctAnswer[content.questionnaireID];

  const getAnswerFeedbackColor = () => {
    if (answerStatus === "Correct") return "text-green-600";
    if (answerStatus === "Incorrect") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <section
      className={`w-full rounded-xl bg-white border shadow-sm transition-colors duration-300
        ${
          answerStatus === "Correct"
            ? "border-green-500"
            : answerStatus === "Incorrect"
            ? "border-red-500"
            : "border-gray-200"
        }`}
    >
      {/* Header */}
      <header className="w-full px-6 py-4 border-b bg-gray-50 flex justify-between items-center rounded-t-xl">
        <p className="text-base font-semibold text-gray-700">Question</p>
        {answerStatus && answerStatus !== "No answer provided" && (
          <p className={`text-sm font-medium ${getAnswerFeedbackColor()}`}>
            {answerStatus} Answer
          </p>
        )}
      </header>

      {/* Body */}
      <div className="w-full p-6 flex flex-col gap-6">
        {/* Question */}
        <p className="text-lg font-medium text-gray-800">
          {HTMLReactParser(content.question)}
        </p>

        {/* Answer Choices */}
        <div className="flex flex-col gap-4">
          {/* Multiple Choice */}
          {content.choiceType === "Multiple Choice" &&
            content.choices.map((item) => (
              <label
                key={item.choiceID}
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors
                  ${
                    selectedAnswer === item.choice
                      ? "bg-blue-50 border-blue-400"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
              >
                <input
                  type="radio"
                  name={`choice-${content.questionnaireID}`}
                  onChange={() =>
                    addChoice(content.questionnaireID, item.choice)
                  }
                  checked={selectedAnswer === item.choice}
                />
                <span className="text-gray-700">{item.choice}</span>
              </label>
            ))}

          {/* Check Box */}
          {content.choiceType === "Check Box" &&
            content.choices.map((item) => (
              <label
                key={item.choiceID}
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors
                  ${
                    selectedAnswers.includes(item.choice)
                      ? "bg-blue-50 border-blue-400"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
              >
                <input
                  type="checkbox"
                  onChange={() =>
                    addMultipleChoice(content.questionnaireID, item.choice)
                  }
                  checked={selectedAnswers.includes(item.choice)}
                />
                <span className="text-gray-700">{item.choice}</span>
              </label>
            ))}

          {/* True or False */}
          {content.choiceType === "True or False" && (
            <div className="flex flex-col gap-4">
              {["True", "False"].map((value) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors
                    ${
                      selectedAnswer === value
                        ? "bg-blue-50 border-blue-400"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                >
                  <input
                    type="radio"
                    name={`TorF-${content.questionnaireID}`}
                    onChange={() => addChoice(content.questionnaireID, value)}
                    checked={selectedAnswer === value}
                  />
                  <span className="text-gray-700">{value}</span>
                </label>
              ))}
            </div>
          )}

          {/* Text Answer */}
          {content.choiceType === "Text Answer" && (
            <input
              type="text"
              onChange={(e) =>
                addChoice(content.questionnaireID, e.target.value)
              }
              value={selectedAnswer as string}
              placeholder="Enter your answer..."
              className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default QuestionCard;
