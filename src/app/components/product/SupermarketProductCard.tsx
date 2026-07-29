"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/store/cart-context";
import { Product } from "@/app/types/product";
import { formatPrice } from "@/app/utils/formatPrice";

export default function SupermarketProductCard({
  product,
}: {
  product: Product;
}) {
  const { items, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const cartItem = items.find((item) => item.id === Number(product.id));
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-32 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-zinc-700">
          {product.title}
        </h3>
      </Link>

      <div className="mt-auto pt-3">
        {quantity > 0 ? (
          <div className="flex items-center justify-between rounded-lg border border-emerald-500 p-1">
            <button
              onClick={() => decreaseQuantity(Number(product.id))}
              className="px-2 font-bold text-emerald-600"
            >
              {quantity === 1 ? "🗑" : "-"}
            </button>

            <span className="text-sm font-bold text-emerald-600">
              {quantity}
            </span>

            <button
              onClick={() => increaseQuantity(Number(product.id))}
              className="px-2 font-bold text-emerald-600"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="w-full rounded-lg border border-emerald-500 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50"
          >
            افزودن
          </button>
        )}

        <div className="mt-2 text-center text-sm font-bold text-zinc-900">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}
