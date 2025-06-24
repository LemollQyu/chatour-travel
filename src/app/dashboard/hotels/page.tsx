"use client";
import HotelForm from "@/app/components/FormHotel";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { FiArrowUp } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

interface Hotel {
  id: number;
  name: string;
  city: string;
  images: string[];
}

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const [formLebar, setFormLebar] = useState<string>("w-0");
  const [formTinggi, setFormTinggi] = useState<string>("h-0");
  const [ada, setAda] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickBukaKanan = () => {
    if (formLebar == "w-0") {
      setFormLebar("w-[470px]");
      setAda("block");
    } else {
      setFormLebar("w-0");
      setAda("hidden");
    }
  };

  const handleClickBukaAtas = () => {
    if (formTinggi == "h-0") {
      setFormTinggi("h-[550px]");
      setAda("block");
    } else {
      setFormTinggi("h-0");
      setAda("hidden");
    }
  };

  // State untuk modal konfirmasi hapus
  const [confirmDelete, setConfirmDelete] = useState<Hotel | null>(null);

  const fetchHotels = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("hotels").select("*");

    if (error) {
      console.error("Gagal mengambil data hotel:", error);
    } else {
      setHotels(data as Hotel[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Fungsi hapus data hotel (tanpa confirm bawaan)
  const deleteHotel = async (hotel: Hotel) => {
    const supabase = createClient();

    const { data: relatedPackages, error: checkError } = await supabase
      .from("package")
      .select("id")
      .or(`hotel_makkah_id.eq.${hotel.id},hotel_madinah_id.eq.${hotel.id}`);

    if (checkError) {
      console.error("Gagal memeriksa relasi hotel:", checkError);
      setErrorMessage("Terjadi kesalahan saat memeriksa relasi data.");
      return;
    }

    if (relatedPackages.length > 0) {
      setErrorMessage(
        "Hotel ini masih digunakan dalam paket perjalanan dan tidak bisa dihapus."
      );
      return;
    }

    const { error } = await supabase.from("hotels").delete().eq("id", hotel.id);

    if (error) {
      console.error("Gagal hapus hotel:", error);
      setErrorMessage("Gagal menghapus hotel.");
      return;
    }

    const imagePaths = hotel.images.map((url) => url.split("/").pop() || "");
    const { error: storageError } = await supabase.storage
      .from("hotel-images")
      .remove(imagePaths);

    if (storageError) {
      console.warn("Gambar tidak bisa dihapus dari storage:", storageError);
    }

    setHotels((prev) => prev.filter((h) => h.id !== hotel.id));
    setConfirmDelete(null);
  };

  // Handler tombol hapus klik, buka modal konfirmasi
  const handleDeleteClick = (hotel: Hotel) => {
    setConfirmDelete(hotel);
  };

  // Tutup modal batal hapus
  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <>
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

      <div
        className="w-full sm:flex-row flex-col flex"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div
          className={`w-full sm:hidden block ${formTinggi} duration-500 transition-all bg-white`}
        >
          {/* isi formdata */}
          <div className={` ${ada} w-full bg-white `}>
            <div className="w-full px-4 pt-5 ">
              <h1 className=" font-stopsn">Tambah Hotel</h1>
              <p className="mt-2 text-sm font-custom">
                Silakan isi nama hotel, kota, dan unggah gambar
              </p>
            </div>

            <div className="mt-2">
              <HotelForm onSuccess={fetchHotels} />
            </div>
          </div>
        </div>

        <div className="px-5 w-full pt-4  relative">
          <div className="flex items-center  justify-between">
            <h1 className="font-stopsn text-xl font-bold">Hotels</h1>
            <button
              onClick={handleClickBukaKanan}
              className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full hidden sm:flex items-center justify-center"
            >
              {formLebar == "w-0" ? (
                <FiPlus className="text-secondary text-xs md:text-lg" />
              ) : (
                <FiArrowRight className="text-secondary text-xs md:text-lg" />
              )}
            </button>
            <button
              onClick={handleClickBukaAtas}
              className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex sm:hidden items-center justify-center"
            >
              {formTinggi == "h-0" ? (
                <FiPlus className="text-secondary text-xs md:text-lg" />
              ) : (
                <FiArrowUp className="text-secondary text-xs md:text-lg" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {loading ? (
              <p>Loading data hotel...</p>
            ) : hotels.length === 0 ? (
              <p>Belum ada hotel ditambahkan.</p>
            ) : (
              hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="border rounded-md p-4 shadow bg-white"
                >
                  <div className="flex w-full justify-between items-center">
                    <h2 className="font-bold text-lg">{hotel.name}</h2>
                    <button
                      onClick={() => handleDeleteClick(hotel)}
                      className="transition-all w-7 h-7 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
                    >
                      <FiTrash className="text-secondary text-sm" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{hotel.city}</p>
                  <div className="flex gap-2 mt-2">
                    {hotel.images.slice(0, 3).map((url, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 overflow-hidden rounded"
                      >
                        <Image
                          src={url}
                          alt={`Gambar ${idx + 1}`}
                          fill
                          className="object-cover rounded"
                          sizes="80px"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal konfirmasi hapus */}
          {confirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white mx-5 p-3 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
                <p>
                  Apakah kamu yakin ingin menghapus hotel{" "}
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
                    onClick={() => deleteHotel(confirmDelete)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={`h-screen sm:block hidden ${formLebar} transition-all bg-white`}
        >
          {/* isi formdata */}
          <div className={` ${ada} w-full bg-white `}>
            <div className="w-full px-4 pt-5 ">
              <h1 className=" font-stopsn">Tambah Hotel</h1>
              <p className="mt-2 text-sm font-custom">
                Silakan isi nama hotel, kota, dan unggah gambar
              </p>
            </div>

            <div className="mt-2">
              <HotelForm onSuccess={fetchHotels} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
