"use client";
import { FiChevronRight } from "react-icons/fi";

const CardPackage = ({ data }: { data: { data: string } }) => {
  return (
    <div className="w-full aspect-[3/4] xs:aspect-[4/5] rounded-md bg-white shadow-sm flex justify-center items-center text-sm sm:text-[1rem] relative">
      {data.data}
      <button className="font-stopsn  flex gap-2 px-3 md:py-2 md:px-4 text-[1rem] md:text-lg py-1 border-2 rounded-md border-accentt hover:bg-accentt bg-transparent transition-all items-center justify-center absolute left-1/2 -translate-x-1/2 bottom-3">
        Explore <FiChevronRight />
      </button>
    </div>
  );
};
export default CardPackage;
