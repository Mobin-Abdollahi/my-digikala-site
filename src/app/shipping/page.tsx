import Link from "next/link";

const steps = [
  "سفارش پس از ثبت و تایید پرداخت وارد مرحله آماده‌سازی می‌شود.",
  "بسته به نوع کالا، زمان ارسال ممکن است متفاوت باشد.",
  "در برخی مناطق، ارسال در بازه زمانی مشخص انجام می‌شود.",
  "پس از تحویل سفارش، وضعیت آن در حساب کاربری ثبت می‌شود.",
];

export default function ShippingPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              ارسال و تحویل
            </span>
            <h1 className="mt-4 text-3xl font-bold text-zinc-900">
              شرایط ارسال سفارش
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-zinc-600">
              این بخش توضیح می‌دهد سفارش‌ها چگونه پردازش می‌شوند، چه زمانی ارسال می‌شوند و چطور می‌توانید وضعیت تحویل را پیگیری کنید.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {index + 1}
                </div>
                <p className="text-sm leading-8 text-zinc-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-8 text-emerald-900">
            <strong>نکته:</strong> زمان ارسال ممکن است برای کالاهای سوپرمارکتی، دیجیتال و حجیم متفاوت باشد.
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/faq"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              سوالات متداول
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
