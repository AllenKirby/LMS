import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTraineeHook } from '../../hooks';
import { SurveyAnswers } from '../../types/CourseCreationTypes';

import MessageBox from '../MessageBox';

type Question = {
  id: string;
  label: string;
};

type Section = {
  title: string;
  questions: Question[];
};

const ratingOptions = [5, 4, 3, 2, 1];

const sections: Section[] = [
  {
    title: 'Session',
    questions: [
      { id: '1.1', label: 'The objectives were clearly explained' },
      { id: '1.2', label: 'The objectives were met' },
      { id: '1.3', label: 'It is substantial and extensive' },
      { id: '1.4', label: 'It provided information that is relevant to my actual job' },
      { id: '1.5', label: 'It provided activities that will help advance my professional skills' },
      { id: '1.6', label: 'The activities were appropriate to the participants' },
      { id: '1.7', label: 'The topics were properly sequenced' },
      { id: '1.8', label: 'The time allotted for each presentation was sufficient' },
      { id: '1.9', label: 'The schedule was followed' },
    ],
  },
  {
    title: 'Mastery of the subject Matter',
    questions: [
      { id: '2.A.1', label: 'They were knowledgeable about the subject matter' },
      { id: '2.A.2', label: 'They were confident in delivering the lecture' },
      { id: '2.A.3', label: 'They were able to cover all the significant topics' },
      { id: '2.A.4', label: 'They were able to address questions adequately' },
    ],
  },
  {
    title: 'Presentation skills',
    questions: [
      { id: '2.B.1', label: 'They clearly explained the concepts discussed' },
      { id: '2.B.2', label: 'They presented ideas and principles in an organized manner' },
      { id: '2.B.3', label: 'They gave substance to the discussion by mentioning other examples' },
      { id: '2.B.4', label: 'Their discussions were stimulating and interesting' },
      { id: '2.B.5', label: 'Their style of delivery was appropriate for the audience' },
      { id: '2.B.6', label: 'They clearly gave instructions' },
      { id: '2.B.7', label: 'They presented learning materials in clear and logical manner' },
      { id: '2.B.8', label: 'Their pace of discussion was just right (not too slow, not too fast)' },
      { id: '2.B.9', label: 'They spoke clearly, audibly, fluently and smoothly on the topic' },
      { id: '2.B.10', label: 'They finished their presentation within the allotted time' },
    ],
  },
  {
    title: 'Audience relations',
    questions: [
      { id: '2.C.1', label: 'They introduced themselves warmly' },
      { id: '2.C.2', label: 'They were able to encourage participation from the participants' },
      { id: '2.C.3', label: 'They were open to the ideas of the participants' },
      { id: '2.C.4', label: 'They were responsive to the needs of the participants' },
      { id: '2.C.5', label: 'They were able to establish a relaxed rapport with their audience' },
      { id: '2.C.6', label: 'They were accommodating and friendly' },
      { id: '2.C.7', label: 'They projected a professional but approachable image' },
    ],
  },
  {
    title: 'Appearance',
    questions: [
      { id: '2.D.1', label: 'They are well groomed/neat' },
      { id: '2.D.2', label: 'They are properly dressed for the event' },
    ],
  },
  {
    title: 'Facilities',
    questions: [
      { id: '3.1', label: 'The session room was clean and orderly' },
      { id: '3.2', label: 'The room was comfortable and conducive to learning' },
      { id: '3.3', label: 'The room temperature was neither too hot nor too cold' },
      { id: '3.4', label: 'There was adequate and proper lighting at the session room' },
      { id: '3.5', label: 'The computer was working well' },
      { id: '3.6', label: 'The equipment used helped enhance my learning' },
      { id: '3.7', label: 'The handouts were adequate' },
      { id: '3.8', label: 'I am satisfied with the quality of handouts' },
      { id: '3.9', label: 'The handouts were relevant to the course' },
      { id: '3.10', label: 'The training supplies were readily available' },
    ],
  },
  {
    title: 'Food',
    questions: [
      { id: '4.1', label: 'The food tasted good' },
      { id: '4.2', label: 'The amount of food served was adequate' },
      { id: '4.3', label: 'The food was balanced and nutritious' },
      { id: '4.4', label: 'The food was served at an appropriate time' },
      { id: '4.5', label: 'The menu served was varied' },
      { id: '4.6', label: 'The plates, utensils and other food containers were clean' },
    ],
  },
  {
    title: 'Training/Support Team',
    questions: [
      { id: '5.1', label: 'They are effective in facilitating the program' },
      { id: '5.2', label: 'They effectively managed the time' },
      { id: '5.3', label: 'They were responsive to the needs of the participants' },
      { id: '5.4', label: 'They are courteous' },
      { id: '5.5', label: 'They are resourceful' },
      { id: '5.6', label: 'They are punctual' },
    ],
  },
];

