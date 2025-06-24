"use client";

import {
  FaPlaneDeparture,
  FaUserTie,
  FaShuttleVan,
  FaHotel,
  FaRegIdCard,
  FaSuitcaseRolling,
  FaPassport,
  FaUtensils,
} from "react-icons/fa";

export default function Fasilitas() {
  const data = [
    {
      title: "Tiket Pesawat",
      desc: "Tiket pesawat PP untuk keperluan berangkat ke tanah suci",
      icon: <FaPlaneDeparture className="text-3xl md:text-4xl text-dark" />,
    },
    {
      title: "Tim Profesional Saudi",
      desc: "Tim profesional dari Saudi untuk melancarkan kegiatan para jamaah",
      icon: <FaUserTie className="text-3xl md:text-4xl text-dark" />,
    },
    {
      title: "Transportasi",
      desc: "Transportasi untuk memudahkan perjalanan jamaah",
      icon: <FaShuttleVan className="text-3xl md:text-4xl text-dark" />,
    },
    {
      title: "Hotel",
      desc: "Akomodasi hotel / penginapan terbaik dan ternyaman",
      icon: <FaHotel className="text-3xl md:text-4xl text-dark" />,
    },
    {
      title: "TL/Muthawif",
      desc: "Umrah ditemani oleh tour leader dan muthawif yang tersertifikasi",
      icon: <FaRegIdCard className="text-3xl md:text-4xl text-dark" />,
    },
    {
      title: "Perlengkapan Umrah",
      desc: "Paket umrah dengan perlengkapan kebutuhan ibadah yang lengkap",
      icon: <FaSuitcaseRolling className="text-3xl md:text-4xl text-dark" />,
    },
  ];

  return (
    <section
      className="bg-base pt-8 pb-16 px-4"
      style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
    >
      <div>
        <h1 className="relative font-stopsn text-center text-xl md:text-2xl tracking-wider pb-8 text-dark">
          Fasilitas
        </h1>
      </div>

      {/* 6 item pertama dengan map */}
      <div className="max-w-6xl mx-auto flex flex-wrap border-t border-l border-dark/30">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 lg:w-1/3 border-b border-r border-dark/30 px-6 py-8 flex flex-col items-center text-center text-dark"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-stopsn mb-2">{item.title}</h3>
            <p className="text-sm font-custom leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 2 item terakhir manual */}
      <div className="max-w-6xl mx-auto flex flex-wrap lg:justify-center border-dark/30">
        {/* Visa Umrah */}
        <div className="w-full md:w-1/2 lg:w-1/3 border-b border-r border-l border-dark/30 px-6 py-8 flex flex-col items-center text-center text-dark">
          <div className="mb-4">
            <FaPassport className="text-3xl md:text-4xl text-dark" />
          </div>
          <h3 className="text-lg font-stopsn mb-2">Visa Umrah</h3>
          <p className="text-sm font-custom leading-relaxed">
            Pengurusan visa umrah untuk keperluan ibadah di tanah suci
          </p>
        </div>

        {/* Konsumsi */}
        <div className="w-full md:w-1/2 lg:w-1/3 border-b border-r md:border-l-0 border-l border-dark/30 px-6 py-8 flex flex-col items-center text-center text-dark">
          <div className="mb-4">
            <FaUtensils className="text-3xl md:text-4xl text-dark" />
          </div>
          <h3 className="text-lg font-stopsn mb-2">Konsumsi</h3>
          <p className="text-sm font-custom leading-relaxed">
            Menyediakan konsumsi yang terjamin dari memulai perjalanan
            keberangkatan, hingga sampai selesai
          </p>
        </div>
      </div>
    </section>
  );
}
