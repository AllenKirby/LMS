import React, { } from "react";
import Chart from "react-apexcharts";
import { SurveyState } from '../../../types/CourseCreationTypes';

type Props = {
  trainingSections: SurveyState[];
};

const SurveyCharts: React.FC<Props> = React.memo(({ trainingSections }) => {

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Survey Results</h2>
      </div>

      <div>
        {trainingSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-10">
            <header className="w-full h-fit flex items-center justify-between mb-5">
              <p className="font-semibold text-lg text-gray-800">{section.title}</p>
            </header>

            <div className="space-y-8">
              {section.questions.map((q, questionIndex) => (
                <div key={questionIndex} className="chart-container bg-white p-4 rounded-md border shadow-sm mb-8">
                  <p className="mb-2 font-medium text-gray-700">
                    <span className="font-semibold">{q.id}</span> {q.title}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <Chart
                      options={{
                        chart: { type: "bar", toolbar: { show: false } },
                        xaxis: {
                          categories: ["1", "2", "3", "4", "5"],
                          labels: { style: { colors: '#6b7280', fontSize: '12px' } }
                        },
                        yaxis: {
                          labels: { style: { colors: '#6b7280', fontSize: '12px' } }
                        },
                        colors: ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6"],
                        plotOptions: {
                          bar: {
                            distributed: true,
                            borderRadius: 4,
                            columnWidth: '70%',
                          },
                        },
                        dataLabels: {
                          enabled: true,
                          style: { colors: ['#1f2937'], fontSize: '12px' }
                        },
                        legend: { show: false },
                        tooltip: { enabled: false },
                        grid: { show: false }
                      }}
                      series={[{ 
                        name: "Responses", 
                        data: [1, 2, 3, 4, 5].map(rating => q.rates[rating] ?? 0) 
                      }]}
                      type="bar"
                      height={250}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>1 = Strongly Disagree</span>
                    <span>5 = Strongly Agree</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
});

export default SurveyCharts;