import Banner from "./components/Banner";
import Navigasi from "./components/Navigasi";
import CardSearchPackage from "./components/SearchPackageCard";

export default function Home() {
  return (
    <>
      <Navigasi />

      <div className="bg-dark w-full">
        <div className="lg:hidden block w-full h-[380px]"></div>
        <div className="relative h-[275px] w-full lg:w-[922px] lg:h-[518px]  lg:mx-auto">
          <Banner />
          <CardSearchPackage />
        </div>
      </div>

      <div className="w-full h-[100px] bg-base">
        {/* <h1 className="font-norman text-3xl">Font Norman</h1>
        <h2 className="font-stopsn text-xl">Font StopSN</h2>
        <p className="font-custom ">Font CustomFont (Regular/SemiBold/Etc)</p> */}
      </div>
    </>
  );
}
