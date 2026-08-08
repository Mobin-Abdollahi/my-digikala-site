"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Sparkles,
  ShoppingBasket,
  Coins,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/app/store/auth-context";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const profileHref = isLoggedIn ? "/profile" : "/login";

  const navItems = [
    {
      label: "دسته‌بندی",
      href: "/categories",
      icon: LayoutGrid,
      active: pathname === "/categories",
    },
    {
      label: "شگفت‌انگیزها",
      href: "/amazing-offers",
      icon: Sparkles,
      active: pathname === "/amazing-offers",
    },
    {
      label: "سوپرمارکت",
      href: "/supermarket",
      icon: ShoppingBasket,
      active: pathname === "/supermarket",
    },
    {
      label: "طلا",
      href: "/gold",
      icon: Coins,
      active: pathname === "/gold",
    },
    {
      label: "پروفایل",
      href: profileHref,
      icon: UserRound,
      active: pathname.startsWith("/profile") || pathname === "/login",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.06)] md:hidden">
      <div className="grid grid-cols-5 px-1 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors ${
                item.active ? "text-[#e11d48]" : "text-gray-600"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${
                  item.active ? "text-[#e11d48]" : "text-gray-600"
                }`}
              />
              <span className="truncate leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
