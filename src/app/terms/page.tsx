import Link from "next/link";

const rules = [
  "استفاده از سایت به معنای پذیرش قوانین و شرایط استفاده است.",
  "کاربر موظف است اطلاعات صحیح هنگام ثبت سفارش وارد کند.",
  "قیمت‌ها و موجودی کالاها ممکن است در طول زمان تغییر کنند.",
  "در صورت بروز مشکل، تیم پشتیبانی برای بررسی موضوع در دسترس است.",
];

export default function TermsPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-zinc-900">قوانین و شرایط استفاده</h1>
          <p className="mt-4 text-sm leading-8 text-zinc-600">
            این صفحه چارچوب کلی استفاده از فروشگاه را توضیح می‌دهد تا کاربران با مسئولیت‌ها، محدودیت‌ها و اصول کار با سایت آشنا شوند.
          </p>

          <div className="mt-8 space-y-4">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-8 text-zinc-600"
              >
                <span className="ml-2 font-bold text-red-600">{index + 1}.</span>
                {rule}
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/privacy"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              حریم خصوصی
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
