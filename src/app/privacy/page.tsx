import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-zinc-900">حریم خصوصی</h1>
          <p className="mt-4 text-sm leading-8 text-zinc-600">
            اطلاعات کاربران تنها برای پردازش سفارش، پشتیبانی و بهبود تجربه خرید استفاده می‌شود.
          </p>
          <p className="mt-4 text-sm leading-8 text-zinc-600">
            ما متعهد هستیم اطلاعات شخصی کاربران را با دقت نگهداری کنیم و از دسترسی غیرمجاز جلوگیری شود.
          </p>

          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-8 text-blue-900">
            ثبت‌نام و ورود کاربران فقط برای شخصی‌سازی تجربه خرید و مدیریت سفارش‌ها انجام می‌شود.
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/terms"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              قوانین سایت
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              صفحه اصلی
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
