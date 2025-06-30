import type { Metadata } from "next";

import "./globals.css";

import NavigasiChatour from "./components/NavigasiChatour";

export const metadata: Metadata = {
  title: "Chator Travel",
  description: "Travel Umroh dan Haji",
  icons: {
    icon: "/icon/icon-chatour.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        {children} <NavigasiChatour />
      </body>
    </html>
  );
}
