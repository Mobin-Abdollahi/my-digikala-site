import Image from "next/image";
import Link from "next/link";
import { products } from "../data/products";
import { formatPrice } from "../utils/formatPrice";
import { Product } from "../types/product";

const supermarketProducts = products.filter(
  (product) => product.category === "سوپرمارکت"
);

const freshCategories = [
  { title: "نوشیدنی", image: "/images/categories/drinks.png" },
  { title: "تنقلات", image: "/images/categories/snacks.png" },
  { title: "صبحانه", image: "/images/categories/breakfast.png" },
  { title: "مواد پروتئینی و نان‌مرغ", image: "/images/categories/protein.png" },
  { title: "لبنیات", image: "/images/categories/dairy.png" },
  { title: "شوینده", image: "/images/categories/cleaning.png" },
  { title: "کالاهای اساسی و خوراکی", image: "/images/categories/grocery.png" },
  { title: "افزودنی", image: "/images/categories/additives.png" },
];

function FreshMiniCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex min-w-42.5 max-w-42.5 flex-col rounded-2xl bg-white p-3 text-zinc-800 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-28 items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={110}
          height={110}
          className="h-24 w-24 object-contain"
        />
      </div>

      <h3 className="mt-2 line-clamp-2 min-h-10 text-xs leading-5">
        {product.title}
      </h3>

      <div className="mt-auto pt-3">
        <div className="flex items-center justify-between">
          {product.discount ? (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
              %{product.discount}
            </span>
          ) : (
            <span />
          )}

          <span className="text-sm font-bold">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FreshHeroSection({ items }: { items: Product[] }) {
  return (
    <section className="mb-10 rounded-[28px] bg-emerald-600 p-5 shadow-lg">
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col justify-between rounded-3xl bg-emerald-700 p-6 text-white">
          <div>
            <p className="text-sm text-emerald-100">سوپرمارکت دیجی‌کالا</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-snug">
              شگفت‌انگیزهای منتخب
            </h1>
            <p className="mt-3 text-sm leading-7 text-emerald-50">
              خرید سریع کالاهای روزمره، خوراکی‌ها، لبنیات، شوینده و محصولات تازه
              با طراحی الهام‌گرفته از دیجی‌کالا فرش
            </p>
          </div>

          <Link
            href="/supermarket"
            className="mt-6 inline-flex w-fit items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-emerald-700"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {items.map((product) => (
              <FreshMiniCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FreshCategoryGrid() {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-center text-2xl font-bold text-zinc-800">
        خرید بر اساس دسته‌بندی
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {freshCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <Image
                src={category.image}
                alt={category.title}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-zinc-800">
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RankedRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-zinc-50"
    >
      <div className="w-8 text-center text-2xl font-extrabold text-emerald-600">
        {index}
      </div>

      <div className="flex h-16 w-16 items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="line-clamp-2 text-sm leading-6 text-zinc-700">
          {product.title}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-bold text-zinc-900">
            {formatPrice(product.price)}
          </span>

          {product.discount ? (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
              %{product.discount}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function RankedSection({
  title,
  items,
}: {
  title: string;
  items: Product[];
}) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-800">{title}</h2>
        <Link href="/supermarket" className="text-sm font-medium text-emerald-600">
          مشاهده همه
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((product, index) => (
          <RankedRow
            key={product.id}
            product={product}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}

export default function SupermarketPage() {
  const heroProducts = supermarketProducts.slice(0, 6);
  const bestSelling = supermarketProducts.slice(0, 6);
  const newestProducts = supermarketProducts.slice(6, 12);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <FreshHeroSection items={heroProducts} />
      <FreshCategoryGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <RankedSection title="پرفروش‌ترین کالاها" items={bestSelling} />
        <RankedSection title="محصولات جدید" items={newestProducts} />
      </div>
    </main>
  );
}
