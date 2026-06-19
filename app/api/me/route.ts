import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCurrentUser();
  if (!data) return NextResponse.json({ user: null });
  return NextResponse.json(data);
}
