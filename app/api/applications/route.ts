import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Create (or replace) the current user's application for a job.
export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const app = (await req.json()) ?? {};
  if (!app.jobId) return NextResponse.json({ ok: false, error: "Missing jobId." }, { status: 400 });

  const data = {
    jobRole: app.jobRole ?? "",
    company: app.company ?? "",
    status: app.status ?? "Submitted",
    resumeName: app.resumeName ?? null,
    coverLetter: app.coverLetter ?? null,
    answers: app.answers ?? {},
  };

  const saved = await prisma.application.upsert({
    where: { userId_jobId: { userId, jobId: app.jobId } },
    create: { userId, jobId: app.jobId, ...data },
    update: data,
  });

  return NextResponse.json({ ok: true, application: saved });
}
