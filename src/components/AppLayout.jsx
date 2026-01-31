import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SAME CONTAINER AS BEFORE */}
      <div className="max-w-7xl mx-auto px-6">
        <Header />
        <NavBar />

        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
