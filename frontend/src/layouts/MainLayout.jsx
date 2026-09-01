import Sidebar from "../components/Sidebar";
import Navbar from "../components/TopNavbar";

function MainLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;