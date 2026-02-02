import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SPAT-logo.png";

export default function Home() {
  const [mode, setMode] = useState("login"); // login | signup
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // temporary: assume success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT */}
        <div className="bg-slate-900 text-white p-10 flex flex-col justify-center">
          <img src={logo} alt="SPAT Analytics" className="h-14 w-14 mb-6" />
          <h1 className="text-3xl font-semibold mb-4">SPAT Analytics</h1>
          <p className="text-gray-300">
            Unified analytics platform for travel agencies to manage bookings,
            commissions, and insights.
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-10 flex flex-col justify-center">
          {/* Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                mode === "login"
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                mode === "signup"
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6">
            {mode === "login" ? "Login to continue" : "Create an account"}
          </h2>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 px-4 py-2 border rounded-md"
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border rounded-md"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded-md"
              required
            />

            {mode === "login" && (
              <div className="text-right mb-4">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    alert("Password reset will be implemented later.")
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
