"use client";
import dynamic from "next/dynamic";

const LayananClient = dynamic(() => import("./LayananClient"), {
  ssr: false,
});

export default function LayananPage() {
  return <LayananClient />;
}
