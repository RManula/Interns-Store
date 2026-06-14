"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="soft-card p-6 text-center" role="status">
        <p className="font-heading text-xl font-semibold text-navy-950">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-muted">New internships and practical advice will land in your inbox.</p>
      </div>
    );
  }

  return (
    <form className="soft-card p-3 sm:flex" onSubmit={handleSubmit}>
      <label htmlFor="home-email" className="sr-only">Email address</label>
      <input
        id="home-email"
        type="email"
        required
        placeholder="Your email address"
        className="min-h-14 min-w-0 flex-1 rounded-2xl px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
      />
      <button className="mt-2 min-h-14 w-full rounded-2xl bg-blue-600 px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:mt-0 sm:w-auto">
        Join free
      </button>
    </form>
  );
}
