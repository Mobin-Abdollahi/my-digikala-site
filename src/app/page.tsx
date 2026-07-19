'use client'

import { useMemo, useState } from "react";
import { products } from "./data/products";
import ProductCard from "./product/productCard";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const ratingFilter = Number(minRating);
    const priceFilter = maxPrice ? Number(maxPrice) : Infinity;

    const result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(query);
      const matchesRating = product.rating >= ratingFilter;
      const matchesPrice = product.price <= priceFilter;
      const matchesCategory = category === "all" || product.category === category;

      return matchesSearch && matchesRating && matchesPrice && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating-desc":
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [searchTerm, category, minRating, maxPrice, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8" dir="rtl">
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold text-zinc-800">محصولات منتخب</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو در محصولات..."
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "همه دسته‌ها" : item}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="حداکثر قیمت"
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="default">مرتب‌سازی پیش‌فرض</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="rating-desc">بیشترین امتیاز</option>
          </select>

          <button
            onClick={() => {
              setCategory("all");
              setSearchTerm("");
              setMinRating("0");
              setMaxPrice("");
              setSortBy("default");
            }}
            className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            پاک کردن فیلترها
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
          محصولی با این فیلترها پیدا نشد.
        </div>
      )}
    </div>
  );
}
