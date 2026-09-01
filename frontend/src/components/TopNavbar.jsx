import {
  FaBell,
  FaUserCircle,
  FaMoon,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

function TopNavbar() {
  return (
    <div className="bg-white rounded-2xl shadow-md px-8 py-5 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-1">
          AI Powered Customer Sentiment Dashboard
        </p>
      </div>

      {/* Center */}
      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Brand..."
          className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="p-3 rounded-xl hover:bg-gray-100 transition">
          <FaMoon size={18} />
        </button>

        <button className="p-3 rounded-xl hover:bg-gray-100 transition">
          <FaBell size={18} />
        </button>

        <FaUserCircle
          size={35}
          className="text-purple-600 cursor-pointer"
        />

        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition">

          <FaDownload />

          Generate Report

        </button>

      </div>

    </div>
  );
}

export default TopNavbar;