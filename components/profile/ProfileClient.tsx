"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  Code2,
  FileText,
  GraduationCap,
  Globe,
  Link2,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { initials } from "@/lib/utils";

export function ProfileClient() {
  const router = useRouter();
  const { ready, user, activePlan } = useApp();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/profile");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="container-shell py-40 text-center text-muted">Loading…</div>;
  }

  if (user.role === "employer") {
    const e = user.employer;
    return (
      <div className="bg-surface pb-24 pt-28">
        <div className="container-shell max-w-3xl">
          <p className="text-sm font-bold text-blue-700">Employer profile</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold text-navy-950">{e?.companyName}</h1>
          <div className="mt-6 space-y-3 rounded-2xl border border-line bg-white p-6 text-sm text-muted">
            <p className="flex items-center gap-2"><Building2 size={15} /> {e?.industry} · {e?.companySize}</p>
            <p className="flex items-center gap-2"><FileText size={15} /> ABN {e?.abn}</p>
            <p className="flex items-center gap-2"><Globe size={15} /> {e?.website || "No website added"}</p>
            <p className="flex items-center gap-2"><Briefcase size={15} /> {e?.contactName} · {e?.position}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
              Go to dashboard
            </Link>
            <Link href="/billing" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-900 hover:bg-blue-50">
              Billing & plan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const s = user.student;
  const links = [
    s?.portfolioUrl && { icon: Globe, label: "Portfolio", href: s.portfolioUrl },
    s?.linkedinUrl && { icon: Link2, label: "LinkedIn", href: s.linkedinUrl },
    s?.githubUrl && { icon: Code2, label: "GitHub", href: s.githubUrl },
  ].filter(Boolean) as { icon: typeof Globe; label: string; href: string }[];

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell max-w-3xl">
        {/* header card */}
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                {initials(user.name)}
              </span>
              <div className="min-w-0">
                <h1 className="font-heading text-2xl font-semibold text-navy-950">{user.name}</h1>
                <p className="text-sm text-muted">{s?.headline || "Student"}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={13} /> {s?.location || "Add your location"}
                  <span className="ms-2 rounded-full bg-blue-50 px-2 py-0.5 font-extrabold uppercase text-blue-700">
                    {activePlan} plan
                  </span>
                </p>
              </div>
            </div>
            <Link
              href="/profile/edit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <Pencil size={15} /> Edit profile
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <Section title="About">
            <p className="text-sm leading-7 text-ink">
              {s?.summary || "Add a short summary so employers understand your goals and strengths."}
            </p>
          </Section>

          <Section title="Contact & eligibility">
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2"><Phone size={15} /> {s?.phone || "No phone added"}</li>
              <li className="flex items-center gap-2"><ShieldCheck size={15} /> {s?.rightToWork}</li>
              {s?.availability && <li className="flex items-center gap-2"><Briefcase size={15} /> {s.availability}</li>}
              {s?.preferredLocations && <li className="flex items-center gap-2"><MapPin size={15} /> Prefers: {s.preferredLocations}</li>}
            </ul>
          </Section>

          <Section title="Education">
            {s?.university || s?.degree ? (
              <p className="text-sm text-navy-900">
                <strong>{s?.degree}</strong>{s?.university ? ` · ${s.university}` : ""}
                {s?.graduationYear ? ` · ${s.graduationYear}` : ""}
              </p>
            ) : s?.education.length ? (
              <ul className="space-y-3">
                {s.education.map((ed) => (
                  <li key={ed.id} className="text-sm">
                    <p className="font-semibold text-navy-950">{ed.qualification}</p>
                    <p className="text-muted">{ed.institution} · {ed.finished}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty icon={GraduationCap} text="Add your education details." />
            )}
          </Section>

          <Section title="Skills">
            {s?.skills.length ? (
              <div className="flex flex-wrap gap-2">
                {s.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{skill}</span>
                ))}
              </div>
            ) : (
              <Empty icon={GraduationCap} text="Add skills to improve your matches." />
            )}
          </Section>

          {links.length > 0 && (
            <Section title="Links">
              <div className="flex flex-wrap gap-3">
                {links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-blue-50">
                    <l.icon size={15} className="text-blue-600" /> {l.label}
                  </a>
                ))}
              </div>
            </Section>
          )}

          <Section title="Documents">
            <p className="flex items-center gap-2 text-sm text-muted">
              <FileText size={15} /> {s?.resumeName ?? "No résumé uploaded yet"}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="mb-3 font-heading text-base font-semibold text-navy-950">{title}</h2>
      {children}
    </div>
  );
}

function Empty({ icon: Icon, text }: { icon: typeof GraduationCap; text: string }) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted">
      <Icon size={15} /> {text}
    </p>
  );
}
