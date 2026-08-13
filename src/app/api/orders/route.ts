/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { addOrder, getOrders, getOrdersByUserId } from "../lib/orders-storage";
import type { Order } from "../lib/orders-storage";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

// GET: دریافت سفارش‌های کاربر
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = String(payload.id || "");
    const userPhone = String(payload.phone || "");

    const allOrders = getOrders();
    const userOrders = allOrders.filter((order) => {
      if (userId && order.userId === userId) return true;
      if (userPhone && (order.userPhone === userPhone || order.phone === userPhone)) return true;
      return false;
    });

    return NextResponse.json({
      success: true,
      orders: userOrders,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: ایجاد سفارش جدید
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // احراز هویت کاربر
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const body = await req.json();
    const {
      receiverName,
      phone,
      address,
      items,
      orderType,
      goldWeight,
      goldPricePerGram,
      totalPrice: providedTotalPrice,
    } = body;

    const normalizedOrderType = orderType === "gold" ? "gold" : "product";
    const normalizedItems = Array.isArray(items) ? items : [];

    if (!receiverName || !phone || !address) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    if (normalizedOrderType === "gold") {
      const goldAmount = Number(goldWeight || 0);
      const goldPrice = Number(goldPricePerGram || 0);
      const totalPrice = Number(providedTotalPrice || 0);

      if (!goldAmount || !goldPrice || !totalPrice || totalPrice <= 0) {
        return NextResponse.json(
          { error: "Invalid gold order data" },
          { status: 400 }
        );
      }

      const newOrder: Order = {
        id: crypto.randomUUID(),
        userId: String(payload.id),
        userPhone: String(payload.phone),
        receiverName,
        phone,
        address,
        items: [],
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
        orderType: "gold",
        goldWeight: goldAmount,
        goldPricePerGram: goldPrice,
      };

      addOrder(newOrder);

      return NextResponse.json(
        { success: true, order: newOrder },
        { status: 201 }
      );
    }

    if (normalizedItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    // محاسبه قیمت کل در سمت سرور (برای امنیت بیشتر)
    const totalPrice = normalizedItems.reduce(
      (sum: number, item: { price?: number; quantity?: number }) =>
        sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: String(payload.id),
      userPhone: String(payload.phone),
      receiverName,
      phone,
      address,
      items: normalizedItems,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
      orderType: "product",
    };

    // ذخیره سفارش در سرور
    addOrder(newOrder);

    return NextResponse.json(
      { success: true, order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
