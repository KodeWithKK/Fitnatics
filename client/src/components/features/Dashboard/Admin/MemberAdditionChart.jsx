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

const MemberAdditionChart = () => {
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
    <div className="mx-6 mt-8 w-[304px] rounded-md bg-gray-900/[.8] px-4 pb-10 pt-4">
      <h3 className="mb-8 text-center font-bold">New Members</h3>
      <Line options={options} data={lineChartData} />
    </div>
  );
};

const lineChartData = {
  labels: ["Nov", "Dec", "Jan", "Fab", "Mar", "Apr"],
  datasets: [
    {
      label: "Member Added",
      data: [8, 6, 12, 6, 4, 8],
      borderColor: "#2B2C31",
      // backgroundColor: "#cb8e2c",
      fill: {
        target: "origin",
        above: "rgba(21, 21, 25, 0.8)",
      },
    },
  ],
};

export default MemberAdditionChart;
