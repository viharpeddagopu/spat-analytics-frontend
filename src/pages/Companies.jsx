import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/companies").then(res => setCompanies(res.data));
    api.get("/bookings").then(res => setBookings(res.data));
  }, []);

  const addCompany = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    api.post("/companies", { name }).then(() => {
      setName("");
      api.get("/companies").then(res => setCompanies(res.data));
    });
  };

  /* AGGREGATE STATS PER COMPANY */
  const companyStats = useMemo(() => {
    const stats = {};

    bookings.forEach(b => {
      const id = b.company?.id;
      if (!id) return;

      if (!stats[id]) {
        stats[id] = { tickets: 0, commission: 0 };
      }

      stats[id].tickets += 1;
      stats[id].commission += b.commission || 0;
    });

    return stats;
  }, [bookings]);

  return (
    <div className="p-6">

      {/* ADD COMPANY */}
      <form onSubmit={addCompany} className="flex gap-4 mb-8">
        <input
          className="border px-4 py-2 rounded w-64"
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Add
        </button>
      </form>

      {/* COMPANY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(c => {
          const stats = companyStats[c.id] || { tickets: 0, commission: 0 };

          return (
            <div
              key={c.id}
              className="bg-white shadow rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {c.name}
                </h2>

                <div className="text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Tickets booked:</span>{" "}
                    {stats.tickets}
                  </p>
                  <p>
                    <span className="font-medium">Commission earned:</span>{" "}
                    ₹ {stats.commission.toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/bookings?companyId=${c.id}`)
                }
                className="mt-6 text-blue-600 font-medium hover:underline self-start"
              >
                View bookings →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Companies;
