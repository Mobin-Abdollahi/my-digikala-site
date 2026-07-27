"use client";

import ProductGrid from "@/app/components/product/ProductGrid";
import { products } from "@/app/data/products";

export default function AmazingOffersPage() {
  const discountedProducts = products.filter(
    (product) => (product.discount ?? 0) > 0
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-8 rounded-3xl bg-linear-to-l from-rose-600 to-orange-500 p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">شگفت‌انگیزها</h1>
        <p className="text-sm text-white/90">
          محصولاتی با تخفیف ویژه و زمان محدود.
        </p>
      </section>

      <ProductGrid
        products={discountedProducts}
        emptyMessage="فعلاً محصول تخفیف‌دار فعالی وجود ندارد."
      />
    </main>
  );
}
