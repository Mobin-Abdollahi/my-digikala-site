"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../store/auth-context";

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div>در حال بارگذاری...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirectTo = useMemo(
    () => searchParams.get("redirect") || "/profile",
    [searchParams]
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !name) {
      toast.error("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      toast.error("شماره موبایل نامعتبر است (مثال: 09123456789).");
      return;
    }

    setSubmitting(true);

    try {
      await login(name, phone);
      toast.success("خوش آمدید!");
      router.replace(redirectTo);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "ورود ناموفق بود. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-neutral-900">
          ورود / ثبت‌نام
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            نام
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-red-500"
            placeholder="نام خود را وارد کنید"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            شماره موبایل
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-red-500"
            placeholder="09123456789"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </main>
  );
}
