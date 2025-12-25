/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function AnalyticsCard() {
  const [code, setCode] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      const res = await api.get(`/analytics/${code}`);
      setData(res.data);
      setError("");
    } catch {
      setError("Short URL not found");
      setData(null);
    }
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg min-h-[420px] flex flex-col justify-between">

      <h2 className="text-xl font-semibold">📊 Analytics</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Enter short code (e.g. google)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={fetchAnalytics}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Get Analytics
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="bg-gray-100 p-4 rounded space-y-1">
          <p><b>Clicks:</b> {data.click_count}</p>
          <p><b>Last Accessed:</b> {data.last_accessed}</p>
        </div>
      )}
    </div>
  );
}
