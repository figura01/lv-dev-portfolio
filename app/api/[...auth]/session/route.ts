// app/api/auth/session/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return NextResponse.json({ session });
}
