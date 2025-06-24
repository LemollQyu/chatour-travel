"use client";

import { useState } from "react";

export default function TestimonialInput({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 🆕 Tambahan
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const nameIsValid = name.length <= 20;
  const messageIsValid = message.trim().length >= 50;

  const canSubmit = nameIsValid && messageIsValid && !isSubmitting;

  const handleSubmit = async () => {
    const finalName = name.trim() === "" ? "Anonymous" : name.trim();

    try {
      setIsSubmitting(true);
      setStatusMessage(null); // reset pesan

      const ipRes = await fetch("/api/ip-address");
      const ipData = await ipRes.json();
      const ip = ipData.ip || "unknown";

      const payload = {
        name: finalName,
        message: message.trim(),
        ip_address: ip,
      };

      if (payload.message.length < 50 || payload.name.length > 20) {
        setStatusMessage({
          type: "error",
          message: "Pesan minimal 50 karakter, nama maksimal 20 karakter.",
        });
        return;
      }

      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatusMessage({
          type: "error",
          message:
            result.error ||
            "Terjadi kesalahan saat mengirim testimonial. Coba lagi nanti.",
        });
        return;
      }

      setStatusMessage({
        type: "success",
        message: "Testimonial berhasil dikirim!",
      });
      setName("");
      setMessage("");
      onSuccess?.();
    } catch (error) {
      console.error("Gagal kirim:", error);
      setStatusMessage({
        type: "error",
        message: "Terjadi kesalahan saat mengirim. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Write your review */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-lg font-stopsn">Write your review</label>
          {/* <span className="text-sm text-gray-600 font-custom font-medium">
            🧠 <u>Review tips</u>
          </span> */}
        </div>
        <textarea
          className={`w-full min-h-[120px] rounded-md p-4 outline font-custom resize-none focus:outline-none focus:ring-2 ${
            message.trim().length === 0
              ? "border-gray-300"
              : !messageIsValid
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-dark"
          }`}
          placeholder="The views were amazing. We took so many photos!..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p
          className={`text-right text-sm mt-1 font-custom ${
            messageIsValid ? "text-gray-500" : "text-red-500"
          }`}
        >
          {message.length}/50 min characters
        </p>
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="text-lg font-stopsn block mb-2">Name</label>
        <input
          type="text"
          className={`w-full rounded-md p-3 font-custom outline focus:outline-none focus:ring-2 ${
            name.trim().length === 0
              ? "border-gray-300"
              : !nameIsValid
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-400 focus:ring-dark"
          }`}
          placeholder="Give us the gist of your experience"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p
          className={`text-right text-sm mt-1 font-custom ${
            nameIsValid ? "text-gray-500" : "text-red-500"
          }`}
        >
          {name.length}/20 max characters
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        {statusMessage ? (
          <p
            className={`font-custom text-xs md:text-sm ${
              statusMessage.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {statusMessage.message}
          </p>
        ) : (
          <p className="font-custom text-xs md:text-sm text-dark">
            Share pengalaman anda bersama Chatour.
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`px-5 py-2 rounded-md text-white font-stopsn transition ${
            canSubmit
              ? "bg-dark hover:bg-black"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Processing..." : "Direct"}
        </button>
      </div>
    </div>
  );
}
