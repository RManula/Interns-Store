import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyWizard } from "@/components/apply/ApplyWizard";
import { getCompany } from "@/lib/data";
import { resolveInternship } from "@/lib/listings";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const internship = await resolveInternship(id);
  return { title: internship ? `Apply · ${internship.role}` : "Apply" };
}

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const internship = await resolveInternship(id);
  if (!internship) notFound();
  const company = getCompany(internship.companyId);
  return <ApplyWizard internship={internship} company={company} />;
}
