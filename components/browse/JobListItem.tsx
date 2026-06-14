"use client";

import { Banknote, Bookmark, Clock3, MapPin } from "lucide-react";
import type { Internship } from "@/lib/types";
import { useApp } from "@/lib/store";
import { cn, postedLabel } from "@/lib/utils";

type JobListItemProps = {
  internship: Internship;
  selected: boolean;
  onSelect: () => void;
  onSave: () => void;
};

export function JobListItem({ internship, selected, onSelect, onSave }: JobListItemProps) {
  const { isSaved } = useApp();
  const saved = isSaved(internship.id);

  const isJustPosted = internship.postedDaysAgo <= 1;
  const badges = [
    internship.friendly && "First internship friendly",
    internship.paid && "Paid",
    internship.credit && "Credit eligible",
  ].filter(Boolean) as string[];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative cursor-pointer rounded-2xl border bg-white p-5 text-left transition",
        selected
          ? "border-blue-600 shadow-[0_18px_45px_rgba(36,107,254,.16)] ring-1 ring-blue-600"
          : "border-line hover:border-blue-500/40 hover:shadow-[var(--shadow-sm)]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-xl text-base font-extrabold text-white"
          style={{ backgroundColor: internship.color }}
        >
          {internship.company.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-heading text-lg font-semibold text-navy-950 group-hover:text-blue-700">
              {internship.role}
            </h3>
            {isJustPosted && (
              <span className="shrink-0 rounded-full bg-coral-500 px-2 py-0.5 text-[0.58rem] font-extrabold uppercase text-white">
                Just posted
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-muted">{internship.company}</p>
        </div>
        <button
          type="button"
          aria-label={saved ? "Saved" : "Save"}
          aria-pressed={saved}
          onClick={(event) => {
            event.stopPropagation();
            onSave();
          }}
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full transition",
            saved ? "text-blue-600" : "text-muted hover:bg-blue-50 hover:text-blue-600",
          )}
        >
          <Bookmark size={18} className={cn(saved && "fill-blue-600")} />
        </button>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-muted">
        <p className="flex items-center gap-2">
          <MapPin size={15} className="shrink-0" /> {internship.location} · {internship.mode}
        </p>
        <p className="flex items-center gap-2">
          <Banknote size={15} className="shrink-0" /> {internship.salary}
        </p>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink">{internship.summary}</p>

      {badges.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase text-blue-700"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-muted">
        <Clock3 size={13} /> {postedLabel(internship.postedDaysAgo)}
      </p>
    </div>
  );
}
