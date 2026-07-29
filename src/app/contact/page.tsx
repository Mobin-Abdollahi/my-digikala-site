import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              پشتیبانی
            </span>
            <h1 className="mt-4 text-3xl font-bold text-zinc-900">
              تماس با ما
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-zinc-600">
              اگر در ثبت سفارش، پرداخت، پیگیری یا بازگشت کالا سوالی داشتید، از این بخش می‌توانید با تیم پشتیبانی در ارتباط باشید.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <h2 className="font-semibold text-zinc-900">پشتیبانی آنلاین</h2>
              <p className="mt-2 text-sm leading-8 text-zinc-600">
                پاسخ‌گویی سریع برای پیگیری سفارش و مشکلات حساب کاربری.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <h2 className="font-semibold text-zinc-900">ایمیل</h2>
              <p className="mt-2 text-sm leading-8 text-zinc-600">
                support@example.com
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <h2 className="font-semibold text-zinc-900">ساعات پاسخ‌گویی</h2>
              <p className="mt-2 text-sm leading-8 text-zinc-600">
                همه روزه از ۹ صبح تا ۹ شب
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/faq"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              سوالات متداول
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
