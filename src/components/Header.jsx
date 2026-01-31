// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/spat-logo.png";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      navigate("/home");
    }
  };

  return (
    <header className="flex items-center justify-between py-6 border-b border-gray-200">
      <Link
        to="/"
        className="flex items-center gap-4 hover:opacity-90 transition"
      >
        <img
          src={logo}
          alt="SPAT Analytics"
          className="h-14 w-14 object-cover"
        />

        <div className="leading-tight">
          <h1 className="text-xl font-semibold tracking-wide">
            <span className="text-amber-600">SPAT</span>{" "}
            <span className="text-blue-600">Analytics</span>
          </h1>

          <p className="text-sm text-gray-500">
            Travel Agency Dashboard
          </p>
        </div>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
