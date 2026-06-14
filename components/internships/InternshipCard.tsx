"use client";

import Link from "next/link";
import { Heart, MapPin, Compass } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCompany } from "@/lib/data";
import { CompanyLogo } from "@/components/shared/CompanyLogo";

type Internship = {
  id: string;
  role: string;
  company: string;
  companyId: string;
  location: string;
  mode: string;
  duration: string;
  paid: boolean;
  friendly: boolean;
  credit: boolean;
  color: string;
};

export function InternshipCard({ internship }: { internship: Internship }) {
  const [saved, setSaved] = useState(false);
  const tags = [
    internship.friendly && { label: "First internship friendly", className: "bg-mint-500/12 text-emerald-700" },
    internship.paid && { label: "Paid", className: "bg-blue-50 text-blue-700" },
    internship.credit && { label: "Credit placement", className: "bg-violet-50 text-violet-700" },
  ].filter(Boolean) as Array<{ label: string; className: string }>;

  return (
    <article className="soft-card group relative flex h-full min-h-[370px] flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-[var(--shadow-md)]">
      <div className="flex items-start justify-between">
        <CompanyLogo
          logo={getCompany(internship.companyId)?.logo}
          name={internship.company}
          color={internship.color}
          size={48}
          className="rounded-2xl"
        />
        <button
          type="button"
          aria-label={saved ? `Remove ${internship.role} from saved internships` : `Save ${internship.role}`}
          aria-pressed={saved}
          className="relative z-20 grid size-11 place-items-center rounded-full text-muted transition hover:bg-coral-500/10 hover:text-coral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500"
          onClick={() => setSaved((current) => !current)}
        >
          <Heart size={20} className={cn("transition", saved && "fill-coral-500 text-coral-500")} />
        </button>
      </div>
      <div className="mt-7 flex min-h-14 flex-wrap content-start gap-2">
        {tags.map((tag) => (
          <span key={tag.label} className={cn("h-fit rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase", tag.className)}>
            {tag.label}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-navy-950 transition-colors group-hover:text-blue-700">
        {internship.role}
      </h3>
      <p className="mt-2 text-sm font-semibold text-muted">{internship.company}</p>
      <div className="mt-auto space-y-2 pt-7 text-sm text-muted">
        <p className="flex items-center gap-2"><MapPin size={15} /> {internship.location}</p>
        <p className="flex items-center gap-2"><Compass size={15} /> {internship.mode} · {internship.duration}</p>
      </div>
      <Link
        href={`/internships/${internship.id}`}
        aria-label={`View ${internship.role} at ${internship.company}`}
        className="absolute inset-0 z-10 rounded-[var(--radius-lg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      />
    </article>
  );
}
