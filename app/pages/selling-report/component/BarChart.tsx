"use client"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
import { BarReportProps } from "../page";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  chartData: BarReportProps;
}

const BarChart: React.FC<BarChartProps> = ({ chartData }) => {
  console.log(chartData);

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        berHeight: "80%",
        borderRadius: 0,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    xaxis: {
      categories: chartData.labels,
      tickPlacement: "on",
    },
  };

  const series = chartData.series;

  console.log(series);

  return (
    <>
      <ApexChart
        type="bar"
        options={options}
        series={series}
        height={200}
        width={500}
      />
    </>
  );
};

export default BarChart;
