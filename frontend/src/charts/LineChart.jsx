import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart({ score = 0 }) {

  const data = {
    labels: [
      "Positive",
      "Neutral",
      "Negative",
      "Reputation"
    ],

    datasets: [
      {
        label: "Brand Sentiment",
        data: [
          0,
          0,
          0,
          score
        ],

        borderColor: "#7c3aed",

        backgroundColor: "rgba(124,58,237,0.1)",

        tension: 0.4,

        fill: true
      }
    ]
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-80">

      <h2 className="text-xl font-bold mb-4">
        Brand Reputation
      </h2>

      <div className="h-56">

        <Line
          data={data}
          options={{
            maintainAspectRatio: false,

            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            },

            plugins: {
              legend: {
                display: true
              }
            }
          }}
        />

      </div>

    </div>
  );
}

export default LineChart;