import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// All employer-posted listings (the raw Internship objects), newest first.
export async function GET() {
  const listings = await prisma.listing.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ listings: listings.map((l) => l.data) });
}

// Publish a new employer listing.
export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { listing } = (await req.json()) ?? {};
  if (!listing?.id) return NextResponse.json({ ok: false, error: "Invalid listing." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "employer") {
    return NextResponse.json({ ok: false, error: "Only employers can post listings." }, { status: 403 });
  }

  const saved = await prisma.listing.upsert({
    where: { id: listing.id },
    create: { id: listing.id, postedById: userId, companyId: listing.companyId ?? "", data: listing },
    update: { data: listing, companyId: listing.companyId ?? "" },
  });

  return NextResponse.json({ ok: true, listing: saved.data });
}
