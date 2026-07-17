/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useCart } from "../../store/cart-context";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full bg-zinc-100">
          {product.image ? (
            <img
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

        <div className="space-y-3 p-4">
          <h3 className="line-clamp-2 min-h-12 text-sm font-medium text-zinc-800">
            {product.title}
          </h3>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">امتیاز</span>
            <span className="font-semibold text-amber-500">{product.rating}</span>
          </div>

          <div className="text-left text-base font-bold text-red-600">
            {formatPrice(product.price)} تومان
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  );
}
