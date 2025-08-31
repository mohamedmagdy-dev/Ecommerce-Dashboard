import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const trafficData = {
  trafficSources: [
    { source: "Direct", visits: 1200 },
    { source: "Social", visits: 800 },
    { source: "Email", visits: 450 },
    { source: "Other", visits: 300 },
    { source: "Referrals", visits: 600 },
  ],
};

export const data = {
  labels: trafficData.trafficSources.map((item) => item.source),
  datasets: [
    {
      label: "Visits",
      data: trafficData.trafficSources.map((item) => item.visits),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function VisitsSource() {
  return (
    <div className=" bg-white dark:bg-[var(--color-secondary-900)] rounded-sm shadow-sm">
      <h3 className="text-[var(--color-primary-dark)] dark:text-[var(--color-text-500)] text-left font-semibold p-3 border-b border-gray-200 dark:border-[#94a3d465]">
        Store Visits by Source
      </h3>
      <div className="flex flex-col justify-center items-center p-4">
        <Doughnut
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
          data={data}
        />
      </div>
    </div>
  );
}
