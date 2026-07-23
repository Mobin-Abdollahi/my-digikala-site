/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderStatus } from "../../types/order";
import { useAuth } from "../../store/auth-context";
import { formatPrice } from "../../utils/formatPrice";
import { getOrders, updateOrderStatus } from "../../utils/orders";
import { isAdminPhone } from "../../utils/auth";
import {
  getStatusClass,
  getStatusLabel,
  statusLabels,
} from "../../utils/orderStatus";

const statusOptions: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace("/login?redirect=/admin/orders");
      return;
    }

    if (!isAdminPhone(user.phone)) {
      router.replace("/");
      return;
    }

    setOrders(getOrders());
    setIsAuthorized(true);
  }, [isLoggedIn, router, user]);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    const updatedOrders = updateOrderStatus(orderId, status);
    setOrders(updatedOrders);
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8" dir="rtl">
      <h1 className="mb-6 text-2xl font-bold">مدیریت سفارش‌ها</h1>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
          هنوز سفارشی ثبت نشده است.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const safeStatus = order.status ?? "pending";

            return (
              <div
                key={order.id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="mb-4 flex flex-col gap-2 border-b pb-4 text-sm text-gray-600">
                  <span>کد سفارش: {order.id}</span>
                  <span>گیرنده: {order.receiverName}</span>
                  <span>شماره تماس: {order.phone}</span>
                  <span>
                    تاریخ: {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>

                <div className="mb-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <strong className="text-red-600">
                      مبلغ کل: {formatPrice(order.totalPrice)}
                    </strong>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        safeStatus
                      )}`}
                    >
                      {getStatusLabel(safeStatus)}
                    </span>
                  </div>

                  <select
                    value={safeStatus}
                    onChange={(event) =>
                      handleStatusChange(
                        order.id,
                        event.target.value as OrderStatus
                      )
                    }
                    className="rounded-md border px-3 py-2"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
