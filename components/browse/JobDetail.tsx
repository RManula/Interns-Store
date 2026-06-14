"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type { Company, Internship } from "@/lib/types";
import { useApp } from "@/lib/store";
import { cn, postedLabel } from "@/lib/utils";

type JobDetailProps = {
  internship: Internship;
  company?: Company;
  variant?: "preview" | "page";
};

export function JobDetail({ internship, company, variant = "page" }: JobDetailProps) {
  const router = useRouter();
  const { user, isSaved, toggleSave } = useApp();
  const saved = isSaved(internship.id);
  const applyHref = `/internships/${internship.id}/apply`;

  const handleSave = () => {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/internships/${internship.id}`)}`);
      return;
    }
    toggleSave(internship.id);
  };

  const meta = [
    { icon: MapPin, text: internship.location },
    { icon: BriefcaseBusiness, text: internship.classification },
    { icon: Clock3, text: `${internship.workType} · ${internship.duration}` },
    { icon: Banknote, text: internship.salary },
  ];

  return (
    <article className={cn(variant === "preview" && "text-ink")}>
      <div
        className="relative flex h-36 items-end overflow-hidden rounded-t-[1.4rem] p-6 text-white"
        style={{
          background: `linear-gradient(130deg, ${internship.color} 0%, #07152f 95%)`,
        }}
      >
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            {company?.tagline ?? internship.company}
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold">{internship.company}</p>
        </div>
        <Sparkles className="absolute right-5 top-5 text-white/30" size={26} />
      </div>

      <div className={cn("rounded-b-[1.4rem] border border-t-0 border-line bg-white p-6 md:p-8")}>
        <div className="flex items-start gap-4">
          <span
            className="grid size-14 shrink-0 place-items-center rounded-2xl text-xl font-extrabold text-white"
            style={{ backgroundColor: internship.color }}
          >
            {internship.company.charAt(0)}
          </span>
          <div className="min-w-0">
            <h1
              className={cn(
                "font-heading font-semibold leading-tight text-navy-950",
                variant === "page" ? "text-3xl" : "text-2xl",
              )}
            >
              {internship.role}
            </h1>
            <p className="mt-1 text-sm font-semibold text-muted">
              {internship.company}
              {company && (
                <Link
                  href={`/browse?q=${encodeURIComponent(internship.company)}`}
                  className="ms-2 font-bold text-blue-700 underline-offset-2 hover:underline"
                >
                  View all jobs
                </Link>
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {meta.map((row) => (
            <p key={row.text} className="flex items-center gap-2.5 text-sm text-ink">
              <row.icon size={17} className="shrink-0 text-blue-600" />
              {row.text}
            </p>
          ))}
        </div>

        <p className="mt-4 text-xs font-semibold text-muted">
          {postedLabel(internship.postedDaysAgo)} · {internship.applicantVolume} application volume
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {internship.paid && (
            <Badge className="bg-blue-50 text-blue-700">Paid</Badge>
          )}
          {internship.friendly && (
            <Badge className="bg-mint-500/12 text-emerald-700">First internship friendly</Badge>
          )}
          {internship.credit && (
            <Badge className="bg-violet-50 text-violet-700">Credit eligible</Badge>
          )}
          {internship.mode === "Remote" && (
            <Badge className="bg-navy-950/5 text-navy-900">Remote</Badge>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={applyHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-coral-500 px-7 text-sm font-bold text-white shadow-[0_14px_38px_rgba(255,107,74,.28)] transition hover:-translate-y-0.5 hover:bg-coral-600"
          >
            Quick apply
          </Link>
          <button
            type="button"
            onClick={handleSave}
            aria-pressed={saved}
            className={cn(
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-bold transition",
              saved
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-line bg-white text-navy-900 hover:bg-blue-50",
            )}
          >
            <Bookmark size={17} className={cn(saved && "fill-blue-600")} />
            {saved ? "Saved" : "Save"}
          </button>
          {variant === "preview" && (
            <Link
              href={`/internships/${internship.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <ExternalLink size={16} />
              Open in new tab
            </Link>
          )}
        </div>

        <hr className="my-7 border-line" />

        <div className="space-y-6 text-[0.95rem] leading-7 text-ink">
          <p className="font-medium text-navy-900">{internship.summary}</p>
          <Section title="Who we are">{internship.about}</Section>
          <Section title="What you'll get to do">{internship.responsibilities}</Section>
          <div>
            <h3 className="font-heading text-lg font-semibold text-navy-950">What you&apos;ll love</h3>
            <ul className="mt-3 space-y-2">
              {internship.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-mint-500" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-navy-950">What we&apos;re looking for</h3>
            <ul className="mt-3 space-y-2">
              {internship.requirements.map((requirement) => (
                <li key={requirement} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-surface p-5">
          <h3 className="font-heading text-base font-semibold text-navy-950">Employer questions</h3>
          <p className="mt-1 text-sm text-muted">Your application will include the following questions:</p>
          <ul className="mt-3 space-y-2">
            {internship.questions.map((question) => (
              <li key={question.id} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted" />
                {question.label}
              </li>
            ))}
          </ul>
        </div>

        {company && (
          <div className="mt-6 rounded-2xl border border-line p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid size-11 place-items-center rounded-xl text-base font-extrabold text-white"
                style={{ backgroundColor: company.color }}
              >
                {company.name.charAt(0)}
              </span>
              <div>
                <p className="flex items-center gap-1.5 font-heading text-base font-semibold text-navy-950">
                  {company.name}
                  {company.verified && <CheckCircle2 size={15} className="text-blue-600" />}
                </p>
                <p className="text-xs text-muted">{company.industry}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5">
                <Building2 size={14} /> {company.industry}
              </span>
              <span className="flex items-center gap-1.5">
                <BriefcaseBusiness size={14} /> {company.size}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink">{company.about}</p>
          </div>
        )}

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-coral-500/5 p-4 text-sm text-ink">
          <ShieldAlert size={18} className="mt-0.5 shrink-0 text-coral-500" />
          <p>
            <strong>Be careful.</strong> Don&apos;t provide your bank or credit card details when
            applying for jobs. This is a class-assignment demonstration listing.
          </p>
        </div>
      </div>
    </article>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase", className)}>
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-navy-950">{title}</h3>
      <p className="mt-2">{children}</p>
    </div>
  );
}
