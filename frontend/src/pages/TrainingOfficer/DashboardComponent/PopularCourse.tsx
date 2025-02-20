import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

const PopularCourse: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
    },
    labels: ["Apple", "Mango", "Orange"],
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    colors: ["#c3d9d7", "#659e98", "#397a73"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "13px",
        fontWeight: "500",
      },
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
  };

  const chartSeries = [300, 500, 200];

  return (
    <section className="h-full w-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height="100%"
      />
    </section>
  );
};

export default PopularCourse;
