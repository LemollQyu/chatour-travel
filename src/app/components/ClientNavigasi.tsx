"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import Logout from "./Logout";
import { useAutoLogout } from "../hooks/useAutoLogut";

type Props = {
  user: User | null;
};

export default function NavigasiClient({ user }: Props) {
  useAutoLogout(120000, !!user);

  return (
    <div className="w-full items-start py-2 flex px-5 h-[83px] bg-dark">
      <div className="w-full items-center flex justify-between">
        <Link
          href={"/"}
          className="cursor-pointer font-stopsn text-xl font-bold text-accentt"
        >
          CHATOUR
        </Link>

        <div className="flex gap-2">
          {!user ? (
            <>
              <Link
                href={"/login"}
                className="text-base px-3 py-1 font-stopsn hover:text-accentt"
              >
                Login
              </Link>
              <Link
                href={"/registrasi"}
                className="text-dark bg-base font-stopsn px-3 py-1 rounded-lg hover:bg-accentt"
              >
                Daftar
              </Link>
            </>
          ) : (
            <>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
