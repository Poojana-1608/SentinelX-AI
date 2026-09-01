import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import BrandAnalysis from "./pages/BrandAnalysis";
import Comparison from "./pages/Comparison";
import Recommendations from "./pages/Recommendations";
import Reports from "./pages/Reports";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/brand-analysis" element={<BrandAnalysis />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;