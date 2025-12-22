// app/api/validate-session/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(request.headers),
    });
    return NextResponse.json({ valid: !!session?.user });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
