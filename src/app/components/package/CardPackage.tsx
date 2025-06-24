"use client";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";

const CardPackage = ({
  data,
}: {
  data: { title: string; image_package_url: string | null };
}) => {
  return (
    <div className="w-full aspect-[3/4] xs:aspect-[4/5] flex-col rounded-md  flex pb-6 gap-2 items-center text-sm sm:text-[1rem] relative">
      <div className="w-[90%] h-[70%] overflow-hidden rounded-md  border-dark border ">
        {data.image_package_url ? (
          <Image
            src={data.image_package_url}
            width={280}
            height={400}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </div>
      <h2 className="font-stopsn lg:text-xl md:text-[1rem] sm:text-[1rem] text-xs  tracking-wider text-center">
        {data.title}
      </h2>
      <button className="font-stopsn flex gap-2 px-3 md:py-2 md:px-4 text-lg py-1 border-2 rounded-md border-dark hover:bg-accentt bg-transparent transition-all items-center justify-center absolute left-1/2 -translate-x-1/2 bottom-3">
        Explore <FiChevronRight />
      </button>
    </div>
  );
};
export default CardPackage;
