import Link from "next/link";

const faqs = [
  {
    question: "چطور می‌توانم سفارش ثبت کنم؟",
    answer:
      "کافی است محصول موردنظر را انتخاب کنید، آن را به سبد خرید اضافه کنید و در نهایت مراحل ثبت سفارش و پرداخت را کامل نمایید. بعد از ثبت موفق سفارش، وضعیت آن از بخش حساب کاربری قابل پیگیری است.",
  },
  {
    question: "آیا امکان مشاهده وضعیت سفارش وجود دارد؟",
    answer:
      "بله. پس از ورود به حساب کاربری، می‌توانید از بخش سفارش‌ها وضعیت پردازش، آماده‌سازی و ارسال سفارش خود را مشاهده کنید.",
  },
  {
    question: "اگر محصول با عکس متفاوت بود چه کنم؟",
    answer:
      "در این حالت می‌توانید از بخش تماس با ما یا پشتیبانی استفاده کنید تا درخواست شما بررسی شود. تلاش شده اطلاعات محصولات تا حد ممکن دقیق و شفاف باشد.",
  },
];

export default function FaqPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              راهنمای استفاده
            </span>
            <h1 className="mt-4 text-3xl font-bold text-zinc-900">
              سوالات متداول
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-zinc-600">
              در این بخش، پاسخ سوالات پرتکرار کاربران درباره ثبت سفارش، پیگیری، پشتیبانی و استفاده از فروشگاه قرار گرفته است.
            </p>
          </div>

          <div className="space-y-5">
            {faqs.map((item, index) => (
              <article
                key={index}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <h2 className="text-base font-semibold text-zinc-900">
                  {item.question}
                </h2>
                <p className="mt-3 text-sm leading-8 text-zinc-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              ارتباط با پشتیبانی
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              بازگشت به خانه
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
