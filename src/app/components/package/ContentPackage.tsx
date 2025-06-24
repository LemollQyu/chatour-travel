"use client";

import { useEffect, useState } from "react";
import CardPackage from "./CardPackage";
import CardPackageHeadline from "./CardPackageHeadline";

type PackageData = {
  title: string;
  image_package_url: string | null;
};

const ContentPackage = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages/limited");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  console.log("datanya ", packages);

  if (packages.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-[980px] mx-auto">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <CardPackageHeadline />
        </div>

        {/* Sisa 7 data */}
        {packages.map((item, index) => (
          <div key={index}>
            <CardPackage data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPackage;
