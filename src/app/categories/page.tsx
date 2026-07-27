"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/app/data/products";
import ProductCard from "@/app/product/productCard";

export default function CategoriesPage() {
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

  const handleCategoryChange = (category: string) => {
    if (!category) {
      router.push("/categories");
      return;
    }

    router.push(`/categories?category=${encodeURIComponent(category)}`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8" dir="rtl">
      <section className="mb-8 rounded-3xl bg-linear-to-l from-red-500 to-pink-500 p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">دسته‌بندی کالاها</h1>
        <p className="text-sm text-white/90">
          محصولات را بر اساس دسته‌بندی بررسی و انتخاب کنید.
        </p>
      </section>

      <section className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleCategoryChange("")}
          className={`rounded-full px-4 py-2 text-sm transition ${
            !selectedCategory
              ? "bg-red-500 text-white"
              : "border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-500"
          }`}
        >
          همه محصولات
        </button>

        {categories.map((category) => {
          const active = category === selectedCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active
                  ? "bg-red-500 text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-500"
              }`}
            >
              {category}
            </button>
          );
        })}
      </section>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          برای این دسته‌بندی محصولی ثبت نشده است.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
