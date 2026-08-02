"use client";

import React from "react";
import { Sparkles, Percent, Flame } from "lucide-react";
import ProductGrid from "@/app/components/product/ProductGrid";
import { products } from "@/app/data/products";

export default function OffersPage() {
  // حفظ منطق فیلتر و مرتب‌سازی دقیق شما بر اساس درصد تخفیف (discount)
  const offerProducts = [...products]
    .filter((product) => (product.discount ?? 0) > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section مدرن و تیره مشابه صفحه طلا */}
      <section className="relative overflow-hidden bg-[#1a1c1e] py-16 text-white md:py-24">
        {/* المان‌های نوری گرادینت پس‌زمینه */}
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-right">
          {/* Badge بالایی */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-red-400">
            <Flame size={18} className="animate-pulse" />
            داغ‌ترین پیشنهادهای امروز
          </div>

          {/* عنوان اصلی */}
          <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
            تخفیف‌ها و
            <span className="mx-3 text-red-500 underline decoration-white/20 underline-offset-8">
              پیشنهادهای ویژه
            </span>
          </h1>

          {/* توضیح */}
          <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-300">
            بهترین فرصت برای خرید هوشمندانه! مجموعه‌ای از محبوب‌ترین کالاها با
            تخفیف‌های استثنایی و محدود، فقط برای شما.
          </p>

          {/* کارت‌های مزایا شیشه‌ای (Glassmorphism) */}
          <div className="flex flex-wrap justify-end gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Percent className="text-red-500" size={32} />
              <div className="text-right">
                <div className="text-sm font-bold text-white">تخفیف‌های ویژه</div>
                <div className="text-xs text-gray-400">روی محبوب‌ترین کالاها</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Sparkles className="text-yellow-400" size={32} />
              <div className="text-right">
                <div className="text-sm font-bold text-white">ضمانت اصالت</div>
                <div className="text-xs text-gray-400">۱۰۰٪ کالای اصلی با گارانتی</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش نمایش محصولات */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-black text-gray-800">همه پیشنهادهای ویژه</h2>
          <span className="text-sm text-gray-500">
            {offerProducts.length} کالا پیدا شد
          </span>
        </div>

        <ProductGrid 
          products={offerProducts} 
          emptyMessage="فعلاً پیشنهادی برای نمایش وجود ندارد."
        />
      </div>
    </div>
  );
}
