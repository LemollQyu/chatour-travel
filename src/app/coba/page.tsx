"use client";
import React from "react";

export default function Fasilitas() {
  const data = [
    {
      title: "Tiket Pesawat",
      desc: "Tiket pesawat PP untuk keperluan berangkat ke tanah suci",
    },
    {
      title: "Tim Profesional Saudi",
      desc: "Tim profesional dari Saudi untuk melancarkan kegiatan para jamaah",
    },
    {
      title: "Transportasi",
      desc: "Transportasi untuk memudahkan perjalanan jamaah",
    },
    {
      title: "Hotel",
      desc: "Akomodasi hotel / penginapan terbaik dan ternyaman",
    },
    {
      title: "TL/Muthawif",
      desc: "Umrah ditemani oleh tour leader dan muthawif yang tersertifikasi",
    },
    {
      title: "Perlengkapan Umrah",
      desc: "Paket umrah dengan perlengkapan kebutuhan ibadah yang lengkap",
    },
    {
      title: "Visa Umrah",
      desc: "Pengurusan visa umrah untuk keperluan ibadah di tanah suci",
    },
    {
      title: "Konsumsi",
      desc: "Menyediakan konsumsi yang terjamin dari memulai perjalanan keberangkatan, hingga sampai selesai",
    },
  ];

  return (
    <section className="bg-base py-16 px-4">
      <h2 className="text-2xl md:text-4xl font-stopsn text-center text-dark mb-16 tracking-wide relative">
        ALASAN MEMILIH KAMI
      </h2>

      {/* Flex container with wrapping */}
      <div className="flex flex-wrap justify-center max-w-6xl mx-auto border-t border-l border-dark/30">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 lg:w-1/3 border-r border-b border-dark/30 px-6 py-8 flex flex-col items-center text-center text-dark"
          >
            <div className="w-12 h-12 border-2 border-dark mb-4 rounded-md" />
            <h3 className="text-lg font-stopsn mb-2">{item.title}</h3>
            <p className="text-sm font-custom leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
