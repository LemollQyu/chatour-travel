"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitPesawat } from "@/actions/pesawatActions";

export default function FormPesawat() {
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const formData = new FormData(e.currentTarget);

    const result = await submitPesawat(formData);

    setLoading(false);

    if (result.success) {
      setPopup({ message: result.message, type: "success" });

      // Redirect setelah 2 detik
      setTimeout(() => {
        router.push("/dashboard/pesawat");
      }, 2000);
    } else {
      setPopup({ message: result.message, type: "error" });
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
        <div className="mb-4">
          <label className="block text-base font-bold text-dark mb-1">
            Nama Pesawat <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaPesawat"
            placeholder="Masukkan nama pesawat"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-base font-bold text-dark mb-1">
            Kode Pesawat <i className="text-xs font-light">Optional</i>
          </label>
          <input
            type="text"
            name="kodePesawat"
            placeholder="Masukkan kode pesawat"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
      className={`fixed top-4 right-4 p-4 rounded shadow text-white ${
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
