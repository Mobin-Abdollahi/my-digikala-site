import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNavigation from "./components/layout/BottomNavigation";
import { CartProvider } from "./store/cart-context";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./store/auth-context";

export const metadata: Metadata = {
  title: "My DigiKala Clone",
  description: "Digikala clone project with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div className="h-16 bg-[#121212]" />}>
              <Navbar />
            </Suspense>

            <Toaster position="bottom-left" reverseOrder={false} />

            <main className="pb-16 md:pb-0">{children}</main>

            <BottomNavigation />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
