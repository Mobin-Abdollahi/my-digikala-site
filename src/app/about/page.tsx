import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-zinc-900">درباره ما</h1>
          <p className="mt-4 text-sm leading-8 text-zinc-600">
            این پروژه یک فروشگاه اینترنتی آموزشی با الهام از دیجی‌کالا است که با Next.js، React و Tailwind CSS ساخته شده است.
          </p>
          <p className="mt-4 text-sm leading-8 text-zinc-600">
            هدف این پروژه، نمایش ساختار یک فروشگاه مدرن شامل صفحه اصلی، دسته‌بندی‌ها، سوپرمارکت، سبد خرید، سفارش‌ها و حساب کاربری است.
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <h2 className="font-semibold text-zinc-900">ویژگی‌های پروژه</h2>
            <ul className="mt-3 space-y-2 text-sm leading-8 text-zinc-600">
              <li>• طراحی واکنش‌گرا</li>
              <li>• رابط کاربری فارسی و RTL</li>
              <li>• مدیریت سبد خرید و سفارش‌ها</li>
              <li>• استفاده از Context API و useReducer</li>
            </ul>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              بازگشت به خانه
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
