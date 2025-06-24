import Link from "next/link";
import Banner from "./components/Banner";
import Navigasi from "./components/Navigasi";
import BoxProgram from "./components/program/BoxProgram";

import CardSearchPackage from "./components/SearchPackageCard";
import Image from "next/image";
import VirtualHaromain from "./components/VirtualHaromain";
import Gallery from "./components/gallery/ContentGallery";
import Footer from "./components/Footer";
import Pimpinan from "./components/Pimpinan";
import Fasilitas from "./components/Fasilitas";
import Testimonials from "./components/Testimonial";
import AirlineSlider from "./components/AfiliasiPenerbangan";

export default function Home() {
  return (
    <>
      <Navigasi />

      <div className="bg-dark w-full">
        <div className="lg:hidden block w-full h-[380px]">
          <div className="lg:hidden mx-auto sm:w-96 w-72 pt-4 flex flex-col items-center justify-center  relative">
            <div className="lg:hidden mx-auto w-full flex flex-col items-center justify-center gap-2 text-center">
              <h1 className="font-stopsn sm:text-3xl flex items-center  text-accentt text-xl tracking-widest">
                <Image
                  src={"/icon/icon-logo.png"}
                  height={46}
                  alt="logo"
                  width={46}
                  className="sm:block hidden"
                />{" "}
                <Image
                  src={"/icon/icon-logo.png"}
                  height={38}
                  alt="logo"
                  width={38}
                  className="block sm:hidden"
                />{" "}
                Tour Travel
              </h1>

              <p
                className="font-custom sm:text-sm text-xs mt-2 leading-relaxed text-base"
                style={{
                  textShadow: "0.5px 0.5px 2px rgba(0,0,0,0.1)",
                }}
              >
                Temukan pengalaman perjalanan ibadah yang penuh amanah,
                kenyamanan, dan ketenangan hati bersama Chatour, mitra
                terpercaya yang senantiasa mendampingi setiap langkah Anda
                menuju Tanah Suci dengan pelayanan terbaik dan penuh tanggung
                jawab.
              </p>
            </div>
            <Link
              href={"/layanan"}
              className="mt-6 border-2 border-base font-stopsn  hover:border-accentt bg-transparent hover:bg-accentt transition-all duration-75   text-sm h-full w-1/2 flex px-4 py-2 rounded-md items-center justify-center text-base hover:text-dark hover:font-medium"
            >
              Package
            </Link>
          </div>
        </div>
        <div className="relative h-[275px] w-full lg:w-[922px] lg:h-[518px]  lg:mx-auto">
          <Banner />
          <CardSearchPackage />
        </div>
      </div>
      <BoxProgram />
      <div className="w-full bg-dark md:h-12 h-10 "></div>
      <VirtualHaromain />
      <div className="w-full bg-dark md:h-12 h-0 "></div>
      <Fasilitas />

      <Pimpinan />

      <Testimonials />
      <AirlineSlider />
      <Gallery />
      <div
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
        className="w-full bg-base md:h-14 h-10 border-b border-dark "
      ></div>

      <Footer />
    </>
  );
}
