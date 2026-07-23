/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import { saveOrder } from "../utils/orders";
import { formatPrice } from "../utils/formatPrice";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();

  const [receiverName, setReceiverName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [isLoggedIn, items.length, router]);

  useEffect(() => {
    if (user) {
      setReceiverName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      router.replace("/login?redirect=/checkout");
      return;
    }

    if (!receiverName.trim() || !phone.trim() || !address.trim()) {
      alert("لطفا همه اطلاعات گیرنده را کامل کنید.");
      return;
    }

    saveOrder({
      id: crypto.randomUUID(),
      userPhone: user.phone,
      receiverName: receiverName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items,
      totalPrice,
      status: "ثبت شده",
      createdAt: new Date().toISOString(),
    });

    clearCart();
      router.push("/order-success");
  };

  if (!isLoggedIn || items.length === 0) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">تکمیل سفارش</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={submitHandler}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold">اطلاعات گیرنده</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">نام گیرنده</label>
            <input
              type="text"
              value={receiverName}
              onChange={(event) => setReceiverName(event.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-red-500"
              placeholder="نام و نام خانوادگی"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">شماره موبایل</label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-red-500"
              placeholder="09xxxxxxxxx"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">آدرس</label>
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              rows={4}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-red-500"
              placeholder="آدرس کامل گیرنده"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-3 text-white transition hover:bg-red-700"
          >
            پرداخت و ثبت سفارش
          </button>
        </form>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">خلاصه سفارش</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    تعداد: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4 text-lg font-bold">
            <span>مبلغ نهایی</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
