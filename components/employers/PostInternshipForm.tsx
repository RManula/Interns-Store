"use client";

import { FormEvent, useState } from "react";

export function PostInternshipForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <div className="soft-card p-10 text-center" role="status"><h2 className="text-2xl font-semibold">Draft received.</h2><p className="mt-3 text-muted">Our employer team will review the opportunity and contact you shortly.</p></div>;

  return (
    <form className="soft-card grid gap-5 p-6 sm:p-9" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); }}>
      {[["Company name", "company"], ["Internship title", "title"], ["Location or remote", "location"], ["Contact email", "email"]].map(([label, name]) => (
        <label key={name} className="grid gap-2 text-sm font-bold text-navy-950">{label}<input required name={name} type={name === "email" ? "email" : "text"} className="min-h-12 rounded-xl border border-line px-4 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600" /></label>
      ))}
      <label className="grid gap-2 text-sm font-bold text-navy-950">Tell students about the placement<textarea required name="description" rows={6} className="rounded-xl border border-line px-4 py-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600" /></label>
      <button className="min-h-14 rounded-2xl bg-coral-500 px-7 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-coral-600">Submit internship draft</button>
    </form>
  );
}
