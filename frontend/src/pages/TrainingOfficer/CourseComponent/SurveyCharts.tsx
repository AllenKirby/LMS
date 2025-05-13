import React, { useRef } from "react";
import Chart from "react-apexcharts";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SurveyState } from '../../../types/CourseCreationTypes';

type Props = {
  trainingSections: SurveyState[];
};

const SurveyCharts: React.FC<Props> = ({ trainingSections }) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!pdfRef.current) return;
    
    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.style.position = 'fixed';
    loadingElement.style.top = '0';
    loadingElement.style.left = '0';
    loadingElement.style.width = '100%';
    loadingElement.style.height = '100%';
    loadingElement.style.backgroundColor = 'rgba(0,0,0,0.5)';
    loadingElement.style.display = 'flex';
    loadingElement.style.justifyContent = 'center';
    loadingElement.style.alignItems = 'center';
    loadingElement.style.zIndex = '1000';
    loadingElement.innerHTML = '<div style="color: white; font-size: 24px;">Generating PDF (this may take a minute)...</div>';
    document.body.appendChild(loadingElement);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      // Process one section at a time with delays
      const sections = Array.from(pdfRef.current.querySelectorAll('section'));
      let currentY = margin;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const header = section.querySelector('header');
        const charts = Array.from(section.querySelectorAll('.chart-container'));

        // Add section header
        if (header) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
          const headerCanvas = await html2canvas(header as HTMLElement, {
            scale: 1, // Reduced scale for performance
            logging: false,
            useCORS: true,
          });
          
          const headerImgData = headerCanvas.toDataURL('image/png');
          const headerProps = pdf.getImageProperties(headerImgData);
          const headerHeight = (headerProps.height * contentWidth) / headerProps.width;

          if (currentY + headerHeight > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
          }

          pdf.addImage(headerImgData, 'PNG', margin, currentY, contentWidth, headerHeight);
          currentY += headerHeight + 5;
        }

        // Process charts in this section
        for (let j = 0; j < charts.length; j++) {
          const chart = charts[j] as HTMLElement;
          
          // Add delay between charts to prevent freezing
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const canvas = await html2canvas(chart, {
            scale: 1, // Reduced scale for performance
            logging: false,
            useCORS: true,
          });

          const imgData = canvas.toDataURL('image/png');
          const imgProps = pdf.getImageProperties(imgData);
          const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

          if (currentY + imgHeight > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
          }

          pdf.addImage(imgData, 'PNG', margin, currentY, contentWidth, imgHeight);
          currentY += imgHeight + 10;

          // Add page number after each chart
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          pdf.text(
            `Page ${pdf.internal.getNumberOfPages()}`,
            pageWidth - margin - 10,
            pageHeight - 5
          );
        }
      }

      pdf.save('survey_results.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('PDF generation failed. Please try with fewer charts or check console for errors.');
    } finally {
      document.body.removeChild(loadingElement);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Survey Results</h2>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export to PDF
        </button>
      </div>

      <div ref={pdfRef}>
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
};

export default SurveyCharts;