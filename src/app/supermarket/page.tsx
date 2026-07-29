"use client";

import { useMemo } from "react";
import ProductGrid from "@/app/components/product/ProductGrid";
import ProductCard from "@/app/product/productCard";
import { products } from "@/app/data/products";
import type { Product } from "@/app/types/product";

type CategoryShortcut = {
  key: "drinks" | "dairy" | "snacks" | "essential";
  label: string;
  sectionId: string;
  emoji?: string;
  imageSrc?: string; // برای لبنیات یا هر دسته‌ای که خواستی
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
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Hero */}
      <section className="mb-6 rounded-3xl bg-linear-to-l from-emerald-600 to-lime-500 p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">سوپرمارکت</h1>
        <p className="text-sm text-white/90">خرید سریع و آسان برای کالاهای روزمره.</p>
      </section>

      {/* خرید بر اساس دسته‌بندی (همون استایل کارت‌مانند) */}
      <section className="mb-10">
        <h2 className="mb-4 text-center text-base font-bold text-zinc-800">
          خرید بر اساس دسته‌بندی
        </h2>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => scrollToSection(s.sectionId)}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-zinc-50 ring-1 ring-zinc-100">
                {s.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.imageSrc}
                    alt={s.label}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // اگر تصویر موجود نبود، تصویر را پنهان می‌کنیم تا emoji بیاید (fallback ساده)
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}

                {/* fallback emoji (اگر image نبود یا لود نشد) */}
                <span
                  className="text-2xl"
                  aria-hidden="true"
                  // اگر imageSrc داریم ولی نمایش داده نشد، این همچنان دیده می‌شود
                >
                  {s.emoji ?? "🛒"}
                </span>
              </div>

              <div className="mt-2 text-sm font-medium text-zinc-800">{s.label}</div>
              <div className="mt-1 text-[11px] text-zinc-500 group-hover:text-zinc-600">
                مشاهده محصولات
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-800">پرفروش‌ترین کالاها</h2>
        </div>

        {bestSellers.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
            هنوز محصولی برای نمایش پرفروش‌ترین‌ها نداریم.
          </div>
        )}
      </section>

      {/* New products */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-800">محصولات جدید</h2>
        </div>

        {newProducts.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
            هنوز محصولی برای نمایش محصولات جدید نداریم.
          </div>
        )}
      </section>

      {/* Category Sections */}
      <section id="section-drinks" className="scroll-mt-24">
        <h2 className="mb-4 text-lg font-bold text-zinc-800">نوشیدنی</h2>
        <ProductGrid products={drinks} emptyMessage="محصولی در دسته نوشیدنی نداریم." />
      </section>

      <section id="section-dairy" className="mt-12 scroll-mt-24">
        <h2 className="mb-4 text-lg font-bold text-zinc-800">لبنیات</h2>
        <ProductGrid products={dairy} emptyMessage="محصولی در دسته لبنیات نداریم." />
      </section>

      <section id="section-snacks" className="mt-12 scroll-mt-24">
        <h2 className="mb-4 text-lg font-bold text-zinc-800">تنقلات</h2>
        <ProductGrid products={snacks} emptyMessage="محصولی در دسته تنقلات نداریم." />
      </section>

      <section id="section-essential" className="mt-12 scroll-mt-24">
        <h2 className="mb-4 text-lg font-bold text-zinc-800">کالاهای اساسی</h2>
        <ProductGrid products={essential} emptyMessage="محصولی در دسته کالاهای اساسی نداریم." />
      </section>
    </main>
  );
}
