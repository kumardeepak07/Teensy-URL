"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import ResultCard from "./ResultCard";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const submit = async () => {
    const res = await api.post("/shorten", {
      originalUrl: url,
      customAlias: alias || undefined,
    });
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Custom alias (optional)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Shorten URL
      </button>

      {shortUrl && <ResultCard shortUrl={shortUrl} />}
    </div>
  );
}
