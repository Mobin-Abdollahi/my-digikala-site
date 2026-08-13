// نوع Order
export interface OrderItem {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  userPhone: string;
  receiverName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  orderType?: "product" | "gold";
  goldWeight?: number;
  goldPricePerGram?: number;
}

declare global {
  var __digikala_orders_store__: Order[] | undefined;
}

// ذخیره‌سازی موقت در حافظه (در تولید باید به دیتابیس منتقل شود)
const ordersStore: Order[] =
  globalThis.__digikala_orders_store__ ?? (globalThis.__digikala_orders_store__ = []);

export function addOrder(order: Order): Order {
  ordersStore.unshift(order);
  return order;
}

export function getOrders(): Order[] {
  return [...ordersStore];
}

export function getOrdersByUserId(userId: string): Order[] {
  return ordersStore.filter((order) => order.userId === userId);
}

export function getOrderById(orderId: string): Order | undefined {
  return ordersStore.find((order) => order.id === orderId);
}

export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Order | undefined {
  const order = ordersStore.find((order) => order.id === orderId);
  if (order) {
    order.status = status;
  }
  return order;
}
