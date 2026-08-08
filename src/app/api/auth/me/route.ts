// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("digikala_session");

  if (!session || !session.value) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }

  try {
    const user = JSON.parse(session.value);
    return NextResponse.json({ isLoggedIn: true, user });
  } catch {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
}
