/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import { formatPrice } from "../utils/formatPrice";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, user, loading } = useAuth();
  const { items, clearCart } = useCart();

  const [receiverName, setReceiverName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // به‌روزرسانی فیلدهای پیش‌فرض فرم پس از دریافت اطلاعات کاربر
  useEffect(() => {
    if (user) {
      setReceiverName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  // انتقال به صفحه لاگین در صورت عدم احراز هویت پس از لود شدن وضعیت
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login?redirect=/checkout");
    }
  }, [loading, isLoggedIn, router]);

  // انتقال به سبد خرید در صورت خالی بودن آن
  useEffect(() => {
    if (!loading && items.length === 0) {
      router.replace("/cart");
    }
  }, [loading, items.length, router]);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );
  }, [items]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (!receiverName.trim() || !phone.trim() || !address.trim()) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverName: receiverName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          items,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "ثبت سفارش ناموفق بود");
      }

      clearCart();
      toast.success("سفارش شما با موفقیت ثبت شد");
      router.push(`/order-success?orderId=${data.order?.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطا در ثبت سفارش");
    } finally {
      setIsSubmitting(false);
    }
  };


  // ممانعت از پرش صفحه تا بارگذاری وضعیت احراز هویت
  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center text-neutral-600" dir="rtl">
        در حال بررسی وضعیت ورود...
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8" dir="rtl">
      <h1 className="text-2xl font-bold text-neutral-900">تکمیل سفارش</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            نام گیرنده
          </label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-red-500"
            placeholder="نام و نام خانوادگی گیرنده"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            شماره تماس
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-red-500"
            placeholder="شماره موبایل گیرنده"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            آدرس
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="min-h-28 w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-red-500"
            placeholder="نشانی دقیق پستی برای تحویل سفارش"
          />
        </div>

        <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
          مبلغ نهایی: <b>{formatPrice(totalPrice)} تومان</b>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-red-600 px-5 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ثبت سفارش..." : "ثبت سفارش"}
        </button>
      </form>
    </main>
  );
}
