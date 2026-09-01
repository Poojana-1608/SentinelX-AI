import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ComparisonChart({
  brand1,
  brand2,
  positive1,
  positive2,
  neutral1,
  neutral2,
  negative1,
  negative2,
}) {

  const data = {
    labels: ["Positive", "Neutral", "Negative"],

    datasets: [
      {
        label: brand1 || "Brand 1",
        data: [
          positive1 || 0,
          neutral1 || 0,
          negative1 || 0,
        ],
        backgroundColor: "#4F46E5",
      },

      {
        label: brand2 || "Brand 2",
        data: [
          positive2 || 0,
          neutral2 || 0,
          negative2 || 0,
        ],
        backgroundColor: "#10B981",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,

        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-5">
        Sentiment Comparison
      </h2>

      <Bar
        data={data}
        options={options}
      />

    </div>
  );
}

export default ComparisonChart;