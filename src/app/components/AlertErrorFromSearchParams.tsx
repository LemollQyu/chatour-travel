"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AlertErrorFromSearchParams() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setMessage(decodeURIComponent(error));
    }
  }, [searchParams]);

  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-600 p-3 mb-4 mx-5 rounded-sm  flex justify-between items-center">
      <span>{message}</span>
      <button
        onClick={() => setMessage("")}
        className="text-red-500 hover:text-red-700 font-bold ml-4"
        aria-label="Close alert"
      >
        ×
      </button>
    </div>
  );
}
