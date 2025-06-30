"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { HiHome, HiCube } from "react-icons/hi";

export default function NavigasiChatour() {
  const [size, setSize] = useState<string>("w-12 h-12 rounded-full");
  const [ada, setAda] = useState<string>("hidden");
  const containerRef = useRef<HTMLDivElement>(null);

  function handleNavigasi() {
    if (size === "w-12 h-12 rounded-full") {
      setSize("w-[170px] h-12 rounded-full");
      setAda("flex");
    } else {
      setSize("w-12 h-12 rounded-full");
      setAda("hidden");
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSize("w-12 h-12 rounded-full");
        setAda("hidden");
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`bg-gradient-to-r cursor-pointer shadow-lg z-50 ${size} transition-all from-accent to-accent fixed bottom-3 left-2 flex justify-end items-center`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation(); // Mencegah event bubbling ke document
          handleNavigasi();
        }}
        className="w-12 h-12 absolute bottom-0 left-0"
      >
        <Image
          src={"/icon/icon-logo-dark.png"}
          width={60}
          height={60}
          className="w-full h-full object-cover"
          alt="icon"
        />
      </div>
      <div className={`${ada} justify-between gap-4 items-center pr-3`}>
        <Link
          className="h-10 flex justify-center items-center hover:border-accentt border-transparent border-2 hover:bg-accent w-10 rounded-full bg-base"
          href={"/"}
        >
          <HiHome className="text-xl" />
        </Link>
        <Link
          className="h-10 justify-center items-center flex hover:border-accentt border-transparent border-2 hover:bg-accent w-10 rounded-full bg-base"
          href={"/layanan"}
        >
          <HiCube className="text-xl" />
        </Link>
      </div>
    </div>
  );
}
