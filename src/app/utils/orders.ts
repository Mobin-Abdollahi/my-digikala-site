import type { Order } from "../types/order";

/**
 * دریافت سفارش‌های کاربر از API سرور
 * (جایگزین localStorage)
 */
export async function fetchUserOrders(): Promise<Order[]> {
  try {
    const response = await fetch("/api/orders", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.orders || [];
  } catch {
    return [];
  }
}

/**
 * ایجاد سفارش جدید (محصولات)
 */
export async function createOrder(orderData: {
  receiverName: string;
  phone: string;
  address: string;
  items: any[];
}): Promise<{ success: boolean; order?: Order; message?: string }> {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || "خطا در ایجاد سفارش",
      };
    }

    return {
      success: true,
      order: data.order,
    };
  } catch {
    return {
      success: false,
      message: "خطای ارتباط با سرور",
    };
  }
}

/**
 * ایجاد سفارش طلا
 */
export async function createGoldOrder(
  goldData: {
    receiverName: string;
    phone: string;
    goldWeight: number;
    goldPricePerGram: number;
    totalPrice: number;
  }
): Promise<{ success: boolean; order?: any; message?: string }> {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiverName: goldData.receiverName,
        phone: goldData.phone,
        address: "خرید طلای دیجیتال",
        items: [], // طلا اقلام مشخصی ندارد
        totalPrice: goldData.totalPrice,
        orderType: "gold",
        goldWeight: goldData.goldWeight,
        goldPricePerGram: goldData.goldPricePerGram,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || "خطا در ایجاد سفارش",
      };
    }

    return {
      success: true,
      order: data.order,
    };
  } catch {
    return {
      success: false,
      message: "خطای ارتباط با سرور",
    };
  }
}

/**
 * دریافت تمام سفارش‌ها (برای ادمین)
 */
export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const response = await fetch("/api/orders/all", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.orders || [];
  } catch {
    return [];
  }
}

// کارهای قدیمی که اکنون استفاده نمی‌شوند (برای سازگاری)
export function getOrders(): Order[] {
  return [];
}

export function saveOrder(order: Order) {
  return [order];
}

export function getOrdersByUser(user: { id?: string; phone: string }): Order[] {
  if (!user) return [];

  const stored = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("digikala_orders") || "[]")
    : [];

  return (stored as Order[]).filter((order) => {
    if (user.id && order.userId && order.userId === user.id) return true;
    if (!user.id && order.userPhone && order.userPhone === user.phone) return true;
    return order.phone === user.phone || order.userPhone === user.phone;
  });
}

export function getOrdersByUserPhone(userPhone: string): Order[] {
  const stored = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("digikala_orders") || "[]")
    : [];

  return (stored as Order[]).filter((order) => order.phone === userPhone || order.userPhone === userPhone);
}

export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Order[] {
  const stored = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("digikala_orders") || "[]")
    : [];

  const next = (stored as Order[]).map((order) =>
    order.id === orderId ? { ...order, status } : order
  );

  if (typeof window !== "undefined") {
    localStorage.setItem("digikala_orders", JSON.stringify(next));
  }

  return next;
}
