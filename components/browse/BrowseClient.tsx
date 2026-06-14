"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Clock,
  GraduationCap,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { Company, Internship, WorkMode, WorkType } from "@/lib/types";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { JobDetail } from "@/components/browse/JobDetail";
import { JobListItem } from "@/components/browse/JobListItem";

type BrowseClientProps = {
  internships: Internship[];
  companies: Company[];
  initialQuery: string;
  initialLocation: string;
  initialField: string;
};

const WORK_TYPES: WorkType[] = ["Full-time", "Part-time", "Casual", "Contract", "Vacation"];
const MODES: WorkMode[] = ["Remote", "Hybrid", "On-site"];
const SORTS = [
  { id: "relevance", label: "Relevance" },
  { id: "newest", label: "Newest first" },
  { id: "pay", label: "Highest pay" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function payValue(salary: string) {
  const match = salary.replace(/,/g, "").match(/\d+/g);
  return match ? Math.max(...match.map(Number)) : 0;
}

export function BrowseClient({
  internships,
  companies,
  initialQuery,
  initialLocation,
  initialField,
}: BrowseClientProps) {
  const router = useRouter();
  const { user, toggleSave, recentSearches, addRecentSearch, clearRecentSearches, postedListings } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [field, setField] = useState(initialField);
  const [workTypes, setWorkTypes] = useState<Set<string>>(new Set());
  const [modes, setModes] = useState<Set<string>>(new Set());
  const [paidOnly, setPaidOnly] = useState(false);
  const [creditOnly, setCreditOnly] = useState(false);
  const [friendlyOnly, setFriendlyOnly] = useState(false);
  const [sort, setSort] = useState<SortId>("relevance");
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDesktop, setIsDesktop] = useState(true);

  const allInternships = useMemo(
    () => [...postedListings, ...internships],
    [postedListings, internships],
  );

  const companyMap = useMemo(
    () => new Map(companies.map((company) => [company.id, company])),
    [companies],
  );
  const fields = useMemo(
    () => Array.from(new Set(allInternships.map((item) => item.field))).sort(),
    [allInternships],
  );
  const roleSuggestions = useMemo(
    () => Array.from(new Set(allInternships.map((item) => item.role))),
    [allInternships],
  );
  const locationSuggestions = useMemo(
    () => Array.from(new Set(["Remote", ...allInternships.map((item) => item.location)])),
    [allInternships],
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const list = allInternships.filter((item) => {
      const matchesQuery =
        !q ||
        `${item.role} ${item.company} ${item.classification} ${item.field}`
          .toLowerCase()
          .includes(q);
      const matchesLocation =
        !loc || `${item.location} ${item.mode}`.toLowerCase().includes(loc);
      const matchesField = !field || item.field === field;
      const matchesWorkType = workTypes.size === 0 || workTypes.has(item.workType);
      const matchesMode = modes.size === 0 || modes.has(item.mode);
      const matchesPaid = !paidOnly || item.paid;
      const matchesCredit = !creditOnly || item.credit;
      const matchesFriendly = !friendlyOnly || item.friendly;
      return (
        matchesQuery &&
        matchesLocation &&
        matchesField &&
        matchesWorkType &&
        matchesMode &&
        matchesPaid &&
        matchesCredit &&
        matchesFriendly
      );
    });
    if (sort === "newest") list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    if (sort === "pay") list.sort((a, b) => payValue(b.salary) - payValue(a.salary));
    return list;
  }, [allInternships, query, location, field, workTypes, modes, paidOnly, creditOnly, friendlyOnly, sort]);

  useEffect(() => {
    if (!isDesktop) return;
    if (results.length === 0) {
      setSelectedId("");
    } else if (!results.some((item) => item.id === selectedId)) {
      setSelectedId(results[0].id);
    }
  }, [results, isDesktop, selectedId]);

  const selected = results.find((item) => item.id === selectedId) ?? results[0];
  const activeFilterCount =
    workTypes.size + modes.size + (paidOnly ? 1 : 0) + (creditOnly ? 1 : 0) + (friendlyOnly ? 1 : 0);

  const runSearch = () => {
    addRecentSearch({ q: query.trim(), location: location.trim(), field });
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    if (field) params.set("field", field);
    router.replace(`/browse${params.toString() ? `?${params}` : ""}`, { scroll: false });
  };

  const handleSelect = (id: string) => {
    if (isDesktop) {
      setSelectedId(id);
    } else {
      router.push(`/internships/${id}`);
    }
  };

  const handleSave = (id: string) => {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent("/browse")}`);
      return;
    }
    toggleSave(id);
  };

  const toggleSetItem = (
    setter: typeof setWorkTypes,
    current: Set<string>,
    value: string,
  ) => {
    const next = new Set(current);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const resetFilters = () => {
    setWorkTypes(new Set());
    setModes(new Set());
    setPaidOnly(false);
    setCreditOnly(false);
    setFriendlyOnly(false);
  };

  return (
    <div>
      {/* Search header */}
      <section className="mesh-dark pb-8 pt-32 text-white">
        <div className="container-shell">
          <h1 className="font-heading text-3xl font-semibold md:text-4xl">
            Find your internship
          </h1>
          <p className="mt-2 text-white/65">
            {allInternships.length} student-first opportunities across Australia.
          </p>

          <div className="mt-6 grid gap-2 rounded-2xl bg-white p-2 text-ink shadow-[0_30px_90px_rgba(7,21,47,.35)] md:grid-cols-[1.5fr_1.2fr_auto]">
            <ComboInput
              icon={Search}
              placeholder="Role, skill or company"
              value={query}
              onChange={setQuery}
              onEnter={runSearch}
              suggestions={roleSuggestions}
            />
            <div className="border-t border-line md:border-l md:border-t-0">
              <ComboInput
                icon={MapPin}
                placeholder="Suburb, city or remote"
                value={location}
                onChange={setLocation}
                onEnter={runSearch}
                suggestions={locationSuggestions}
              />
            </div>
            <button
              type="button"
              onClick={runSearch}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-extrabold text-white transition hover:bg-blue-700"
            >
              <Search size={17} /> SEEK
            </button>
          </div>

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/55">
                <Clock size={13} /> Recent
              </span>
              {recentSearches.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setQuery(item.q);
                    setLocation(item.location);
                    setField(item.field);
                  }}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 transition hover:bg-white/20"
                >
                  {[item.q, item.location, item.field].filter(Boolean).join(" · ") || "All internships"}
                </button>
              ))}
              <button
                type="button"
                onClick={clearRecentSearches}
                className="text-xs font-semibold text-white/45 underline-offset-2 hover:text-white/80 hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[68px] z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-shell flex flex-wrap items-center gap-2 py-3">
          <FilterMenu label="Study field" icon={GraduationCap} active={Boolean(field)}>
            <div className="w-56 p-1.5">
              <MenuItem active={!field} onClick={() => setField("")}>
                All study fields
              </MenuItem>
              {fields.map((option) => (
                <MenuItem key={option} active={field === option} onClick={() => setField(option)}>
                  {option}
                </MenuItem>
              ))}
            </div>
          </FilterMenu>

          <FilterMenu label="Work type" active={workTypes.size > 0} count={workTypes.size}>
            <div className="w-52 p-1.5">
              {WORK_TYPES.map((option) => (
                <CheckRow
                  key={option}
                  checked={workTypes.has(option)}
                  onChange={() => toggleSetItem(setWorkTypes, workTypes, option)}
                >
                  {option}
                </CheckRow>
              ))}
            </div>
          </FilterMenu>

          <FilterMenu label="Remote / mode" active={modes.size > 0} count={modes.size}>
            <div className="w-52 p-1.5">
              {MODES.map((option) => (
                <CheckRow
                  key={option}
                  checked={modes.has(option)}
                  onChange={() => toggleSetItem(setModes, modes, option)}
                >
                  {option}
                </CheckRow>
              ))}
            </div>
          </FilterMenu>

          <FilterMenu label="More filters" icon={SlidersHorizontal} active={paidOnly || creditOnly || friendlyOnly}>
            <div className="w-56 p-1.5">
              <CheckRow checked={paidOnly} onChange={() => setPaidOnly((v) => !v)}>
                Paid only
              </CheckRow>
              <CheckRow checked={creditOnly} onChange={() => setCreditOnly((v) => !v)}>
                Credit eligible
              </CheckRow>
              <CheckRow checked={friendlyOnly} onChange={() => setFriendlyOnly((v) => !v)}>
                First internship friendly
              </CheckRow>
            </div>
          </FilterMenu>

          <div className="ms-auto flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-coral-600 hover:bg-coral-500/10"
              >
                <X size={13} /> Clear filters
              </button>
            )}
            <FilterMenu label={`Sort: ${SORTS.find((s) => s.id === sort)?.label}`} align="right">
              <div className="w-44 p-1.5">
                {SORTS.map((option) => (
                  <MenuItem
                    key={option.id}
                    active={sort === option.id}
                    onClick={() => setSort(option.id)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </div>
            </FilterMenu>
          </div>
        </div>
      </section>

      {/* Results + preview */}
      <section className="bg-surface">
        <div className="container-shell grid gap-6 py-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div>
            <p className="mb-4 text-sm font-bold text-navy-950">
              {results.length} {results.length === 1 ? "internship" : "internships"} found
            </p>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map((item) => (
                  <JobListItem
                    key={item.id}
                    internship={item}
                    selected={isDesktop && item.id === selected?.id}
                    onSelect={() => handleSelect(item.id)}
                    onSave={() => handleSave(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-line bg-white p-8 text-center">
                <h2 className="font-heading text-xl font-semibold text-navy-950">
                  No matches yet
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Try a broader role, location or clearing some filters.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Desktop preview pane */}
          {selected && (
            <div className="hidden lg:block">
              <div className="sticky top-[132px] max-h-[calc(100vh-150px)] overflow-y-auto rounded-[1.4rem] shadow-[0_24px_70px_rgba(7,21,47,.12)]">
                <JobDetail
                  key={selected.id}
                  internship={selected}
                  company={companyMap.get(selected.companyId)}
                  variant="preview"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ---------- small building blocks ---------- */

function ComboInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  onEnter,
  suggestions,
}: {
  icon: typeof Search;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  suggestions: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const matches = value.trim()
    ? suggestions
        .filter((item) => item.toLowerCase().includes(value.trim().toLowerCase()))
        .slice(0, 6)
    : suggestions.slice(0, 6);

  return (
    <div ref={ref} className="relative">
      <Icon size={18} className="pointer-events-none absolute inset-y-0 start-3 my-auto text-blue-600" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setOpen(false);
            onEnter();
          }
        }}
        className="h-12 w-full rounded-xl bg-transparent ps-11 pe-3 text-sm font-medium text-ink placeholder:text-muted focus:outline-none"
      />
      {open && matches.length > 0 && (
        <div className="absolute inset-x-0 top-[calc(100%+.35rem)] z-50 max-h-64 overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_22px_55px_rgba(7,21,47,.18)]">
          {matches.map((match) => (
            <button
              key={match}
              type="button"
              onClick={() => {
                onChange(match);
                setOpen(false);
              }}
              className="block w-full truncate rounded-lg px-3 py-2 text-left text-sm hover:bg-blue-50"
            >
              {match}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterMenu({
  label,
  icon: Icon,
  active,
  count,
  align = "left",
  children,
}: {
  label: string;
  icon?: typeof Search;
  active?: boolean;
  count?: number;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition",
          active
            ? "border-blue-600 bg-blue-50 text-blue-700"
            : "border-line bg-white text-navy-900 hover:bg-blue-50",
        )}
      >
        {Icon && <Icon size={15} />}
        {label}
        {count ? <span className="rounded-full bg-blue-600 px-1.5 text-[0.65rem] text-white">{count}</span> : null}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-[calc(100%+.4rem)] z-50 rounded-xl border border-line bg-white shadow-[0_22px_55px_rgba(7,21,47,.18)]",
            align === "right" ? "end-0" : "start-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition",
        active ? "bg-blue-50 text-blue-700" : "text-ink hover:bg-blue-50",
      )}
    >
      {children}
    </button>
  );
}

function CheckRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-blue-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-line accent-blue-600"
      />
      {children}
    </label>
  );
}
