"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "../store/cart-context";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/formatPrice";
import FallbackImage from "../components/common/FallbackImage";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const originalPrice = hasDiscount
    ? Math.round(product.price / (1 - discount / 100))
    : product.price;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} به سبد خرید اضافه شد!`, {
      style: {
        border: "1px solid #10B981",
        padding: "16px",
        color: "#065F46",
        fontFamily: "vazir, tahoma, sans-serif",
      },
      iconTheme: {
        primary: "#10B981",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      {hasDiscount && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
          {discount}٪
        </span>
      )}

      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full bg-zinc-100">
          {product.image ? (
            <FallbackImage
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              تصویری موجود نیست
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="min-h-14 line-clamp-2 text-sm font-medium leading-7 text-zinc-800">
            {product.title}
          </h3>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-zinc-500">امتیاز</span>
            <span className="font-semibold text-amber-500">
              {product.rating}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-left">
            {hasDiscount && (
              <div className="text-sm text-zinc-400 line-through">
                {formatPrice(originalPrice)} تومان
              </div>
            )}

            <div className="text-base font-bold text-red-600">
              {formatPrice(product.price)} تومان
            </div>
          </div>
        </Link>

        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  );
}
