"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  X,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { plans } from "@/lib/data";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const RIGHT_TO_WORK = [
  "I'm an Australian citizen",
  "I'm a permanent resident and/or NZ citizen",
  "I have a family/partner visa with no work restrictions",
  "I have a graduate temporary work visa",
  "I have a student visa with work rights",
  "I have a holiday working visa",
  "I require sponsorship to work for a new employer",
];

const INDUSTRIES = [
  "Information Technology",
  "Design & Creative",
  "Marketing & Communications",
  "Engineering & Construction",
  "Healthcare & Medical",
  "Accounting & Finance",
  "Legal Services",
  "Education & Training",
  "Science & Research",
  "Other",
];

const COMPANY_SIZES = ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"];

const STUDENT_STEPS = ["Account", "About you", "Education"];
const EMPLOYER_STEPS = ["Account", "Company", "Plan"];

const PW_RULES = [
  { key: "minLength", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { key: "hasUpper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { key: "hasNumber", label: "One number (0–9)", test: (p: string) => /\d/.test(p) },
  { key: "hasSpecial", label: "One special character (!@#$…)", test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"] as const;
const STRENGTH_COLOR = ["", "text-red-500", "text-amber-500", "text-blue-600", "text-emerald-600"] as const;
const STRENGTH_BAR = ["", "w-1/4 bg-red-500", "w-2/4 bg-amber-400", "w-3/4 bg-blue-500", "w-full bg-emerald-500"] as const;

function RegisterFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const roleParam = params.get("role") as UserRole | null;
  const { registerStudent, registerEmployer } = useApp();

  const [role, setRole] = useState<UserRole | null>(
    roleParam === "employer" || roleParam === "student" ? roleParam : null,
  );
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // shared
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // student
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [rightToWork, setRightToWork] = useState(RIGHT_TO_WORK[0]);
  const [qualification, setQualification] = useState("");
  const [institution, setInstitution] = useState("");
  const [finished, setFinished] = useState("");
  const [skills, setSkills] = useState("");

  // employer
  const [companyName, setCompanyName] = useState("");
  const [abn, setAbn] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [companySize, setCompanySize] = useState(COMPANY_SIZES[1]);
  const [website, setWebsite] = useState("");
  const [position, setPosition] = useState("");
  const [plan, setPlan] = useState<string>(plans[1].name);

  const steps = role === "employer" ? EMPLOYER_STEPS : STUDENT_STEPS;

  // password strength
  const pwResults = PW_RULES.map((rule) => rule.test(password));
  const pwScore = pwResults.filter(Boolean).length as 0 | 1 | 2 | 3 | 4;

  const validateStep = (): boolean => {
    setError("");
    if (step === 1) {
      const errors: Record<string, string> = {};
      if (!name.trim()) errors.name = "Full name is required.";
      if (!email.trim()) errors.email = "Email address is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
      if (pwScore < 4) errors.password = "Password must meet all 4 requirements below.";
      if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
      else if (confirmPassword !== password) errors.confirmPassword = "Passwords do not match.";
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    }
    setFieldErrors({});
    if (role === "student" && step === 2 && (!location.trim() || !phone.trim())) {
      setError("Please add your location and phone number.");
      return false;
    }
    if (role === "employer" && step === 2 && (!companyName.trim() || !abn.trim())) {
      setError("Please add your company name and ABN.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    submit();
  };

  const submit = () => {
    if (role === "student") {
      const result = registerStudent({
        name: name.trim(),
        email,
        password,
        profile: {
          headline: headline.trim() || "Student",
          location: location.trim(),
          phone: phone.trim(),
          rightToWork,
          resumeName: null,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          careerHistory: [],
          education: qualification.trim()
            ? [{ id: "edu-1", qualification: qualification.trim(), institution: institution.trim(), finished: finished.trim() || "In progress" }]
            : [],
        },
      });
      if (!result.ok) { setStep(1); setError(result.error ?? "Unable to create account."); return; }
    } else {
      const result = registerEmployer({
        name: name.trim(),
        email,
        password,
        profile: {
          companyName: companyName.trim(),
          abn: abn.trim(),
          industry,
          companySize,
          website: website.trim(),
          contactName: name.trim(),
          position: position.trim() || "Hiring manager",
          phone: phone.trim(),
          plan,
        },
      });
      if (!result.ok) { setStep(1); setError(result.error ?? "Unable to create account."); return; }
    }
    router.push(next || "/dashboard");
  };

  if (!role) {
    return (
      <div className="container-shell flex min-h-screen flex-col justify-center py-28">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold text-navy-950">Join Interns Store</h1>
          <p className="mt-3 text-muted">Tell us who you are. You can always switch later.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <RoleCard
              icon={GraduationCap}
              title="I'm a student"
              points={["Search & save internships", "Apply with one profile", "Track every application"]}
              onClick={() => { setRole("student"); setStep(1); }}
            />
            <RoleCard
              icon={BriefcaseBusiness}
              title="I'm an employer"
              points={["Post internship listings", "Reach work-ready students", "Manage applicants"]}
              onClick={() => { setRole("employer"); setStep(1); }}
            />
          </div>
          <p className="mt-8 text-sm text-muted">
            Already have an account?{" "}
            <Link href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"} className="font-bold text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-shell flex min-h-screen flex-col justify-center py-28">
      <div className="mx-auto w-full max-w-xl">
        <button
          type="button"
          onClick={() => (step === 1 ? setRole(null) : setStep((s) => s - 1))}
          className="flex items-center gap-1.5 text-sm font-bold text-muted hover:text-blue-700"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="mt-5 flex items-center gap-2">
          {steps.map((label, index) => {
            const n = index + 1;
            const done = n < step;
            const current = n === step;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold", done || current ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-400")}>
                  {done ? <Check size={15} /> : n}
                </span>
                <span className={cn("text-xs font-bold", current ? "text-navy-950" : "text-muted")}>{label}</span>
                {n < steps.length && <span className="h-px flex-1 bg-line" />}
              </div>
            );
          })}
        </div>

        <div className="mt-7 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-navy-950">
            {role === "student" ? "Student sign up" : "Employer sign up"} · {steps[step - 1]}
          </h2>

          <div className="mt-5 space-y-4">
            {step === 1 && (
              <>
                <Input
                  label={role === "employer" ? "Contact name" : "Full name"}
                  value={name}
                  onChange={(v) => { setName(v); setFieldErrors((e) => ({ ...e, name: "" })); }}
                  placeholder="Jane Smith"
                  error={fieldErrors.name}
                />
                <Input
                  label={role === "employer" ? "Work email" : "Email"}
                  type="email"
                  value={email}
                  onChange={(v) => { setEmail(v); setFieldErrors((e) => ({ ...e, email: "" })); }}
                  placeholder="you@example.com"
                  error={fieldErrors.email}
                />
                <div>
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(v) => { setPassword(v); setFieldErrors((e) => ({ ...e, password: "" })); }}
                    placeholder="Create a strong password"
                    error={fieldErrors.password}
                  />
                  {password.length > 0 && (
                    <div className="mt-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div className={cn("h-full rounded-full transition-all duration-300", STRENGTH_BAR[pwScore])} />
                        </div>
                        <span className={cn("text-xs font-extrabold", STRENGTH_COLOR[pwScore])}>
                          {STRENGTH_LABEL[pwScore]}
                        </span>
                      </div>
                      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                        {PW_RULES.map((rule, i) => (
                          <li key={rule.key} className={cn("flex items-center gap-1.5 text-xs", pwResults[i] ? "text-emerald-600" : "text-muted")}>
                            {pwResults[i] ? <Check size={12} /> : <X size={12} className="opacity-40" />}
                            {rule.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Input
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(v) => { setConfirmPassword(v); setFieldErrors((e) => ({ ...e, confirmPassword: "" })); }}
                  placeholder="Re-enter your password"
                  error={fieldErrors.confirmPassword}
                />
              </>
            )}

            {role === "student" && step === 2 && (
              <>
                <Input label="Headline" value={headline} onChange={setHeadline} placeholder="Final-year Design student" />
                <Input label="Location *" value={location} onChange={setLocation} placeholder="Brisbane, QLD" />
                <Input label="Phone *" value={phone} onChange={setPhone} placeholder="+61 400 000 000" />
                <Select label="Right to work in Australia" value={rightToWork} onChange={setRightToWork} options={RIGHT_TO_WORK} />
              </>
            )}

            {role === "student" && step === 3 && (
              <>
                <Input label="Most recent qualification" value={qualification} onChange={setQualification} placeholder="Bachelor of Design" />
                <Input label="Institution" value={institution} onChange={setInstitution} placeholder="QUT" />
                <Input label="Finish year" value={finished} onChange={setFinished} placeholder="Expected 2026" />
                <Input label="Skills (comma separated)" value={skills} onChange={setSkills} placeholder="Figma, Research, Teamwork" />
              </>
            )}

            {role === "employer" && step === 2 && (
              <>
                <Input label="Company name *" value={companyName} onChange={setCompanyName} placeholder="Canopy Labs" />
                <Input label="ABN *" value={abn} onChange={setAbn} placeholder="12 345 678 901" />
                <Select label="Industry" value={industry} onChange={setIndustry} options={INDUSTRIES} />
                <Select label="Company size" value={companySize} onChange={setCompanySize} options={COMPANY_SIZES} />
                <Input label="Website" value={website} onChange={setWebsite} placeholder="https://" />
                <Input label="Your position" value={position} onChange={setPosition} placeholder="People Lead" />
              </>
            )}

            {role === "employer" && step === 3 && (
              <div className="space-y-3">
                <p className="text-sm text-muted">Choose a plan to start posting. You can change this later.</p>
                {plans.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => setPlan(option.name)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border p-4 text-left transition",
                      plan === option.name ? "border-blue-600 bg-blue-50" : "border-line hover:bg-blue-50/40",
                    )}
                  >
                    <span>
                      <span className="block font-heading font-semibold text-navy-950">{option.name}</span>
                      <span className="text-xs text-muted">{option.description}</span>
                    </span>
                    <span className="font-heading font-semibold text-blue-700">
                      {option.price}
                      <span className="text-xs font-medium text-muted"> {option.period}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-coral-500/10 px-4 py-2.5 text-sm font-semibold text-coral-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
          >
            {step < 3 ? "Continue" : "Create account"}
            <ArrowRight size={16} />
          </button>

          <p className="mt-5 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"} className="font-bold text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  icon: Icon,
  title,
  points,
  onClick,
}: {
  icon: typeof GraduationCap;
  title: string;
  points: string[];
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-line bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[var(--shadow-md)]"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={24} />
      </span>
      <h3 className="mt-4 font-heading text-xl font-semibold text-navy-950">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm text-muted">
            <Check size={15} className="text-mint-500" /> {point}
          </li>
        ))}
      </ul>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-700">
        Continue <ArrowRight size={15} />
      </span>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-12 w-full rounded-xl border bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:outline-none focus:ring-[3px]",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-line focus:border-blue-500 focus:ring-blue-500/20",
          )}
        />
      </label>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterFlow />
    </Suspense>
  );
}
