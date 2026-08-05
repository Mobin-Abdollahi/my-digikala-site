"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/app/data/products";
import ProductCard from "@/app/product/productCard";

function CategoriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    []
  );

  const currentCategory = searchParams.get("category") || "";

  const selectedCategory =
    currentCategory && categories.includes(currentCategory)
      ? currentCategory
      : "";

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-linear-to-br from-[#111111] via-[#171717] to-[#0d0d0d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1 text-sm text-rose-300">
              دسته‌بندی محصولات
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              همه دسته‌ها در یک نگاه
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              با انتخاب هر دسته، محصولات مرتبط را مشاهده کنید. این صفحه بر اساس
              داده‌های واقعی فروشگاه به‌صورت پویا ساخته شده است.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/categories")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                !selectedCategory
                  ? "bg-rose-500 text-white"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              همه
            </button>

            {categories.map((category) => {
              const active = category === selectedCategory;

              return (
                <button
                  key={category}
                  onClick={() =>
                    router.push(`/categories?category=${encodeURIComponent(category)}`)
                  }
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-rose-500 text-white"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
            محصولی برای این دسته وجود ندارد.
          </div>
        )}
      </section>
    </main>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f]" />}>
      <CategoriesContent />
    </Suspense>
  );
}
