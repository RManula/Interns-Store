import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { ownedJobIds } from "@/lib/listings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Applications for every job the current employer owns, with applicant details.
export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ applications: [] }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "employer") {
    return NextResponse.json({ applications: [] }, { status: 403 });
  }

  const companyId = (user.employer as { companyId?: string } | null)?.companyId;
  const jobIds = await ownedJobIds(companyId, userId);
  if (jobIds.length === 0) return NextResponse.json({ applications: [] });

  const apps = await prisma.application.findMany({
    where: { jobId: { in: jobIds } },
    orderBy: { submittedAt: "desc" },
    include: { user: { select: { name: true, email: true, student: true } } },
  });

  const applications = apps.map((a) => {
    const student = (a.user.student as { headline?: string; location?: string; skills?: string[] } | null) ?? null;
    return {
      id: a.id,
      jobId: a.jobId,
      jobRole: a.jobRole,
      company: a.company,
      status: a.status,
      submittedAt: a.submittedAt.toISOString(),
      resumeName: a.resumeName,
      coverLetter: a.coverLetter,
      answers: a.answers,
      applicantName: a.user.name,
      applicantEmail: a.user.email,
      applicantHeadline: student?.headline ?? null,
      applicantLocation: student?.location ?? null,
      applicantSkills: student?.skills ?? [],
    };
  });

  return NextResponse.json({ applications });
}
