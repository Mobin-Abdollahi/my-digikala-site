/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCart } from "../../store/cart-context";
import { useAuth } from "../../store/auth-context";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // خواندن مقدار جستجوی فعلی از URL جهت همگام‌سازی
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  // همگام‌سازی فیلد جستجو با تغییرات URL
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  // مدیریت رویداد جستجو هنگام فشردن کلید Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-4">
        {/* ردیف بالا */}
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Link href="/" className="text-2xl font-black text-red-500">
              DIGIKALA
            </Link>
            
            {/* فرم جستجو */}
            <form onSubmit={handleSearchSubmit} className="hidden flex-1 md:block max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="جستجو در دیجی‌کالا..."
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 pl-10 text-sm outline-none focus:ring-1 focus:ring-red-400"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchValue("");
                      router.push("/");
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            {/* بخش احراز هویت */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-700">
                  سلام، {user?.name || "کاربر"}
                </span>
                <button 
                  onClick={logout}
                  className="text-xs text-red-500 hover:underline"
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                <span>ورود | ثبت‌نام</span>
              </Link>
            )}

            <span className="h-6 w-px bg-gray-200"></span>

            {/* لینک سبد خرید */}
            <Link href="/cart" className="relative p-2">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ردیف پایین: دسته‌بندی‌ها */}
        <div className="hidden h-10 items-center gap-6 text-sm text-gray-600 md:flex">
          <span className="cursor-pointer hover:text-red-500 transition-colors">دسته بندی کالاها</span>
          <span className="cursor-pointer hover:text-red-500 transition-colors">شگفت‌انگیزها</span>
          <span className="cursor-pointer hover:text-red-500 transition-colors">سوپرمارکت</span>
          <span className="cursor-pointer hover:text-red-500 transition-colors">تخفیف‌ها و پیشنهادها</span>
        </div>
      </div>
    </nav>
  );
}
