"use client";

import { useMemo } from "react";
import { ShoppingBasket, Zap, Leaf } from "lucide-react";
import ProductGrid from "@/app/components/product/ProductGrid";
import ProductCard from "@/app/product/productCard";
import { products } from "@/app/data/products";
import type { Product } from "@/app/types/product";

type CategoryShortcut = {
  key: "drinks" | "dairy" | "snacks" | "essential";
  label: string;
  sectionId: string;
  emoji?: string;
  imageSrc?: string;
};

const shortcuts: CategoryShortcut[] = [
  { key: "essential", label: "کالاهای اساسی", sectionId: "section-essential", emoji: "🧺" },
  { key: "drinks", label: "نوشیدنی", sectionId: "section-drinks", emoji: "🥤" },
  { key: "dairy", label: "لبنیات", sectionId: "section-dairy", emoji: "🥛" },
  { key: "snacks", label: "تنقلات", sectionId: "section-snacks", emoji: "🍪" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function byRatingDesc(a: Product, b: Product) {
  return (b.rating ?? 0) - (a.rating ?? 0);
}

export default function SupermarketPage() {
  // فیلتر کردن کالاهای سوپرمارکتی بر اساس دسته فارسی ثبت‌شده در دیتابیس پروژه شما
  const supermarketProducts = useMemo(
    () => products.filter((p) => p.category === "سوپرمارکت"),
    []
  );

  const bestSellers = useMemo(() => {
    const tagged = supermarketProducts.filter((p) => p.tags?.includes("bestSeller"));
    const list = tagged.length ? tagged : [...supermarketProducts].sort(byRatingDesc);
    return list.slice(0, 10);
  }, [supermarketProducts]);

  const newProducts = useMemo(() => {
    const tagged = supermarketProducts.filter((p) => p.tags?.includes("new"));
    const list = tagged.length ? tagged : [...supermarketProducts].reverse();
    return list.slice(0, 10);
  }, [supermarketProducts]);

  const drinks = useMemo(
    () => supermarketProducts.filter((p) => p.subcategory === "نوشیدنی"),
    [supermarketProducts]
  );
  const dairy = useMemo(
    () => supermarketProducts.filter((p) => p.subcategory === "لبنیات"),
    [supermarketProducts]
  );
  const snacks = useMemo(
    () => supermarketProducts.filter((p) => p.subcategory === "تنقلات"),
    [supermarketProducts]
  );
  const essential = useMemo(
    () => supermarketProducts.filter((p) => p.subcategory === "کالاهای اساسی"),
    [supermarketProducts]
  );

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Hero Section مدرن، تیره و شیک با تم سبز زمردی */}
      <section className="relative overflow-hidden bg-[#121416] py-16 text-white md:py-24">
        {/* المان‌های نوری گرادینت پس‌زمینه */}
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-green-400/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-right">
          {/* Badge بالایی */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-400">
            <Leaf size={16} className="animate-pulse" />
            خرید آسان و سریع کالاهای مصرفی
          </div>

          {/* عنوان اصلی */}
          <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
            سوپرمارکت
            <span className="mx-3 text-emerald-400 underline decoration-white/10 underline-offset-8">
              آنلاین دیجی‌کالا
            </span>
          </h1>

          {/* توضیح */}
          <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-300">
            هر آنچه برای خانه نیاز دارید؛ از مواد غذایی تازه تا لوازم بهداشتی و شوینده، با ارسال فوق‌سریع و تخفیف‌های ویژه روزانه درب منزل شما.
          </p>

          {/* کارت‌های مزایا شیشه‌ای (Glassmorphism) */}
          <div className="flex flex-wrap justify-end gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Zap className="text-yellow-400" size={32} />
              <div className="text-right">
                <div className="text-sm font-bold text-white">ارسال جت</div>
                <div className="text-xs text-gray-400">تحویل در سریع‌ترین زمان</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <ShoppingBasket className="text-emerald-400" size={32} />
              <div className="text-right">
                <div className="text-sm font-bold text-white">تنوع بی‌نظیر</div>
                <div className="text-xs text-gray-400">بیش از ۱۰ هزار کالا</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش میانبرهای دسته‌بندی (کارت‌های کلیک‌شدنی برای اسکرول) */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-center text-lg font-black text-zinc-800">
          خرید بر اساس دسته‌بندی
        </h2>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => scrollToSection(s.sectionId)}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-zinc-50 ring-1 ring-zinc-100 group-hover:bg-emerald-50 transition-colors">
                {s.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.imageSrc}
                    alt={s.label}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                <span className="text-2xl" aria-hidden="true">
                  {s.emoji ?? "🛒"}
                </span>
              </div>

              <div className="mt-2 text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">{s.label}</div>
              <div className="mt-1 text-[11px] text-zinc-400 group-hover:text-zinc-500">
                مشاهده محصولات
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-16">
        {/* پرفروش‌ترین‌ها */}
        <section>
          <div className="mb-6 flex items-center justify-between border-b pb-3">
            <h2 className="text-xl font-black text-zinc-800">پرفروش‌ترین کالاها</h2>
          </div>

          {bestSellers.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 text-center">
              هنوز محصولی برای نمایش پرفروش‌ترین‌ها نداریم.
            </div>
          )}
        </section>

        {/* محصولات جدید */}
        <section>
          <div className="mb-6 flex items-center justify-between border-b pb-3">
            <h2 className="text-xl font-black text-zinc-800">محصولات جدید</h2>
          </div>

          {newProducts.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {newProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 text-center">
              هنوز محصولی برای نمایش محصولات جدید نداریم.
            </div>
          )}
        </section>

        {/* گروه‌های تفکیک‌شده کالاها با لنگرهای اسکرول */}
        <section id="section-drinks" className="scroll-mt-24">
          <div className="mb-6 border-b pb-3">
            <h2 className="text-xl font-black text-zinc-800">نوشیدنی</h2>
          </div>
          <ProductGrid products={drinks} emptyMessage="محصولی در دسته نوشیدنی نداریم." />
        </section>

        <section id="section-dairy" className="scroll-mt-24">
          <div className="mb-6 border-b pb-3">
            <h2 className="text-xl font-black text-zinc-800">لبنیات</h2>
          </div>
          <ProductGrid products={dairy} emptyMessage="محصولی در دسته لبنیات نداریم." />
        </section>

        <section id="section-snacks" className="scroll-mt-24">
          <div className="mb-6 border-b pb-3">
            <h2 className="text-xl font-black text-zinc-800">تنقلات</h2>
          </div>
          <ProductGrid products={snacks} emptyMessage="محصولی در دسته تنقلات نداریم." />
        </section>

        <section id="section-essential" className="scroll-mt-24">
          <div className="mb-6 border-b pb-3">
            <h2 className="text-xl font-black text-zinc-800">کالاهای اساسی</h2>
          </div>
          <ProductGrid products={essential} emptyMessage="محصولی در دسته کالاهای اساسی نداریم." />
        </section>
      </div>
    </div>
  );
}
