"use client";

import CardPackage from "./CardPackage";
import CardPackageHeadline from "./CardPackageHeadline";

const ContentPackage = () => {
  const ListPackage = [
    { data: "satu" },
    { data: "dua" },
    { data: "empat" },
    { data: "lima" },
    { data: "enam" },
  ];

  return (
    <div className="w-[980px] mx-auto border border-dark">
      <div className="grid grid-cols-3 gap-10">
        {/* Kiri: Headline ambil 2 kolom */}
        <div className="col-span-2">
          <CardPackageHeadline />
        </div>

        {/* Kanan: CardPackage pertama */}
        <div>
          <CardPackage data={ListPackage[0]} />
        </div>

        {/* Baris berikutnya: sisanya, dalam grid 3 kolom */}
        {ListPackage.slice(1).map((item, index) => (
          <div key={index}>
            <CardPackage data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPackage;
