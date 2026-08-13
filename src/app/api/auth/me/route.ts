import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "auth_token";

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({
        isLoggedIn: false,
        user: null,
      });
    }

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        id: String(payload.id),
        name: String(payload.name),
        phone: String(payload.phone),
        role: String(payload.role || "user"),
      },
    });
  } catch {
    return NextResponse.json({
      isLoggedIn: false,
      user: null,
    });
  }
}
