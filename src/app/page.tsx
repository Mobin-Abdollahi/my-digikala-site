/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Box,
  Filter,
  PackageSearch,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import type { Product } from "./types/product";
import { getProducts } from "./utils/productManager";
import ProductCard from "./product/productCard";
import HorizontalProductSection from "./components/product/HorizontalProductSection";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // در رندر اولیه آرایه خالی است؛ سپس در مرورگر از localStorage خوانده می‌شود.
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setAllProducts(getProducts());
  }, []);

  const categories = useMemo(() => {
    return [
      "all",
      ...Array.from(
        new Set(allProducts.map((product) => product.category))
      ),
    ];
  }, [allProducts]);

  const mobileProducts = useMemo(
    () =>
      allProducts
        .filter((product) => product.category === "موبایل")
        .slice(0, 10),
    [allProducts]
  );

  const laptopProducts = useMemo(
    () =>
      allProducts
        .filter((product) => product.category === "لپ تاپ")
        .slice(0, 10),
    [allProducts]
  );

  const accessoryProducts = useMemo(
    () =>
      allProducts
        .filter((product) => product.category === "لوازم جانبی")
        .slice(0, 10),
    [allProducts]
  );

  const smartwatchProducts = useMemo(
    () =>
      allProducts
        .filter((product) => product.category === "ساعت هوشمند")
        .slice(0, 10),
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const parsedMaxPrice = Number(maxPrice.replaceAll(",", ""));

    const result = allProducts.filter((product) => {
      const productTitle = product.title?.toLowerCase() || "";
      const productDescription = product.description?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        productTitle.includes(normalizedSearch) ||
        productDescription.includes(normalizedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesRating =
        Number(product.rating ?? 0) >= Number(minRating);

      const matchesMaxPrice =
        !maxPrice ||
        !Number.isFinite(parsedMaxPrice) ||
        Number(product.price) <= parsedMaxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesMaxPrice
      );
    });

    if (sortBy === "price-asc") {
      return [...result].sort(
        (firstProduct, secondProduct) =>
          Number(firstProduct.price) - Number(secondProduct.price)
      );
    }

    if (sortBy === "price-desc") {
      return [...result].sort(
        (firstProduct, secondProduct) =>
          Number(secondProduct.price) - Number(firstProduct.price)
      );
    }

    if (sortBy === "rating-desc") {
      return [...result].sort(
        (firstProduct, secondProduct) =>
          Number(secondProduct.rating ?? 0) -
          Number(firstProduct.rating ?? 0)
      );
    }

    return result;
  }, [
    allProducts,
    searchTerm,
    category,
    minRating,
    maxPrice,
    sortBy,
  ]);

  const isFiltering =
    searchTerm.trim() !== "" ||
    category !== "all" ||
    minRating !== "0" ||
    maxPrice !== "" ||
    sortBy !== "default";

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setMinRating("0");
    setMaxPrice("");
    setSortBy("default");
    router.push("/");
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanSearch = searchTerm.trim();

    if (!cleanSearch) {
      router.push("/");
      return;
    }

    router.push(`/?search=${encodeURIComponent(cleanSearch)}`);
  };

  return (
    <main className="min-h-screen bg-slate-50/50" dir="rtl">
      <section className="relative overflow-hidden bg-[#15181c] py-14 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-rose-600/15 blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-300">
                <Sparkles size={17} />
                خرید هوشمند، سریع و مطمئن
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                هر چیزی که نیاز داری،
                <span className="mt-2 block text-rose-500">
                  یک‌جا پیدا کن.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                از کالاهای دیجیتال و لوازم خانه تا محصولات روزمره؛ محصولات
                متنوع را مقایسه کن و با بهترین انتخاب خریدت را انجام بده.
              </p>

              <form
                onSubmit={handleSearchSubmit}
                className="mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur-md"
              >
                <Search className="mr-2 shrink-0 text-zinc-400" size={21} />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="جستجو در میان محصولات..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-white outline-none placeholder:text-zinc-400"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-500"
                >
                  جستجو
                </button>
              </form>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <PackageSearch className="mb-4 text-rose-400" size={30} />
                <h2 className="font-bold text-white">تنوع کالا</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  محصولات متنوع در دسته‌بندی‌های مختلف
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <Star
                  className="mb-4 fill-amber-400 text-amber-400"
                  size={30}
                />
                <h2 className="font-bold text-white">انتخاب بهتر</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  مقایسه براساس قیمت، امتیاز و دسته‌بندی
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <Box className="mb-4 text-orange-400" size={30} />
                <h2 className="font-bold text-white">خرید آسان</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  تجربه‌ای ساده برای پیدا کردن کالای دلخواه
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <SlidersHorizontal size={21} />
          </div>

          <div>
            <h2 className="text-xl font-black text-zinc-900">
              جستجو و فیلتر محصولات
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              محصول مناسب را دقیق‌تر و سریع‌تر پیدا کن.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">
                دسته‌بندی
              </span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700 outline-none transition focus:border-rose-500"
              >
                <option value="all">همه دسته‌بندی‌ها</option>

                {categories
                  .filter((item) => item !== "all")
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">
                حداقل امتیاز
              </span>

              <select
                value={minRating}
                onChange={(event) => setMinRating(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700 outline-none transition focus:border-rose-500"
              >
                <option value="0">همه امتیازها</option>
                <option value="4">۴ و بالاتر</option>
                <option value="4.5">۴.۵ و بالاتر</option>
                <option value="4.8">۴.۸ و بالاتر</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">
                حداکثر قیمت
              </span>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="مثلاً 5000000"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700 outline-none transition placeholder:text-zinc-400 focus:border-rose-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">
                مرتب‌سازی
              </span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700 outline-none transition focus:border-rose-500"
              >
                <option value="default">پیش‌فرض</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
                <option value="rating-desc">بیشترین امتیاز</option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!isFiltering}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
                پاک کردن فیلترها
              </button>
            </div>
          </div>
        </div>
      </section>

      {isFiltering ? (
        <section className="mx-auto max-w-7xl px-4 pb-14">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white">
                <Filter size={19} />
              </div>

              <div>
                <h2 className="text-xl font-black text-zinc-900">
                  نتایج جستجو و فیلتر
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {filteredProducts.length} محصول پیدا شد.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm font-bold text-rose-600 transition hover:text-rose-700"
            >
              مشاهده همه محصولات
              <ArrowLeft size={17} />
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-4 py-16 text-center">
              <PackageSearch className="mx-auto mb-4 text-zinc-400" size={44} />

              <h3 className="text-lg font-black text-zinc-800">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                فیلترها یا عبارت جستجوی خود را تغییر دهید.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700"
              >
                حذف فیلترها
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="mx-auto max-w-7xl space-y-10 px-4 pb-14">
          {mobileProducts.length > 0 && (
            <HorizontalProductSection
              title="محبوب‌ترین موبایل‌ها"
              products={mobileProducts}
            />
          )}

          {laptopProducts.length > 0 && (
            <HorizontalProductSection
              title="لپ‌تاپ و کامپیوتر"
              products={laptopProducts}
            />
          )}

          {accessoryProducts.length > 0 && (
            <HorizontalProductSection
              title="لوازم جانبی دیجیتال"
              products={accessoryProducts}
            />
          )}

          {smartwatchProducts.length > 0 && (
            <HorizontalProductSection
              title="ساعت‌های هوشمند"
              products={smartwatchProducts}
            />
          )}
        </section>
      )}
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50/50">
          <p className="text-zinc-500">در حال بارگذاری صفحه اصلی...</p>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
