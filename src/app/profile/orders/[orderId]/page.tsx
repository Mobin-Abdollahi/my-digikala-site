"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../../store/auth-context";
import { useCart } from "../../../store/cart-context";
import { formatPrice } from "../../../utils/formatPrice";
import { fetchUserOrders } from "../../../utils/orders";
import { getStatusClass, getStatusLabel } from "../../../utils/orderStatus";
import { getVisibleOrderItems } from "../../../utils/productManager";
import type { Order } from "../../../types/order";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();

  const { user, isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  const orderId = params.orderId;
  const [order, setOrder] = useState<Order | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace(`/login?redirect=/profile/orders/${orderId}`);
      return;
    }

    let isMounted = true;

    setLoadingOrder(true);

    fetchUserOrders()
      .then((orders) => {
        if (!isMounted) return;

        const foundOrder = orders.find((item) => item.id === orderId) ?? null;

        if (foundOrder) {
          foundOrder.items = getVisibleOrderItems(foundOrder.items || []);
        }

        setOrder(foundOrder);
      })
      .catch(() => {
        if (isMounted) setOrder(null);
      })
      .finally(() => {
        if (isMounted) setLoadingOrder(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn, user, router, orderId]);

  const handleReorder = () => {
    if (!order) return;

    const visibleItems = getVisibleOrderItems(order.items);

    if (visibleItems.length === 0) {
      toast.error("هیچ محصول فعال‌ای برای سفارش مجدد باقی نمانده است.");
      return;
    }

    visibleItems.forEach((item) => {
      addToCart(
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image || "/images/product-placeholder.png",
          category: "",
          rating: 0,
        },
        item.quantity
      );
    });

    toast.success("محصولات به سبد خرید اضافه شدند");
    router.push("/cart");
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  if (loadingOrder) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="mb-3 text-xl font-bold text-gray-800">
            در حال بارگذاری سفارش...
          </h1>
        </div>
      </main>
    );
  }

  if (!order || order.items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="mb-3 text-xl font-bold text-gray-800">
            سفارش پیدا نشد یا همهٔ محصولات آن حذف شده‌اند
          </h1>

          <Link
            href="/profile"
            className="inline-block rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            بازگشت به پروفایل
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                جزئیات سفارش
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                کد سفارش: {order.id}
              </p>
            </div>

            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                order.status
              )}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">نام گیرنده</p>
              <p className="mt-1 font-medium text-gray-800">
                {order.receiverName}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">شماره تماس</p>
              <p className="mt-1 font-medium text-gray-800">{order.phone}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 sm:col-span-2">
              <p className="text-sm text-gray-500">آدرس</p>
              <p className="mt-1 font-medium text-gray-800">
                {order.address}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            اقلام سفارش
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    تعداد: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-red-500">
                  {formatPrice(item.price * item.quantity)} تومان
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="text-lg font-bold text-gray-800">مبلغ کل</span>

            <span className="text-xl font-extrabold text-red-500">
              {formatPrice(order.totalPrice)} تومان
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReorder}
            className="rounded-lg bg-red-500 px-5 py-2.5 text-white hover:bg-red-600"
          >
            تکرار خرید
          </button>

          <Link
            href="/profile"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
          >
            بازگشت به پروفایل
          </Link>
        </div>
      </div>
    </main>
  );
}
