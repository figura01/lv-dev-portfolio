import { auth } from "@/lib/auth-config";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(request.headers),
    });
    return NextResponse.json({ valid: !!session?.user });
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
