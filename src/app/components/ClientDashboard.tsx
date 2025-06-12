"use client";

import { User } from "@supabase/supabase-js"; // pastikan import ini

type Props = {
  user: User | null;
};

export default function ClientDashboard({ user }: Props) {
  return (
    <div className=" w-full  ">
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          <p>nama: {user?.identities?.[0]?.identity_data?.username}</p>
        </>
      ) : (
        <p>User tidak ditemukan.</p>
      )}
    </div>
  );
}
