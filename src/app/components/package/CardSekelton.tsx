"use client";
export default function CardSkeleton() {
  return (
    <div className="w-full md:w-[48%] lg:w-[30%] max-w-[340px] aspect-[1/1.2] mx-auto rounded-xl p-4 bg-base animate-pulse shadow-md">
      <div className="h-[180px] bg-accent rounded-md mb-4" />
      <div className="h-4 bg-accent rounded w-3/4 mb-2" />
      <div className="h-4 bg-accent rounded w-1/2 mb-2" />
      <div className="h-4 bg-accent rounded w-full mb-2" />
      <div className="h-4 bg-accent rounded w-2/3" />
    </div>
  );
}
