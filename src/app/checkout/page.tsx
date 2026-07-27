/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setReceiverName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn || !user) {
      router.replace("/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      router.replace("/cart");
      return;
    }

    if (isSubmitting) return;

    if (!receiverName.trim() || !phone.trim() || !address.trim()) {
      toast.error("لطفا همه اطلاعات را کامل کنید");
      return;
    }

    const orderId = crypto.randomUUID();

    try {
      setIsSubmitting(true);

      saveOrder({
        id: orderId,
        userPhone: user.phone,
        receiverName: receiverName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        items: items.map((item) => ({ ...item })),
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      clearCart();
      toast.success("سفارش با موفقیت ثبت شد");
      router.push(`/order-success?orderId=${orderId}`);
    } catch {
      toast.error("ثبت سفارش ناموفق بود");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn || !user || items.length === 0) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">تکمیل سفارش</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  نام گیرنده
                </label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500"
                  placeholder="نام و نام خانوادگی"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  شماره تماس
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500"
                  placeholder="09xxxxxxxxx"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  آدرس
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500"
                  placeholder="آدرس کامل تحویل سفارش"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "در حال ثبت سفارش..." : "پرداخت و ثبت سفارش"}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-800">خلاصه سفارش</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-500">تعداد: {item.quantity}</p>
                  </div>

                  <p className="font-semibold text-red-500">
                    {formatPrice(item.price * item.quantity)} تومان
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="text-lg font-bold text-gray-800">مبلغ کل</span>
              <span className="text-xl font-extrabold text-red-500">
                {formatPrice(totalPrice)} تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
