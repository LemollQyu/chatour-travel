"use client";
import Image from "next/image";

type CardGalleryProps = {
  srcImg: string;
  alt?: string;
};

const CardGallery = ({ srcImg, alt = "Photo gallery" }: CardGalleryProps) => {
  return (
    <div className="w-[315px] h-[205px] md:h-[260px] border overflow-hidden relative rounded-md group">
      <Image
        src={srcImg}
        alt={alt}
        fill
        className="object-cover transition-all duration-500 saturate-50 group-hover:saturate-100"
      />
      <div className="absolute inset-0 hover:bg-[#edbe9f]/75 bg-[#edbe9f]/50 mix-blend-multiply pointer-events-none z-10" />
    </div>
  );
};

export default CardGallery;
