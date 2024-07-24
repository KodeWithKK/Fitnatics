import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const AttendanceChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
    scales: {
      y: {
        display: true,
      },
    },
  };

  return (
    <>
      <Line options={options} data={lineChartData} />
    </>
  );
};

const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Attendance",
      data: [44, 24, 36, 34, 18, 38, 36],
      borderColor: "#2B2C31",
      // backgroundColor: "#cb8e2c",
      fill: {
        target: "origin",
        above: "rgba(21, 21, 25, 0.8)",
      },
    },
  ],
};

export default AttendanceChart;
