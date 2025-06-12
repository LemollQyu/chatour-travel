"use client";

import { useState, useEffect } from "react";

type Location = {
  id: string;
  city: string;
  code: string;
  country: string;
  created_at: string;
  name: string;
};

export default function FormLocation({
  onSuccess,
  onClose,
}: {
  onSuccess?: (newLocation: Location) => void;
  onClose?: () => void;
}) {
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [loading, setLoading] = useState(false);

  // ⏱️ Auto-dismiss popup dalam 4 detik
  useEffect(() => {
    if (popup) {
      const timeout = setTimeout(() => setPopup(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [popup]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/locations/post-location", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setLoading(false);

    if (result.success && result.data) {
      setPopup({ message: result.message, type: "success" });
      if (onSuccess) onSuccess(result.data);
      if (onClose) onClose(); // ⬅️ Kalau ada modal, bisa tutup di sini
      e.currentTarget?.reset();
    } else {
      setPopup({
        message: result.message || "Terjadi kesalahan.",
        type: "error",
      });
    }
  }

  return (
    <>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-md font-custom mx-auto mt-4 bg-white p-6 shadow rounded"
      >
        {["name", "code", "city", "country"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-base font-bold text-dark mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
              {field === "code" ? (
                <i className="text-xs font-light">(Optional)</i>
              ) : (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              name={field}
              placeholder={`Masukkan ${field}`}
              required={field !== "code"}
              maxLength={field === "code" ? 10 : undefined}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </>
  );
}

function Popup({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow text-white z-50 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 font-bold underline">
        Close
      </button>
    </div>
  );
}
