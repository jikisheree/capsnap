// "use server"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
import { BarReportProps } from "../page";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  chartData: BarReportProps;
}

const BarChart: React.FC<BarChartProps> = ({ chartData }) => {
  console.log(chartData);

  if (!chartData.series || chartData.series.length === 0 || !chartData.labels || chartData.labels.length === 0) {
    return <div>No data available this day</div>;
  }

  const options = {
    chart: {
      width: 600,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
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
    }
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
