import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Toggle a saved job for the current user.
export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { jobId } = (await req.json()) ?? {};
  if (!jobId) return NextResponse.json({ ok: false, error: "Missing jobId." }, { status: 400 });

  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId, jobId } },
  });

  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } });
    return NextResponse.json({ ok: true, saved: false });
  }

  await prisma.savedJob.create({ data: { userId, jobId } });
  return NextResponse.json({ ok: true, saved: true });
}
