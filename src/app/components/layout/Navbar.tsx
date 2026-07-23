/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import { useCart } from "../../store/cart-context";
import { isAdminPhone } from "../../utils/auth";


export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const isAdmin = isAdminPhone(user?.phone);


  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = searchValue.trim();

    if (trimmedValue) {
      router.push(`/?search=${encodeURIComponent(trimmedValue)}`);
      return;
    }

    router.push("/");
  };

  const handleClearSearch = () => {
    setSearchValue("");
    router.push("/");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Link href="/" className="text-2xl font-black text-red-500">
              DIGIKALA
            </Link>

            <form
              onSubmit={handleSearchSubmit}
              className="hidden max-w-md flex-1 md:block"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="جستجو در دیجی‌کالا..."
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 pl-10 text-sm outline-none focus:ring-1 focus:ring-red-400"
                />

                {searchValue ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
             {isLoggedIn && (
        <div className="flex items-center gap-3">
          <Link href="/profile">پروفایل</Link>

          {isAdmin && (
            <Link href="/admin/orders">پنل ادمین</Link>
          )}

          <button onClick={handleLogout}>خروج</button>
        </div>
      )}

            <span className="h-6 w-px bg-gray-200"></span>

            <Link href="/cart" className="relative p-2">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        <div className="hidden h-10 items-center gap-6 text-sm text-gray-600 md:flex">
          <span className="cursor-pointer transition-colors hover:text-red-500">
            دسته بندی کالاها
          </span>
          <span className="cursor-pointer transition-colors hover:text-red-500">
            شگفت‌انگیزها
          </span>
          <span className="cursor-pointer transition-colors hover:text-red-500">
            سوپرمارکت
          </span>
          <span className="cursor-pointer transition-colors hover:text-red-500">
            تخفیف‌ها و پیشنهادها
          </span>
        </div>
      </div>
    </nav>
  );
}
