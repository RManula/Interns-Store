"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BriefcaseBusiness, GraduationCap, Lock, Mail } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const roleHint = params.get("role") as "employer" | "student" | null;
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors = { email: "", password: "" };
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    if (errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({ email: "", password: "" });
    setError("");
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error ?? "Unable to sign in.");
      return;
    }
    router.push(next || "/dashboard");
  };

  const fillDemo = (role: "student" | "employer") => {
    setEmail(role === "student" ? "student@demo.com" : "employer@demo.com");
    setPassword("password");
    setError("");
    setFieldErrors({ email: "", password: "" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="mesh-dark hidden flex-col justify-between p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-lg font-bold">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-600">
            <BriefcaseBusiness size={20} />
          </span>
          Interns Store
        </Link>
        <div>
          <h1 className="font-heading text-4xl font-semibold leading-tight">
            Your career starts here.
          </h1>
          <p className="mt-4 max-w-md text-white/65">
            Sign in to apply for internships, track applications and manage your saved roles —
            all in one place.
          </p>
        </div>
        <p className="text-xs text-white/40">{`This website/app is for a class assignment and not for commercial purposes.`}</p>
      </div>

      <div className="flex items-center justify-center p-6 py-24 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="font-heading text-3xl font-semibold text-navy-950">Welcome back</h2>
          <p className="mt-2 text-muted">Sign in to your Interns Store account.</p>

          {roleHint === "employer" && (
            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm">
              <p className="font-bold text-blue-800">Employer sign in required</p>
              <p className="mt-0.5 text-blue-700">
                Please sign in with your employer account to continue.
              </p>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <DemoButton
              icon={GraduationCap}
              label="Student demo"
              onClick={() => fillDemo("student")}
              muted={roleHint === "employer"}
            />
            <DemoButton
              icon={BriefcaseBusiness}
              label="Employer demo"
              onClick={() => fillDemo("employer")}
              highlight={roleHint === "employer"}
            />
          </div>
          <p className="mt-2 text-center text-xs text-muted">
            Demo logins use password <strong>password</strong>
          </p>

          <form onSubmit={submit} noValidate className="mt-6 space-y-4">
            <Field
              icon={Mail}
              type="email"
              label="Email"
              value={email}
              onChange={(v) => { setEmail(v); setFieldErrors((e) => ({ ...e, email: "" })); }}
              placeholder="you@example.com"
              error={fieldErrors.email}
            />
            <Field
              icon={Lock}
              type="password"
              label="Password"
              value={password}
              onChange={(v) => { setPassword(v); setFieldErrors((e) => ({ ...e, password: "" })); }}
              placeholder="Your password"
              error={fieldErrors.password}
            />
            {error && (
              <p className="rounded-lg bg-coral-500/10 px-4 py-2.5 text-sm font-semibold text-coral-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            New to Interns Store?{" "}
            <Link
              href={
                roleHint === "employer"
                  ? `/register?role=employer${next ? `&next=${encodeURIComponent(next)}` : ""}`
                  : next
                    ? `/register?next=${encodeURIComponent(next)}`
                    : "/register"
              }
              className="font-bold text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoButton({
  icon: Icon,
  label,
  onClick,
  highlight,
  muted,
}: {
  icon: typeof Mail;
  label: string;
  onClick: () => void;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition",
        highlight
          ? "border-blue-600 bg-blue-600 text-white"
          : muted
            ? "border-line bg-white/50 text-muted"
            : "border-line bg-white text-navy-900 hover:border-blue-500/40 hover:bg-blue-50",
      )}
    >
      <Icon size={15} className={highlight ? "text-white" : "text-blue-600"} />
      {label}
    </button>
  );
}

function Field({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
}: {
  icon: typeof Mail;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
        <span className="relative block">
          <Icon size={17} className="pointer-events-none absolute inset-y-0 start-3 my-auto text-muted" />
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              "h-12 w-full rounded-xl border bg-white ps-10 pe-3 text-sm text-ink shadow-sm shadow-black/5 transition focus:outline-none focus:ring-[3px]",
              error
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                : "border-line focus:border-blue-500 focus:ring-blue-500/20",
            )}
          />
        </span>
      </label>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
