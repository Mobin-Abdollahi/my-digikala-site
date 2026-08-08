"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import { getOrdersByUserPhone } from "../utils/orders";
import { formatPrice } from "../utils/formatPrice";
import { getStatusClass, getStatusLabel } from "../utils/orderStatus";
import type { Order } from "../types/order";

type OrderFilter = "all" | "pending" | "processing" | "shipped" | "delivered";

function getOrderTypeLabel(order: Order) {
  if (order.orderType === "gold") return "خرید طلا";
  return "سفارش محصول";
}

function getOrderCountLabel(count: number) {
  return `${count.toLocaleString("fa-IR")} سفارش`;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { addToCart } = useCart();

  const [filter, setFilter] = useState<OrderFilter>("all");

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/profile");
    }
  }, [isLoggedIn, router]);

  const orders = useMemo(() => {
    if (!user) return [];
    return getOrdersByUserPhone(user.phone);
  }, [user]);

  const filteredOrders = useMemo(() => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filter === "all") return sortedOrders;
    return sortedOrders.filter((order) => order.status === filter);
  }, [orders, filter]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const processingOrders = orders.filter((order) => order.status === "processing").length;
  const shippedOrders = orders.filter((order) => order.status === "shipped").length;
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

  const handleReorder = (items: Order["items"]) => {
    items.forEach((item) => {
      addToCart(item, item.quantity);
    });
  };

  if (!isLoggedIn || !user) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
            👤
          </div>
          <h1 className="text-xl font-bold text-neutral-900">در حال انتقال...</h1>
          <p className="mt-2 text-sm text-neutral-500">
            اگر به‌صورت خودکار منتقل نشدید، کمی صبر کنید.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-50 pb-12" dir="rtl">
      {/* هدر اصلاح شده - بدون اسکرول افقی */}
      <section className="relative w-full overflow-hidden bg-linear-to-r from-rose-600 via-red-600 to-orange-500 py-10 text-white shadow-lg sm:py-12 md:py-16">
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-6 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-black/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-40 w-136 -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 sm:items-center sm:gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-inner backdrop-blur-md sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl">
                👤
              </div>

              <div className="min-w-0">
                <p className="mb-2 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur sm:mb-3 sm:px-4 sm:py-1.5 sm:text-sm">
                  پروفایل من
                </p>
                <h1 className="break-words text-2xl font-black sm:text-3xl md:text-4xl">
                  {user.name}
                </h1>
                <p className="mt-1 break-all text-sm text-white/80">{user.phone}</p>
                <p className="mt-3 text-sm leading-6 text-white/85 md:text-base">
                  خوش آمدی! اینجا می‌تونی سفارش‌ها و اطلاعات خریدت را ببینی.
                </p>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto md:flex-wrap">
              <Link
                href="/"
                className="rounded-xl bg-white px-3 py-3 text-center text-sm font-bold text-red-600 shadow-md transition hover:bg-red-50 sm:px-5"
              >
                ادامه خرید
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-white/30 bg-white/10 px-3 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 sm:px-5"
              >
                خروج از حساب
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* محتوای اصلی */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="کل سفارش‌ها" value={getOrderCountLabel(totalOrders)} icon="🧾" />
          <StatCard title="در انتظار" value={getOrderCountLabel(pendingOrders)} icon="⏳" />
          <StatCard title="تحویل‌شده" value={getOrderCountLabel(deliveredOrders)} icon="✅" />
          <StatCard title="مجموع خرید" value={`${formatPrice(totalSpent)} تومان`} icon="💰" />
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">سفارش‌های انجام شده</h2>
              <p className="mt-1 text-sm text-neutral-500">مشاهده، پیگیری و سفارش مجدد</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterButton active={filter === "all"} onClick={() => setFilter("all")} label={`همه (${orders.length})`} />
              <FilterButton active={filter === "pending"} onClick={() => setFilter("pending")} label={`در انتظار (${pendingOrders})`} />
              <FilterButton active={filter === "processing"} onClick={() => setFilter("processing")} label={`پردازش (${processingOrders})`} />
              <FilterButton active={filter === "shipped"} onClick={() => setFilter("shipped")} label={`ارسال‌شده (${shippedOrders})`} />
              <FilterButton active={filter === "delivered"} onClick={() => setFilter("delivered")} label={`تحویل‌شده (${deliveredOrders})`} />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-2xl">
                📦
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                {orders.length === 0 ? "هنوز سفارشی ثبت نکرده‌اید" : "برای این فیلتر سفارشی پیدا نشد"}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">می‌توانید به فروشگاه بروید و خرید خود را شروع کنید.</p>
              <Link
                href="/"
                className="mt-5 inline-flex rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                رفتن به فروشگاه
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const safeStatus = order.status ?? "pending";
                const items = Array.isArray(order.items) ? order.items : [];

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-neutral-900">
                            سفارش #{String(order.id).slice(-6).toUpperCase()}
                          </h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(safeStatus)}`}>
                            {getStatusLabel(safeStatus)}
                          </span>
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                            {getOrderTypeLabel(order)}
                          </span>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2 xl:grid-cols-4">
                          <InfoItem label="گیرنده" value={order.receiverName || "ثبت نشده"} />
                          <InfoItem label="شماره تماس" value={order.phone || "ثبت نشده"} />
                          <InfoItem label="تاریخ ثبت" value={new Date(order.createdAt).toLocaleDateString("fa-IR")} />
                          <InfoItem label="مبلغ کل" value={`${formatPrice(Number(order.totalPrice || 0))} تومان`} />
                        </div>

                        <div className="mt-4">
                          <p className="mb-2 text-sm font-medium text-neutral-700">اقلام سفارش</p>
                          <div className="flex flex-wrap gap-2">
                            {items.slice(0, 4).map((item, index) => (
                              <span
                                key={`${order.id}-${index}`}
                                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                              >
                                {item.title}
                                {item.quantity > 1 ? ` × ${item.quantity}` : ""}
                              </span>
                            ))}
                            {items.length > 4 && (
                              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                                +{items.length - 4} مورد دیگر
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-52">
                        <Link
                          href={`/profile/orders/${order.id}`}
                          className="rounded-xl border border-neutral-300 px-4 py-2.5 text-center text-sm font-bold text-neutral-800 transition hover:bg-neutral-100"
                        >
                          مشاهده جزئیات
                        </Link>
                        {items.length > 0 && (
                          <button
                            type="button"
                            onClick={() => handleReorder(items)}
                            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                          >
                            سفارش مجدد
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="mt-2 text-xl font-bold text-neutral-900">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-red-600 text-white shadow-sm"
          : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
      }`}
    >
      {label}
    </button>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 px-3 py-2">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 font-medium text-neutral-800">{value}</p>
    </div>
  );
}
