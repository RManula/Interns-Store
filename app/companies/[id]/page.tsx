import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Building2, MapPin, Users } from "lucide-react";
import { companies, internships } from "@/lib/data";

export function generateStaticParams() {
  return companies.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const company = companies.find((c) => c.id === id);
  return { title: company ? `${company.name} — Interns Store` : "Company — Interns Store" };
}

export default async function CompanyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = companies.find((c) => c.id === id);
  if (!company) notFound();

  const openRoles = internships.filter((i) => i.companyId === company.id);

  return (
    <div>
      {/* hero */}
      <section className="mesh-dark px-4 pb-14 pt-32 text-white">
        <div className="container-shell">
          <Link href="/companies" className="text-sm font-bold text-blue-200 hover:underline">← All companies</Link>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid size-20 shrink-0 place-items-center rounded-2xl text-3xl font-extrabold text-white shadow-lg" style={{ backgroundColor: company.color }}>
              {company.name.charAt(0)}
            </span>
            <div>
              <h1 className="flex items-center gap-2 font-heading text-3xl font-semibold sm:text-4xl">
                {company.name}
                {company.verified && <BadgeCheck size={22} className="text-blue-300" />}
              </h1>
              <p className="mt-2 text-white/70">{company.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/55">
                <span className="flex items-center gap-1.5"><Building2 size={15} /> {company.industry}</span>
                <span className="flex items-center gap-1.5"><Users size={15} /> {company.size}</span>
                <span className="flex items-center gap-1.5"><MapPin size={15} /> Australia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-heading text-lg font-semibold text-navy-950">About {company.name}</h2>
              <p className="mt-3 text-sm leading-7 text-ink">{company.about}</p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-heading text-lg font-semibold text-navy-950">Open internships ({openRoles.length})</h2>
              {openRoles.length ? (
                <div className="mt-4 space-y-3">
                  {openRoles.map((role) => (
                    <Link key={role.id} href={`/internships/${role.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-line p-4 transition hover:border-blue-500/40 hover:bg-blue-50/40">
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-semibold text-navy-950">{role.role}</p>
                        <p className="text-xs text-muted">{role.location} · {role.mode} · {role.workType}</p>
                      </div>
                      <ArrowRight size={16} className="shrink-0 text-blue-600" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">No open internships right now. Check back soon.</p>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="font-heading text-base font-semibold text-navy-950">Why intern here</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Real client work from day one</li>
                <li>Mentoring from senior staff</li>
                <li>A reference and portfolio pieces</li>
                <li>Potential graduate pathway</li>
              </ul>
            </div>
            <Link href={`/browse?q=${encodeURIComponent(company.name)}`} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
              View all roles <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
