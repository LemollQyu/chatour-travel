// File: app/api/ip/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";

  const cleanedIp = ip === "::1" ? "127.0.0.1" : ip;

  return NextResponse.json({ ip: cleanedIp });
}
