import Navigasi from "../components/Navigasi";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FaHotel } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { FiMapPin, FiMessageCircle } from "react-icons/fi";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div>
      <Navigasi />
      <div className="w-full h-16 bg-white flex items-center border-b-2 border-base justify-between pr-4">
        <div className="md:w-20 w-12 h-full border-base flex items-center justify-center  border-r-2">
          <Link
            href={"/dashboard"}
            className="transition-all w-8 h-8 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
          >
            <HiMenu className="text-secondary text-xs md:text-lg" />
          </Link>
        </div>
        <div>
          <h1 className="font-custom font-normal">
            Hello, {user && user?.identities?.[0]?.identity_data?.username}
          </h1>
        </div>
      </div>
      <div className="flex w-full h-screen">
        <div className="flex">
          <div className="bg-white border-r-2  border-base md:w-20 w-12">
            <div className="w-full flex items-center justify-center h-16 ">
              <Link
                href={"/dashboard/programs"}
                className="transition-all w-8 h-8 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
              >
                <FaSuitcase className="text-secondary text-xs md:text-lg" />
              </Link>
            </div>
            <div className="w-full flex items-center justify-center h-16 ">
              <Link
                href={"/dashboard/hotels"}
                className="transition-all w-8 h-8 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
              >
                <FaHotel className="text-secondary text-xs md:text-lg" />
              </Link>
            </div>
            <div className="w-full flex items-center justify-center h-16 ">
              <Link
                href={"/dashboard/pesawat"}
                className="transition-all w-8 h-8 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
              >
                <FaPlane className="text-secondary text-xs md:text-lg" />
              </Link>
            </div>
            <div className="w-full flex items-center justify-center h-16 ">
              <Link
                href={"/dashboard/lokasi"}
                className="transition-all w-8 h-8 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
              >
                <FiMapPin className="text-secondary text-xs md:text-lg" />
              </Link>
            </div>
            <div className="w-full flex items-center justify-center h-16">
              <Link
                href={"/dashboard/pesan"}
                className="transition-all w-8 h-8 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
              >
                <FiMessageCircle className="text-secondary text-xs md:text-lg" />
              </Link>
            </div>
          </div>
        </div>
        <main className="bg-primary h-full w-full">{children}</main>
      </div>
    </div>
  );
}
