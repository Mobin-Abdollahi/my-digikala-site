import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { isAdminPhone, normalizePhone } from "../../../utils/auth";

const COOKIE_NAME = "auth_token";

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "اطلاعات ناقص است." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);

    if (!normalizedPhone) {
      return NextResponse.json(
        { success: false, message: "شماره تلفن نامعتبر است." },
        { status: 400 }
      );
    }

    const isAdmin = isAdminPhone(normalizedPhone);
    const userId = normalizedPhone;

    const token = await new SignJWT({
      id: userId,
      name: String(name).trim(),
      phone: normalizedPhone,
      role: isAdmin ? "admin" : "user",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      message: "با موفقیت وارد شدید.",
    });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}
