"use client";

import ProductGrid from "@/app/components/product/ProductGrid";
import { products } from "@/app/data/products";

export default function SupermarketPage() {
  const supermarketProducts = products.filter(
    (product) => product.category === "سوپرمارکت"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-8 rounded-3xl bg-gradient-to-l from-emerald-600 to-lime-500 p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">سوپرمارکت</h1>
        <p className="text-sm text-white/90">
          خرید سریع و آسان برای کالاهای روزمره.
        </p>
      </section>

      <ProductGrid
        products={supermarketProducts}
        emptyMessage="هنوز محصولی در دسته سوپرمارکت ثبت نشده است."
      />
    </main>
  );
}
