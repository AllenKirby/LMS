import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface PerYearValues {
  [month: string]: number
}

type TrainingsPerMonthProps = {
    data: PerYearValues
}

const TrainingsPerMonth: React.FC<TrainingsPerMonthProps> = (props) => {
    const { data } = props
    console.log(data)
    const values = Object.values(data)
    const keys = Object.keys(data)

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: keys,
    },
  };

  const series = [
    {
      name: "Training Per Monthly",
      data: values,
    },
  ];

  return <ReactApexChart options={options} series={series} type="line" height={350} />;
};

export default TrainingsPerMonth;
