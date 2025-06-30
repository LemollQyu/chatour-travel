"use client";
import Image from "next/image";
import {
  HiCalendar,
  HiBuildingLibrary,
  HiPaperAirplane,
  HiMapPin,
} from "react-icons/hi2";

type CardPackageProps = {
  title: string;
  tanggal_berangkat: string;
  hotel_madinah: string;
  hotel_makkah: string;
  pesawat: string;
  image: string;
  bandara_awal: string;
  isActive: boolean;
  onClick: () => void;
};

export default function CardPackage({
  title,
  tanggal_berangkat,
  hotel_madinah,
  hotel_makkah,
  pesawat,
  image,
  bandara_awal,
  isActive,
  onClick,
}: CardPackageProps) {
  return (
    <div
      onClick={onClick}
      className="group w-full md:w-[48%] lg:w-[30%] max-w-[340px] aspect-[1/1.2] mx-auto relative overflow-hidden rounded-md cursor-pointer shadow-md  bg-base"
    >
      <Image
        src={`${image}`}
        alt={title}
        width={300}
        height={300}
        className="object-contain group-hover:saturate-150 saturate-100 transition-all w-full h-full"
      />

      <div
        className={`absolute bottom-0 bg-accent transition-all duration-500 w-11/12 rounded-tr-lg z-20 md:py-5 py-1 px-4 flex flex-col gap-2 text-xs font-medium font-custom text-dark ${
          isActive ? "h-60" : "md:h-1/6 h-[10%]"
        }`}
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div className="flex justify-between items-center  w-full ">
          <h2 className="font-stopsn text-dark  tracking-wider  text-[1rem] ">
            {title}
          </h2>
          <div
            onClick={() => {
              alert("cek");
            }}
            className="rounded-md bg-accentt py-1 px-2"
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
          </div>
        </div>

        <table className="w-full text-[10px] table-fixed border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="align-top pr-2">
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-base text-dark" />
                  <span>{tanggal_berangkat}</span>
                </div>
              </td>
              <td className="align-top pl-2">
                <div className="flex items-center gap-2">
                  <HiBuildingLibrary className="text-base text-dark" />
                  <span>{hotel_madinah}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-top pr-2">
                <div className="flex items-center gap-2">
                  <HiPaperAirplane className="text-base text-dark" />
                  <span>{pesawat}</span>
                </div>
              </td>
              <td className="align-top pl-2">
                <div className="flex items-center gap-2">
                  <HiBuildingLibrary className="text-base text-dark" />
                  <span>{hotel_makkah}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-top pr-2">
                <div className="flex items-center gap-2">
                  <HiMapPin className="text-base text-dark" />
                  <span>{bandara_awal}</span>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
