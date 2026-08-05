/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import { saveOrder } from "../utils/orders";
import { formatPrice } from "../utils/formatPrice";
import type { Order } from "../types/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { items, clearCart } = useCart();

  const [receiverName, setReceiverName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/checkout");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setReceiverName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );
  }, [items]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    if (!receiverName.trim() || !phone.trim() || !address.trim()) {
      toast.error("لطفاً همه فیلدها را کامل کنید");
      return;
    }

    const order: Order = {
      id: crypto.randomUUID(),
      userId: user.id,
      userPhone: user.phone,
      receiverName: receiverName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
      orderType: "product",
    };

    saveOrder(order);
    clearCart();
    toast.success("سفارش شما با موفقیت ثبت شد");
    router.push("/order-success");
  };

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
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            شماره تماس
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            آدرس
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="min-h-28 w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none"
          />
        </div>

        <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
          مبلغ نهایی: <b>{formatPrice(totalPrice)} تومان</b>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-red-600 px-5 py-3.5 font-bold text-white transition hover:bg-red-700"
        >
          ثبت سفارش
        </button>
      </form>
    </main>
  );
}
