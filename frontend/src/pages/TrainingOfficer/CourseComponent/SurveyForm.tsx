import { useEffect, useState } from "react";
import SurveyCharts from "./SurveyCharts";
import { useTrainingOfficerHook } from "../../../hooks";
import { SurveyState } from '../../../types/CourseCreationTypes'
import { useParams } from "react-router-dom";

import { IoArrowBackCircleOutline } from "react-icons/io5";

const surveyResults = [
  {
    title: "Session",
    questions: [
      {
        id: "1.1",
        label: "The objectives were clearly explained",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.2",
        label: "The objectives were met",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.3",
        label: "It is substantial and extensive",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.4",
        label: "It provided information that is relevant to my actual job",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.5",
        label:
          "It provided activities that will help advance my professional skills",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.6",
        label: "The activities were appropriate to the participants",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.7",
        label: "The topics were properly sequenced",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.8",
        label: "The time allotted for each presentation was sufficient",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "1.9",
        label: "The schedule was followed",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Mastery of the subject Matter",
    questions: [
      {
        id: "2.A.1",
        label: "They were knowledgeable about the subject matter",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.A.2",
        label: "They were confident in delivering the lecture",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.A.3",
        label: "They were able to cover all the significant topics",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.A.4",
        label: "They were able to address questions adequately",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Presentation skills",
    questions: [
      {
        id: "2.B.1",
        label: "They clearly explained the concepts discussed",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.2",
        label: "They presented ideas and principles in an organized manner",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.3",
        label:
          "They gave substance to the discussion by mentioning other examples",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.4",
        label: "Their discussions were stimulating and interesting",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.5",
        label: "Their style of delivery was appropriate for the audience",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.6",
        label: "They clearly gave instructions",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.7",
        label: "They presented learning materials in clear and logical manner",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.8",
        label:
          "Their pace of discussion was just right (not too slow, not too fast)",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.9",
        label:
          "They spoke clearly, audibly, fluently and smoothly on the topic",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.B.10",
        label: "They finished their presentation within the allotted time",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Audience relations",
    questions: [
      {
        id: "2.C.1",
        label: "They introduced themselves warmly",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.C.2",
        label:
          "They were able to encourage participation from the participants",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.C.3",
        label: "They were open to the ideas of the participants",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.C.4",
        label: "They were responsive to the needs of the participants",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.C.5",
        label:
          "They were able to establish a relaxed rapport with their audience",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.C.6",
        label: "They were accommodating and friendly",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.C.7",
        label: "They projected a professional but approachable image",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Appearance",
    questions: [
      {
        id: "2.D.1",
        label: "They are well groomed/neat",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "2.D.2",
        label: "They are properly dressed for the event",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Facilities",
    questions: [
      {
        id: "3.1",
        label: "The session room was clean and orderly",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.2",
        label: "The room was comfortable and conducive to learning",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.3",
        label: "The room temperature was neither too hot nor too cold",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.4",
        label: "There was adequate and proper lighting at the session room",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.5",
        label: "The computer was working well",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.6",
        label: "The equipment used helped enhance my learning",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.7",
        label: "The handouts were adequate",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.8",
        label: "I am satisfied with the quality of handouts",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.9",
        label: "The handouts were relevant to the course",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "3.10",
        label: "The training supplies were readily available",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Food",
    questions: [
      {
        id: "4.1",
        label: "The food tasted good",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "4.2",
        label: "The amount of food served was adequate",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "4.3",
        label: "The food was balanced and nutritious",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "4.4",
        label: "The food was served at an appropriate time",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "4.5",
        label: "The menu served was varied",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "4.6",
        label: "The plates, utensils and other food containers were clean",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
  {
    title: "Training/Support Team",
    questions: [
      {
        id: "5.1",
        label: "They are effective in facilitating the program",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "5.2",
        label: "They effectively managed the time",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "5.3",
        label: "They were responsive to the needs of the participants",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "5.4",
        label: "They are courteous",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "5.5",
        label: "They are resourceful",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      {
        id: "5.6",
        label: "They are punctual",
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    ],
  },
];

const questions = [
  {
    title: "Session",
    questions: [
      { id: "1.1", label: "The objectives were clearly explained" },
      { id: "1.2", label: "The objectives were met" },
      { id: "1.3", label: "It is substantial and extensive" },
      {
        id: "1.4",
        label: "It provided information that is relevant to my actual job",
      },
      {
        id: "1.5",
        label:
          "It provided activities that will help advance my professional skills",
      },
      {
        id: "1.6",
        label: "The activities were appropriate to the participants",
      },
      { id: "1.7", label: "The topics were properly sequenced" },
      {
        id: "1.8",
        label: "The time allotted for each presentation was sufficient",
      },
      { id: "1.9", label: "The schedule was followed" },
    ],
  },
  {
    title: "Mastery of the subject Matter",
    questions: [
      {
        id: "2.A.1",
        label: "They were knowledgeable about the subject matter",
      },
      {
        id: "2.A.2",
        label: "They were confident in delivering the lecture",
      },
      {
        id: "2.A.3",
        label: "They were able to cover all the significant topics",
      },
      {
        id: "2.A.4",
        label: "They were able to address questions adequately",
      },
    ],
  },
  {
    title: "Presentation skills",
    questions: [
      {
        id: "2.B.1",
        label: "They clearly explained the concepts discussed",
      },
      {
        id: "2.B.2",
        label: "They presented ideas and principles in an organized manner",
      },
      {
        id: "2.B.3",
        label:
          "They gave substance to the discussion by mentioning other examples",
      },
      {
        id: "2.B.4",
        label: "Their discussions were stimulating and interesting",
      },
      {
        id: "2.B.5",
        label: "Their style of delivery was appropriate for the audience",
      },
      { id: "2.B.6", label: "They clearly gave instructions" },
      {
        id: "2.B.7",
        label:
          "They presented learning materials in clear and logical manner",
      },
      {
        id: "2.B.8",
        label:
          "Their pace of discussion was just right (not too slow, not too fast)",
      },
      {
        id: "2.B.9",
        label:
          "They spoke clearly, audibly, fluently and smoothly on the topic",
      },
      {
        id: "2.B.10",
        label: "They finished their presentation within the allotted time",
      },
    ],
  },
  {
    title: "Audience relations",
    questions: [
      { id: "2.C.1", label: "They introduced themselves warmly" },
      {
        id: "2.C.2",
        label:
          "They were able to encourage participation from the participants",
      },
      {
        id: "2.C.3",
        label: "They were open to the ideas of the participants",
      },
      {
        id: "2.C.4",
        label: "They were responsive to the needs of the participants",
      },
      {
        id: "2.C.5",
        label:
          "They were able to establish a relaxed rapport with their audience",
      },
      { id: "2.C.6", label: "They were accommodating and friendly" },
      {
        id: "2.C.7",
        label: "They projected a professional but approachable image",
      },
    ],
  },
  {
    title: "Appearance",
    questions: [
      { id: "2.D.1", label: "They are well groomed/neat" },
      { id: "2.D.2", label: "They are properly dressed for the event" },
    ],
  },
  {
    title: "Facilities",
    questions: [
      { id: "3.1", label: "The session room was clean and orderly" },
      {
        id: "3.2",
        label: "The room was comfortable and conducive to learning",
      },
      {
        id: "3.3",
        label: "The room temperature was neither too hot nor too cold",
      },
      {
        id: "3.4",
        label: "There was adequate and proper lighting at the session room",
      },
      { id: "3.5", label: "The computer was working well" },
      { id: "3.6", label: "The equipment used helped enhance my learning" },
      { id: "3.7", label: "The handouts were adequate" },
      { id: "3.8", label: "I am satisfied with the quality of handouts" },
      { id: "3.9", label: "The handouts were relevant to the course" },
      { id: "3.10", label: "The training supplies were readily available" },
    ],
  },
  {
    title: "Food",
    questions: [
      { id: "4.1", label: "The food tasted good" },
      { id: "4.2", label: "The amount of food served was adequate" },
      { id: "4.3", label: "The food was balanced and nutritious" },
      { id: "4.4", label: "The food was served at an appropriate time" },
      { id: "4.5", label: "The menu served was varied" },
      {
        id: "4.6",
        label: "The plates, utensils and other food containers were clean",
      },
    ],
  },
  {
    title: "Training/Support Team",
    questions: [
      {
        id: "5.1",
        label: "They are effective in facilitating the program",
      },
      { id: "5.2", label: "They effectively managed the time" },
      {
        id: "5.3",
        label: "They were responsive to the needs of the participants",
      },
      { id: "5.4", label: "They are courteous" },
      { id: "5.5", label: "They are resourceful" },
      { id: "5.6", label: "They are punctual" },
    ],
  },
];

const dummyName = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Williams",
  "Charlie Brown",
];

const transformData = (surveyResults) => {
  return surveyResults.map((section) => ({
    title: section.title,
    questions: section.questions.map((q) => ({
      id: q.id,
      title: q.label,
      rates: q.ratings,
    })),
  }));
};

const SurveyForm = () => {
  const { id } = useParams()

  const formattedSurveyData = transformData(surveyResults);
  const [activeSection, setActiveSection] = useState<string>("Questions");
  const [surveyData, setSurveyData] = useState<SurveyState[]>([]);
  const { getSurveyAnswers } = useTrainingOfficerHook()
  const [participants, setParticipants] = useState<{participant:{id: number, first_name: string, last_name: string, email: string,}}[]>([])

  console.log(formattedSurveyData)

  useEffect(() => {
    const getCourseSurveyAnswers = async () => {
      const response = await getSurveyAnswers(Number(id))
      if(response) {
        console.log(response)
        const finalSurveyData = formattedSurveyData.map((section) => ({
          title: section.title,
          questions: section.questions.map((question) => ({
            id: question.id,
            title: question.title,
            rates: response.stats[question.id] || question.rates, // use existing rates if response missing
          })),
        }));
        setSurveyData(finalSurveyData)
        setParticipants(response.participants)
        console.log(finalSurveyData)
      }
    }
    getCourseSurveyAnswers()
  }, [id])


  console.log(participants)

  return (
    <section className="w-full h-full flex flex-col items-center justify-between overflow-auto p-5 bg-content-bg">
      <div className="w-3/4 h-fit py-3">
        <button onClick={() => window.history.back()} className="flex flex-row items-center gap-1 font-medium">
          <IoArrowBackCircleOutline/>{" "} Go back
        </button>
      </div>
      <div className="w-3/4 p-5 h-fit bg-white shadow-md rounded-lg">
        <nav className="w-full h-fit flex flex-row items-center justify-center border-b">
          <button
            className={`text-p-rg font-medium px-5 pb-1 border-b-2 ${
              activeSection === "Questions" ? "border-c-green-50" : ""
            }`}
            onClick={() => setActiveSection("Questions")}
          >
            Questions
          </button>
          <button
            className={`text-p-rg font-medium px-5 pb-1 border-b-2 ${
              activeSection === "Responses" ? "border-c-green-50" : ""
            }`}
            onClick={() => setActiveSection("Responses")}
          >
            Responses ({participants.length})
          </button>
        </nav>
        {activeSection === "Questions" && (
          <article className="w-full h-fit flex flex-col items-center justify-center gap-5 p-5 text-f-dark">
            {questions.map((sections, index) => (
              <section
                key={index}
                className="w-full h-fit border rounded-md shadow-sm flex flex-col"
              >
                <header className="px-8 py-3 w-full h-fit flex bg-slate-100 border-b">
                  <h6 className="text-p-lg font-medium w-1/2">
                    {sections.title}
                  </h6>
                  <div className="w-1/2 flex flex-row items-center justify-between">
                    <p>5</p>
                    <p>4</p>
                    <p>3</p>
                    <p>2</p>
                    <p>1</p>
                  </div>
                </header>
                <div className="w-full h-fit flex flex-col">
                  {sections.questions.map((q, index) => (
                    <div
                      key={index}
                      className={`w-full h-fit flex flex-row px-8 py-4 ${
                        index % 2 === 0 ? "" : "bg-slate-50"
                      }`}
                    >
                      <p className="w-1/2">
                        <span>{q.id} </span>
                        {q.label}
                      </p>
                      <div className="w-1/2 flex flex-row items-center justify-between">
                        <input type="radio" disabled />
                        <input type="radio" disabled />
                        <input type="radio" disabled />
                        <input type="radio" disabled />
                        <input type="radio" disabled />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </article>
        )}
        {activeSection === "Responses" && (
          <article className="w-full h-fit flex flex-col items-center justify-center gap-5 p-5 text-f-dark">
            <nav className="w-full bg-red-100 rounded-md p-5"></nav>
            <section className="w-full max-h-[400px] border rounded-md shadow-sm flex flex-col">
              <header className="px-8 py-3 w-full h-fit flex bg-slate-100 border-b">
                <h6 className="text-p-lg font-medium">Names</h6>
              </header>
              <div className="w-full overflow-auto">
                {participants.map((name, index) => (
                  <p
                    key={index}
                    className={`w-full px-8 py-4 ${
                      index % 2 === 0 ? "" : "bg-slate-50"
                    }`}
                  >
                    {name.participant.first_name} {name.participant.last_name}
                  </p>
                ))}
              </div>
            </section>
            <section className=" w-full h-fit px-8 py-5 border rounded-md shadow-sm">
              <p className="font-medium mb-5">
                For each criterion, rate the system by checking the
                corresponding weight you deemed appropriate:
              </p>
              <p>
                5 = Strongly Agree <br />4 = Agree <br />3 = Moderately Agree{" "}
                <br />2 = Disagree <br />1 = Strongly Disagree
              </p>
            </section>
            <section className="w-full h-fit">
              <div className="w-full h-fit">
                <SurveyCharts trainingSections={surveyData} />
              </div>
            </section>
          </article>
        )}
      </div>
    </section>
  );
};

export default SurveyForm;
