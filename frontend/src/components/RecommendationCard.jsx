import { FaRobot } from "react-icons/fa";

function RecommendationCard({
  title = "AI Recommendation",
  description = "Customer sentiment is positive.",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition">

      <div className="flex items-center gap-3 mb-4">

        <FaRobot className="text-indigo-600 text-2xl" />

        <h2 className="text-xl font-bold">
          {title}
        </h2>

      </div>

      <p className="text-slate-600">
        {description}
      </p>

    </div>
  );
}

export default RecommendationCard;