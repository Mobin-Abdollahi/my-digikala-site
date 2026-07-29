import Link from "next/link";

function SocialIcon({ type }: { type: "instagram" | "telegram" | "x" | "linkedin" }) {
  const baseClass = "h-5 w-5";

  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="currentColor" aria-hidden="true">
          <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9Zm0 2h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4Zm9.75 1.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 6.5A5.5 5.5 0 1 0 12 17.5 5.5 5.5 0 0 0 12 6.5Zm0 2A3.5 3.5 0 1 1 12 15.5a3.5 3.5 0 0 1 0-7Z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="currentColor" aria-hidden="true">
          <path d="M21.9 4.6a1.1 1.1 0 0 0-1.2-.2L3.8 10.9a1.1 1.1 0 0 0 .1 2.1l4.2 1.4 1.6 5a1.1 1.1 0 0 0 1.9.4l2.7-3.1 4.4 3.2a1.1 1.1 0 0 0 1.7-.7l2-13a1.1 1.1 0 0 0-.5-1.6ZM9.3 13.5l9.4-6.1-7.3 7.6-.3 3-1.4-4.5-4.1-1.3 15-6.3-11.3 7.6Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="currentColor" aria-hidden="true">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.1 22H2l7.3-8.4L1 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.9L6.8 4H4.8l12.9 16Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="currentColor" aria-hidden="true">
          <path d="M6.5 6.5A2.25 2.25 0 1 1 6.5 2a2.25 2.25 0 0 1 0 4.5ZM4.5 21V8h4v13h-4Zm6 0V8h3.8v1.8h.1A4.2 4.2 0 0 1 18 7.7c4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.8c0-1.4 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V21h-4Z" />
        </svg>
      );
  }
}

const customerLinks = [
  { label: "سوالات متداول", href: "/faq" },
  { label: "شرایط ارسال", href: "/shipping" },
  { label: "بازگشت کالا", href: "/returns" },
  { label: "تماس با ما", href: "/contact" },
];

const exploreLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "دسته‌بندی‌ها", href: "/categories" },
  { label: "سوپرمارکت", href: "/supermarket" },
  { label: "پیشنهادهای شگفت‌انگیز", href: "/amazing-offers" },
];

const accountLinks = [
  { label: "سبد خرید", href: "/cart" },
  { label: "پروفایل", href: "/profile" },
  { label: "ورود / ثبت‌نام", href: "/login" },
  { label: "همه پیشنهادها", href: "/offers" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900">My DigiKala Clone</h3>
            <p className="mt-4 text-sm leading-8 text-zinc-600">
              یک پروژه آموزشی و رزومه‌ای فروشگاه اینترنتی با Next.js و Tailwind CSS که برای تمرین UI، مدیریت state و ساخت تجربه خرید آنلاین طراحی شده است.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900">خدمات مشتریان</h4>
            <ul className="mt-4 space-y-3">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900">دسترسی سریع</h4>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900">حساب کاربری</h4>
            <ul className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-100 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">
            © 2026 My DigiKala Clone — All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-zinc-500">
            <Link href="/privacy" className="transition hover:text-red-600">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="transition hover:text-red-600">
              قوانین و شرایط
            </Link>
            <Link href="/about" className="transition hover:text-red-600">
              درباره ما
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
