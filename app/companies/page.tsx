import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Building2 } from "lucide-react";
import { companies, internships } from "@/lib/data";
import { CompanyLogo } from "@/components/shared/CompanyLogo";

export const metadata: Metadata = {
  title: "Companies — Interns Store",
  description: "Explore Australian employers hiring student interns on Interns Store.",
};

function openCount(companyId: string) {
  return internships.filter((i) => i.companyId === companyId).length;
}

export default function CompaniesPage() {
  return (
    <div>
      <section className="mesh-dark px-4 pb-14 pt-32 text-white">
        <div className="container-shell">
          <span className="eyebrow !text-blue-100">Companies</span>
          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
            Employers hiring student interns
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Explore verified Australian companies offering internships, placements and graduate pathways.
          </p>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-shell">
          <p className="mb-6 text-sm font-bold text-navy-950">{companies.length} companies</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => {
              const count = openCount(c.id);
              return (
                <Link
                  key={c.id}
                  href={`/companies/${c.id}`}
                  className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[var(--shadow-sm)]"
                >
                  <div className="flex items-center gap-3">
                    <CompanyLogo logo={c.logo} name={c.name} color={c.color} size={48} />
                    <div className="min-w-0">
                      <h2 className="flex items-center gap-1.5 truncate font-heading text-base font-semibold text-navy-950 group-hover:text-blue-700">
                        {c.name}
                        {c.verified && <BadgeCheck size={15} className="shrink-0 text-blue-600" />}
                      </h2>
                      <p className="truncate text-xs text-muted">{c.industry}</p>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-ink">{c.tagline}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs font-semibold text-muted">
                    <span className="flex items-center gap-1.5"><Building2 size={13} /> {c.size}</span>
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <Briefcase size={13} /> {count} open
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-white p-6 text-center">
            <p className="font-heading text-lg font-semibold text-navy-950">Hiring interns?</p>
            <p className="mt-1 text-sm text-muted">Create a company profile and reach work-ready students.</p>
            <Link href="/for-employers" className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
              Learn about employer tools <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
