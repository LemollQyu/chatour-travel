"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardPackage from "../components/layanan/CardPackege";
import NavigasiSearchPackage from "../components/search/NavigasiSearchPackage";
import CardPackageSkeleton from "../components/package/CardSekelton";
import Footer from "../components/Footer";
import type { PackageData } from "../type/package";

export default function LayananClient() {
  const [dataPaket, setDataPaket] = useState<PackageData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const filterJenisPerjalanan = searchParams.get("jenis_perjalanan");
  const filterBulanTahun = searchParams.get("bulan_tahun"); // format: "2025-07"
  const filterJenisPaket = searchParams.get("jenis_paket");

  useEffect(() => {
    const fetchPaket = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filterJenisPerjalanan)
          params.append("jenis_perjalanan", filterJenisPerjalanan);
        if (filterBulanTahun) params.append("bulan_tahun", filterBulanTahun);
        if (filterJenisPaket) params.append("jenis_paket", filterJenisPaket);

        const res = await fetch(`/api/packages?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          setDataPaket(data);
        } else {
          console.error("Gagal fetch:", data.error);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaket();
  }, [filterJenisPerjalanan, filterBulanTahun, filterJenisPaket]);

  return (
    <>
      <div
        className="w-full relative bg-base"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div className="md:h-[400px] relative w-full h-[200px]">
          <video
            src="/video/makkah.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
          <NavigasiSearchPackage />
          <div className="md:hidden block bg-dark w-full h-[100px]" />
        </div>
      </div>

      <div
        className="w-full min-h-screen bg-base pt-10 md:pt-16 pb-16"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <h1 className="font-stopsn md:text-3xl text-xl tracking-wide text-center mt-[100px]">
          Package Umroh & Haji
        </h1>

        <div className="w-full mt-10 px-4 border md:px-10 flex flex-wrap justify-start gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CardPackageSkeleton key={i} />
            ))
          ) : dataPaket.length === 0 ? (
            <div className="w-full text-center text-muted-foreground mt-10">
              Tidak ada paket yang ditemukan untuk filter yang dipilih.
            </div>
          ) : (
            dataPaket.map((paket, i) => (
              <CardPackage
                key={paket.id}
                title={paket.title}
                tanggal_berangkat={paket.tanggal_keberangkatan}
                hotel_makkah={paket.hotel_makkah?.name}
                hotel_madinah={paket.hotel_madinah?.name}
                pesawat={paket.pesawat?.nama_pesawat}
                bandara_awal={paket.bandara_awal?.name}
                image={paket.image_package_url}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
