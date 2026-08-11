/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    // احراز هویت
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    const body = await req.json();
    const { receiverName, phone, address, items } = body;

    // محاسبه قیمت در سمت سرور (امنیت بیشتر)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalPrice = items.reduce((sum: number, item: any) => 
      sum + Number(item.price || 0) * Number(item.quantity || 1), 0);

    const newOrder = {
      id: crypto.randomUUID(),
      userId: payload.id,
      userPhone: payload.phone,
      receiverName,
      phone,
      address,
      items,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // ذخیره در دیتابیس یا حافظه موقت (Global)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalWithOrders = globalThis as unknown as { orders: any[] };
    if (!globalWithOrders.orders) globalWithOrders.orders = [];
    globalWithOrders.orders.unshift(newOrder);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
