"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function NavigasiSearchPackage() {
  const router = useRouter();

  const mdDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<"umroh" | "haji">("umroh");
  const [selectedChoose, setSelectedChoose] = useState<
    "Keberangkatan" | "Jenis Paket" | null
  >(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("Januari");
  const [selectedPaket, setSelectedPaket] = useState<string>("Promo");
  const currentYear = new Date().getFullYear();
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const jenisPaket = ["2 Free 1", "Hemat", "Promo", "Reguler"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideMd =
        mdDropdownRef.current &&
        !mdDropdownRef.current.contains(event.target as Node);

      const clickedOutsideMobile =
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node);

      if (clickedOutsideMd && clickedOutsideMobile) {
        setSelectedChoose(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePilihIbadah = (value: "umroh" | "haji") => {
    setSelected(value);
  };

  const handleClick = () => {
    const bulanAngka = month.indexOf(selectedMonth) + 1;
    const bulanString = bulanAngka.toString().padStart(2, "0");
    const bulanTahun = `${currentYear}-${bulanString}`;

    const params = new URLSearchParams({
      jenis_perjalanan: selected,
      bulan_tahun: bulanTahun,
      jenis_paket: selectedPaket.toLowerCase(),
    });

    console.log("params, ", params);

    router.push(`/layanan?${params.toString()}`);
  };

  return (
    <>
      <div className="w-11/12 z-20  pr-2  justify-between items-center flex md:w-[750px] absolute left-1/2 bg-white rounded-md -bottom-20 md:bottom-10 -translate-x-1/2 h-[67px] ">
        <div className="md:hidden absolute -top-11 flex w-full">
          <button
            onClick={() => handlePilihIbadah("umroh")}
            className={`border-2 transition-all duration-75 font-custom text-sm rounded-l-md h-10 w-1/2 flex p-4 items-center justify-center
          ${
            selected === "umroh"
              ? "bg-accent  border-accent underline [text-underline-offset:4px]"
              : "bg-white border-transparent hover:border-accent hover:underline hover:[text-underline-offset:4px]"
          }`}
          >
            Umroh
          </button>

          <button
            onClick={() => handlePilihIbadah("haji")}
            className={`border-2 transition-all duration-75 font-custom text-sm rounded-r-md h-10 w-1/2 flex p-4 items-center justify-center
          ${
            selected === "haji"
              ? "bg-accent  border-accent underline [text-underline-offset:4px]"
              : "bg-white border-transparent hover:border-accent hover:underline hover:[text-underline-offset:4px]"
          }`}
          >
            Haji
          </button>
        </div>

        <div className="flex h-full gap-1 items-center">
          <div className="md:flex hidden h-full">
            <button
              onClick={() => handlePilihIbadah("umroh")}
              className={`border-2 transition-all duration-75 font-custom text-sm rounded-sm h-full w-[100px] flex p-4 items-center justify-center
          ${
            selected === "umroh"
              ? "bg-accent  border-accent underline [text-underline-offset:4px]"
              : "bg-white border-transparent hover:border-accent hover:underline hover:[text-underline-offset:4px]"
          }`}
            >
              Umroh
            </button>

            <button
              onClick={() => handlePilihIbadah("haji")}
              className={`border-2 transition-all duration-75 font-custom text-sm rounded-sm h-full w-[100px] flex p-4 items-center justify-center
          ${
            selected === "haji"
              ? "bg-accent  border-accent underline [text-underline-offset:4px]"
              : "bg-white border-transparent hover:border-accent hover:underline hover:[text-underline-offset:4px]"
          }`}
            >
              Haji
            </button>
          </div>

          <span className="h-14 w-[.5px] bg-accent"></span>

          <button
            onClick={() => {
              setSelectedChoose("Keberangkatan");
            }}
            className="h-full w-32 sm:w-44 md:w-[140px]  hover:bg-accent transition-all"
          >
            <p className="font-custom  text-xs text-dark">Keberangkatan</p>
            <p className="font-custom  text-sm font-semibold mt-1">
              {selectedMonth} {currentYear}
            </p>
          </button>

          <span className="h-14 w-[.5px] bg-accent"></span>

          <button
            onClick={() => {
              setSelectedChoose("Jenis Paket");
            }}
            className="h-full w-32 sm:w-44 md:w-[140px] hover:bg-accent transition-all"
          >
            <p className="font-custom text-xs text-dark">Jenis paket</p>
            <p className="font-custom text-sm  font-semibold mt-1">
              {selectedPaket}
            </p>
          </button>

          <span className="h-14 w-[.5px] bg-accent"></span>
        </div>

        <button
          onClick={handleClick}
          className="flex md:w-[52px] w-1/5 rounded-md h-[52px] font-custom items-center justify-center hover:bg-accentt bg-accent"
        >
          <svg
            className="w-full max-w-[20px] m:max-w-[24px] fill-current ls:l:hidden relative z-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M13.096 12.653v.107c-.119.914-.817 2.9-2.096 5.957l.39.283c.758-1.355 2.203-2.584 4.334-3.687 2.155-1.103 4.251-1.97 6.288-2.6v-.426c-2.037-.63-4.133-1.48-6.288-2.552C13.594 8.632 12.15 7.387 11.391 6L11 6.284c1.279 3.057 1.977 5.042 2.096 5.956v.108a1.988 1.988 0 0 1 0 .305Z"
              clipRule="evenodd"
            ></path>
            <path d="m4 13.51 12.873-.592-.001-.644L4 11.5v2.009Z"></path>
          </svg>
        </button>
      </div>

      {(() => {
        switch (selectedChoose) {
          case "Keberangkatan":
            return (
              <>
                <div
                  ref={mdDropdownRef}
                  className={`md:flex hidden absolute z-30  left-1/3 rounded-sm top-0 md:top-10 lg:top-4 w-[271px] bg-white py-2 opacity-0 animate-fadeIn  flex-col justify-between items-center`}
                >
                  <h1 className="font-custom font-bold mb-2">
                    {selectedChoose}
                  </h1>

                  {month.map((bulan) => (
                    <button
                      key={bulan}
                      onClick={() => {
                        setSelectedMonth(bulan);
                        // setSelectedChoose(null);
                      }}
                      className={`text-sm cursor-pointer w-full  px-3 py-2 rounded-sm transition ${
                        selectedMonth === bulan
                          ? "bg-accentt/80"
                          : "hover:bg-accentt/80"
                      }`}
                    >
                      {bulan}
                    </button>
                  ))}
                </div>
                <div
                  ref={mobileDropdownRef}
                  className={`md:hidden z-30  flex absolute rounded-sm  top-10 left-1/2 -translate-x-1/2 w-[271px] bg-white py-2 opacity-0 animate-fadeIn  flex-col justify-between items-center`}
                >
                  <h1 className="font-custom font-bold mb-2">
                    {selectedChoose}
                  </h1>

                  {month.map((bulan) => (
                    <button
                      key={bulan}
                      onClick={() => {
                        setSelectedMonth(bulan);
                        // setSelectedChoose(null);
                      }}
                      className={`text-sm cursor-pointer w-full  px-3 py-2 rounded-sm transition ${
                        selectedMonth === bulan
                          ? "bg-accentt/80"
                          : "hover:bg-accentt/80"
                      }`}
                    >
                      {bulan}
                    </button>
                  ))}
                </div>
              </>
            );
          case "Jenis Paket":
            return (
              <>
                <div
                  ref={mdDropdownRef}
                  className={` absolute z-30  left-1/3 rounded-sm top-0 md:top-10 lg:top-4 w-[271px] bg-white py-2 opacity-0 animate-fadeIn  md:flex hidden flex-col justify-between items-center`}
                >
                  <h1 className="font-custom font-bold mb-2">
                    {selectedChoose}
                  </h1>
                  {jenisPaket.map((paket) => (
                    <button
                      key={paket}
                      onClick={() => {
                        setSelectedPaket(paket);
                      }}
                      className={`text-sm cursor-pointer w-full px-3 py-2 rounded-sm transition ${
                        selectedPaket === paket
                          ? "bg-accentt/80 "
                          : "hover:bg-accentt/80"
                      }`}
                    >
                      {paket}
                    </button>
                  ))}
                </div>
                <div
                  ref={mobileDropdownRef}
                  className={` absolute z-30 rounded-sm  left-1/2 -translate-x-1/2  top-10 w-[271px] bg-white py-2 opacity-0 animate-fadeIn  md:hidden flex flex-col justify-between items-center`}
                >
                  <h1 className="font-custom font-bold mb-2">
                    {selectedChoose}
                  </h1>
                  {jenisPaket.map((paket) => (
                    <button
                      key={paket}
                      onClick={() => {
                        setSelectedPaket(paket);
                      }}
                      className={`text-sm cursor-pointer w-full px-3 py-2 rounded-sm transition ${
                        selectedPaket === paket
                          ? "bg-accentt/80 "
                          : "hover:bg-accentt/80"
                      }`}
                    >
                      {paket}
                    </button>
                  ))}
                </div>
              </>
            );
          default:
            return null;
        }
      })()}
    </>
  );
}
