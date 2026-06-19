import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Merge a partial patch into the current student's profile JSON.
export async function PATCH(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { patch } = (await req.json()) ?? {};
  if (!patch || typeof patch !== "object") {
    return NextResponse.json({ ok: false, error: "Missing patch." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "student") {
    return NextResponse.json({ ok: false, error: "Not a student account." }, { status: 400 });
  }

  const current = (user.student as Record<string, unknown>) ?? {};
  const merged = { ...current, ...patch };

  await prisma.user.update({ where: { id: userId }, data: { student: merged } });
  return NextResponse.json({ ok: true, student: merged });
}
