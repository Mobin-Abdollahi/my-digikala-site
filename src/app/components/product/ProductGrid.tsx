"use client";

import ProductCard from "@/app/product/productCard";
import type { Product } from "@/app/types/product";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
};

export default function ProductGrid({
  products,
  emptyMessage = "محصولی پیدا نشد.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
