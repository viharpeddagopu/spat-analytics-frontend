import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* =========================
   CUSTOM X-AXIS TICK (2 LINES)
   ========================= */
const CustomXAxisTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");
  const mid = Math.ceil(words.length / 2);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={10} textAnchor="middle" fill="#6b7280" fontSize={12}>
        <tspan x="0" dy="0">
          {words.slice(0, mid).join(" ")}
        </tspan>
        {words.length > mid && (
          <tspan x="0" dy="14">
            {words.slice(mid).join(" ")}
          </tspan>
        )}
      </text>
    </g>
  );
};

function Dashboard() {
  /* =========================
     GLOBAL DATE FILTER
     ========================= */
  const [selectedDate, setSelectedDate] = useState("");

  /* =========================
     KPI STATE (BACKEND STATS)
     ========================= */
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  /* =========================
     RAW DATA
     ========================= */
  const [bookings, setBookings] = useState([]);
  const [companies, setCompanies] = useState([]);

  /* =========================
     TREND DATE RANGE
     ========================= */
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* =========================
     FETCH KPI STATS
     ========================= */
  const fetchStats = (date = "") => {
    setStatsLoading(true);

    const url = date ? `/dashboard/stats?date=${date}` : "/dashboard/stats";

    api
      .get(url)
      .then((res) => {
        setStats(res.data);
        setStatsLoading(false);
      })
      .catch(() => setStatsLoading(false));
  };

  /* =========================
     INITIAL LOAD
     ========================= */
  useEffect(() => {
    fetchStats();
    api.get("/bookings").then((res) => setBookings(res.data));
    api.get("/companies").then((res) => setCompanies(res.data));
  }, []);

  /* =========================
     COMPANY PERFORMANCE DATA
     (USES GLOBAL DATE)
     ========================= */
  const companyChartData = useMemo(() => {
    const map = {};

    companies.forEach((c) => {
      map[c.name] = {
        company: c.name,
        commission: 0,
        tickets: 0,
      };
    });

    bookings.forEach((b) => {
      if (selectedDate && b.bookingDate !== selectedDate) return;

      const name = b.company?.name;
      if (!map[name]) return;

      map[name].commission += b.commission || 0;
      map[name].tickets += 1;
    });

    return Object.values(map);
  }, [bookings, companies, selectedDate]);

  /* =========================
     TREND DATA (LAST 30 DAYS DEFAULT)
     ========================= */
  const trendChartData = useMemo(() => {
    const today = new Date();
    const start = fromDate
      ? new Date(fromDate)
      : new Date(new Date().setDate(today.getDate() - 29));
    const end = toDate ? new Date(toDate) : new Date();

    const map = {};

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      map[key] = { date: key, commission: 0, tickets: 0 };
    }

    bookings.forEach((b) => {
      if (map[b.bookingDate]) {
        map[b.bookingDate].commission += b.commission || 0;
        map[b.bookingDate].tickets += 1;
      }
    });

    return Object.values(map);
  }, [bookings, fromDate, toDate]);

  const chartWidth = companies.length * 140;

  return (
    <div className="p-6">
      {/* =========================
          KPI HEADER + GLOBAL DATE
         ========================= */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-500 text-sm">
          Overview of booking performance across all companies
        </p>

        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              const date = e.target.value;
              setSelectedDate(date);
              fetchStats(date);
            }}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <button
            onClick={() => {
              setSelectedDate("");
              fetchStats("");
            }}
            title="Displays overall data"
            className="border px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      {statsLoading ? (
        <p className="text-gray-500 mb-10">Loading dashboard stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <DashboardCard
            title="Total Tickets Booked"
            value={stats.totalTickets}
          />
          <DashboardCard
            title="Total Amount"
            value={`₹ ${stats.totalAmount?.toLocaleString("en-IN")}`}
          />
          <DashboardCard
            title="Total Commission"
            value={`₹ ${stats.totalCommission?.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* =========================
          COMPANY PERFORMANCE
         ========================= */}
      <div className="bg-white rounded-xl border p-6 mb-10">
        <h3 className="font-semibold">Company Performance</h3>
        <p className="text-sm text-gray-500 mb-4">
          Compares ticket volume and commission earned across all companies.
        </p>

        <div className="overflow-x-scroll">
          <div style={{ width: chartWidth }}>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={companyChartData} barCategoryGap="18%" barGap={6}>
                <XAxis
                  dataKey="company"
                  interval={0}
                  height={60}
                  tick={<CustomXAxisTick />}
                />

                {/* LEFT AXIS – COMMISSION */}
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(v) => `₹${v}`}
                />

                {/* RIGHT AXIS – TICKETS */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  allowDecimals={false}
                />

                <Tooltip />
                <Legend />

                {/* COMMISSION BAR */}
                <Bar
                  yAxisId="left"
                  dataKey="commission"
                  fill="#f59e0b"
                  barSize={28}
                  name="Commission (₹)"
                />

                {/* TICKETS BAR */}
                <Bar
                  yAxisId="right"
                  dataKey="tickets"
                  fill="#3b82f6"
                  barSize={28}
                  name="Tickets Booked"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* =========================
          BOOKING TRENDS
         ========================= */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-semibold">Booking Trends Over Time</h3>
            <p className="text-sm text-gray-500">
              Shows commission and ticket trends over time, including days with
              no bookings.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
              className="border px-3 py-1 rounded text-sm bg-gray-100"
            >
              Clear
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={trendChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="commission"
              stroke="#10b981"
              strokeWidth={2}
              name="Commission (₹)"
            />
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Tickets"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* =========================
   KPI CARD
   ========================= */
function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <p className="text-3xl font-semibold mt-3">{value}</p>
    </div>
  );
}

export default Dashboard;
