"use client";

import { useState } from "react";
import { Check, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("A student or graduate");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <section className="mesh-light min-h-screen pb-24 pt-36">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Contact Interns Store</span>
          <h1 className="display-title mt-6 text-navy-950">
            Let&apos;s make the first opportunity better.
          </h1>
          <p className="body-lg mt-6 text-muted">
            Questions from students, employers and university partners are welcome.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          {/* Left info panel */}
          <div className="rounded-[2.25rem] bg-navy-900 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-semibold">Talk to the team</h2>
            <div className="mt-8 space-y-6">
              <p className="flex items-center gap-4 text-white/65">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/8 text-blue-100">
                  <Mail size={19} />
                </span>
                hello@internsstore.com.au
              </p>
              <p className="flex items-center gap-4 text-white/65">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/8 text-blue-100">
                  <Phone size={19} />
                </span>
                +61 7 3000 2026
              </p>
              <p className="flex items-center gap-4 text-white/65">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/8 text-blue-100">
                  <MapPin size={19} />
                </span>
                Brisbane, Queensland
              </p>
            </div>

            {/* Google Map embed */}
            <div className="mt-10 overflow-hidden rounded-[1.5rem]">
              <iframe
                title="Interns Store — Brisbane, Queensland"
                src="https://maps.google.com/maps?q=Brisbane+QLD+Australia&output=embed&z=13"
                width="100%"
                height="210"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact form */}
          {sent ? (
            <div className="soft-card flex flex-col items-center justify-center px-8 py-16 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-mint-500/15">
                <Check size={28} className="text-emerald-600" />
              </span>
              <h2 className="mt-5 font-heading text-2xl font-semibold text-navy-950">
                Message sent!
              </h2>
              <p className="mt-2 text-muted">
                Thanks, {firstName}. We&apos;ll get back to you at{" "}
                <strong>{email}</strong> within 1–2 business days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setPhone("");
                  setMessage("");
                }}
                className="mt-6 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="soft-card grid gap-5 p-7 sm:grid-cols-2 sm:p-10"
            >
              <Label text="First name">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={inputCls}
                />
              </Label>
              <Label text="Last name">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputCls}
                />
              </Label>
              <Label text="Email address">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputCls}
                />
              </Label>
              <Label text="Phone number">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </Label>
              <Label text="I'm contacting as" className="sm:col-span-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputCls}
                >
                  <option>A student or graduate</option>
                  <option>An employer</option>
                  <option>A university partner</option>
                </select>
              </Label>
              <Label text="How can we help?" className="sm:col-span-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className={inputCls}
                />
              </Label>

              {error && (
                <p className="rounded-lg bg-coral-500/10 px-4 py-2.5 text-sm font-semibold text-coral-600 sm:col-span-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="min-h-14 rounded-2xl bg-coral-500 px-7 text-sm font-extrabold text-white transition hover:bg-coral-600 sm:col-span-2"
              >
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "mt-2 min-h-13 w-full rounded-2xl border border-line px-4 font-normal bg-white focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20";

function Label({
  text,
  children,
  className,
}: {
  text: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`text-sm font-extrabold text-navy-900 ${className ?? ""}`}>
      {text}
      {children}
    </label>
  );
}
