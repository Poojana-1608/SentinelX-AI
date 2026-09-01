import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ positive = 0, negative = 0, neutral = 0 }) {

  const data = {
    labels: [
      "Positive",
      "Negative",
      "Neutral"
    ],

    datasets: [
      {
        data: [
          positive,
          negative,
          neutral
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#facc15"
        ],

        borderWidth: 0
      }
    ]
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-80">

      <h2 className="text-xl font-bold mb-4">
        Sentiment Distribution
      </h2>

      <div className="h-56 flex items-center justify-center">

        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,

            plugins: {
              legend: {
                position: "bottom"
              }
            }
          }}
        />

      </div>

    </div>
  );
}

export default PieChart;