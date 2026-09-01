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

function BrandPieChart({ positive, negative, neutral }) {
  const data = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [positive, negative, neutral],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#facc15",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Sentiment Distribution
      </h2>

      <div className="h-72">
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BrandPieChart;