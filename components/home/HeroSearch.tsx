"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  GraduationCap,
  MapPin,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  type KeyboardEvent,
  type RefObject,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ROLE_SUGGESTIONS = [
  "Cyber Security Intern",
  "Software Engineering Intern",
  "Data Analyst Intern",
  "UX/UI Design Intern",
  "Marketing Intern",
  "Finance Intern",
  "Business Analyst Intern",
  "Cloud / DevOps Intern",
  "AI / Machine Learning Intern",
  "Network Engineering Intern",
  "Product Management Intern",
  "Accounting Intern",
];

const CITY_SUGGESTIONS = [
  "Remote",
  "Brisbane, QLD",
  "Sydney, NSW",
  "Melbourne, VIC",
  "Perth, WA",
  "Adelaide, SA",
  "Canberra, ACT",
  "Gold Coast, QLD",
  "Hobart, TAS",
  "Darwin, NT",
  "Newcastle, NSW",
  "Wollongong, NSW",
];

const STUDY_FIELDS = [
  "Technology & IT",
  "Business & Commerce",
  "Design & Creative",
  "Engineering",
  "Health & Medical",
  "Science & Research",
  "Law & Legal",
  "Education & Teaching",
  "Finance & Accounting",
  "Marketing & Communications",
  "Hospitality & Tourism",
  "Trades & Construction",
];

const panelClass =
  "absolute inset-x-0 top-[calc(100%+.55rem)] z-50 max-h-72 overflow-y-auto rounded-2xl border border-line bg-white p-1.5 text-ink shadow-[0_22px_55px_rgba(7,21,47,.18)] origin-top animate-[search-menu-in_.16s_ease-out]";

function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
) {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) onOutside();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [onOutside, ref]);
}

interface AutocompleteFieldProps {
  icon: LucideIcon;
  label: string;
  name: string;
  placeholder: string;
  suggestions: string[];
  resultHint: (value: string) => string;
}

function AutocompleteField({
  icon: Icon,
  label,
  name,
  placeholder,
  suggestions,
  resultHint,
}: AutocompleteFieldProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useOutsideClick(rootRef, () => setOpen(false));

  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(value.trim()), 120);
    return () => window.clearTimeout(timer);
  }, [value]);

  const matches = useMemo(() => {
    if (!query) return [];
    const normalized = query.toLocaleLowerCase();
    return suggestions
      .filter((suggestion) => suggestion.toLocaleLowerCase().includes(normalized))
      .slice(0, 8);
  }, [query, suggestions]);

  const choose = (suggestion: string) => {
    setValue(suggestion);
    setQuery(suggestion);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open || matches.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + matches.length) % matches.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(matches[activeIndex]);
    }
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      <label htmlFor={`${id}-input`} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          name={name}
          type="search"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open && query.length > 0}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={
            open && matches.length > 0 ? `${id}-option-${activeIndex}` : undefined
          }
          className="h-14 border-transparent bg-transparent pe-10 ps-11 shadow-none hover:bg-blue-50/70 focus-visible:bg-white"
          onChange={(event) => {
            setValue(event.target.value);
            setActiveIndex(0);
            setOpen(event.target.value.trim().length > 0);
          }}
          onFocus={() => value.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <Icon
          size={20}
          className="pointer-events-none absolute inset-y-0 start-4 my-auto text-blue-600"
          aria-hidden="true"
        />
        {value && (
          <button
            type="button"
            aria-label={`Clear ${label.toLowerCase()}`}
            className="absolute inset-y-0 end-2 my-auto grid size-9 place-items-center rounded-full text-muted transition hover:bg-blue-100 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            onClick={() => {
              setValue("");
              setQuery("");
              setOpen(false);
            }}
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      {open && query.length > 0 && (
        <div id={`${id}-listbox`} role="listbox" aria-label={`${label} suggestions`} className={panelClass}>
          {matches.length > 0 ? (
            matches.map((suggestion, index) => (
              <button
                id={`${id}-option-${index}`}
                key={suggestion}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                  index === activeIndex ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50",
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(suggestion)}
              >
                <span>
                  <span className="block font-bold">{suggestion}</span>
                  <span className="mt-0.5 block text-xs font-medium text-muted">
                    {resultHint(suggestion)}
                  </span>
                </span>
                <ArrowRight size={15} className="shrink-0 text-blue-500" aria-hidden="true" />
              </button>
            ))
          ) : (
            <p className="px-3 py-3 text-sm text-muted">No results for &quot;{query}&quot;</p>
          )}
        </div>
      )}
    </div>
  );
}

function StudyFieldSelect() {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useOutsideClick(rootRef, () => setOpen(false));

  const choose = (field: string) => {
    setSelected(field);
    setActiveIndex(STUDY_FIELDS.indexOf(field));
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((index) =>
        event.key === "ArrowDown"
          ? (index + 1) % STUDY_FIELDS.length
          : (index - 1 + STUDY_FIELDS.length) % STUDY_FIELDS.length,
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(STUDY_FIELDS[activeIndex]);
      else setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      <input type="hidden" name="field" value={selected} />
      <button
        type="button"
        role="combobox"
        aria-label="Study field"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        className="flex h-14 w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-semibold text-ink transition hover:bg-blue-50/70 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/15"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <GraduationCap size={20} className="shrink-0 text-blue-600" aria-hidden="true" />
        <span className={cn("min-w-0 flex-1 truncate", !selected && "text-muted")}>
          {selected || "Study field"}
        </span>
        <ChevronDown
          size={17}
          className={cn("shrink-0 text-muted transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={`${id}-listbox`} role="listbox" aria-label="Study fields" className={panelClass}>
          {STUDY_FIELDS.map((field, index) => (
            <button
              id={`${id}-option-${index}`}
              key={field}
              type="button"
              role="option"
              aria-selected={selected === field}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition",
                index === activeIndex ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50",
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(field)}
            >
              <span>{field}</span>
              <Check
                size={16}
                className={cn("shrink-0 text-blue-600", selected === field ? "opacity-100" : "opacity-0")}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function HeroSearch() {
  return (
    <>
      <style>{`
        @keyframes search-menu-in {
          from { opacity: 0; transform: translateY(-4px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <form
        action="/browse"
        className="grid gap-1.5 rounded-[1.75rem] border border-white/80 bg-white p-2.5 text-ink shadow-[0_30px_90px_rgba(7,21,47,.3)] md:grid-cols-[1.35fr_1fr_1fr_auto] md:gap-0"
      >
        <div className="min-w-0 md:pe-1.5">
          <AutocompleteField
            icon={Search}
            label="Role, skill or company"
            name="q"
            placeholder="Role, skill or company"
            suggestions={ROLE_SUGGESTIONS}
            resultHint={() => "Internship role"}
          />
        </div>
        <div className="min-w-0 border-t border-line pt-1.5 md:border-l md:border-t-0 md:px-1.5 md:pt-0">
          <AutocompleteField
            icon={MapPin}
            label="City or remote"
            name="location"
            placeholder="City or remote"
            suggestions={CITY_SUGGESTIONS}
            resultHint={(value) => (value === "Remote" ? "Work from anywhere" : "Australian location")}
          />
        </div>
        <div className="min-w-0 border-t border-line pt-1.5 md:border-l md:border-t-0 md:px-1.5 md:pt-0">
          <StudyFieldSelect />
        </div>
        <button className="mt-1.5 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:mt-0 md:ms-1.5">
          Search internships
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </form>
    </>
  );
}
