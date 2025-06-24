"use client";

import Link from "next/link";
import CardGallery from "./CardGallery";

const ContentGallery = () => {
  return (
    <div
      className="w-full bg-base"
      style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
    >
      <div className="w-full hidden sm:flex flex-row border overflow-hidden px-4 gap-4">
        {/* Kiri: About Content (40%) */}
        <div
          className="w-[40%] min-w-[200px] rounded-md relative overflow-hidden text-base flex items-end p-4"
          style={{
            backgroundImage: "url('/image/about.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay gelap agar teks tetap terbaca */}
          <div className="absolute inset-0 bg-[#edbe9f]/100 mix-blend-multiply z-0" />

          {/* Konten teks */}
          <div className="w-full flex flex-col items-center relative z-20 justify-center">
            <Link
              href={"/about"}
              className="font-stopsn text-base tracking-wider border-2 border-base rounded-md hover:border-accentt bg-transparent hover:bg-accentt transition-all md:px-4 md:py-1 font-extralight px-2 py-1 hover:text-dark"
            >
              Tentang kami
            </Link>
          </div>
        </div>

        {/* Kanan: Gallery Scrollable (60%) */}
        <div className="w-[60%] overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 items-start w-max">
            <CardGallery srcImg="/image/makam.jpg" />
            <CardGallery srcImg="/image/makam.webp" />
            <CardGallery srcImg="/image/makkah.jpg" />
            <CardGallery srcImg="/image/makkah.jpg" />
            <CardGallery srcImg="/image/makkah.jpg" />
            <CardGallery srcImg="/image/makam.jpg" />
            <CardGallery srcImg="/image/makam.webp" />
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="w-full sm:hidden flex flex-col border overflow-hidden px-4 gap-4">
        <div
          className="w-full bg-dark text-base rounded-md h-[205px] relative overflow-hidden flex items-center flex-col justify-end p-4"
          style={{
            backgroundImage: "url('/image/about.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Optional Overlay */}
          <div className="absolute inset-0 bg-[#edbe9f]/75 mix-blend-multiply z-10" />

          {/* Teks di atas background */}
          <div className="w-full flex flex-col items-center relative z-20 justify-center">
            {/* <h2 className="text-accentt relative z-10 font-custom font-medium text-[1rem] tracking-wider ">
              Tentang kami
            </h2> */}
            <Link
              href={"/about"}
              className="font-stopsn text-base tracking-wider border-2 border-base rounded-md hover:border-accentt bg-transparent hover:bg-accentt transition-all md:px-4 md:py-1 font-extralight px-2 py-1 hover:text-dark"
            >
              Tentang kami
            </Link>
          </div>
        </div>

        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 items-start w-max">
            <CardGallery srcImg="/image/makam.jpg" />
            <CardGallery srcImg="/image/makam.webp" />
            <CardGallery srcImg="/image/makkah.jpg" />
            <CardGallery srcImg="/image/makkah.jpg" />
            <CardGallery srcImg="/image/makkah.jpg" />
            <CardGallery srcImg="/image/makam.jpg" />
            <CardGallery srcImg="/image/makam.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGallery;
