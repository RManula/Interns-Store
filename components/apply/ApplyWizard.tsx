"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
} from "lucide-react";
import type { Company, Internship } from "@/lib/types";
import { useApp } from "@/lib/store";
import { cn, initials } from "@/lib/utils";

const STEPS = ["Choose documents", "Answer employer questions", "Update profile", "Review and submit"];

const VISIBILITY = [
  { id: "public", label: "Public", recommended: true, detail: "Your profile is publicly searchable. Only employers can access your full profile and contact details." },
  { id: "standard", label: "Standard", recommended: false, detail: "Some employers can view and download your profile and résumé, and contact you directly." },
  { id: "limited", label: "Limited", recommended: false, detail: "Some employers can view your profile but not your résumé, and can only contact you via Interns Store." },
  { id: "hidden", label: "Hidden", recommended: false, detail: "Employers cannot search for you. Your profile is only seen as part of your applications." },
];

export function ApplyWizard({ internship, company }: { internship: Internship; company?: Company }) {
  const router = useRouter();
  const { ready, user, addApplication, updateStudentProfile } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [resumeChoice, setResumeChoice] = useState<"select" | "upload" | "none">("none");
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [coverChoice, setCoverChoice] = useState<"write" | "upload" | "none">("none");
  const [coverLetter, setCoverLetter] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visibility, setVisibility] = useState("public");
  const [submitted, setSubmitted] = useState(false);

  const applyPath = `/internships/${internship.id}/apply`;

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?next=${encodeURIComponent(applyPath)}`);
    }
  }, [ready, user, router, applyPath]);

  const student = user?.student;

  useEffect(() => {
    if (student?.resumeName) {
      setResumeChoice("select");
      setResumeName(student.resumeName);
    }
  }, [student?.resumeName]);

  const answeredCount = useMemo(
    () => internship.questions.filter((q) => answers[q.id]?.trim()).length,
    [answers, internship.questions],
  );

  if (!ready || !user) {
    return <div className="container-shell py-40 text-center text-muted">Loading…</div>;
  }

  if (user.role === "employer") {
    return (
      <div className="container-shell py-40 text-center">
        <h1 className="font-heading text-2xl font-semibold text-navy-950">Employer accounts can&apos;t apply</h1>
        <p className="mt-2 text-muted">Switch to a student account to apply for internships.</p>
        <Link href="/dashboard" className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white">
          Go to dashboard
        </Link>
      </div>
    );
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
    setResumeChoice("upload");
    updateStudentProfile({ resumeName: file.name });
  };

  const finalResume = resumeChoice === "none" ? null : resumeName;
  const requiredUnanswered = internship.questions.some(
    (q) => q.required && !answers[q.id]?.trim(),
  );

  const submit = () => {
    addApplication({
      id: `app-${internship.id}`,
      jobId: internship.id,
      jobRole: internship.role,
      company: internship.company,
      status: "Submitted",
      submittedAt: new Date().toISOString(),
      resumeName: finalResume,
      coverLetter: coverChoice === "write" ? coverLetter : null,
      answers,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-shell flex min-h-screen flex-col items-center justify-center py-28 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-mint-500/15 text-mint-500">
          <CheckCircle2 size={34} />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-semibold text-navy-950">Application submitted</h1>
        <p className="mt-3 max-w-md text-muted">
          Your application for <strong>{internship.role}</strong> at {internship.company} has been
          sent. Track its progress from your dashboard.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">
            View my applications
          </Link>
          <Link href="/browse" className="rounded-full border border-line px-6 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">
            Keep browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell max-w-3xl">
        {/* Job header */}
        <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-xl text-lg font-extrabold text-white"
            style={{ backgroundColor: internship.color }}
          >
            {internship.company.charAt(0)}
          </span>
          <div>
            <p className="text-xs font-semibold text-muted">Applying for</p>
            <h1 className="font-heading text-xl font-semibold text-navy-950">{internship.role}</h1>
            <p className="text-sm text-muted">{internship.company}</p>
            <Link href={`/internships/${internship.id}`} target="_blank" className="mt-1 inline-block text-xs font-bold text-blue-700 hover:underline">
              View job description
            </Link>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-6 flex items-center gap-1">
          {STEPS.map((label, index) => {
            const n = index + 1;
            const done = n < step;
            const current = n === step;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-extrabold",
                      done || current ? "bg-blue-600 text-white" : "border border-line bg-white text-muted",
                    )}
                  >
                    {done ? <Check size={13} /> : n}
                  </span>
                  <span className={cn("hidden text-xs font-bold sm:block", current ? "text-navy-950" : "text-muted")}>
                    {label}
                  </span>
                </div>
                {n < STEPS.length && <span className={cn("h-0.5 flex-1 rounded", done ? "bg-blue-600" : "bg-line")} />}
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
          {/* Profile card */}
          <div className="mb-6 flex items-center gap-4 rounded-2xl bg-navy-950 p-5 text-white">
            <span className="grid size-12 place-items-center rounded-xl bg-blue-500 text-lg font-extrabold">
              {initials(user.name)}
            </span>
            <div className="text-sm">
              <p className="font-heading text-base font-semibold">{user.name}</p>
              <p className="flex items-center gap-1.5 text-white/65"><MapPin size={13} /> {student?.location || "Australia"}</p>
              <p className="flex items-center gap-1.5 text-white/65"><Phone size={13} /> {student?.phone || "—"}</p>
              <p className="flex items-center gap-1.5 text-white/65"><Mail size={13} /> {user.email}</p>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-950">Résumé</h2>
              <div className="mt-3 space-y-2">
                {student?.resumeName && (
                  <RadioRow checked={resumeChoice === "select"} onSelect={() => setResumeChoice("select")} title="Use my saved résumé">
                    <span className="flex items-center gap-2 text-sm text-emerald-700">
                      <FileText size={15} /> {student.resumeName}
                    </span>
                  </RadioRow>
                )}
                <RadioRow checked={resumeChoice === "upload"} onSelect={() => fileRef.current?.click()} title="Upload a résumé">
                  {resumeChoice === "upload" && resumeName ? (
                    <span className="flex items-center gap-2 text-sm text-emerald-700">
                      <CheckCircle2 size={15} /> {resumeName}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-blue-700">
                      <Upload size={15} /> Choose a PDF or DOC file
                    </span>
                  )}
                </RadioRow>
                <RadioRow checked={resumeChoice === "none"} onSelect={() => setResumeChoice("none")} title="Don't include a résumé" />
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" hidden onChange={handleUpload} />
              </div>

              <h2 className="mt-7 font-heading text-xl font-semibold text-navy-950">Cover letter</h2>
              <div className="mt-3 space-y-2">
                <RadioRow checked={coverChoice === "write"} onSelect={() => setCoverChoice("write")} title="Write a cover letter">
                  {coverChoice === "write" && (
                    <textarea
                      value={coverLetter}
                      onChange={(event) => setCoverLetter(event.target.value)}
                      rows={4}
                      placeholder="Tell the employer why you're a great fit…"
                      className="mt-2 w-full rounded-xl border border-line p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
                    />
                  )}
                </RadioRow>
                <RadioRow checked={coverChoice === "none"} onSelect={() => setCoverChoice("none")} title="Don't include a cover letter" />
              </div>

              <p className="mt-5 text-xs text-muted">Stay safe. Don&apos;t include sensitive information in your documents.</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-950">Employer questions</h2>
              <div className="mt-4 space-y-5">
                {internship.questions.map((question) => (
                  <div key={question.id}>
                    <label className="mb-1.5 block text-sm font-bold text-navy-900">
                      {question.label}
                      {question.required && <span className="text-coral-500"> *</span>}
                    </label>
                    {question.type === "select" && question.options ? (
                      <select
                        value={answers[question.id] ?? ""}
                        onChange={(event) => setAnswers((a) => ({ ...a, [question.id]: event.target.value }))}
                        className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
                      >
                        <option value="" disabled>Select an option</option>
                        {question.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <textarea
                        value={answers[question.id] ?? ""}
                        onChange={(event) => setAnswers((a) => ({ ...a, [question.id]: event.target.value }))}
                        rows={3}
                        placeholder="Your answer"
                        className="w-full rounded-xl border border-line p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-950">Update your profile</h2>
              <p className="mt-1 text-sm text-muted">
                Your profile is part of your application. We&apos;ve pulled the details below from your
                résumé and profile — make sure they&apos;re up to date.
              </p>

              <ProfileSection title="Education">
                {student?.education.length ? (
                  student.education.map((edu) => (
                    <div key={edu.id} className="rounded-xl border border-line p-4">
                      {finalResume && (
                        <span className="mb-2 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-[0.6rem] font-extrabold uppercase text-violet-700">
                          <Sparkles size={10} className="mb-0.5 mr-1 inline" /> Found in résumé
                        </span>
                      )}
                      <p className="font-heading text-sm font-semibold text-navy-950">{edu.qualification}</p>
                      <p className="text-xs text-muted">{edu.institution} · {edu.finished}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted">No education added yet.</p>
                )}
              </ProfileSection>

              <ProfileSection title="Career history">
                {student?.careerHistory.length ? (
                  student.careerHistory.map((role) => (
                    <div key={role.id} className="rounded-xl border border-line p-4">
                      <p className="font-heading text-sm font-semibold text-navy-950">{role.title}</p>
                      <p className="text-xs text-muted">{role.organisation} · {role.period}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted">No roles added yet.</p>
                )}
              </ProfileSection>

              <ProfileSection title="Skills">
                {student?.skills.length ? (
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted">Adding 5 or more skills is highly recommended.</p>
                )}
              </ProfileSection>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-950">Review and submit</h2>

              <ReviewRow label="Résumé" value={finalResume ?? "No résumé included"} />
              <ReviewRow label="Cover letter" value={coverChoice === "write" && coverLetter ? "Included" : "No cover letter included"} />
              <ReviewRow label="Employer questions" value={`You answered ${answeredCount} of ${internship.questions.length}`} />
              <ReviewRow label="Education" value={`${student?.education.length ?? 0} qualifications`} />
              <ReviewRow label="Career history" value={`${student?.careerHistory.length ?? 0} roles`} />
              <ReviewRow label="Skills" value={`${student?.skills.length ?? 0} skills`} />

              <div className="mt-6 rounded-2xl border border-line p-5">
                <h3 className="font-heading text-base font-semibold text-navy-950">Profile visibility</h3>
                <p className="mt-1 text-sm text-muted">Control who can find your profile on Interns Store.</p>
                <div className="mt-3 space-y-2">
                  {VISIBILITY.map((option) => (
                    <label key={option.id} className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border p-3 transition",
                      visibility === option.id ? "border-blue-600 bg-blue-50" : "border-line hover:bg-blue-50/40",
                    )}>
                      <input
                        type="radio"
                        name="visibility"
                        checked={visibility === option.id}
                        onChange={() => setVisibility(option.id)}
                        className="mt-1 accent-blue-600"
                      />
                      <span>
                        <span className="flex items-center gap-2 text-sm font-bold text-navy-950">
                          {option.label}
                          {option.recommended && (
                            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[0.6rem] font-extrabold uppercase text-violet-700">Recommended</span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">{option.detail}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-muted">
                By applying, you agree to the Collection Notice and Privacy Policy. This is a
                class-assignment demonstration.
              </p>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              onClick={() => (step === 1 ? router.back() : setStep((s) => s - 1))}
              className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-muted hover:text-blue-700"
            >
              <ArrowLeft size={15} /> Back
            </button>
            {step < 4 ? (
              <button
                type="button"
                disabled={step === 2 && requiredUnanswered}
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-coral-600"
              >
                Submit application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioRow({
  checked,
  onSelect,
  title,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3.5 transition",
        checked ? "border-blue-600 bg-blue-50/50" : "border-line",
      )}
    >
      <button type="button" onClick={onSelect} className="flex w-full items-center gap-3 text-left">
        <span className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border-2",
          checked ? "border-blue-600" : "border-line",
        )}>
          {checked && <span className="size-2.5 rounded-full bg-blue-600" />}
        </span>
        <span className="text-sm font-semibold text-navy-900">{title}</span>
      </button>
      {checked && children && <div className="ms-8 mt-2">{children}</div>}
    </div>
  );
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 font-heading text-base font-semibold text-navy-950">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3 text-sm">
      <span className="font-bold text-navy-900">{label}</span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
