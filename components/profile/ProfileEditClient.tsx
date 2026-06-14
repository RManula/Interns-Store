"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useApp } from "@/lib/store";

const RIGHT_TO_WORK = [
  "I'm an Australian citizen",
  "I'm a permanent resident and/or NZ citizen",
  "I have a family/partner visa with no work restrictions",
  "I have a graduate temporary work visa",
  "I have a student visa with work rights",
  "I have a holiday working visa",
  "I require sponsorship to work for a new employer",
];

const REMOTE = ["Any", "Remote", "Hybrid", "On-site"];

export function ProfileEditClient() {
  const router = useRouter();
  const { ready, user, updateStudentProfile } = useApp();
  const s = user?.student;

  const [form, setForm] = useState({
    headline: "",
    summary: "",
    location: "",
    phone: "",
    rightToWork: RIGHT_TO_WORK[0],
    university: "",
    degree: "",
    graduationYear: "",
    availability: "",
    preferredLocations: "",
    remotePreference: "Any",
    skills: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    discoverable: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // hydrate form from current profile
  useEffect(() => {
    if (!s) return;
    setForm((f) => ({
      ...f,
      headline: s.headline ?? "",
      summary: s.summary ?? "",
      location: s.location ?? "",
      phone: s.phone ?? "",
      rightToWork: s.rightToWork ?? RIGHT_TO_WORK[0],
      university: s.university ?? "",
      degree: s.degree ?? "",
      graduationYear: s.graduationYear ?? "",
      availability: s.availability ?? "",
      preferredLocations: s.preferredLocations ?? "",
      remotePreference: s.remotePreference ?? "Any",
      skills: s.skills?.join(", ") ?? "",
      portfolioUrl: s.portfolioUrl ?? "",
      linkedinUrl: s.linkedinUrl ?? "",
      githubUrl: s.githubUrl ?? "",
      discoverable: s.discoverable ?? true,
    }));
  }, [s]);

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/profile/edit");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="container-shell py-40 text-center text-muted">Loading…</div>;
  }

  if (user.role !== "student") {
    return (
      <div className="container-shell max-w-xl py-40 text-center">
        <h1 className="font-heading text-2xl font-semibold text-navy-950">Company profile</h1>
        <p className="mt-3 text-muted">Employer profile editing lives in your dashboard.</p>
        <Link href="/dashboard" className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white">
          Go to dashboard
        </Link>
      </div>
    );
  }

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    updateStudentProfile({
      headline: form.headline.trim(),
      summary: form.summary.trim(),
      location: form.location.trim(),
      phone: form.phone.trim(),
      rightToWork: form.rightToWork,
      university: form.university.trim(),
      degree: form.degree.trim(),
      graduationYear: form.graduationYear.trim(),
      availability: form.availability.trim(),
      preferredLocations: form.preferredLocations.trim(),
      remotePreference: form.remotePreference as never,
      skills: form.skills.split(",").map((x) => x.trim()).filter(Boolean),
      portfolioUrl: form.portfolioUrl.trim(),
      linkedinUrl: form.linkedinUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      discoverable: form.discoverable,
    });
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => router.push("/profile"), 900);
    }, 700);
  };

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell max-w-2xl">
        <Link href="/profile" className="flex items-center gap-1.5 text-sm font-bold text-muted hover:text-blue-700">
          <ArrowLeft size={15} /> Back to profile
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-semibold text-navy-950">Edit profile</h1>
        <p className="mt-2 text-muted">Keep your details current so employers see the real you.</p>

        <form onSubmit={handleSave} className="mt-7 space-y-6">
          <Card title="Basics">
            <Field label="Headline" value={form.headline} onChange={(v) => set("headline", v)} placeholder="Final-year Computer Science student" />
            <TextArea label="Summary" value={form.summary} onChange={(v) => set("summary", v)} placeholder="A short intro about your goals and strengths." />
            <Row>
              <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="Brisbane, QLD" />
              <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+61 400 000 000" />
            </Row>
            <Select label="Right to work" value={form.rightToWork} onChange={(v) => set("rightToWork", v)} options={RIGHT_TO_WORK} />
          </Card>

          <Card title="Education">
            <Row>
              <Field label="University" value={form.university} onChange={(v) => set("university", v)} placeholder="QUT" />
              <Field label="Degree" value={form.degree} onChange={(v) => set("degree", v)} placeholder="Bachelor of Computer Science" />
            </Row>
            <Field label="Graduation year" value={form.graduationYear} onChange={(v) => set("graduationYear", v)} placeholder="Expected 2026" />
          </Card>

          <Card title="Preferences">
            <Row>
              <Field label="Availability" value={form.availability} onChange={(v) => set("availability", v)} placeholder="Available from Jan 2026" />
              <Select label="Remote preference" value={form.remotePreference} onChange={(v) => set("remotePreference", v)} options={REMOTE} />
            </Row>
            <Field label="Preferred locations" value={form.preferredLocations} onChange={(v) => set("preferredLocations", v)} placeholder="Brisbane, Remote" />
          </Card>

          <Card title="Skills & links">
            <Field label="Skills (comma separated)" value={form.skills} onChange={(v) => set("skills", v)} placeholder="Python, React, Teamwork" />
            <Field label="Portfolio URL" value={form.portfolioUrl} onChange={(v) => set("portfolioUrl", v)} placeholder="https://" />
            <Row>
              <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={(v) => set("linkedinUrl", v)} placeholder="https://linkedin.com/in/…" />
              <Field label="GitHub URL" value={form.githubUrl} onChange={(v) => set("githubUrl", v)} placeholder="https://github.com/…" />
            </Row>
          </Card>

          <Card title="Privacy">
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-navy-900">Discoverable by employers</span>
              <button
                type="button"
                onClick={() => set("discoverable", !form.discoverable)}
                className={`relative h-6 w-11 rounded-full transition ${form.discoverable ? "bg-blue-600" : "bg-line"}`}
                aria-pressed={form.discoverable}
              >
                <span className={`absolute top-0.5 size-5 rounded-full bg-white transition ${form.discoverable ? "left-[1.4rem]" : "left-0.5"}`} />
              </button>
            </label>
          </Card>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || saved}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:opacity-70"
            >
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : saved ? <><Check size={16} /> Saved!</> : "Save changes"}
            </button>
            <Link href="/profile" className="rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="mb-4 font-heading text-base font-semibold text-navy-950">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white p-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
