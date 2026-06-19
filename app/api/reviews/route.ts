import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.review.findMany({ orderBy: { date: "desc" } });
  const reviews = rows.map((r) => ({
    id: r.id,
    companyId: r.companyId,
    companyName: r.companyName,
    authorName: r.authorName,
    authorRole: r.authorRole,
    rating: r.rating,
    title: r.title,
    body: r.body,
    date: r.date.toISOString(),
  }));
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  const review = (await req.json()) ?? {};
  if (!review.companyId || !review.title || !review.body) {
    return NextResponse.json({ ok: false, error: "Missing review fields." }, { status: 400 });
  }

  const saved = await prisma.review.create({
    data: {
      companyId: review.companyId,
      companyName: review.companyName ?? "",
      authorName: review.authorName ?? "Anonymous",
      authorRole: review.authorRole ?? "student",
      rating: Number(review.rating) || 5,
      title: review.title,
      body: review.body,
      authorId: userId ?? undefined,
    },
  });

  return NextResponse.json({
    ok: true,
    review: { ...saved, date: saved.date.toISOString() },
  });
}
