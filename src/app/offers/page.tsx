"use client";

import ProductGrid from "@/app/components/product/ProductGrid";
import { products } from "@/app/data/products";

export default function OffersPage() {
  const sortedProducts = [...products]
    .filter((product) => (product.discount ?? 0) > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-8 rounded-3xl bg-linear-to-l from-slate-900 to-slate-700 p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">تخفیف‌ها و پیشنهادها</h1>
        <p className="text-sm text-white/90">
          بهترین پیشنهادهای فعلی را یک‌جا ببینید.
        </p>
      </section>

      <ProductGrid
        products={sortedProducts}
        emptyMessage="فعلاً پیشنهادی برای نمایش وجود ندارد."
      />
    </main>
  );
}
