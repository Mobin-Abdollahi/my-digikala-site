"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/app/components/product/ProductGrid";
import { products } from "@/app/data/products";

export default function CategoriesPage() {
  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-8 rounded-3xl bg-linear-to-l from-red-500 to-pink-500 p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">دسته بندی کالاها</h1>
        <p className="text-sm text-white/90">
          محصولات را بر اساس دسته بندی بررسی و انتخاب کنید.
        </p>
      </section>

      <section className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => {
          const active = category === selectedCategory;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-red-500 hover:text-red-500"
              }`}
            >
              {category}
            </button>
          );
        })}
      </section>

      <ProductGrid
        products={filteredProducts}
        emptyMessage="برای این دسته بندی محصولی ثبت نشده است."
      />
    </main>
  );
}
