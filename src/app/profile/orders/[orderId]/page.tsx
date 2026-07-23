"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAuth } from "../../../store/auth-context";
import { useCart } from "../../../store/cart-context";
import type { Order } from "../../../types/order";
import { formatPrice } from "../../../utils/formatPrice";
import { getOrdersByUserPhone } from "../../../utils/orders";
import { getStatusClass, getStatusLabel } from "../../../utils/orderStatus";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = typeof params.id === "string" ? params.id : "";

  const { isLoggedIn, user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(`/login?redirect=/profile/orders/${orderId}`);
    }
  }, [isLoggedIn, orderId, router]);

  const order = useMemo(() => {
    if (!user || !orderId) return null;

    const userOrders = getOrdersByUserPhone(user.phone);
    return userOrders.find((item) => item.id === orderId) ?? null;
  }, [orderId, user]);

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

  if (!order) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8" dir="rtl">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold">سفارش پیدا نشد</h1>
          <p className="mb-6 text-gray-600">
            این سفارش وجود ندارد یا متعلق به حساب کاربری شما نیست.
          </p>

          <Link
            href="/profile"
            className="inline-block rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            بازگشت به پروفایل
          </Link>
        </div>
      </main>
    );
  }

  const safeStatus = order.status ?? "pending";

  return (
    <main className="mx-auto max-w-4xl px-4 py-8" dir="rtl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">جزئیات سفارش</h1>
          <p className="mt-1 text-sm text-gray-500">کد سفارش: {order.id}</p>
        </div>

        <Link
          href="/profile"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          بازگشت به پروفایل
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="mb-5 grid gap-4 border-b pb-5 text-sm text-gray-700 sm:grid-cols-2">
          <p>
            <span className="ml-2 text-gray-500">تاریخ ثبت:</span>
            {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </p>
          <p>
            <span className="ml-2 text-gray-500">وضعیت:</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                safeStatus
              )}`}
            >
              {getStatusLabel(safeStatus)}
            </span>
          </p>
          <p>
            <span className="ml-2 text-gray-500">تحویل‌گیرنده:</span>
            {order.receiverName}
          </p>
          <p>
            <span className="ml-2 text-gray-500">شماره تماس:</span>
            {order.phone}
          </p>
          <p className="sm:col-span-2">
            <span className="ml-2 text-gray-500">آدرس:</span>
            {order.address}
          </p>
        </div>

        <div className="mb-5">
          <h2 className="mb-4 text-lg font-bold">اقلام سفارش</h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    تعداد: {item.quantity}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    قیمت واحد: {formatPrice(item.price)}
                  </p>
                </div>

                <p className="font-bold text-red-600">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <div>
            <p className="text-sm text-gray-500">مبلغ کل سفارش</p>
            <p className="text-2xl font-bold text-red-600">
              {formatPrice(order.totalPrice)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleReorder(order.items)}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            تکرار خرید 🛒
          </button>
        </div>
      </div>
    </main>
  );
}
