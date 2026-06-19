import "server-only";
import { prisma } from "@/lib/prisma";
import { internships } from "@/lib/data";
import type { Internship } from "@/lib/types";

/**
 * Resolve a listing by id from any source:
 *  - the static catalogue (lib/data.ts), or
 *  - an employer-posted DB listing.
 * Returns null if it doesn't exist or has been removed by its employer.
 */
export async function resolveInternship(id: string): Promise<Internship | null> {
  const removed = await prisma.removedListing.findUnique({ where: { jobId: id } });
  if (removed) return null;

  const fromCatalogue = internships.find((i) => i.id === id);
  if (fromCatalogue) return fromCatalogue;

  const posted = await prisma.listing.findUnique({ where: { id } });
  return posted ? (posted.data as unknown as Internship) : null;
}

/** Job ids the current employer owns: catalogue jobs for their company + their posted listings. */
export async function ownedJobIds(companyId: string | undefined, userId: string): Promise<string[]> {
  const catalogue = companyId
    ? internships.filter((i) => i.companyId === companyId).map((i) => i.id)
    : [];
  const posted = await prisma.listing.findMany({
    where: { postedById: userId },
    select: { id: true },
  });
  return Array.from(new Set([...catalogue, ...posted.map((p) => p.id)]));
}

/** Whether the current employer is allowed to remove a given listing id. */
export async function employerOwnsListing(
  employerCompanyId: string | undefined,
  userId: string,
  jobId: string,
): Promise<boolean> {
  const catalogue = internships.find((i) => i.id === jobId);
  if (catalogue) return Boolean(employerCompanyId) && catalogue.companyId === employerCompanyId;
  const posted = await prisma.listing.findUnique({ where: { id: jobId } });
  return Boolean(posted && posted.postedById === userId);
}
