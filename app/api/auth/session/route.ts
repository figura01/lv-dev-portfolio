import { auth } from "@/lib/auth-config";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(await headers()),
    });
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Failed to get session" },
      { status: 500 }
    );
  }
}
