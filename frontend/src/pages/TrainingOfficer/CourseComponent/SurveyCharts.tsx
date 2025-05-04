import React from "react";
import Chart from "react-apexcharts";
import { SurveyState } from '../../../types/CourseCreationTypes'

type Props = {
  trainingSections: SurveyState[];
};

const SurveyCharts: React.FC<Props> = ({ trainingSections }) => {
  return (
    <>
      {trainingSections.map((section, i) => (
        <section
          key={i}
          className="w-full h-fit px-8 py-5 border rounded-md shadow-sm mb-6"
        >
          <header className="w-full h-fit flex items-center justify-between mb-5">
            <p className="font-semibold text-lg">{section.title}</p>
          </header>

          <div className="w-full space-y-8">
            {section.questions.map((q, qi) => {
              const categories = ["1", "2", "3", "4", "5"];
              const data = [1, 2, 3, 4, 5].map(
                (rating) => q.rates[rating] ?? 0
              );

              return (
                <div key={qi} className="w-full">
                  <p className="mb-2 font-medium">
                    <span>{q.id} </span>
                    {q.title}
                  </p>
                  <Chart
                    options={{
                      chart: { type: "bar" },
                      xaxis: { categories },
                      colors: [
                        "#ef4444",
                        "#8b5cf6",
                        "#facc15",
                        "#60a5fa",
                        "#86efac",
                      ],
                      plotOptions: {
                        bar: {
                          distributed: true,
                          borderRadius: 4,
                        },
                      },
                      dataLabels: {
                        enabled: true,
                      },
                    }}
                    series={[{ name: "Responses", data }]}
                    type="bar"
                    height={250}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
};

export default SurveyCharts;
