"use client";

import FormPackage from "@/app/components/FormPackage";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import Image from "next/image";

interface Hotel {
  id: number;
  name: string;
  images: string[];
  image_url: string;
}

interface Airport {
  id: string;
  name: string;
}

interface Pesawat {
  id: string;
  nama_pesawat: string;
}

interface Package {
  id: string;
  tanggal_keberangkatan: string;
  hotel_makkah_id: number;
  hotel_madinah_id: number;
  pesawat_id: string;
  bandara_awal_id: string;
  transit_id?: string | null;
  bandara_tiba_id: string;
  image_package?: string;

  hotel_makkah: Hotel;
  hotel_madinah: Hotel;
  pesawat: Pesawat;
  bandara_awal: Airport;
  transit?: Airport | null;
  bandara_tiba: Airport;
  image_package_url?: string;
}

export default function Programs() {
  const [ada, setAda] = useState<boolean>(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const handleClick = () => {
    if (ada == false) {
      setAda(true);
    } else {
      setAda(false);
    }
  };

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error("Gagal mengambil data package", error);
      }
    }

    fetchPackages();
  }, []);

  console.log(packages);

  return (
    <>
      <div className="px-5 w-full flex items-center justify-between">
        <h1 className="font-stopsn">Packages</h1>
        <button
          onClick={handleClick}
          className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
        >
          <FiPlus className="text-secondary text-xs md:text-lg" />
        </button>
      </div>

      {/* ini form inputan data */}

      {ada && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/35 flex items-center justify-center">
          <div className="mx-auto w-full sm:w-[400px] max-h-[100vh] relative bg-white rounded-sm overflow-y-auto">
            <button
              onClick={handleClick}
              className="transition-all absolute top-1 left-1 w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center z-10"
            >
              <RiCloseLine className="text-secondary text-xs md:text-lg" />
            </button>
            <div className="p-4">
              <FormPackage />
            </div>
          </div>
        </div>
      )}

      {/* tampilan datanya  */}

      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-md w-full md:w-72 border overflow-hidden flex flex-col"
          >
            {/* Gambar Banner */}
            <div className="h-56 w-full">
              <Image
                src={pkg.image_package_url || ""}
                alt={`Program ${pkg.id}`}
                width={600}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              {/* Judul */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 uppercase">
                {/* {pkg.name_program == "" | null ? "" : pkg.name_program} */}
                Title Programnya lupa
              </h3>

              {/* Detail Program */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">
                    <i className="fas fa-calendar-alt" />
                  </span>
                  <span>{pkg.tanggal_keberangkatan}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-600">
                    <i className="fas fa-hotel" />
                  </span>
                  <span>{pkg.hotel_makkah.name}</span>
                  <Image
                    src={pkg.hotel_makkah.images[0] || ""}
                    alt="Hotel Makkah"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-600">
                    <i className="fas fa-hotel" />
                  </span>
                  <span>{pkg.hotel_madinah.name}</span>
                  <Image
                    src={pkg.hotel_madinah.images[0] || ""}
                    alt="Hotel Madinah"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-600">
                    <i className="fas fa-plane" />
                  </span>
                  <span>{pkg.pesawat.nama_pesawat}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-600">
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  <span>{pkg.bandara_awal.name}</span>
                </div>

                {pkg.transit && (
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">
                      <i className="fas fa-exchange-alt" />
                    </span>
                    <span>Transit: {pkg.transit.name}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-red-600">
                    <i className="fas fa-map-marker-alt" />
                  </span>
                  <span>{pkg.bandara_tiba.name}</span>
                </div>
              </div>

              {/* Harga dan Tombol */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-red-600 font-bold text-base">
                  Rp{" "}
                  {/* {Number(pkg.harga).toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                  })} */}
                  00000
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
