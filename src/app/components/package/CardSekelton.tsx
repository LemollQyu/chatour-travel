const CardPackageSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-base p-4 space-y-4 h-[320px]">
      <div className="w-full h-40 bg-base rounded-lg" />
      <div className="h-4 bg-accent rounded w-3/4" />
      <div className="h-4 bg-accent rounded w-1/2" />
    </div>
  );
};

export default CardPackageSkeleton;
