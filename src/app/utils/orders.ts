import type { Order, OrderStatus } from "../types/order";

const ORDERS_KEY = "digikala-orders";

function readOrders(): Order[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(ORDERS_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed as Order[];
  } catch {
    localStorage.removeItem(ORDERS_KEY);
    return [];
  }
}

function writeOrders(orders: Order[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] {
  return readOrders();
}

export function saveOrder(order: Order) {
  const orders = readOrders();
  const updatedOrders = [order, ...orders];
  writeOrders(updatedOrders);
  return updatedOrders;
}

export function getOrdersByUser(user: { id?: string; phone: string }): Order[] {
  return readOrders().filter((order) => {
    if (user.id && order.userId) {
      return order.userId === user.id;
    }

    return !order.userId && order.userPhone === user.phone;
  });
}

export function getOrdersByUserPhone(userPhone: string): Order[] {
  return readOrders().filter((order) => order.userPhone === userPhone);
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const updatedOrders = readOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order
  );

  writeOrders(updatedOrders);
  return updatedOrders;
}
