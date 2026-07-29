import Link from "next/link";

const returnRules = [
  "کالا باید در شرایط اولیه و همراه با بسته‌بندی اصلی باشد.",
  "در صورت وجود ایراد یا مغایرت، درخواست بازگشت ثبت می‌شود.",
  "برای برخی کالاها، شرایط بازگشت می‌تواند محدودتر باشد.",
  "پس از بررسی درخواست، نتیجه از طریق حساب کاربری اعلام می‌شود.",
];

export default function ReturnsPage() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              مرجوعی و بازگشت
            </span>
            <h1 className="mt-4 text-3xl font-bold text-zinc-900">
              رویه بازگشت کالا
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-zinc-600">
              در این صفحه می‌توانید با ضوابط کلی بازگشت کالا، شرایط بررسی درخواست و مواردی که شامل مرجوعی می‌شوند آشنا شوید.
            </p>
          </div>

          <div className="space-y-4">
            {returnRules.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-orange-100 text-center text-sm font-bold leading-8 text-orange-700">
                  {index + 1}
                </div>
                <p className="text-sm leading-8 text-zinc-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-8 text-orange-900">
            اگر کالا آسیب‌دیده یا اشتباه ارسال شده باشد، بررسی درخواست در اولویت قرار می‌گیرد.
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              ثبت درخواست
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
