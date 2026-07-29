import SupermarketProductCard from "@/app/components/product/SupermarketProductCard";
import { Product } from "@/app/types/product";

export default function HorizontalSupermarketSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((p) => (
          <div key={p.id} className="min-w-45 max-w-45">
            <SupermarketProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
