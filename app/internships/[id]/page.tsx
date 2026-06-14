import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JobDetail } from "@/components/browse/JobDetail";
import { companies, getCompany, getInternship, internships } from "@/lib/data";

export function generateStaticParams() {
  return internships.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const internship = getInternship(id);
  return { title: internship ? `${internship.role} at ${internship.company}` : "Internship" };
}

export default async function InternshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const internship = getInternship(id);
  if (!internship) notFound();
  const company = getCompany(internship.companyId);
  const related = internships
    .filter((item) => item.id !== internship.id && item.field === internship.field)
    .slice(0, 3);

  return (
    <div className="bg-surface pb-20 pt-24">
      <div className="container-shell">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
        >
          <ArrowLeft size={16} /> Back to browse
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[1.4rem] shadow-[0_24px_70px_rgba(7,21,47,.1)]">
            <JobDetail internship={internship} company={company} variant="page" />
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Similar internships
              </p>
              {related.length > 0 ? (
                <div className="mt-3 space-y-3">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/internships/${item.id}`}
                      className="block rounded-xl border border-line p-3 transition hover:border-blue-500/40 hover:bg-blue-50/40"
                    >
                      <p className="font-heading text-sm font-semibold text-navy-950">{item.role}</p>
                      <p className="text-xs text-muted">{item.company} · {item.location}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">No similar roles right now.</p>
              )}
              <Link
                href={`/browse?field=${encodeURIComponent(internship.field)}`}
                className="mt-4 block text-sm font-bold text-blue-700 hover:underline"
              >
                See all {internship.field} internships →
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <p className="sr-only">{companies.length} companies hiring on Interns Store.</p>
    </div>
  );
}
