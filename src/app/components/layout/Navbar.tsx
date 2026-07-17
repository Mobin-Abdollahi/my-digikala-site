"use client";

import { useCart } from "../../store/cart-context";
import Link from "next/link";


export default function Navbar() {
  // ما قبلاً totalItems را در Context حساب کردیم، پس فقط همان را می‌گیریم
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* بخش لوگو */}
        <div className="flex items-center gap-3">
          <div className="text-xl font-extrabold text-red-600">DIGI</div>
        </div>

        {/* بخش جستجو */}
        <div className="hidden flex-1 px-6 md:block">
          <input
            type="text"
            placeholder="جستجوی کالا"
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 text-sm outline-none transition focus:border-red-500"
          />
        </div>

        {/* بخش دکمه‌ها */}
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
            ورود | ثبت نام
          </button>

          <Link href="/cart">
            <button className="relative flex items-center gap-2 rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors">
              <span>سبد خرید</span>
              {totalItems > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>

      {/* منوی دسته‌بندی */}
      <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 py-3 text-sm text-zinc-600 md:flex">
        <span className="cursor-pointer hover:text-red-600">سوپرمارکت</span>
        <span className="cursor-pointer hover:text-red-600">موبایل</span>
        <span className="cursor-pointer hover:text-red-600">کالای دیجیتال</span>
        <span className="cursor-pointer hover:text-red-600">لوازم خانگی</span>
        <span className="cursor-pointer hover:text-red-600">مد و پوشاک</span>
        <span className="cursor-pointer hover:text-red-600">کتاب و لوازم تحریر</span>
      </div>
    </header>
  );
}
