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
  async function handleDelete(id: string) {
    const confirmHapus = confirm("Yakin ingin menghapus lokasi ini?");
    if (!confirmHapus) return;

    try {
      const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus lokasi.");

      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  }

  // Tambahkan lokasi baru (callback dari <FormLocation />)
  function handleSuccess(newLocation: Location) {
    setLocations((prev) => [newLocation, ...prev]);
  }

  if (loading) return <p className="p-4">Memuat data lokasi...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex sm:flex-row flex-col w-full">
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
                  onClick={() => handleDelete(loc.id)}
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
    </div>
  );
}
