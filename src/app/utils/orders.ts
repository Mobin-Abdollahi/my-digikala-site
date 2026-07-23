import type { Order, OrderStatus } from "../types/order";

const ORDERS_KEY = "digikala-orders";

function readOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawOrders = localStorage.getItem(ORDERS_KEY);

  if (!rawOrders) {
    return [];
  }

  try {
    const parsedOrders = JSON.parse(rawOrders);

    if (!Array.isArray(parsedOrders)) {
      return [];
    }

    return parsedOrders;
  } catch {
    localStorage.removeItem(ORDERS_KEY);
    return [];
  }
}

function writeOrders(orders: Order[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] {
  return readOrders();
}

export function getOrdersByUserPhone(phone: string): Order[] {
  return readOrders().filter((order) => order.userPhone === phone);
}

export function saveOrder(order: Order) {
  const orders = readOrders();
  writeOrders([order, ...orders]);
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const updatedOrders = readOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order
  );

  writeOrders(updatedOrders);
  return updatedOrders;
}

export function clearOrders() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ORDERS_KEY);
}
