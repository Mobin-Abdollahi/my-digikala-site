/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import { useCart } from "../../store/cart-context";
import { isAdminPhone } from "../../utils/auth";

const categoryItems = [
  { label: "موبایل", category: "موبایل" },
  { label: "لپ‌تاپ", category: "لپ‌تاپ" },
  { label: "لوازم جانبی", category: "لوازم جانبی" },
  { label: "ساعت هوشمند", category: "ساعت هوشمند" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";

  const [searchValue, setSearchValue] = useState(currentSearch);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const isAdmin = isAdminPhone(user?.phone);

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
        {/* ردیف اصلی */}
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Link href="/" className="text-2xl font-black text-red-500">
              DIGIKALA
            </Link>

            {/* نوار جستجو - در موبایل کوچک‌تر و بهینه‌تر نمایش داده می‌شود */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="جستجو در دیجی‌کالا..."
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 pl-10 text-xs md:text-sm outline-none focus:ring-1 focus:ring-red-400"
                />

                {searchValue ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="پاک کردن جستجو"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    ✕
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          {/* در دسکتاپ دکمه‌های حساب کاربری و سبد خرید نمایش داده می‌شود */}
          <div className="hidden md:flex items-center gap-4">
            {!mounted ? (
              <div
                className="h-6 w-28 animate-pulse rounded-md bg-gray-200"
                aria-label="در حال بارگذاری وضعیت حساب"
              />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-red-500"
                >
                  پروفایل
                </Link>

                {isAdmin ? (
                  <div className="flex items-center gap-2 border-r border-gray-200 pr-3 mr-1">
                    <Link
                      href="/admin/products"
                      className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
                    >
                      مدیریت محصولات
                    </Link>
                    <Link
                      href="/admin/orders"
                      className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
                    >
                      سفارش‌ها
                    </Link>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-red-500"
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-red-500"
              >
                ورود | ثبت‌نام
              </Link>
            )}

            <span className="h-6 w-px bg-gray-200" />

            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative p-2"
            >
              <span className="text-2xl">🛒</span>
              {mounted && totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          </div>

          {/* در موبایل فقط نشانگر ساده‌ی ورود/پروفایل ادمین در هدر بالا باقی می‌ماند */}
          {mounted && isLoggedIn && isAdmin && (
            <div className="md:hidden flex items-center gap-2">
              <Link
                href="/admin/orders"
                className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600"
              >
                پنل ادمین
              </Link>
            </div>
          )}
        </div>

        {/* نوار دسته‌بندی‌ها (مخصوص دسکتاپ) */}
        <div className="hidden h-10 items-center gap-6 text-sm text-gray-600 md:flex">
          <div className="group relative">
            <Link
              href="/categories"
              className={`flex items-center gap-1 transition-colors hover:text-red-500 ${
                pathname === "/categories" ? "font-medium text-red-500" : ""
              }`}
            >
              دسته‌بندی کالاها
              <span className="text-xs">⌄</span>
            </Link>

            <div className="invisible absolute right-0 top-full z-50 mt-2 w-190 rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">کالای دیجیتال</h4>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/categories?category=موبایل"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/categories" && currentCategory === "موبایل"
                          ? "font-medium text-red-500"
                          : ""
                      }`}
                    >
                      موبایل
                    </Link>
                    <Link
                      href="/categories?category=لپ‌تاپ"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/categories" && currentCategory === "لپ‌تاپ"
                          ? "font-medium text-red-500"
                          : ""
                      }`}
                    >
                      لپ‌تاپ
                    </Link>
                    <Link
                      href="/categories?category=ساعت هوشمند"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/categories" && currentCategory === "ساعت هوشمند"
                          ? "font-medium text-red-500"
                          : ""
                      }`}
                    >
                      ساعت هوشمند
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">لوازم جانبی</h4>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/categories?category=لوازم جانبی"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/categories" && currentCategory === "لوازم جانبی"
                          ? "font-medium text-red-500"
                          : ""
                      }`}
                    >
                      لوازم جانبی
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">دسترسی سریع</h4>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/categories"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/categories" && !currentCategory
                          ? "font-medium text-red-500"
                          : ""
                      }`}
                    >
                      همه محصولات
                    </Link>
                    <Link href="/amazing-offers" className="transition-colors hover:text-red-500">
                      شگفت‌انگیزها
                    </Link>
                    <Link href="/offers" className="transition-colors hover:text-red-500">
                      تخفیف‌ها و پیشنهادها
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">محبوب</h4>
                  <div className="flex flex-col gap-2">
                    {categoryItems.map((item) => (
                      <Link
                        key={item.category}
                        href={`/categories?category=${encodeURIComponent(item.category)}`}
                        className={`transition-colors hover:text-red-500 ${
                          pathname === "/categories" && currentCategory === item.category
                            ? "font-medium text-red-500"
                            : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/gold"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/gold" ? "font-medium text-red-500" : ""
                      }`}
                    >
                      طلا و نقره دیجیتال
                    </Link>
                    <Link
                      href="/supermarket"
                      className={`transition-colors hover:text-red-500 ${
                        pathname === "/supermarket" ? "font-medium text-red-500" : ""
                      }`}
                    >
                      سوپرمارکت
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/amazing-offers"
            className={
              pathname === "/amazing-offers"
                ? "font-medium text-red-500"
                : "transition-colors hover:text-red-500"
            }
          >
            شگفت‌انگیزها
          </Link>

          <Link
            href="/supermarket"
            className={
              pathname === "/supermarket"
                ? "font-medium text-red-500"
                : "transition-colors hover:text-red-500"
            }
          >
            سوپرمارکت
          </Link>

          <Link
            href="/offers"
            className={
              pathname === "/offers"
                ? "font-medium text-red-500"
                : "transition-colors hover:text-red-500"
            }
          >
            تخفیف‌ها و پیشنهادها
          </Link>

          <Link
            href="/gold"
            className={`flex items-center gap-2 transition-colors hover:text-red-500 ${
              pathname === "/gold" ? "font-medium text-red-500" : ""
            }`}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
            طلا و نقره دیجیتال
          </Link>
        </div>
      </div>
    </nav>
  );
}
