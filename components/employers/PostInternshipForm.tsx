"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { studyFields } from "@/lib/data";
import type { Internship, WorkMode, WorkType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EmployerGate } from "@/components/ui/EmployerGate";

const WORK_TYPES: WorkType[] = ["Full-time", "Part-time", "Casual", "Vacation"];
const WORK_MODES: WorkMode[] = ["On-site", "Hybrid", "Remote"];
const STEPS = ["Role details", "Description", "Requirements", "Review & publish"];

function uid() {
  return `posted-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function PostInternshipForm() {
  const router = useRouter();
  const { ready, user, postListing } = useApp();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);

  // Step 1
  const [title, setTitle] = useState("");
  const [field, setField] = useState<string>(studyFields[0]);
  const [location, setLocation] = useState("Brisbane, QLD");
  const [mode, setMode] = useState<WorkMode>("On-site");
  const [workType, setWorkType] = useState<WorkType>("Full-time");
  const [duration, setDuration] = useState("12 weeks");
  const [salary, setSalary] = useState("");
  const [paid, setPaid] = useState(true);
  const [credit, setCredit] = useState(false);
  const [friendly, setFriendly] = useState(true);

  // Step 2
  const [summary, setSummary] = useState("");
  const [about, setAbout] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [perks, setPerks] = useState("");

  // Step 3
  const [requirements, setRequirements] = useState("");
  const [questions, setQuestions] = useState<{ label: string; required: boolean }[]>([]);
  const [qInput, setQInput] = useState("");

  if (!ready) {
    return <div className="py-24 text-center text-muted">Loading…</div>;
  }

  if (!user || user.role !== "employer") {
    return <EmployerGate feature="Post an internship" returnTo="/post" />;
  }

  const validate = (): string => {
    if (step === 1) {
      if (!title.trim()) return "Please enter an internship title.";
      if (!location.trim()) return "Please enter a location.";
    }
    if (step === 2) {
      if (!summary.trim()) return "Please enter a short summary.";
      if (!about.trim()) return "Please describe the company.";
      if (!responsibilities.trim()) return "Please describe what the intern will do.";
    }
    if (step === 3) {
      if (!requirements.trim()) return "Please list at least one requirement.";
    }
    return "";
  };

  const goNext = () => {
    const msg = validate();
    if (msg) { setError(msg); return; }
    setError("");
    if (step < 4) { setStep((s) => s + 1); return; }
    publish();
  };

  const publish = () => {
    const listing: Internship = {
      id: uid(),
      role: title.trim(),
      companyId: user.id,
      company: user.employer?.companyName ?? "Your Company",
      location: location.trim(),
      mode,
      workType,
      field,
      classification: `${field} / ${workType}`,
      salary: salary.trim() || "Negotiable",
      duration: duration.trim() || "TBD",
      postedDaysAgo: 0,
      applicantVolume: "Low",
      paid,
      credit,
      friendly,
      color: "#246bfe",
      summary: summary.trim(),
      about: about.trim(),
      responsibilities: responsibilities.trim(),
      perks: perks.split("\n").map((p) => p.trim()).filter(Boolean),
      requirements: requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      questions: [
        {
          id: "right-to-work",
          label: "Which of the following statements best describes your right to work in Australia?",
          type: "select",
          options: [
            "I'm an Australian citizen",
            "I'm a permanent resident and/or NZ citizen",
            "I have a student visa with work rights",
            "I require sponsorship to work for a new employer",
          ],
          required: true,
        },
        ...questions.map((q, i) => ({
          id: `custom-${i}`,
          label: q.label,
          type: "text" as const,
          required: q.required,
        })),
      ],
    };
    postListing(listing);
    setPublished(true);
  };

  if (published) {
    return (
      <div className="soft-card flex flex-col items-center px-8 py-14 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-mint-500/15">
          <Check size={28} className="text-emerald-600" />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold text-navy-950">
          Listing published!
        </h2>
        <p className="mt-2 text-muted">
          Your internship is now live and visible to students browsing the platform.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/browse")}
            className="rounded-xl border border-line px-5 py-2.5 text-sm font-bold text-navy-900 hover:bg-blue-50"
          >
            View in Browse
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((label, index) => {
          const n = index + 1;
          const done = n < step;
          const current = n === step;
          return (
            <div key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold",
                  done || current ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-400",
                )}
              >
                {done ? <Check size={14} /> : n}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-bold sm:block",
                  current ? "text-navy-950" : "text-muted",
                )}
              >
                {label}
              </span>
              {n < STEPS.length && <span className="h-px flex-1 bg-line" />}
            </div>
          );
        })}
      </div>

      <div className="soft-card p-7 sm:p-9">
        <h2 className="font-heading text-xl font-semibold text-navy-950">
          {STEPS[step - 1]}
        </h2>

        <div className="mt-6 space-y-5">
          {/* ── Step 1: Role details ─────────────────────────── */}
          {step === 1 && (
            <>
              <Field
                label="Internship title *"
                hint="e.g. UX Design Intern, Software Engineering Intern"
              >
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Marketing & Communications Intern"
                  className={inputCls}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Study field">
                  <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className={inputCls}
                  >
                    {studyFields.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Work type">
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value as WorkType)}
                    className={inputCls}
                  >
                    {WORK_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Location *">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Brisbane, QLD"
                    className={inputCls}
                  />
                </Field>
                <Field label="Work mode">
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as WorkMode)}
                    className={inputCls}
                  >
                    {WORK_MODES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Duration">
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="12 weeks"
                    className={inputCls}
                  />
                </Field>
                <Field label="Salary / stipend">
                  <input
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="$300 per week or Unpaid"
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Toggle label="Paid internship" checked={paid} onChange={setPaid} />
                <Toggle label="Credit eligible" checked={credit} onChange={setCredit} />
                <Toggle
                  label="First internship friendly"
                  checked={friendly}
                  onChange={setFriendly}
                />
              </div>
            </>
          )}

          {/* ── Step 2: Description ──────────────────────────── */}
          {step === 2 && (
            <>
              <Field
                label="Summary *"
                hint="One-line teaser shown under the title on listings (max 150 chars)"
              >
                <input
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  maxLength={150}
                  placeholder="Shape the future of sustainable supply chains with a hands-on logistics team."
                  className={inputCls}
                />
                <span className="mt-1 block text-right text-xs text-muted">
                  {summary.length}/150
                </span>
              </Field>
              <Field
                label="About the company *"
                hint="Who you are, what you do, what makes your team different"
              >
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className={textareaCls}
                />
              </Field>
              <Field
                label="What the intern will do *"
                hint="Day-to-day responsibilities and real projects they will work on"
              >
                <textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                  className={textareaCls}
                />
              </Field>
              <Field
                label="What they will love (perks)"
                hint="One perk per line — e.g. Flexible working hours"
              >
                <textarea
                  value={perks}
                  onChange={(e) => setPerks(e.target.value)}
                  rows={3}
                  placeholder={
                    "Flexible working hours\nMentoring from senior staff\nReal project exposure"
                  }
                  className={textareaCls}
                />
              </Field>
            </>
          )}

          {/* ── Step 3: Requirements & screening ─────────────── */}
          {step === 3 && (
            <>
              <Field
                label="Requirements *"
                hint="One per line — e.g. Currently enrolled in a Business degree"
              >
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={5}
                  placeholder={
                    "Currently enrolled in a relevant degree\nStrong written communication\nAvailable 3 days per week"
                  }
                  className={textareaCls}
                />
              </Field>

              <div>
                <p className="mb-1 text-sm font-bold text-navy-900">
                  Screening questions{" "}
                  <span className="font-normal text-muted">(optional — max 3)</span>
                </p>
                <p className="mb-3 text-xs text-muted">
                  Right-to-work is always asked. Add up to 3 custom questions below.
                </p>
                {questions.map((q, i) => (
                  <div
                    key={i}
                    className="mb-2 flex items-center gap-2 rounded-xl border border-line bg-blue-50/50 px-4 py-3"
                  >
                    <span className="flex-1 text-sm">{q.label}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuestions((qs) => qs.filter((_, j) => j !== i))
                      }
                      className="text-muted hover:text-coral-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
                {questions.length < 3 && (
                  <div className="mt-2 flex gap-2">
                    <input
                      value={qInput}
                      onChange={(e) => setQInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && qInput.trim()) {
                          setQuestions((qs) => [
                            ...qs,
                            { label: qInput.trim(), required: false },
                          ]);
                          setQInput("");
                        }
                      }}
                      placeholder="e.g. Please describe a challenge you solved"
                      className={cn(inputCls, "flex-1")}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (qInput.trim()) {
                          setQuestions((qs) => [
                            ...qs,
                            { label: qInput.trim(), required: false },
                          ]);
                          setQInput("");
                        }
                      }}
                      className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── Step 4: Review & publish ─────────────────────── */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted">
                Review your listing before it goes live on Interns Store.
              </p>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <h3 className="font-heading text-xl font-semibold text-navy-950">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {user.employer?.companyName} · {location} · {workType} · {mode}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {field} · {duration} · {salary || "Negotiable"}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {paid && (
                    <span className="rounded-full bg-mint-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                      Paid
                    </span>
                  )}
                  {credit && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      Credit eligible
                    </span>
                  )}
                  {friendly && (
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                      First intern friendly
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{summary}</p>
              </div>
              <div className="rounded-xl border border-line p-4 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted">Requirements</span>
                  <span className="font-bold text-navy-950">
                    {requirements.split("\n").filter((r) => r.trim()).length} listed
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Screening questions</span>
                  <span className="font-bold text-navy-950">
                    {1 + questions.length} (incl. right-to-work)
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Posted by</span>
                  <span className="font-bold text-navy-950">{user.name}</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-coral-500/10 px-4 py-2.5 text-sm font-semibold text-coral-600">
              {error}
            </p>
          )}
        </div>

        <div className="mt-7 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep((s) => s - 1);
              }}
              className="flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            className="ms-auto flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-700"
          >
            {step < 4 ? (
              <>
                Continue <ArrowRight size={16} />
              </>
            ) : (
              <>
                Publish listing <Sparkles size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20";

const textareaCls =
  "w-full rounded-xl border border-line bg-white p-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      {hint && <span className="mb-2 block text-xs text-muted">{hint}</span>}
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition",
        checked
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-line bg-white text-navy-900 hover:border-blue-500",
      )}
    >
      {checked && <Check size={13} />} {label}
    </button>
  );
}
