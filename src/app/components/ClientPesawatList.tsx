"use client";

import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { hapusPesawat } from "@/actions/pesawatActions";

type Pesawat = {
  id: string;
  nama_pesawat: string;
  kode_pesawat: string | null;
};

export default function ClientPesawatList({
  pesawatData,
}: {
  pesawatData: Pesawat[];
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selected, setSelected] = useState<Pesawat | null>(null);

  const handleDeleteClick = (p: Pesawat) => {
    setSelected(p);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selected) return;
    await hapusPesawat(selected.id); // Jalankan action server
    window.location.reload(); // atau gunakan revalidation
  };

  return (
    <>
      {pesawatData.length === 0 ? (
        <p>Belum ada data pesawat.</p>
      ) : (
        pesawatData.map((p) => (
          <div
            key={p.id}
            className="p-2 flex mt-2 bg-white rounded-sm w-full justify-between"
          >
            <div>
              <p className="font-semibold">{p.nama_pesawat}</p>
              <p className="text-sm text-gray-600">{p.kode_pesawat || "-"}</p>
            </div>
            <button
              onClick={() => handleDeleteClick(p)}
              className="transition-all w-7 h-7 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
            >
              <FiTrash className="text-secondary text-sm" />
            </button>
          </div>
        ))
      )}

      {showConfirm && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white mx-5 p-3 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
            <p>
              Apakah kamu yakin ingin menghapus pesawat{" "}
              <b>{selected.nama_pesawat}</b>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
