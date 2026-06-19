import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { employerOwnsListing } from "@/lib/listings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Employer-posted listings (raw Internship objects) + the ids removed by their
// employers (so the marketplace can hide them from the static catalogue too).
export async function GET() {
  const [listings, removed] = await Promise.all([
    prisma.listing.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.removedListing.findMany({ select: { jobId: true } }),
  ]);
  return NextResponse.json({
    listings: listings.map((l) => l.data),
    removed: removed.map((r) => r.jobId),
  });
}

// Remove a listing the current employer owns (catalogue or posted).
export async function DELETE(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { jobId } = (await req.json()) ?? {};
  if (!jobId) return NextResponse.json({ ok: false, error: "Missing jobId." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "employer") {
    return NextResponse.json({ ok: false, error: "Only employers can remove listings." }, { status: 403 });
  }

  const companyId = (user.employer as { companyId?: string } | null)?.companyId;
  const owns = await employerOwnsListing(companyId, userId, jobId);
  if (!owns) {
    return NextResponse.json({ ok: false, error: "You don't own this listing." }, { status: 403 });
  }

  // Delete the posted row if it exists, and record the removal so catalogue
  // listings are hidden from the marketplace for everyone.
  await prisma.listing.deleteMany({ where: { id: jobId, postedById: userId } });
  await prisma.removedListing.upsert({
    where: { jobId },
    update: {},
    create: { jobId, removedBy: userId },
  });

  return NextResponse.json({ ok: true });
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
