"use client";

import Image from "next/image";

const airlines = [
  "airline-turkey.png",
  "airline-batik.png",
  "airline-citilink.png",
  "airline-emirates.png",
  "airline-etihad.png",
  "airline-garuda.png",
  "airline-lion.png",
  "airline-malaysia.png",
  "airline-malindo.png",
  "airline-oman.png",
  "airline-saudia.png",
  "airline-scoot.png",
];

export default function AirlineSlider() {
  const imageList = [...airlines, ...airlines]; // biar infinite loop tanpa jeda

  return (
    <div
      className="w-full overflow-hidden bg-base pt-4 pb-6 border-t-[1px] border-dark"
      style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
    >
      <div className="animate-slide flex gap-6 min-w-max">
        {imageList.map((img, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center bg-base  rounded-xl border border-gray-300 min-w-[160px] h-[100px] px-6 py-3"
          >
            <Image
              src={`/image/afiliasi/${img}`}
              alt={img}
              width={120}
              height={60}
              className="grayscale object-contain"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
