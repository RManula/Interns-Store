"use client";

import Link from "next/link";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { useApp } from "@/lib/store";

type Props = {
  feature: string;
  returnTo: string;
};

export function EmployerGate({ feature, returnTo }: Props) {
  const { user } = useApp();

  const loginHref = `/login?role=employer&next=${encodeURIComponent(returnTo)}`;
  const registerHref = `/register?role=employer&next=${encodeURIComponent(returnTo)}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface pb-24 pt-32">
      <div className="container-shell max-w-md text-center">
        <span className="inline-grid size-16 place-items-center rounded-2xl bg-blue-50">
          <BriefcaseBusiness size={28} className="text-blue-600" />
        </span>

        <h1 className="mt-5 font-heading text-2xl font-semibold text-navy-950">
          {feature} is an employer feature
        </h1>

        {user ? (
          <p className="mt-3 text-muted">
            You&apos;re signed in as a student (<strong>{user.email}</strong>). To access employer
            features you need a separate employer account.
          </p>
        ) : (
          <p className="mt-3 text-muted">
            This feature is for registered employers. Sign in to your employer account or create a
            new one to continue.
          </p>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href={loginHref}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
          >
            <BriefcaseBusiness size={16} /> Sign in as employer
          </Link>
          <Link
            href={registerHref}
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3.5 text-sm font-extrabold text-navy-900 transition hover:bg-blue-50"
          >
            <BriefcaseBusiness size={16} /> Create employer account
          </Link>
        </div>

        {user ? (
          <p className="mt-6 text-sm text-muted">
            Looking for student features?{" "}
            <Link href="/dashboard" className="font-bold text-blue-700 hover:underline">
              Go to your dashboard
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-sm text-muted">
            Are you a student?{" "}
            <Link href="/browse" className="font-bold text-blue-700 hover:underline">
              Browse internships
            </Link>{" "}
            ·{" "}
            <Link href="/login" className="font-bold text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
