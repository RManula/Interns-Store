import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Building2, CalendarDays, Globe, MapPin, Star, Users } from "lucide-react";
import { companies, internships } from "@/lib/data";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { CompanyReviews } from "@/components/reviews/CompanyReviews";

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
  const stats = [
    { icon: Users, label: "Employees", value: company.employees ?? company.size },
    { icon: Building2, label: "Open roles", value: `${openRoles.length}` },
    { icon: CalendarDays, label: "Founded", value: company.founded ?? "—" },
    { icon: Star, label: "Student rating", value: company.rating ? `${company.rating}/5` : "—" },
  ];

  return (
    <div>
      {/* banner hero */}
      <section className="relative">
        <div className="relative h-52 w-full overflow-hidden sm:h-64 lg:h-72">
          {company.banner ? (
            <Image src={company.banner} alt={`${company.name} banner`} fill priority className="object-cover" sizes="100vw" />
          ) : (
            <div className="mesh-dark h-full w-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
        </div>

        <div className="container-shell relative -mt-16 pb-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <span className="rounded-3xl bg-white p-2 shadow-[var(--shadow-md)]">
              <CompanyLogo logo={company.logo} name={company.name} color={company.color} size={92} className="rounded-2xl" />
            </span>
            <div className="pb-2">
              <h1 className="flex items-center gap-2 font-heading text-2xl font-semibold text-navy-950 sm:text-3xl">
                {company.name}
                {company.verified && <BadgeCheck size={22} className="text-blue-600" />}
              </h1>
              <p className="mt-1 text-muted">{company.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="container-shell">
          <Link href="/companies" className="text-sm font-bold text-blue-700 hover:underline">← All companies</Link>

          {/* stat cards */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-white p-5">
                <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-700"><s.icon size={17} /></span>
                <p className="mt-3 font-heading text-xl font-semibold text-navy-950">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="font-heading text-lg font-semibold text-navy-950">About {company.name}</h2>
                <p className="mt-3 text-sm leading-7 text-ink">{company.about}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5"><Building2 size={15} /> {company.industry}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={15} /> {company.location ?? "Australia"}</span>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-semibold text-blue-700 hover:underline">
                      <Globe size={15} /> Website
                    </a>
                  )}
                </div>
              </div>

              {company.tech && company.tech.length > 0 && (
                <div className="rounded-2xl border border-line bg-white p-6">
                  <h2 className="font-heading text-lg font-semibold text-navy-950">Technologies & tools</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {company.tech.map((t) => (
                      <span key={t} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{t}</span>
                    ))}
                  </div>
                </div>
              )}

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

              <CompanyReviews companyId={company.id} companyName={company.name} />
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-heading text-base font-semibold text-navy-950">Why intern here</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {(company.benefits ?? ["Real work from day one", "Mentoring from senior staff", "A reference and portfolio pieces", "Potential graduate pathway"]).map((b) => (
                    <li key={b} className="flex items-start gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500" /> {b}</li>
                  ))}
                </ul>
              </div>
              <Link href={`/browse?q=${encodeURIComponent(company.name)}`} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
                View all roles <ArrowRight size={15} />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
