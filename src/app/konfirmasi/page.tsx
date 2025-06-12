"use client";

import { useEffect } from "react";

export default function KonfirmasiPage() {
  useEffect(() => {
    // bersihkan URL (tanpa query string) setelah load pertama
    window.history.replaceState(null, "", "/konfirmasi");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          ✅ Email Berhasil Dikonfirmasi
        </h1>
        <p className="text-gray-600">
          Sekarang kamu bisa login dan mulai menggunakan aplikasi kamu.
        </p>
        <p>bisa kembali dan buka lagi chatour dan login</p>
      </div>
    </div>
  );
}
