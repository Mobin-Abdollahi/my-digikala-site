"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../store/auth-context";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
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
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">✅</div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          سفارش شما با موفقیت ثبت شد
        </h1>

        <p className="mb-6 text-gray-600">
          از خرید شما متشکریم. سفارش شما ثبت شد و در حال بررسی است.
        </p>

        {orderId && (
          <div className="mb-6 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
            شماره سفارش: <span className="font-semibold">{orderId}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          {orderId && (
            <Link
              href={`/profile/orders/${orderId}`}
              className="rounded-lg bg-red-500 px-5 py-2.5 text-white transition hover:bg-red-600"
            >
              مشاهده جزئیات سفارش
            </Link>
          )}

          <Link
            href="/profile"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 transition hover:bg-gray-50"
          >
            مشاهده سفارش‌ها
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 transition hover:bg-gray-50"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
