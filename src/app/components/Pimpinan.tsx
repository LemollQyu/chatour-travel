"use client";
import Image from "next/image";
export default function Pimpinan() {
  return (
    <>
      <div
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
        className="bg-accent border-t border-dark"
      >
        <h1 className="relative font-stopsn text-center text-xl md:text-2xl tracking-wider py-6 ">
          Pimpinan & Direksi Chatour Travel
          {/* Garis bawah utama */}
        </h1>
      </div>
      {/* gambar */}
      <div
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
        className="flex bg-accent w-full md:flex-row flex-col border-b border-dark pb-8 items-center justify-center gap-6 h-full"
      >
        <div className="w-full md:w-[30%] max-w-[292px] aspect-[1/1] relative overflow-hidden rounded-md  cursor-pointer  group">
          <Image
            src="/image/komisaris.png"
            alt="Komisaris"
            width={300}
            height={300}
            className="object-cover group-hover:saturate-150 saturate-100 transition-all w-full h-full"
          />
          <div className="w-11/12  rounded-tr-xl h-[35px] duration-700 group-hover:h-[70px] z-20 transition-all absolute bottom-0 left-0 bg-accentt pl-4 flex flex-col justify-between py-2">
            <h1 className="font-stopsn">Komisaris</h1>
            <p className="font-custom text-sm">H. Muhibbin Billah, S.Sos</p>
          </div>
        </div>

        <div className="w-full md:w-[30%] max-w-[292px] aspect-[1/1] relative overflow-hidden rounded-md  cursor-pointer group  transition-all">
          <Image
            src="/image/direktur.png"
            alt="Direktur"
            width={300}
            height={300}
            className="object-cover group-hover:saturate-150 saturate-100 transition-all w-full h-full"
          />
          <div className="w-11/12  rounded-tr-xl h-[35px] duration-700 group-hover:h-[70px] z-20 transition-all absolute bottom-0 left-0 bg-accentt pl-4 flex flex-col justify-between py-2">
            <h1 className="font-stopsn">Direktur</h1>
            <p className="font-custom text-sm">H. Muhibbin Billah, S.Sos</p>
          </div>
        </div>

        <div className="w-full md:w-[30%] max-w-[292px] aspect-[1/1] relative overflow-hidden rounded-md  cursor-pointer group  transition-all">
          <Image
            src="/image/direktur.png"
            alt="Direktur"
            width={300}
            height={300}
            className="object-cover group-hover:saturate-150 saturate-100 transition-all w-full h-full"
          />
          <div className="w-11/12  rounded-tr-xl h-[35px] duration-700 group-hover:h-[70px] z-20 transition-all absolute bottom-0 left-0 bg-accentt pl-4 flex flex-col justify-between py-2">
            <h1 className="font-stopsn">Direktur</h1>
            <p className="font-custom text-sm">H. Muhibbin Billah, S.Sos</p>
          </div>
        </div>
      </div>
    </>
  );
}
