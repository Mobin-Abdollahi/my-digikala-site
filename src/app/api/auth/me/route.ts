import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "auth_token";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_super_secret_jwt_key_123456"
);

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({
      isLoggedIn: false,
      user: null,
    });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        id: String(payload.id),
        name: String(payload.name),
        phone: String(payload.phone),
        role: payload.role ? String(payload.role) : "user",
      },
    });
  } catch {
    return NextResponse.json({
      isLoggedIn: false,
      user: null,
    });
  }
}
