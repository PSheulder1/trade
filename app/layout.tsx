import type { Metadata } from "next";

import "./globals.css";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";





export const metadata: Metadata = {
  title: "X180",
  description: "X180",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        
        <Toaster/>
     
        {children}
      </body>
    </html>
  );
}
