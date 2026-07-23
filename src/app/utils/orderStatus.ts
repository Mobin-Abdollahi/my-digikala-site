import type { OrderStatus } from "../types/order";

export const statusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
};

export const statusClasses: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export function getStatusLabel(status: OrderStatus) {
  return statusLabels[status];
}

export function getStatusClass(status: OrderStatus) {
  return statusClasses[status];
}
