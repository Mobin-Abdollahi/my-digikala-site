import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./store/cart-context";
import { Toaster } from 'react-hot-toast';
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
          <Navbar />
          <Toaster position="bottom-left" reverseOrder={false} />
          {children}
          <Footer />
        </CartProvider>
         </AuthProvider>
      </body>
    </html>
  );
}
