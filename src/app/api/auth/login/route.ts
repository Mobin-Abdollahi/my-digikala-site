import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const COOKIE_NAME = "auth_token";

// دریافت و اعتبارسنجی Secret در سطح ماژول (Fail-Fast)
if (!process.env.JWT_SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: "اطلاعات ناقص است." }, { status: 400 });
    }

    // ایجاد توکن با استفاده از jose
    const token = await new SignJWT({
      id: crypto.randomUUID(),
      name,
      phone,
      role: phone === "admin_phone_number" ? "admin" : "user", // منطق یکپارچه‌سازی ادمین
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
