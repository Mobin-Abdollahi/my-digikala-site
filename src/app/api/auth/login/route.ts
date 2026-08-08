// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!phone || !name) {
      return NextResponse.json(
        { error: "نام و شماره موبایل الزامی است." },
        { status: 400 }
      );
    }

    const user = { id: Date.now().toString(), name, phone };
    const userSessionData = JSON.stringify(user);

    const response = NextResponse.json({ success: true, user });

    // ست کردن کوکی HttpOnly برای امنیت نشست کاربر
    response.cookies.set("digikala_session", userSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // ۱ هفته
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "خطایی در سرور رخ داده است." },
      { status: 500 }
    );
  }
}
