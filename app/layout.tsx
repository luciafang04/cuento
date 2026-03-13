import type { Metadata } from "next";
import { Archivo_Black, Indie_Flower } from "next/font/google";
import "./globals.css";

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  weight: "400",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El patito feo",
  description: "Crafted with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${indieFlower.variable} ${archivoBlack.variable} ${indieFlower.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
