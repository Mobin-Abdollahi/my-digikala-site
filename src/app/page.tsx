/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useMemo, useState, useEffect } from "react";
import { products } from "./data/products";
import ProductCard from "./product/productCard";
import { useSearchParams, useRouter } from "next/navigation";
import HorizontalProductSection from "./components/product/HorizontalProductSection";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  const categories = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(products.map((product) => product.category))),
    ];
  }, []);

  const mobileProducts = useMemo(
    () => products.filter((product) => product.category === "موبایل"),
    []
  );

  const laptopProducts = useMemo(
    () => products.filter((product) => product.category === "لپ‌تاپ"),
    []
  );

  const accessoryProducts = useMemo(
    () => products.filter((product) => product.category === "لوازم جانبی"),
    []
  );

  const smartwatchProducts = useMemo(
    () => products.filter((product) => product.category === "ساعت هوشمند"),
    []
  );

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const ratingFilter = Number(minRating);
    const priceFilter = maxPrice ? Number(maxPrice) : Infinity;

    const result = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        (product.description &&
          product.description.toLowerCase().includes(query));

      const matchesRating = product.rating >= ratingFilter;
      const matchesPrice = product.price <= priceFilter;
      const matchesCategory =
        category === "all" || product.category === category;

      return (
        matchesSearch &&
        matchesRating &&
        matchesPrice &&
        matchesCategory
      );
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

  const handleClearFilters = () => {
    setCategory("all");
    setSearchTerm("");
    setMinRating("0");
    setMaxPrice("");
    setSortBy("default");
    router.push("/");
  };

  const showHorizontalSections =
    searchTerm.trim() === "" &&
    category === "all" &&
    minRating === "0" &&
    maxPrice === "" &&
    sortBy === "default";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8" dir="rtl">
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">فروشگاه دیجی‌کالا</h1>
          <p className="mt-1 text-sm text-zinc-500">
            جدیدترین و محبوب‌ترین کالاهای بازار
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در محصولات..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="all">همه دسته‌ها</option>
            {categories
              .filter((cat) => cat !== "all")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="0">همه امتیازها</option>
            <option value="4">۴ و بالاتر</option>
            <option value="4.5">۴.۵ و بالاتر</option>
            <option value="4.8">۴.۸ و بالاتر</option>
          </select>

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="حداکثر قیمت (تومان)"
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
            onClick={handleClearFilters}
            className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            پاک کردن فیلترها
          </button>
        </div>
      </div>

      {showHorizontalSections && (
        <div className="mb-10 space-y-6">
          <HorizontalProductSection
            title="پیشنهادهای موبایل"
            products={mobileProducts}
          />
          <HorizontalProductSection
            title="لپ‌تاپ‌های منتخب"
            products={laptopProducts}
          />
          <HorizontalProductSection
            title="لوازم جانبی پرطرفدار"
            products={accessoryProducts}
          />
          <HorizontalProductSection
            title="ساعت‌های هوشمند"
            products={smartwatchProducts}
          />
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-12 text-center text-zinc-500">
          <span className="text-4xl">🔍</span>
          <p className="font-bold text-gray-700">
            محصولی با این فیلترها پیدا نشد.
          </p>
          <p className="text-sm text-gray-400">
            تنظیمات فیلتر یا عبارت جستجوی خود را تغییر دهید.
          </p>
        </div>
      )}
    </div>
  );
}
