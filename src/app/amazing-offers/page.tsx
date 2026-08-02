"use client";

import { useMemo } from "react";
import { Sparkles, Flame, Percent } from "lucide-react";
import ProductGrid from "@/app/components/product/ProductGrid";
import { products } from "@/app/data/products";

export default function AmazingOffersPage() {
  // فیلتر کردن بهینه محصولات دارای تخفیف واقعی بر اساس داده‌های پروژه
  const discountedProducts = useMemo(
    () => products.filter((product) => (product.discount ?? 0) > 0),
    []
  );

  return (
    <main className="min-h-screen bg-slate-50/40" dir="rtl">
      {/* هیرو تیره شیک با نورهای محو شده رنگی */}
      <section className="relative overflow-hidden bg-[#15181c] py-16 text-white md:py-24">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-right">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-sm text-rose-400">
            <Flame size={16} className="animate-pulse" />
            فرصت‌های محدود و هیجان‌انگیز امروز
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
            شگفت
            <span className="mx-3 text-rose-500 underline decoration-white/10 underline-offset-8">
              انگیزها
            </span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-300">
            محصولاتی با تخفیف ویژه و زمان محدود را همین حالا ببینید و از پیشنهادهای جذاب امروز جا نمانید.
          </p>

          {/* کارت‌های شیشه‌ای اطلاعاتی */}
          <div className="flex flex-wrap justify-end gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Percent className="text-rose-400" size={32} />
              <div className="text-right">
                <div className="text-sm font-bold text-white">تخفیف‌های واقعی</div>
                <div className="text-xs text-gray-400">فقط کالاهای دارای تخفیف فعال</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Sparkles className="text-yellow-400" size={32} />
              <div className="text-right">
                <div className="text-sm font-bold text-white">پیشنهادهای منتخب</div>
                <div className="text-xs text-gray-400">محصولات ویژه با قیمت بهتر</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش نمایش محصولات */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-3">
          <h2 className="text-xl font-black text-zinc-800">محصولات شگفت‌انگیز</h2>
        </div>

        <ProductGrid
          products={discountedProducts}
          emptyMessage="فعلاً محصول تخفیف‌دار فعالی وجود ندارد."
        />
      </section>
    </main>
  );
}
