import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./Provider";
import { Inter } from "next/font/google";

//const geistSans = localFont({
//  src: "./fonts/GeistVF.woff",
//  variable: "--font-geist-sans",
//  weight: "100 900",
//});
//const geistMono = localFont({
//  src: "./fonts/GeistMonoVF.woff",
//  variable: "--font-geist-mono",
//  weight: "100 900",
//});

const poppins = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Add weights you need
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
