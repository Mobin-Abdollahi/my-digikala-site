/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "../../store/cart-context"; 
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import FallbackImage from "../../components/common/FallbackImage"; 
import ProductCard from "../../product/productCard"; // استفاده از کارت محصول موجود
import toast from "react-hot-toast";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc"); // وضعیت تب فعال
  
  const resolvedParams = React.use(params);
  const productId = resolvedParams.productId;

  const product = products.find((item) => String(item.id) === productId);

  // پیدا کردن محصولات مرتبط بر اساس دسته‌بندی (به جز محصول فعلی)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && String(p.id) !== productId)
      .slice(0, 4);
  }, [product, productId]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
          <h1 className="text-xl font-bold text-zinc-800">محصول پیدا نشد</h1>
          <Link href="/" className="mt-4 inline-block text-red-500">بازگشت به خانه</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} به سبد خرید اضافه شد!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-red-500">خانه</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{product.category}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="rounded-2xl bg-zinc-100 p-6 flex justify-center items-center">
          <FallbackImage src={product.image} alt={product.title} className="h-90 w-full object-contain" />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-4 text-2xl font-bold text-zinc-800 leading-relaxed">{product.title}</h1>
            <div className="mb-4 flex items-center gap-3 text-sm text-zinc-600">
              <span className="font-bold text-amber-500">★ {product.rating}</span>
            </div>
            <div className="mb-6 text-2xl font-extrabold text-red-600">
              {formatPrice(product.price)} <span className="text-xs font-normal text-zinc-500">تومان</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAddToCart} className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600">
              افزودن به سبد خرید
            </button>
            <Link href="/cart" className="rounded-xl border border-zinc-300 px-6 py-3 text-center font-medium text-zinc-700 hover:bg-zinc-50">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      </div>

      {/* Tabbed Info Section */}
      <div className="mt-8 rounded-3xl bg-white p-8 border border-zinc-200 shadow-sm">
        <div className="flex border-b border-zinc-100 mb-6 gap-8">
          <button 
            onClick={() => setActiveTab("desc")}
            className={`pb-4 font-bold transition-all ${activeTab === "desc" ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400"}`}
          >
            توضیحات
          </button>
          <button 
            onClick={() => setActiveTab("specs")}
            className={`pb-4 font-bold transition-all ${activeTab === "specs" ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400"}`}
          >
            مشخصات فنی
          </button>
        </div>

        <div>
          {activeTab === "desc" ? (
            <section className="animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-zinc-800 mb-4">معرفی محصول</h3>
              <p className="text-zinc-600 leading-9 text-justify italic">
                {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
              </p>
            </section>
          ) : (
            <section className="animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-zinc-800 mb-4">مشخصات فنی</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs?.map((spec, index) => (
                  <div key={index} className="flex bg-zinc-50 p-4 rounded-xl">
                    <span className="w-1/3 text-zinc-500 text-sm">{spec.label}</span>
                    <span className="w-2/3 text-zinc-800 font-medium text-sm">{spec.value}</span>
                  </div>
                )) || <p className="text-zinc-400">مشخصاتی یافت نشد.</p>}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-zinc-800 border-r-4 border-red-500 pr-4">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
