"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/auth-context";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/order-success");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">✅</div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          سفارش شما با موفقیت ثبت شد
        </h1>

        <p className="mb-6 text-sm leading-7 text-gray-600">
          ممنون از خرید شما. سفارش‌تان ثبت شده و می‌توانید جزئیات آن را در
          پروفایل کاربری مشاهده کنید.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/profile"
            className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
          >
            مشاهده سفارش‌ها
          </Link>

          <Link
            href="/"
            className="rounded-lg border px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    </main>
  );
}
