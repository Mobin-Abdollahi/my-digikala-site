import { products } from "./data/products";
import ProductCard from "./components/product/productCard";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* عنوان بخش */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">منتخب جدیدترین کالاها</h2>
      </div>

      {/* لیست محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
