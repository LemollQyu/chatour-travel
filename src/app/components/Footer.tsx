"use client";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import AccordionSection from "./AcordionSection";

const Footer = () => {
  return (
    <>
      <div
        className="flex w-full flex-start bg-accent"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div
          className="hidden lg:flex w-full justify-start bg-gradient-to-r from-accentt to-accent py-10 px-12"
          style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
        >
          <div className="flex w-5/6  max-w-7xl justify-between gap-12">
            {/* Logo + Nama */}
            <div className="flex items-center gap-4">
              <Image
                src="/icon/icon-logo-dark.png"
                alt="Chatour Logo"
                width={80}
                height={80}
              />
              <h1 className="font-stopsn text-3xl text-dark tracking-widest leading-tight">
                Chatour
                <br />
                Travel
              </h1>
            </div>

            {/* Kolom 1 */}
            <div className="flex flex-col gap-3 text-sm text-dark font-light">
              <h2 className="mb-1 font-stopsn text-base text-dark">
                Informasi
              </h2>
              {[
                "Profile Travel",
                "Metode Pembayaran",
                "Syarat Ketentuan",
                "Sertifikat",
                "Kebijakan Privasi",
              ].map((text, i) => (
                <Link
                  key={i}
                  href="/"
                  className="flex items-center group hover:underline translate-all font-normal  transition-colors"
                >
                  <FiChevronRight className="mr-2 group-hover:translate-x-1  transition-transform" />
                  {text}
                </Link>
              ))}
            </div>

            {/* Kolom 2 */}
            <div className="flex flex-col gap-3 text-sm text-dark font-light">
              <h2 className="mb-1 font-stopsn text-base text-dark">Layanan</h2>
              {[
                "Paket Umroh",
                "Paket Umroh",
                "Umroh Group",
                "Tiket Umroh",
                "Agen Resmi",
              ].map((text, i) => (
                <Link
                  key={i}
                  href="/"
                  className="flex items-center group hover:underline translate-all font-normal  transition-colors"
                >
                  <FiChevronRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                  {text}
                </Link>
              ))}
            </div>

            {/* Kolom 3 */}
            <div className="flex flex-col gap-3 text-sm text-dark font-light">
              <h2 className="mb-1 font-stopsn text-base text-dark">
                Perusahaan
              </h2>
              {["Tentang Kami", "Kontak", "Pengalaman"].map((text, i) => (
                <Link
                  key={i}
                  href="/"
                  className="flex items-center group hover:underline translate-all font-normal  transition-colors"
                >
                  <FiChevronRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex lg:hidden bg-gradient-to-r w-full px-4 from-accentt to-accent justify-start flex-col py-6"
          style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
        >
          <div className="flex w-5/6 flex-col">
            <div className="flex items-center -ml-5">
              <Image
                src={"/icon/icon-logo-dark.png"}
                alt="icon"
                width={136}
                height={136}
              />
              <h1 className="font-stopsn text-dark text-2xl tracking-wider">
                Chatour <br /> Travel
              </h1>
            </div>
            <div className="flex gap-16 mt-2 w-full ml-5 ">
              {/* Kolom 1 */}
              <div className="flex flex-col gap-3 w-1/3 text-sm text-dark font-light">
                <h2 className="mb-1 font-stopsn text-base text-dark">
                  Informasi
                </h2>
                {[
                  "Profile Travel",
                  "Metode Pembayaran",
                  "Syarat Ketentuan",
                  "Sertifikat",
                  "Kebijakan Privasi",
                ].map((text, i) => (
                  <Link
                    key={i}
                    href="/"
                    className="flex items-center group hover:underline translate-all font-normal  transition-colors"
                  >
                    <FiChevronRight className="mr-2 group-hover:translate-x-1  transition-transform" />
                    {text}
                  </Link>
                ))}
              </div>

              {/* Kolom 2 */}
              <div className="flex flex-col gap-3 text-sm w-1/3 text-dark font-light">
                <h2 className="mb-1 font-stopsn text-base text-dark">
                  Layanan
                </h2>
                {[
                  "Paket Umroh",
                  "Paket Umroh",
                  "Umroh Group",
                  "Tiket Umroh",
                  "Agen Resmi",
                ].map((text, i) => (
                  <Link
                    key={i}
                    href="/"
                    className="flex items-center group hover:underline translate-all font-normal  transition-colors"
                  >
                    <FiChevronRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                    {text}
                  </Link>
                ))}
              </div>

              {/* Kolom 3 */}
              <div className="flex flex-col gap-3 text-sm w-1/  text-dark font-light">
                <h2 className="mb-1 font-stopsn text-base text-dark">
                  Perusahaan
                </h2>
                {["Tentang Kami", "Kontak", "Pengalaman"].map((text, i) => (
                  <Link
                    key={i}
                    href="/"
                    className="flex items-center group hover:underline translate-all font-normal  transition-colors"
                  >
                    <FiChevronRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex md:hidden bg-gradient-to-r w-full px-4 from-accentt to-accent justify-between flex-col py-6"
          style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
        >
          <div className="flex -ml-5 items-center w-full justify-center ">
            <Image
              src={"/icon/icon-logo-dark.png"}
              alt="icon"
              width={136}
              height={136}
              className="sm:block hidden"
            />
            <Image
              src={"/icon/icon-logo-dark.png"}
              alt="icon"
              width={76}
              height={76}
              className="block sm:hidden"
            />
            <h1 className="font-stopsn text-dark sm:text-2xl text-lg tracking-wider">
              Chatour <br /> Travel
            </h1>
          </div>
          <div className="w-full mt-4">
            <AccordionSection
              title="Informasi"
              items={[
                "Profile Travel",
                "Metode Pembayaran",
                "Syarat Ketentuan",
                "Sertifikat",
                "Kebijakan Privasi",
              ]}
            />
            <AccordionSection
              title="Layanan"
              items={[
                "Paket Umroh",
                "Paket Umroh",
                "Umroh Group",
                "Tiket Umroh",
                "Agen Resmi",
              ]}
            />
          </div>
        </div>
      </div>
      <div
        className=" pl-16 pr-4 border-t py-6 flex items-center border-dark bg-dark justify-end w-full"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <p className=" md:text-sm text-xs  text-base  tracking-wider">
          <span className="font-stopsn">Credit By</span>
          <Link
            href={"https://www.instagram.com/_aaaanns/"}
            className="font-custom hover:underline"
          >
            @_aaaanns
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
