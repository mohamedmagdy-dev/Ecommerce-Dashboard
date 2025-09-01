import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
);

import { Chart } from "react-chartjs-2";



const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const data = {
  labels,

  datasets: [
    {
      type: "bar",
      label: "Sales",
      data: [1200, 1500, 1000, 2000, 1800, 2200],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      stack: "Stack 0",
    },
    {
      type: "bar",
      label: "Returns",
      data: [200, 300, 150, 400, 250, 350],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      stack: "Stack 0",
    },
    {
      type: "line",
      label: "Revenue",
      data: [1000, 1200, 850, 1600, 1550, 1850],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      tension: 0.3,
      yAxisID: "y",
    },
    {
      type: "line",
      label: "Add",
      data: [200, 190, 1050, 1600, 1550, 1850],
      borderColor: "rgba(75, 182, 100, 1)",
      borderWidth: 2,
      tension: 0.6,
      yAxisID: "y",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  maintainAspectRatio: false, 
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function RevenueChart() {
  return (
    <div className="grow bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm  min-lg:h-125 max-lg:w-full">
      <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] text-left font-semibold p-3 border-b border-gray-200 dark:border-[#94a3d465]">
        Store Visits by Source
      </h3>
      <div className="p-5 w-full h-full flex items-center justify-center">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
}
