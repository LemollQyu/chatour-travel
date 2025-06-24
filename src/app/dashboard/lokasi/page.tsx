"use client";

import FormLocation from "@/app/components/FormLocation";
import { useEffect, useState } from "react";
import { FiArrowRight, FiArrowUp, FiPlus, FiTrash } from "react-icons/fi";

type Location = {
  id: string;
  city: string;
  code: string;
  country: string;
  created_at: string;
  name: string;
};

export default function Lokasi() {
  const [formLebar, setFormLebar] = useState("w-0");
  const [formTinggi, setFormTinggi] = useState("h-0");
  const [ada, setAda] = useState("hidden");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Location | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Toggle form kanan (desktop)
  const handleClickBukaKanan = () => {
    const isOpen = formLebar === "w-0";
    setFormLebar(isOpen ? "w-[470px]" : "w-0");
    setAda(isOpen ? "block" : "hidden");
  };

  // Toggle form atas (mobile)
  const handleClickBukaAtas = () => {
    const isOpen = formTinggi === "h-0";
    setFormTinggi(isOpen ? "h-[550px]" : "h-0");
    setAda(isOpen ? "block" : "hidden");
  };

  // Fetch data lokasi
  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("/api/locations");
        if (!res.ok) throw new Error("Gagal mengambil data lokasi.");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  // Hapus lokasi
  async function deleteLocation(location: Location) {
    try {
      const res = await fetch(`/api/locations/${location.id}`, {
        method: "DELETE",
      });

      const data = await res.json(); // cukup 1x

      if (res.status === 409) {
        setErrorMessage(data.error); // tampilkan pesan "masih digunakan"
        return;
      }

      if (!res.ok) {
        setErrorMessage(data.error || "Gagal menghapus lokasi.");
        return;
      }

      // Jika berhasil hapus
      setLocations((prev) => prev.filter((loc) => loc.id !== location.id));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setConfirmDelete(null); // tutup popup konfirmasi
    }
  }

  function cancelDelete() {
    setConfirmDelete(null);
  }

  // Tambahkan lokasi baru (callback dari <FormLocation />)
  function handleSuccess(newLocation: Location) {
    setLocations((prev) => [newLocation, ...prev]);
  }

  if (loading) return <p className="p-4">Memuat data lokasi...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div
      className="flex sm:flex-row flex-col w-full"
      style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
    >
      {/* Form atas (mobile) */}
      <div
        className={`w-full sm:hidden block ${formTinggi} duration-500 transition-all bg-white`}
      >
        <div className={`${ada} w-full bg-white`}>
          <div className="w-full px-4 pt-5">
            <h1 className="font-stopsn">Tambah Location</h1>
            <p className="mt-2 text-sm font-custom">
              Silakan isi bandara, code, city, country
            </p>
          </div>
          <div>
            <FormLocation onSuccess={handleSuccess} />
          </div>
        </div>
      </div>

      {/* List dan tombol */}
      <div className="w-full">
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 mx-5 rounded-sm flex justify-between items-center">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 hover:text-red-700 font-bold ml-4"
              aria-label="Close alert"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex items-center justify-between px-5 pt-4">
          <h1 className="font-stopsn text-lg font-bold">Locations</h1>

          {/* Tombol buka kanan (desktop) */}
          <button
            onClick={handleClickBukaKanan}
            className="w-8 h-8 bg-white hover:border-accent border-transparent border-2 rounded-full hidden sm:flex items-center justify-center"
          >
            {formLebar === "w-0" ? (
              <FiPlus className="text-secondary text-lg" />
            ) : (
              <FiArrowRight className="text-secondary text-lg" />
            )}
          </button>

          {/* Tombol buka atas (mobile) */}
          <button
            onClick={handleClickBukaAtas}
            className="w-8 h-8 bg-white hover:border-accent border-transparent border-2 rounded-full flex sm:hidden items-center justify-center"
          >
            {formTinggi === "h-0" ? (
              <FiPlus className="text-secondary text-lg" />
            ) : (
              <FiArrowUp className="text-secondary text-lg" />
            )}
          </button>
        </div>

        <div className="w-full px-5 pt-4">
          {locations.length === 0 ? (
            <p>Belum ada data lokasi.</p>
          ) : (
            locations.map((loc) => (
              <div
                key={loc.id}
                className="p-2 flex mt-2 bg-white rounded-sm w-full border justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{loc.name}</p>
                  <p className="text-sm text-gray-600">
                    {loc.code || "-"} - {loc.city}, {loc.country}
                  </p>
                </div>
                <button
                  onClick={() => setConfirmDelete(loc)}
                  className="w-7 h-7 bg-primary hover:border-accent border-transparent border-2 rounded-full flex items-center justify-center"
                  aria-label="Delete location"
                >
                  <FiTrash className="text-secondary text-sm" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Form kanan (desktop) */}
      <div
        className={`h-screen sm:block hidden ${formLebar} transition-all bg-white`}
      >
        <div className={`${ada} w-full bg-white`}>
          <div className="w-full px-4 pt-5">
            <h1 className="font-stopsn">Tambah Location</h1>
            <p className="mt-2 text-sm font-custom">
              Silakan isi bandara, code, city, country
            </p>
          </div>
          <div>
            <FormLocation onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white mx-5 p-3 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
            <p>
              Apakah kamu yakin ingin menghapus lokasi{" "}
              <b>{confirmDelete.name}</b>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => deleteLocation(confirmDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
