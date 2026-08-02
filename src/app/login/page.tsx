"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../store/auth-context";
import toast from "react-hot-toast";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const rawRedirectTo = searchParams.get("redirect");

  const redirectTo =
    rawRedirectTo &&
    rawRedirectTo.startsWith("/") &&
    !rawRedirectTo.startsWith("//")
      ? rawRedirectTo
      : "/";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("شماره موبایل را وارد کنید");
      return;
    }

    login({
      name: name.trim() || "کاربر دیجی‌کالا",
      phone: phone.trim(),
    });

    toast.success("ورود با موفقیت انجام شد");
    router.replace(redirectTo);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-800">ورود / ثبت‌نام</h1>

        <p className="mt-2 text-sm text-zinc-500">
          برای ادامه خرید، لطفا اطلاعات خود را وارد کنید.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm text-zinc-600"
            >
              نام
            </label>

            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="اختیاری"
              autoComplete="name"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm text-zinc-600"
            >
              شماره موبایل
            </label>

            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="tel"
              placeholder="09xxxxxxxxx"
              autoComplete="tel"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginFallback() {
  return (
    <div
      className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-10"
      dir="rtl"
    >
      <p className="text-sm text-zinc-500">در حال بارگذاری...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
