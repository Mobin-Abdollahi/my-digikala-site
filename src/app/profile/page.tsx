"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import type { Order } from "../types/order";
import { formatPrice } from "../utils/formatPrice";
import { getOrdersByUserPhone } from "../utils/orders";
import { getStatusClass, getStatusLabel } from "../utils/orderStatus";

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/profile");
    }
  }, [isLoggedIn, router]);

  const orders = useMemo(() => {
    if (!user) return [];
    return getOrdersByUserPhone(user.phone);
  }, [user]);

  const handleReorder = (items: Order["items"]) => {
    items.forEach((item) => {
      for (let i = 0; i < item.quantity; i += 1) {
        addToCart({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image || "/images/product-placeholder.png",
          category: "",
          rating: 0,
        });
      }
    });

    router.push("/cart");
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8" dir="rtl">
      <div className="mb-8 rounded-lg border bg-white p-5 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">پروفایل کاربری</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-gray-500">نام کاربر</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500">شماره موبایل</p>
            <p className="font-medium">{user.phone}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">سفارش‌های من</h2>
          <Link
            href="/"
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            ادامه خرید
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-md border border-dashed p-8 text-center">
            <p className="mb-3 text-gray-600">هنوز سفارشی ثبت نکرده‌ای.</p>
            <Link
              href="/"
              className="inline-block rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              رفتن به فروشگاه
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const safeStatus = order.status ?? "pending";

              return (
                <div
                  key={order.id}
                  className="rounded-lg border p-4 transition hover:shadow-sm"
                >
                  <div className="mb-4 flex flex-col gap-2 border-b pb-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                    <span>کد سفارش: {order.id}</span>
                    <span>
                      تاریخ:{" "}
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        safeStatus
                      )}`}
                    >
                      وضعیت: {getStatusLabel(safeStatus)}
                    </span>
                  </div>

                  <div className="mb-4 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
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

                  <div className="grid gap-3 border-t pt-4 text-sm text-gray-700 sm:grid-cols-2">
                    <p>گیرنده: {order.receiverName}</p>
                    <p>شماره تماس: {order.phone}</p>
                    <p className="sm:col-span-2">آدرس: {order.address}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <div>
                      <span className="ml-2 text-sm text-gray-500">
                        مبلغ کل:
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/profile/orders/${order.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        مشاهده جزئیات
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleReorder(order.items)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        تکرار خرید 🛒
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
