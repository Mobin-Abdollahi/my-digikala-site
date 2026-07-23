"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../store/auth-context";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
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
            <label className="mb-2 block text-sm text-zinc-600">نام</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="اختیاری"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-600">شماره موبایل</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="09xxxxxxxxx"
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
