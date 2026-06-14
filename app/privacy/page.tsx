import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy & Safety" };

export default function PrivacyPage() {
  return (
    <article className="container-shell min-h-screen max-w-4xl pb-24 pt-36">
      <span className="eyebrow">Privacy & safety</span>
      <h1 className="display-title mt-6 text-navy-950">Trust is part of the product.</h1>
      <div className="mt-10 space-y-8 text-base leading-8 text-muted">
        <section><h2 className="text-2xl font-semibold text-navy-950">Student information</h2><p className="mt-3">Interns Store is designed to collect only the profile and application information needed to connect students with verified internship opportunities.</p></section>
        <section><h2 className="text-2xl font-semibold text-navy-950">Employer verification</h2><p className="mt-3">Employer identity, opportunity details and conduct expectations form part of the marketplace trust model.</p></section>
        <section><h2 className="text-2xl font-semibold text-navy-950">Assignment notice</h2><p className="mt-3">This prototype demonstrates intended privacy and safety principles. It does not process real commercial transactions or production user data.</p></section>
      </div>
    </article>
  );
}
