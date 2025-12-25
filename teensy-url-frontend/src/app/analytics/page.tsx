/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function Analytics() {
  const [code, setCode] = useState("");
  const [data, setData] = useState<any>(null);

  const fetchAnalytics = async () => {
    const res = await api.get(`/analytics/${code}`);
    setData(res.data);
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Short code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={fetchAnalytics}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Get Analytics
      </button>

      {data && (
        <div className="bg-gray-100 p-4 rounded">
          <p>Clicks: {data.click_count}</p>
          <p>Last Accessed: {data.last_accessed}</p>
        </div>
      )}
    </div>
  );
}
