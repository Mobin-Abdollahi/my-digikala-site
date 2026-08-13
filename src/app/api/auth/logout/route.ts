import { NextResponse } from "next/server";

const COOKIE_NAME = "auth_token";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "با موفقیت خارج شدید.",
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
