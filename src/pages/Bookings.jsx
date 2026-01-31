import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";


const PAGE_SIZE = 8;

function Bookings() {
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
  api.get("/bookings").then(res => setBookings(res.data));
  api.get("/companies").then(res => setCompanies(res.data));

  const companyIdFromUrl = searchParams.get("companyId");
  if (companyIdFromUrl) {
    setSelectedCompany(companyIdFromUrl);
  }
}, []);


  /* FILTER LOGIC */
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      if (selectedCompany !== "ALL" && b.company?.id !== Number(selectedCompany))
        return false;

      if (fromDate && b.bookingDate < fromDate) return false;
      if (toDate && b.bookingDate > toDate) return false;

      return true;
    });
  }, [bookings, selectedCompany, fromDate, toDate]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE);
  const paginatedBookings = filteredBookings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* TOTALS */
  const totals = useMemo(() => {
    return filteredBookings.reduce(
      (acc, b) => {
        acc.tickets += 1;
        acc.amount += b.ticketAmount || 0;
        acc.commission += b.commission || 0;
        return acc;
      },
      { tickets: 0, amount: 0, commission: 0 }
    );
  }, [filteredBookings]);

  /* CLEAR FILTERS */
  const clearFilters = () => {
    setSelectedCompany("ALL");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return (
    <div className="p-6">

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">

        {/* COMPANY DROPDOWN */}
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <select
            value={selectedCompany}
            onChange={e => {
              setSelectedCompany(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded w-56"
          >
            <option value="ALL">All Companies</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* FROM DATE */}
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => {
              setFromDate(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* TO DATE */}
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={e => {
              setToDate(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* CLEAR FILTERS */}
        <button
          onClick={clearFilters}
          className="h-10 px-5 rounded bg-gray-200 hover:bg-gray-300 font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* TABLE */}
      {paginatedBookings.length === 0 ? (
        <p className="text-gray-500">No booking data available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Ticket No</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-right">Amount (₹)</th>
                <th className="px-4 py-3 text-right">Commission (₹)</th>
              </tr>
            </thead>

            <tbody>
              {paginatedBookings.map(b => (
                <tr key={b.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{b.bookingDate}</td>
                  <td className="px-4 py-2">{b.ticketNumber}</td>

                  {/* CLICKABLE COMPANY */}
                  <td
                    className="px-4 py-2 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => {
                      setSelectedCompany(b.company.id);
                      setPage(1);
                    }}
                  >
                    {b.company?.name}
                  </td>

                  <td className="px-4 py-2 text-right">
                    ₹ {b.ticketAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    ₹ {b.commission.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* TOTAL ROW */}
            <tfoot className="bg-gray-100 font-semibold">
              <tr>
                <td colSpan="3" className="px-4 py-3">
                  Total ({totals.tickets} tickets)
                </td>
                <td className="px-4 py-3 text-right">
                  ₹ {totals.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  ₹ {totals.commission.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
