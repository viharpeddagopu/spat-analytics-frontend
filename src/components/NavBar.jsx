import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, Ticket, Menu, Upload } from "lucide-react";
import { useEffect, useState } from "react";

const navItemClass = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
   ${isActive ? "bg-slate-900 text-white" : "text-gray-600 hover:bg-gray-100"}`;

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        mt-6 sticky top-4 z-10 mx-4 rounded-lg bg-white
        transition-shadow
        ${isSticky ? "shadow-lg" : "shadow-none"}
      `}
    >
      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <span className="text-sm font-semibold text-gray-700">Navigation</span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation items */}
      <div
        className={`
          flex flex-col gap-2 px-4 pb-4
          md:flex md:flex-row md:items-center md:gap-2 md:pb-4 md:pt-4
          ${isOpen ? "block" : "hidden"} md:block
        `}
      >
        <NavLink
          to="/"
          className={navItemClass}
          onClick={() => setIsOpen(false)}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink
          to="/companies"
          className={navItemClass}
          onClick={() => setIsOpen(false)}
        >
          <Building2 size={16} />
          Companies
        </NavLink>

        <NavLink
          to="/bookings"
          className={navItemClass}
          onClick={() => setIsOpen(false)}
        >
          <Ticket size={16} />
          Bookings
        </NavLink>

        <NavLink
          to="/upload-csv"
          className={navItemClass}
          onClick={() => setIsOpen(false)}
        >
          <Upload size={16} />
          Upload CSV
        </NavLink>
      </div>
    </nav>
  );
}
