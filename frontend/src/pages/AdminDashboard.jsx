import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";

import {
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaHeartbeat,
  FaUser,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function AdminDashboard() {
  return (
    <MainLayout>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, reports and system performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value="1,250"
          icon={<FaUsers />}
          color="bg-indigo-100 text-indigo-600"
          trend="+10%"
          positive={true}
        />

        <StatCard
          title="Brands"
          value="245"
          icon={<FaBuilding />}
          color="bg-green-100 text-green-600"
          trend="+6%"
          positive={true}
        />

        <StatCard
          title="Reports"
          value="980"
          icon={<FaFileAlt />}
          color="bg-yellow-100 text-yellow-600"
          trend="+15%"
          positive={true}
        />

        <StatCard
          title="System Health"
          value="99%"
          icon={<FaHeartbeat />}
          color="bg-red-100 text-red-600"
          trend="+2%"
          positive={true}
        />

      </div>

      {/* User Table */}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-bold mb-5">
          Users
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Role</th>
              <th className="text-left py-3">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4 flex items-center gap-2">
                <FaUser />
                Rahul
              </td>

              <td>Admin</td>

              <td className="text-green-600">
                Active
              </td>

            </tr>

            <tr className="border-b">

              <td className="py-4 flex items-center gap-2">
                <FaUser />
                Priya
              </td>

              <td>Analyst</td>

              <td className="text-green-600">
                Active
              </td>

            </tr>

            <tr>

              <td className="py-4 flex items-center gap-2">
                <FaUser />
                Arjun
              </td>

              <td>User</td>

              <td className="text-red-600">
                Inactive
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Activity */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-4">
            Recent Activity
          </h2>

          <p className="mb-4">
            <FaChartLine className="inline mr-2 text-indigo-600"/>
            Apple Report Generated
          </p>

          <p className="mb-4">
            <FaChartLine className="inline mr-2 text-indigo-600"/>
            Samsung Analysis Completed
          </p>

          <p>
            <FaChartLine className="inline mr-2 text-indigo-600"/>
            Nike Report Downloaded
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-4">
            API Status
          </h2>

          <p className="mb-4 text-green-600">
            <FaCheckCircle className="inline mr-2"/>
            Flask API Running
          </p>

          <p className="mb-4 text-green-600">
            <FaCheckCircle className="inline mr-2"/>
            Database Connected
          </p>

          <p className="text-red-600">
            <FaTimesCircle className="inline mr-2"/>
            Power BI Not Connected
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default AdminDashboard;