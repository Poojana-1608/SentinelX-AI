import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  positive = true,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-md
        border
        border-gray-100
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`text-3xl p-4 rounded-full ${color}`}
        >
          {icon}
        </div>

      </div>

      <div className="flex items-center mt-5">

        {positive ? (
          <FaArrowUp className="text-green-500 mr-2" />
        ) : (
          <FaArrowDown className="text-red-500 mr-2" />
        )}

        <span
          className={`font-semibold ${
            positive
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {trend}
        </span>

        <span className="ml-2 text-gray-400 text-sm">
          from last month
        </span>

      </div>
    </div>
  );
}

export default StatCard;