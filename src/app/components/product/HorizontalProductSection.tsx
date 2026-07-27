"use client";

import { useRef } from "react";
import ProductCard from "../../product/productCard";
import { Product } from "../../types/product";

type HorizontalProductSectionProps = {
  title: string;
  products: Product[];
};

export default function HorizontalProductSection({
  title,
  products,
}: HorizontalProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-800">{title}</h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
          >
            قبلی
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
          >
            بعدی
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
      >
        {products.map((product) => (
          <div key={product.id} className="w-65 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
