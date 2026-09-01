import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaSearch,
  FaBalanceScale,
  FaLightbulb,
  FaFileAlt,
  FaUserShield,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      path: "/brand-analysis",
      name: "Brand Analysis",
      icon: <FaSearch />,
    },
    {
      path: "/comparison",
      name: "Comparison",
      icon: <FaBalanceScale />,
    },
    {
      path: "/recommendations",
      name: "Recommendations",
      icon: <FaLightbulb />,
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <FaFileAlt />,
    },
    {
      path: "/admin",
      name: "Admin Dashboard",
      icon: <FaUserShield />,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">

        <div className="flex items-center gap-3">

          <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-3 rounded-xl text-xl">
            <FaRobot />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              SentinelX AI
            </h1>

            <p className="text-sm text-slate-400">
              Analytics Platform
            </p>
          </div>

        </div>

      </div>

      {/* User */}
      <div className="m-5 bg-slate-800 rounded-2xl p-4">

        <h3 className="font-bold text-lg">
          Pooju
        </h3>

        <p className="text-slate-400 text-sm">
          Super Admin
        </p>

      </div>

      {/* Navigation */}
      <div className="flex-1 px-4">

        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>

            <div
              className={`flex items-center gap-4 px-4 py-3 rounded-xl mb-3 transition-all duration-300 cursor-pointer
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>

            </div>

          </Link>
        ))}

      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-slate-700">

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition-all">
          <FaCog />
          Settings
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 cursor-pointer transition-all mt-2">
          <FaSignOutAlt />
          Logout
        </div>

      </div>

    </div>
  );
}

export default Sidebar;