"use client";

import { useState } from "react";
import { useAuth } from "../store/auth-context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 11) {
      toast.error("لطفاً شماره موبایل معتبر وارد کنید");
      return;
    }
    
    login(phone, name);
    toast.success("خوش آمدید!");
    router.push("/"); // برگشت به صفحه اصلی
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4" dir="rtl">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-red-500 tracking-wider">
            digikala
          </Link>
          <h2 className="mt-4 text-xl font-bold text-gray-700">ورود | ثبت‌نام</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">نام و نام خانوادگی (اختیاری)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلا: علی علوی"
              className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">شماره موبایل</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09123456789"
              required
              className="w-full rounded-lg border p-3 text-left outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-red-500 py-3 font-bold text-white hover:bg-red-600 transition-colors"
          >
            ورود به دیجی‌کالا
          </button>
        </form>
      </div>
    </div>
  );
}
