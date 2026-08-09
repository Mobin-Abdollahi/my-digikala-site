import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const COOKIE_NAME = "auth_token";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_super_secret_jwt_key_123456"
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "نام و شماره موبایل الزامی است.",
        },
        { status: 400 }
      );
    }

    const user = {
      id: crypto.randomUUID(),
      name,
      phone,
      role: "user",
    };

    const token = await new SignJWT({
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      user,
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
      {
        success: false,
        message: "خطایی در سرور رخ داده است.",
      },
      { status: 500 }
    );
  }
}
