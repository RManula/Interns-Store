import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Interns Store team in Brisbane, Queensland.",
};

export default function ContactPage() {
  return (
    <section className="mesh-light min-h-screen pb-24 pt-36">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Contact Interns Store</span>
          <h1 className="display-title mt-6 text-navy-950">Let&apos;s make the first opportunity better.</h1>
          <p className="body-lg mt-6 text-muted">Questions from students, employers and university partners are welcome.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2.25rem] bg-navy-900 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-semibold">Talk to the team</h2>
            <div className="mt-8 space-y-6">
              <p className="flex items-center gap-4 text-white/65"><span className="grid size-11 place-items-center rounded-2xl bg-white/8 text-blue-100"><Mail size={19} /></span>hello@internsstore.com.au</p>
              <p className="flex items-center gap-4 text-white/65"><span className="grid size-11 place-items-center rounded-2xl bg-white/8 text-blue-100"><Phone size={19} /></span>+61 7 3000 2026</p>
              <p className="flex items-center gap-4 text-white/65"><span className="grid size-11 place-items-center rounded-2xl bg-white/8 text-blue-100"><MapPin size={19} /></span>Brisbane, Queensland</p>
            </div>
            <div className="mt-10 grid h-52 place-items-center rounded-[1.5rem] bg-blue-600/20 text-center text-sm text-blue-100">Queensland location map<br />integration area</div>
          </div>
          <form className="soft-card grid gap-5 p-7 sm:grid-cols-2 sm:p-10">
            {["First name", "Last name", "Email address", "Phone number"].map((label) => <label key={label} className="text-sm font-extrabold text-navy-900">{label}<input className="mt-2 min-h-13 w-full rounded-2xl border border-line px-4 font-normal" /></label>)}
            <label className="text-sm font-extrabold text-navy-900 sm:col-span-2">I&apos;m contacting as<select className="mt-2 min-h-13 w-full rounded-2xl border border-line bg-white px-4 font-normal"><option>A student or graduate</option><option>An employer</option><option>A university partner</option></select></label>
            <label className="text-sm font-extrabold text-navy-900 sm:col-span-2">How can we help?<textarea rows={5} className="mt-2 w-full rounded-2xl border border-line p-4 font-normal" /></label>
            <button className="min-h-14 rounded-2xl bg-coral-500 px-7 text-sm font-extrabold text-white hover:bg-coral-600 sm:col-span-2">Send enquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}
