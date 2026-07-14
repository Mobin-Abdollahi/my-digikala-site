import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "My DigiKala Clone",
  description: "A portfolio ecommerce project built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-zinc-100 text-zinc-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
