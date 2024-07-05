import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const options = {
    scales: {
      y: {
        display: false,
      },
    },
  };

  return <Bar options={options} data={barChartData} />;
};

const barChartData = {
  labels: [1, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
  datasets: [
    {
      label: ["Calories"],
      data: [2400, 1800, 1200, 2200, 2100, 1900, 2300, 1700],
      backgroundColor: "rgba(21, 21, 25, 1)",
      borderColor: "#44454b",
      borderWidth: 0,
      borderRadius: 8,
    },
  ],
};

export default BarChart;
