"use client";

import React, { useEffect, useState } from "react";
import PieChart from "@/app/pages/selling-report/component/PieChart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import BarChart from "@/app/pages/selling-report/component/BarChart";
import SaleTable from "@/app/pages/selling-report/component/SaleTable";
import Stat from "./component/Stat";

export interface SaleProps {
  name: string;
  sold_units: number[];
  total_amounts: number[];
  checkout_labels: number[];
  // need to be added in postgress function
  price: number;
  sold_product: string[];
  total_sold_units: number;
  total_received: number;
}

export interface TableReportProps {
  name: string;
  price: number;
  sold_product: string[];
  total_sold_units: number;
  total_received: number;
}

export interface BarReportProps {
  labels: string[];
  series: BarSeriesItem[];
}

export interface PieReportProps {
  labels: string[];
  series: number[];
}

type BarSeriesItem = {
  name: string;
  data: number[];
};

const page = () => {
  const supabase = createClientComponentClient();
  const [selectedDate, setSelectedDate] = useState<string>("01-01-2024");
  const [saleData, setSaleData] = useState<SaleProps[] | null>(null);
  const [barChartData, setBarChartData] = useState<BarReportProps>({
    labels: [],
    series: [],
  });
  const [pieChartData, setPieChartData] = useState<PieReportProps>({
    labels: [],
    series: [],
  });
  const [tableData, setTableData] = useState<TableReportProps[] | null>(null);
  const [view, setView] = useState("daily");
  const [type, setType] = useState("product");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc(
        `get_sales_${view}_report_by_${type}`,
        {
          selected_date: selectedDate,
        }
      );
      if (error) console.log(error);
      else {
        console.log("Fetching sale data from supaase success!:");
        console.log(data);
        setSaleData(data);

        processBarChartData(data);
        processPieChartandTableData(data);
      }
    };

    fetchData();
  }, [view, type]);

  const processPieChartandTableData = (data: SaleProps[]) => {
    console.log(data);
    const labels = data.map(({ name }) => name);
    console.log("Pie labels");
    console.log(labels);

    const unitSeries = data.map(({ total_sold_units }) => total_sold_units);
    const amountSeries = data.map(({ total_received }) => total_received);
    console.log("Pie series");
    console.log(unitSeries);
    console.log(amountSeries);

    // const newTableData = data.map(({ product_name, price, total_sold_units, total_recieved }) =>
    const newTableData = data.map(
      ({
        name,
        price,
        sold_product,
        total_sold_units,
        total_received,
      }: TableReportProps) => ({
        name,
        price,
        sold_product,
        total_sold_units,
        total_received,
      })
    );
    console.log("Table");
    console.log(newTableData);

    setTableData(newTableData);
    setPieChartData({ labels: labels, series: amountSeries });
  };

  const transformAndMapSeries = (
    data: SaleProps[],
    labels: number[]
  ): BarSeriesItem[] => {
    console.log("transform");
    console.log(labels);
    return data.map((product: SaleProps) => ({
      name: product.name,
      data: labels.map(
        (label) =>
          product.sold_units[product.checkout_labels.indexOf(label)] || 0
      ),
    }));
  };

  const processDailyData = (data: SaleProps[]) => {
    console.log("Before processDailyData");
    console.log(data);
    const labels = Array.from({ length: 24 }, (_, index) => index + 1);
    const series = transformAndMapSeries(data, labels);

    console.log("Daily series");
    console.log(series);

    return { labels: labels.map(String), series: series };
  };

  const processMonthlyData = (data: SaleProps[]) => {
    // Assuming the data has 'monthly' property with an array of months
    const labels = Array.from({ length: 31 }, (_, index) => index + 1);
    const series = transformAndMapSeries(data, labels);

    console.log("Mothly series");
    console.log(series);

    return { labels: labels.map(String), series: series };
  };

  const processYearlyData = (data: SaleProps[]) => {
    // Assuming the data has 'yearly' property with an array of years
    const string_labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const labels = Array.from({ length: 12 }, (_, index) => index + 1);
    const series = transformAndMapSeries(data, labels);

    console.log("Yearly series");
    console.log(series);

    return { labels: string_labels, series: series };
  };

  const processWeeklyData = (data: SaleProps[]) => {
    // need to be fix
    // select date and month from selected date and check what is date of 6 days after the selected date
    // Assuming the data has 'weekly' property with an array of years
    const labels = Array.from({ length: 7 }, (_, index) => index + 1);
    const series = transformAndMapSeries(data, labels);

    console.log("Weekly series");
    console.log(series);

    return { labels: labels.map(String), series: series };
  };

  const processBarChartData = (supabaseData: SaleProps[]) => {
    let newData: BarReportProps = barChartData;

    switch (view) {
      case "daily":
        newData = processDailyData(supabaseData);
        break;
      case "weekly":
        newData = processWeeklyData(supabaseData);
        break;
      case "monthly":
        newData = processMonthlyData(supabaseData);
        break;
      case "yearly":
        newData = processYearlyData(supabaseData);
        break;
      default:
        newData = { labels: [], series: [] };
    }

    setBarChartData(newData);
  };

  const toggleView = (selectedView: string) => {
    setView(selectedView);
    // need to be fixed: pop out only data to be used
    switch (selectedView) {
      case "daily":
        setSelectedDate("01-01-2024");
        break;
      case "monthly":
        setSelectedDate("01-2024");
        break;
      case "yearly":
        setSelectedDate("2024");
        break;
      case "weekly":
        setSelectedDate("01-01-2024");
        break;
      default:
        setSelectedDate("01-01-2024");
    }
  };
  const toggleType = (selectedType: string) => {
    setType(selectedType);
  };

  console.log(" Bar Chart Data");
  console.log(barChartData);
  console.log(" Pie Chart Data");
  console.log(pieChartData);
  console.log(" Table Data");
  console.log(tableData);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col">
        <div className="my-10 mx-10">
          <h1 className="text-5xl p-2 font-bold">Selling Report</h1>
          <div className="flex justify-center gap-20 my-5">
            <div className="stats stats-vertical shadow justify-normal">
              <Stat data={{ name: "All product", value: 300, desc: "text" }} />
              <Stat data={{ name: "All category", value: 5, desc: "text" }} />
              <Stat
                data={{ name: "Product name", value: 200, desc: "best seller" }}
              />
              <Stat
                data={{
                  name: "Category name",
                  value: 200,
                  desc: "best seller",
                }}
              />
            </div>
            <div className="p-5 justify-center rounded-2xl bg-primary w-5/6">
              <div className="flex justify-center p-2 gap-10">
                <div className="join">
                  <input
                    type="radio"
                    aria-label="Daily"
                    className="join-item btn"
                    name="options"
                    onClick={() => toggleView("daily")}
                  />
                  <input
                    type="radio"
                    aria-label="Weekly"
                    className="join-item btn"
                    name="options"
                    onClick={() => toggleView("weekly")}
                  />
                  <input
                    type="radio"
                    aria-label="Monthly"
                    className="join-item btn"
                    name="options"
                    onClick={() => toggleView("monthly")}
                  />
                  <input
                    type="radio"
                    aria-label="Yearly"
                    className="join-item btn"
                    name="options"
                    onClick={() => toggleView("yearly")}
                  />
                </div>
                <div className="join grid grid-cols-3">
                  <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label="Category"
                    onClick={() => toggleType("category")}
                  />
                  <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label="Product"
                    onClick={() => toggleType("product")}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:flex-row">
                <div className="grid w-1/2 h-auto card bg-base-300 rounded-box place-items-center">
                  <BarChart chartData={barChartData} />
                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="grid flex-auto h-auto card bg-base-300 rounded-box place-items-center">
                  <PieChart chartData={pieChartData} />
                </div>
              </div>
              <div className="overflow-x-auto h-72 p-2">
                <div className="overflow-x-auto">
                  <SaleTable saleData={tableData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

// const newOptions = (data: ReportProps) => {
//     chart: {
//       type: 'bar',
//       stacked: true,
//     },
//     series: newData.series.map((_, index) => ({
//       name: Product ${index + 1},
//       data: newData.series[index],
//     })),
//     xaxis: {
//       categories: newData.labels,
//     },
//   };

//   setData(newData);
//   setOptions(newOptions);
// };
