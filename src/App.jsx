import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Bookings from "./pages/Bookings";
import UploadCSV from "./pages/UploadCSV";
import Home from "./pages/Home";

import AppLayout from "./components/AppLayout";
import PublicLayout from "./components/PublicLayout";

export default function App() {
  return (
    <Routes>
      {/* =====================
         PUBLIC ROUTE
         ===================== */}
      <Route
        path="/home"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      {/* =====================
         APP ROUTES
         ===================== */}
      <Route
        element={
          <AppLayout />
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/upload-csv" element={<UploadCSV />} />
      </Route>

      {/* =====================
         FALLBACK
         ===================== */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
