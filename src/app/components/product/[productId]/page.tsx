/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import { useCart } from "../../../store/cart-context";
import { formatPrice } from "../../../utils/formatPrice";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart } = useCart();

  const product = products.find((item) => String(item.id) === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <div className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-red-500">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span>جزئیات محصول</span>
      </div>

      <div className="grid grid-cols-1 gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="rounded-2xl bg-zinc-100 p-6">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-90 w-full object-contain"
            />
          ) : (
            <div className="flex h-90 items-center justify-center text-sm text-zinc-400">
              تصویری موجود نیست
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-4 text-2xl font-bold text-zinc-800">
              {product.title}
            </h1>

            <div className="mb-4 flex items-center gap-3 text-sm text-zinc-600">
              <span>امتیاز:</span>
              <span className="font-bold text-amber-500">{product.rating}</span>
            </div>

            <div className="mb-6 text-2xl font-extrabold text-red-600">
              {formatPrice(product.price)} تومان
            </div>

            <p className="leading-8 text-zinc-600">
              این محصول یکی از کالاهای منتخب فروشگاه است. در مرحله بعد می‌توانیم
              برای هر محصول توضیحات کامل، مشخصات فنی، ویژگی‌ها و نظرات کاربران را
              هم به داده‌ها اضافه کنیم.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToCart(product)}
              className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600"
            >
              افزودن به سبد خرید
            </button>

            <Link
              href="/cart"
              className="rounded-xl border border-zinc-300 px-6 py-3 text-center font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
