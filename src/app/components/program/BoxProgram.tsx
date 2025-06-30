"use client";

import { useEffect, useState } from "react";
import CardPackage from "../package/CardPackage";
import CardPackageSkeleton from "../package/CardSekelton";

type PackageData = {
  title: string;
  image_package_url: string | null;
};

const BoxProgram = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/packages/limited");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Gagal fetch package:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full h-[60px] bg-dark"></div>
      <div
        className="w-full overflow-x-auto px-4 pb-6 pt-12 bg-base hide-scrollbar"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div className="flex gap-4 sm:gap-5 md:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[70%] xs:w-[50%] sm:w-[220px] md:w-[240px] lg:w-[300px]"
                >
                  <CardPackageSkeleton />
                </div>
              ))
            : packages?.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[70%] xs:w-[50%] sm:w-[220px] md:w-[240px] lg:w-[300px]"
                >
                  <CardPackage data={item} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default BoxProgram;
