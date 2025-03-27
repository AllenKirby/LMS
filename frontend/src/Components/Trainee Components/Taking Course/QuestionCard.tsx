import React, { useState } from "react";

type QuestionType = "Multiple" | "CheckBox" | "TextAnswer" | "TrueOrFalse";

interface QuestionCardProps {
  QT: QuestionType;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ QT }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const sampleC: Record<string, string> = {
    Choice1: "Internal users have direct access to the infrastructure devices",
    Choice2: "Internal users have better hacking skills",
    Choice3: "Internal users can access the organizational data without authentication",
    Choice4: "Internal users can access the infrastructure devices through the Internet",
  };

  const handleRadioChange = (choice: string) => {
    setSelectedChoice(choice);
  };

  const handleCheckboxChange = (choice: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(choice) ? prev.filter((c) => c !== choice) : [...prev, choice]
    );
  };

  return (
    <section className="w-full rounded-lg bg-white border border-c-grey-20 text-f-dark">
      <header className="w-full p-5 font-medium border-b">Question No.</header>
      <div className="w-full h-fit p-5 flex flex-col gap-5">
        <p className="text-p-lg">
          Why might internal security threats cause greater damage to an organization than external security threats?
        </p>
        <div className="flex flex-col gap-3">
          {QT === "Multiple" && (
            <>
              {Object.entries(sampleC).map(([key, value]) => (
                <div className="flex items-center gap-2 w-full" key={key}>
                  <input
                    type="radio"
                    id={key}
                    name="choice"
                    onChange={() => handleRadioChange(key)}
                    checked={selectedChoice === key}
                  />
                  <label
                    htmlFor={key}
                    className={`p-3 border rounded-lg flex-1 ${
                      selectedChoice === key ? "bg-c-blue-5" : ""
                    }`}
                  >
                    {value}
                  </label>
                </div>
              ))}
            </>
          )}
          {QT === "CheckBox" && (
            <>
              <p className="text-p-sm font-medium text-c-grey-50">
                3 Correct Answers <span className="text-red-500">*</span>
              </p>
              {Object.entries(sampleC).map(([key, value]) => (
                <div className="flex items-center gap-2 w-full" key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    name="choice"
                    onChange={() => handleCheckboxChange(key)}
                    checked={selectedCheckboxes.includes(key)}
                  />
                  <label
                    htmlFor={key}
                    className={`p-3 border rounded-lg flex-1 ${
                      selectedCheckboxes.includes(key) ? "bg-c-blue-5" : ""
                    }`}
                  >
                    {value}
                  </label>
                </div>
              ))}
            </>
          )}
          {QT === "TextAnswer" && (
            <textarea
              name="TA_Answer"
              id="TA_Answer"
              className="w-full border p-3 resize-none"
              rows={5}
              placeholder="Input your answer here..."
            ></textarea>
          )}
          {QT === "TrueOrFalse" && (
            <>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="radio"
                  id="true"
                  name="TorF"
                  onChange={() => handleRadioChange("True")}
                  checked={selectedChoice === "True"}
                />
                <label htmlFor="true" className={`p-3 border rounded-lg flex-1 ${selectedChoice === "True" && "bg-c-blue-5"}`}>
                  True
                </label>
              </div>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="radio"
                  id="false"
                  name="TorF"
                  onChange={() => handleRadioChange("False")}
                  checked={selectedChoice === "False"}
                />
                <label htmlFor="false" className={`p-3 border rounded-lg flex-1 ${selectedChoice === "False" && "bg-c-blue-5"}`}>
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
