// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const poppins = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "UrbanNest",
  description: "This is a Real Estate Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}