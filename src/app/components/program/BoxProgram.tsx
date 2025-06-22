"use client";

import CardPackage from "../package/CardPackage";

const BoxProgram = () => {
  const ListPackage = [
    { data: "satu" },
    { data: "dua" },
    { data: "empat" },
    { data: "lima" },
    { data: "enam" },
    { data: "satu" },
    { data: "dua" },
    { data: "empat" },
    { data: "lima" },
    { data: "enam" },
    { data: "enam" },
  ];
  return (
    <>
      <div className="w-full h-[60px] bg-base"></div>
      <div className="w-full overflow-x-auto px-4 py-6 bg-base hide-scrollbar">
        <div className="flex gap-4 sm:gap-5 md:gap-6">
          {ListPackage.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[70%] xs:w-[50%] sm:w-[220px] md:w-[240px] lg:w-[300px] "
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
