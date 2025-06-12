"use client";

import { useAutoLogout } from "@/app/hooks/useAutoLogut";

export default function DashboardAutoLogoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoLogout(60000); // panggil hook di client component

  return <>{children}</>;
}
