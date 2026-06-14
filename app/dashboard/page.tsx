"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  FileText,
  GraduationCap,
  MapPin,
  Plus,
  Rocket,
  Star,
  Users,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { internships } from "@/lib/data";
import type { ApplicationStatus } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Submitted: "bg-blue-50 text-blue-700",
  "Under review": "bg-amber-50 text-amber-700",
  Interviewing: "bg-violet-50 text-violet-700",
  Offer: "bg-mint-500/15 text-emerald-700",
  Closed: "bg-navy-950/5 text-muted",
};

export default function DashboardPage() {
  const router = useRouter();
  const { ready, user } = useApp();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/dashboard");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="container-shell py-40 text-center text-muted">Loading…</div>;
  }

  return user.role === "student" ? <StudentDashboard /> : <EmployerDashboard />;
}

function Stat({ icon: Icon, label, value }: { icon: typeof FileText; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
        <Icon size={19} />
      </span>
      <p className="mt-3 font-heading text-2xl font-semibold text-navy-950">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function StudentDashboard() {
  const { user, savedJobs, applications } = useApp();
  const student = user?.student;
  const saved = internships.filter((item) => savedJobs.includes(item.id));

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell">
        <p className="text-sm font-bold text-blue-700">Student dashboard</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-navy-950">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat icon={FileText} label="Applications" value={applications.length} />
          <Stat icon={Bookmark} label="Saved internships" value={saved.length} />
          <Stat icon={GraduationCap} label="Skills on profile" value={student?.skills.length ?? 0} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Panel title="My applications">
              {applications.length ? (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between rounded-xl border border-line p-4">
                      <div>
                        <Link href={`/internships/${app.jobId}`} className="font-heading font-semibold text-navy-950 hover:text-blue-700">
                          {app.jobRole}
                        </Link>
                        <p className="text-xs text-muted">{app.company} · Applied {formatDate(app.submittedAt)}</p>
                      </div>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-bold", STATUS_STYLES[app.status])}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text="You haven't applied to anything yet." cta="Browse internships" href="/browse" />
              )}
            </Panel>

            <Panel title="Saved internships">
              {saved.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {saved.map((item) => (
                    <Link key={item.id} href={`/internships/${item.id}`} className="rounded-xl border border-line p-4 transition hover:border-blue-500/40 hover:bg-blue-50/40">
                      <p className="font-heading text-sm font-semibold text-navy-950">{item.role}</p>
                      <p className="text-xs text-muted">{item.company}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={12} /> {item.location}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState text="No saved internships yet." cta="Find internships" href="/browse" />
              )}
            </Panel>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="font-heading text-base font-semibold text-navy-950">My profile</h3>
              <p className="mt-1 text-sm text-muted">{student?.headline}</p>
              <div className="mt-3 space-y-1.5 text-sm text-muted">
                <p className="flex items-center gap-2"><MapPin size={14} /> {student?.location}</p>
                <p className="flex items-center gap-2"><FileText size={14} /> {student?.resumeName ?? "No résumé uploaded"}</p>
              </div>
              {student?.skills.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {student.skills.slice(0, 6).map((skill) => (
                    <span key={skill} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{skill}</span>
                  ))}
                </div>
              ) : null}
            </div>
            <Link href="/browse" className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
              <Rocket size={16} /> Find more internships
            </Link>
            <Link href="/profile" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
              <GraduationCap size={16} /> View &amp; edit profile
            </Link>
            <Link href="/billing" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
              <FileText size={16} /> Billing & payments
            </Link>
            <Link href="/reviews" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
              <Star size={16} /> Leave a review
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function EmployerDashboard() {
  const { user, postedListings } = useApp();
  const employer = user?.employer;
  const myListings = postedListings.filter(
    (item) => item.companyId === user?.id || item.company === employer?.companyName,
  );
  const displayed = myListings.length ? myListings : [];

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell">
        <p className="text-sm font-bold text-blue-700">Employer dashboard</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-heading text-3xl font-semibold text-navy-950">{employer?.companyName}</h1>
          <Link href="/post" className="flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-coral-600">
            <Plus size={16} /> Post an internship
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat icon={BriefcaseBusiness} label="Active listings" value={displayed.length} />
          <Stat icon={Users} label="Total applicants" value={displayed.reduce((sum, _, i) => sum + (i + 1) * 5 + 3, 0)} />
          <Stat icon={Building2} label="Current plan" value={employer?.plan ?? "—"} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Panel title="Your listings">
            {displayed.length > 0 ? (
              <div className="space-y-3">
                {displayed.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border border-line p-4">
                    <div>
                      <Link href={`/internships/${item.id}`} className="font-heading font-semibold text-navy-950 hover:text-blue-700">
                        {item.role}
                      </Link>
                      <p className="text-xs text-muted">{item.location} · {item.workType}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {(index + 1) * 5 + 3} applicants
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                text="You haven't posted any internships yet."
                cta="Post your first internship"
                href="/post"
              />
            )}
          </Panel>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="font-heading text-base font-semibold text-navy-950">Company profile</h3>
              <div className="mt-3 space-y-1.5 text-sm text-muted">
                <p className="flex items-center gap-2"><Building2 size={14} /> {employer?.industry}</p>
                <p className="flex items-center gap-2"><Users size={14} /> {employer?.companySize}</p>
                <p className="flex items-center gap-2"><FileText size={14} /> ABN {employer?.abn}</p>
              </div>
            </div>
            <Link href="/billing" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
              <FileText size={16} /> Billing & payments
            </Link>
            <Link href="/pricing#employers" className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
              <Rocket size={16} /> Manage plan ({employer?.plan})
            </Link>
            <Link href="/reviews" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
              <Star size={16} /> Leave a review
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="mb-4 font-heading text-lg font-semibold text-navy-950">{title}</h2>
      {children}
    </div>
  );
}

function EmptyState({ text, cta, href }: { text: string; cta: string; href: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line p-8 text-center">
      <p className="text-sm text-muted">{text}</p>
      <Link href={href} className="mt-3 inline-block rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700">
        {cta}
      </Link>
    </div>
  );
}
