import { useState } from "react";
import api from "../services/api";
import { Upload, FileText } from "lucide-react";

export default function UploadCSV() {
  const [csvText, setCsvText] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIngest = async () => {
    if (!csvText.trim() && !file) {
      setMessage("Please upload a CSV file or paste CSV text.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      if (file) formData.append("file", file);
      if (csvText.trim()) formData.append("csvText", csvText);

      const res = await api.post("/upload/bookings", formData);

      setMessage(res.data);
      setCsvText("");
      setFile(null);
    } catch {
      setMessage("Ingestion failed. Please check the CSV data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white rounded-xl border p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Upload size={20} />
            Ingest Booking Data
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload a CSV file or paste CSV content to update bookings and companies.
          </p>
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload CSV File
          </label>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm"
            />

            {file && (
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <FileText size={14} />
                {file.name}
              </span>
            )}
          </div>
        </div>

        {/* OR DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="px-3 text-xs text-gray-400 uppercase">or</span>
          <div className="flex-1 border-t" />
        </div>

        {/* CSV TEXT */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Paste CSV Content
          </label>

          <textarea
            rows={8}
            placeholder={`ticketNumber,bookingDate,companyName,ticketAmount,commission
SAT-1001,2026-01-05,Sri Amaravathi Travels,1200,80`}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full border rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* ACTION */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleIngest}
            disabled={loading}
            className="px-6 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Ingesting…" : "Ingest Data"}
          </button>

          {message && (
            <p className="text-sm text-gray-700">
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
