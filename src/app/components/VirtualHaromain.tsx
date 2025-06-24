"use client";
import Image from "next/image";
import Link from "next/link";

const VirtualHaromain = () => {
  return (
    <div className="h-screen pb-0  md:pb-8  px-4 sm:px-6 lg:px-16 w-full bg-dark">
      <div className="relative mx-auto lg:h-screen h-5/6  w-full overflow-hidden rounded-xl">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/makkah.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#edbe9f]/70 mix-blend-multiply pointer-events-none z-10" />

        {/* Konten di atas background */}
        <div className="  absolute left-1/2 h-full  w-4/5 md:w-3/5 -translate-x-1/2 z-20 flex flex-col items-center justify-center pt-12 gap-10 lg:px-10 md:px-5 px-1">
          {/* <h1 className="font-stopsn text-accentt font-medium tracking-widest text-[1rem] md:text-xl text-center">
            Chatour Travel
          </h1> */}

          <div className="flex items-center gap-1 justify-center flex-col">
            <h1 className="font-stopsn flex items-center gap-1 md:text-xl text-accentt text-[1rem] sm:text-lg lg:text-3xl tracking-wider">
              <Image
                src={"/icon/icon-logo.png"}
                height={56}
                alt="logo"
                width={56}
                className="sm:block hidden"
              />{" "}
              <Image
                src={"/icon/icon-logo.png"}
                height={38}
                alt="logo"
                width={38}
                className="block sm:hidden"
              />{" "}
              Program Virtual Haromain
            </h1>

            <p className="text-base font-custom text-light md:text-[1rim] sm:text-sm text-xs text-center">
              Program Terbaru Chatour Travel Guna Memudahkan Impian Ummat untuk
              mencapai Impian Beribadah Ke Tanah Suci hanya berbekal Smartphone
              saja
            </p>
          </div>
          <Link
            href={"/virtual-tour"}
            className="font-stopsn text-white tracking-wider border-2 border-white rounded-md hover:border-accentt bg-transparent hover:bg-accentt transition-all md:px-4 md:py-3 font-extralight px-2 py-1 hover:text-dark"
          >
            Tour Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VirtualHaromain;
