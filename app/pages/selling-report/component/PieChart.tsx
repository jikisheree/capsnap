"use client"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
import { PieReportProps } from "../page";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  chartData: PieReportProps;
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  console.log(chartData);

  if (!chartData.series || chartData.series.length === 0) {
    return <div>No data available this day</div>;
  }

  const options = {
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
    chart: {
      width: 380,
      toolbar: {
        show: true,
      },
    },
    labels: chartData.labels,
    // legend: {
    //   offsetX: 50, // Adjust the offsetX value as needed
    //   offsetY: 20, // Adjust the offsetY value as needed
    // },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const series = chartData.series;

  return (
    <>
      <ApexChart
        type="donut"
        options={options}
        series={series}
        height={200}
        width={500}
      />
    </>
  );
};

export default PieChart;
