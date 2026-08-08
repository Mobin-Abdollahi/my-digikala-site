/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useAuth } from "../../store/auth-context";
import { isAdminPhone } from "../../utils/auth";
import { getOrders, updateOrderStatus } from "../../utils/orders";
import { formatPrice } from "../../utils/formatPrice";
import { getStatusClass, getStatusLabel } from "../../utils/orderStatus";
import type { Order, OrderStatus } from "../../types/order";

const statusOptions: Array<"all" | OrderStatus> = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const isAdmin = Boolean(user?.phone && isAdminPhone(user.phone));

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/admin/orders");
      return;
    }

    if (user && !isAdmin) {
      router.replace("/");
      return;
    }

    if (user && isAdmin) {
      setOrders(getOrders());
      setLoading(false);
    }
  }, [isLoggedIn, user, isAdmin, router]);

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === "pending").length,
      processing: orders.filter((order) => order.status === "processing").length,
      shipped: orders.filter((order) => order.status === "shipped").length,
      delivered: orders.filter((order) => order.status === "delivered").length,
      revenue: orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0),
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((order) => {
        const safeStatus = order.status ?? "pending";

        const matchesStatus = statusFilter === "all" || safeStatus === statusFilter;

        const matchesSearch =
          !normalizedSearch ||
          [order.id, order.receiverName, order.phone, order.userPhone, order.address]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(normalizedSearch));

        return matchesStatus && matchesSearch;
      });
  }, [orders, search, statusFilter]);

  const handleRefresh = () => {
    setOrders(getOrders());
    toast.success("لیست سفارش‌ها بروزرسانی شد");
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    const updatedOrders = updateOrderStatus(orderId, status);
    setOrders(updatedOrders);
    toast.success("وضعیت سفارش تغییر کرد");
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4" dir="rtl">
        <div className="rounded-3xl border border-neutral-200 bg-white px-8 py-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-neutral-200 border-t-red-600" />
          <p className="text-sm text-neutral-500">در حال بارگذاری سفارش‌ها...</p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn || !user || !isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-red-600 to-orange-500 py-14 text-white shadow-lg md:py-16">
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-6 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-black/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[34rem] -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-4xl shadow-inner backdrop-blur-md">
                🛒
              </div>
              <div>
                <p className="mb-3 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                  پنل مدیریت
                </p>
                <h1 className="text-3xl font-black md:text-4xl">مدیریت سفارش‌ها</h1>
                <p className="mt-1 text-sm text-white/80">
                  مشاهده سفارش‌ها، جست‌وجوی سریع و تغییر وضعیت ارسال
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-red-600 shadow-md transition hover:bg-red-50"
              >
                بروزرسانی لیست
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <StatCard title="کل سفارش‌ها" value={stats.total} icon="🧾" />
          <StatCard title="در انتظار" value={stats.pending} icon="⏳" />
          <StatCard title="پردازش" value={stats.processing} icon="⚙️" />
          <StatCard title="ارسال‌شده" value={stats.shipped} icon="🚚" />
          <StatCard title="تحویل‌شده" value={stats.delivered} icon="✅" />
          <StatCard title="مجموع فروش" value={formatPrice(stats.revenue)} icon="💰" suffix="تومان" />
        </section>

        <section className="mt-8 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="text-xs text-neutral-500">جست‌وجو</p>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="کد سفارش، نام، شماره یا آدرس..."
                  className="mt-1 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="text-xs text-neutral-500">فیلتر وضعیت</p>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "all" | OrderStatus)}
                  className="mt-1 w-full bg-transparent text-sm text-neutral-900 outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "همه وضعیت‌ها" : getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="text-xs text-neutral-500">نتیجه نمایش</p>
                <p className="mt-1 text-sm font-bold text-neutral-900">
                  {filteredOrders.length.toLocaleString("fa-IR")} سفارش
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              بروزرسانی لیست
            </button>
          </div>
        </section>

        <section className="mt-4 flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                statusFilter === status
                  ? "bg-red-600 text-white shadow-sm"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {status === "all" ? "همه" : getStatusLabel(status)}
            </button>
          ))}
        </section>

        <section className="mt-6">
          {filteredOrders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-3xl">
                📭
              </div>
              <h2 className="text-lg font-bold text-neutral-900">سفارشی پیدا نشد</h2>
              <p className="mt-2 text-sm text-neutral-500">
                با این جست‌وجو یا فیلتر، سفارشی وجود ندارد.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm xl:block">
                <table className="min-w-full divide-y divide-neutral-200 text-right">
                  <thead className="bg-neutral-50">
                    <tr className="text-xs font-bold text-neutral-500">
                      <th className="px-5 py-4">کد سفارش</th>
                      <th className="px-5 py-4">مشتری</th>
                      <th className="px-5 py-4">تاریخ</th>
                      <th className="px-5 py-4">اقلام</th>
                      <th className="px-5 py-4">مبلغ</th>
                      <th className="px-5 py-4">وضعیت</th>
                      <th className="px-5 py-4">تغییر وضعیت</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-100">
                    {filteredOrders.map((order) => {
                      const safeStatus = order.status ?? "pending";
                      const items = Array.isArray(order.items) ? order.items : [];
                      const isGoldOrder = order.orderType === "gold";

                      return (
                        <tr key={order.id} className="align-top transition hover:bg-neutral-50">
                          <td className="px-5 py-4">
                            <p className="font-bold text-neutral-900">
                              #{String(order.id).slice(-8).toUpperCase()}
                            </p>
                            <p className="mt-1 text-xs text-neutral-500">
                              {isGoldOrder ? "خرید طلا" : "سفارش محصول"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-bold text-neutral-900">
                              {order.receiverName || "بدون نام"}
                            </p>
                            <p className="mt-1 text-sm text-neutral-500">
                              {order.phone || "بدون شماره"}
                            </p>
                            <p className="mt-1 line-clamp-1 max-w-xs text-xs text-neutral-400">
                              {order.address || "بدون آدرس"}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-neutral-700">
                            {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-bold text-neutral-800">
                              {items.length.toLocaleString("fa-IR")} کالا
                            </p>

                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {items.slice(0, 3).map((item, index) => (
                                <span
                                  key={`${order.id}-${item.id}-${index}`}
                                  className="max-w-40 truncate rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-700"
                                >
                                  {item.title}
                                </span>
                              ))}

                              {items.length > 3 && (
                                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-700">
                                  +{items.length - 3}
                                </span>
                              )}

                              {isGoldOrder && (
                                <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-[11px] font-bold text-yellow-700">
                                  {order.goldWeight || 0} گرم طلا
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-black text-red-600">
                              {formatPrice(Number(order.totalPrice || 0))} تومان
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                                safeStatus
                              )}`}
                            >
                              {getStatusLabel(safeStatus)}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <select
                              value={safeStatus}
                              onChange={(event) =>
                                handleStatusChange(order.id, event.target.value as OrderStatus)
                              }
                              className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-500"
                            >
                              <option value="pending">در انتظار</option>
                              <option value="processing">در حال پردازش</option>
                              <option value="shipped">ارسال شده</option>
                              <option value="delivered">تحویل شده</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 xl:hidden">
                {filteredOrders.map((order) => {
                  const safeStatus = order.status ?? "pending";
                  const items = Array.isArray(order.items) ? order.items : [];
                  const isGoldOrder = order.orderType === "gold";

                  return (
                    <article
                      key={order.id}
                      className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black text-neutral-900">
                            #{String(order.id).slice(-8).toUpperCase()}
                          </h3>
                          <p className="mt-1 text-sm text-neutral-500">
                            {order.receiverName || "بدون نام"} · {order.phone || "بدون شماره"}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            safeStatus
                          )}`}
                        >
                          {getStatusLabel(safeStatus)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <InfoCell
                          label="تاریخ"
                          value={new Date(order.createdAt).toLocaleDateString("fa-IR")}
                        />
                        <InfoCell
                          label="مبلغ"
                          value={`${formatPrice(Number(order.totalPrice || 0))} تومان`}
                        />
                        <InfoCell
                          label="اقلام"
                          value={`${items.length.toLocaleString("fa-IR")} کالا`}
                        />
                        <InfoCell
                          label="نوع"
                          value={isGoldOrder ? "خرید طلا" : "محصولی"}
                        />
                      </div>

                      {isGoldOrder && (
                        <div className="mt-4 rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-800">
                          وزن طلا: {order.goldWeight || 0} گرم
                        </div>
                      )}

                      <div className="mt-4 rounded-2xl bg-neutral-50 px-4 py-3">
                        <p className="text-xs text-neutral-500">آدرس</p>
                        <p className="mt-1 text-sm text-neutral-800">
                          {order.address || "ثبت نشده"}
                        </p>
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-xs font-bold text-neutral-500">
                          تغییر وضعیت سفارش
                        </label>
                        <select
                          value={safeStatus}
                          onChange={(event) =>
                            handleStatusChange(order.id, event.target.value as OrderStatus)
                          }
                          className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500"
                        >
                          <option value="pending">در انتظار</option>
                          <option value="processing">در حال پردازش</option>
                          <option value="shipped">ارسال شده</option>
                          <option value="delivered">تحویل شده</option>
                        </select>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  suffix,
}: {
  title: string;
  value: number | string;
  icon: string;
  suffix?: string;
}) {
  const displayValue = typeof value === "number" ? value.toLocaleString("fa-IR") : value;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="mt-2 text-xl font-bold text-neutral-900">
            {displayValue} {suffix || ""}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 px-3 py-3">
      <p className="text-[11px] text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-neutral-800">{value}</p>
    </div>
  );
}
