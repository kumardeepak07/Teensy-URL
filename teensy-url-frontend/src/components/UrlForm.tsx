/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import ResultCard from "./ResultCard";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const submit = async () => {
    try{
      const res = await api.post("/shorten", {
      originalUrl: url,
      customAlias: alias || undefined,
      });
      if(res.status === 409 || res.status === 500){
        setShortUrl(res.data.message);
      }else{
        setShortUrl(res.data.shortUrl);
      }
    }catch (error) {
      const err = error as any;
      if(err.status === 409){
        setShortUrl("Custom alias already in use choose another one." );
        return;
      }
      setShortUrl(err.response?.data?.message || "An error occurred" );
    }
    
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg min-h-[420px] flex flex-col justify-between">

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
