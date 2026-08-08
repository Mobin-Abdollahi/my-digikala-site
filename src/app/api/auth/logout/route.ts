// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // منقضی کردن کوکی
  response.cookies.set("digikala_session", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