type SurveyFormProps = {
  courseID: number;
  userID: number;
}

const SurveyForm: React.FC<SurveyFormProps> = (props) => {
  const { courseID, userID } = props;
  const navigate = useNavigate();
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<{status: 'success' | 'error' | 'warning' | 'info' | ''; title: string; message: string}>({
    status: "",
    title: "",
    message: ""
  });
  const [responses, setResponses] = useState<SurveyAnswers>({
    survey: {
      "1.1": 0,
      "1.2": 0,
      "1.3": 0,
      "1.4": 0,
      "1.5": 0,
      "1.6": 0,
      "1.7": 0,
      "1.8": 0,
      "1.9": 0,
      "2.A.1": 0,
      "2.A.2": 0,
      "2.A.3": 0,
      "2.A.4": 0,
      "2.B.1": 0,
      "2.B.2": 0,
      "2.B.3": 0,
      "2.B.4": 0,
      "2.B.5": 0,
      "2.B.6": 0,
      "2.B.7": 0,
      "2.B.8": 0,
      "2.B.9": 0,
      "2.B.10": 0,
      "2.C.1": 0,
      "2.C.2": 0,
      "2.C.3": 0,
      "2.C.4": 0,
      "2.C.5": 0,
      "2.C.6": 0,
      "2.C.7": 0,
      "2.D.1": 0,
      "2.D.2": 0,
      "3.1": 0,
      "3.2": 0,
      "3.3": 0,
      "3.4": 0,
      "3.5": 0,
      "3.6": 0,
      "3.7": 0,
      "3.8": 0,
      "3.9": 0,
      "3.10": 0,
      "4.1": 0,
      "4.2": 0,
      "4.3": 0,
      "4.4": 0,
      "4.5": 0,
      "4.6": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
      "5.5": 0,
      "5.6": 0,
    }
  });
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [missingAnswers, setMissingAnswers] = useState<Set<string>>(new Set());
  const { submitSurvey } = useTraineeHook()

  const handleChange = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, survey:{...prev.survey, [questionId]: value} }));
    setMissingAnswers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionId); 
      return newSet;
    });
  };

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const unanswered: Set<string> = new Set();
    sections.forEach((section) => {
      section.questions.forEach((q) => {
        if (!responses.survey[q.id as keyof SurveyAnswers["survey"]]) {
          unanswered.add(q.id);
        }
      });
    });

    if (unanswered.size > 0) {
      setMissingAnswers(unanswered);
      setShowMessageBox(true);
      setMessageInfo({
        status: "error",
        title: 'Missing Answers',
        message: "Please answer all the questions before submitting.",
      }) 
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
      return;
    }

    // All questions answered
    console.log('submit')
    submitSurvey(courseID, userID, responses)
    setShowMessageBox(true);
    setMessageInfo({
      status: "success",
      title: 'Survey Submitted',
      message: "Your survey responses has been submitted successfully.",
    }) 
    setTimeout(() => {
      setShowMessageBox(false);
    }, 2000);
    //navigate('/trainee/mycourses')
  };

  return (
      <form className="w-full h-full bg-white rounded-md overflow-y-auto" onSubmit={handleSubmit}>
        {sections.map((section) => {
          const isOpen = openSections[section.title];
          return (
            <div key={section.title} className="rounded-md border mb-3 bg-white shadow-sm">
              <header
                className={`w-full flex items-center justify-between px-5 p-3 cursor-pointer ${isOpen ? "border-b" : ""}`}
                onClick={() => toggleSection(section.title)}
              >
                <h2 className="text-p-lg text-c-green-50 font-medium">{section.title}</h2>
                <IoIosArrowDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </header>
              {isOpen && (
                <section className="p-3 flex flex-col gap-2">
                  {section.questions.map((q, index) => (
                    <div
                      key={index}
                      className={`flex flex-row justify-between p-2 rounded-md ${
                        index % 2 === 0 ? '' : 'bg-c-grey-5'
                      } ${missingAnswers.has(q.id) ? 'border border-red-500' : ''}`}
                    >
                      <label className="block text-p-rg">
                        {q.id}. {q.label}
                      </label>
                      <div className="flex gap-4">
                        {ratingOptions.map((num) => (
                          <label key={num} className="flex items-center gap-1 font-medium text-p-lg">
                            <input
                              type="radio"
                              name={q.id}
                              value={num}
                              checked={responses.survey[q.id as keyof SurveyAnswers['survey']] === num}
                              onChange={() => handleChange(q.id, num)}
                              className="accent-blue-500"
                            />
                            {num}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          );
        })}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4">
          Submit Survey
        </button>
        {showMessageBox && (<MessageBox status={messageInfo.status} title={messageInfo.title} message={messageInfo.message}/>)}
      </form>
  );
};

export default SurveyForm;