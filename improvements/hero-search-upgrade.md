# Codex Task Brief — Upgrade the Hero Search Bar

> **How to use this file:** Hand this whole file to the Codex agent. Each numbered section below identifies **one feature to improve**, describes the **current (broken) state** in words (since the agent can't see the screenshots), gives the **reference code / design intent**, and then the **exact instruction** for what to change. Work through them in order.

---

## Context for the agent

This is the **Interns Store** website — an internship-only marketplace for Australian students. The page in question is the **home page hero section**: a dark navy gradient background with the headline "Internships only. Your career starts here.", two CTA buttons ("Find an Internship" / "Post an Internship"), and below them a **horizontal white search bar** that floats over the hero.

The search bar currently has **four segments, left to right**:

1. A text input with a magnifying-glass icon, placeholder **"Role, skill or company"**.
2. A text input with a location-pin icon, placeholder **"City or remote"**.
3. A **"Study field"** dropdown with a graduation-cap icon and a chevron.
4. A solid blue **"Search internships"** button on the far right.

The whole bar sits inside a single large white rounded container (very rounded corners, soft shadow) that overlaps the bottom edge of the hero.

There are **three problems to fix**, detailed below.

---

## FEATURE 1 — Search bar is being clipped / cut off at the bottom

### Current state (what's wrong)
The white search-bar container is positioned so that it hangs down past the bottom of the dark hero section. The **bottom edge of the white bar is being cut off** by the section that comes immediately after the hero — it looks like the next block of the page is sitting on top of it / chopping it. The bar's bottom rounded corners and shadow are not fully visible.

This is a **stacking + overflow** issue. Likely one or more of:
- A parent/ancestor container has `overflow: hidden` (or `overflow-clip`) that crops the part of the bar that extends beyond the hero.
- The bar uses a negative margin / absolute position to "float" below the hero, but the following section has a higher stacking context or its own background that paints over the bar.
- The hero section height doesn't account for the bar overhanging it.

### Instruction
Make the floating search bar render **fully, on top of everything, with its shadow and bottom corners intact**. Specifically:

1. Find the ancestor wrapping the hero (and any wrapper around the search bar) and **remove `overflow-hidden` / `overflow-clip`** from any ancestor that is clipping the bar. If overflow-hidden is needed on the hero for a background effect, move the search bar **out** of that clipped container so it's a sibling that can overflow freely.
2. Give the search-bar container a **higher stacking order** than the following section: add `position: relative; z-index: 30;` (Tailwind: `relative z-30`) to the bar wrapper, and make sure the next section is `relative z-10` or lower.
3. If the bar is meant to overlap the hero/next-section boundary, achieve the overlap with a **negative bottom margin on the bar** (e.g. `-mb-12` / `mb-[-3rem]`) or a negative top margin on the next section, **not** by letting it get clipped. Add equivalent **top padding to the next section** so its content doesn't collide with the bar.
4. Confirm on mobile: on narrow screens the four segments should **stack vertically** inside the white card (see Feature 4 responsive note) and the card must still be fully visible, never clipped.

**Acceptance:** The entire white search bar — including its bottom rounded corners and drop shadow — is visible on desktop and mobile, sitting cleanly above the section beneath it, with no part chopped off.

---

## FEATURE 2 — "Study field" dropdown is an ugly native `<select>`

### Current state (what's wrong)
Clicking "Study field" opens the **default browser dropdown** — a plain rectangular white box with a grey-highlighted first row ("Study field") and a short list: **Technology, Business, Design, Engineering, Health**. It has hard square corners, default OS styling, no padding, no icons, no hover polish. It looks unfinished and clashes with the rounded, modern white search bar around it.

It is currently a raw HTML `<select>` element.

### Reference / design intent
Replace it with a **custom-styled dropdown** that matches the search bar: rounded corners, soft shadow, generous padding, smooth open/close, hover + selected states, a checkmark on the selected item, and the graduation-cap icon kept on the trigger. The user wants it to feel **longer and richer** with good UX — not the cramped native list.

Expand the option list so it's more substantial and useful (real study fields a student would pick). Suggested fields:

```
Technology & IT
Business & Commerce
Design & Creative
Engineering
Health & Medical
Science & Research
Law & Legal
Education & Teaching
Finance & Accounting
Marketing & Communications
Hospitality & Tourism
Trades & Construction
```

### Instruction
Build the dropdown as a **shadcn / Radix `Select`** (or a headless custom dropdown if shadcn isn't present — see setup note at the end). Requirements:

- Trigger button styled to match the segment: graduation-cap icon (lucide `GraduationCap`) on the left, label text, chevron on the right that rotates when open.
- Dropdown panel: white, `rounded-xl`, soft shadow (`shadow-lg`), `p-1.5`, max-height with scroll if the list grows (`max-h-72 overflow-y-auto`).
- Each option: comfortable padding (`px-3 py-2.5`), `rounded-lg`, `text-sm`, hover background (light blue/grey, e.g. `hover:bg-blue-50`), and a **checkmark** (lucide `Check`) shown on the currently selected item.
- Smooth fade/scale animation on open (Radix gives this for free; otherwise a short CSS transition).
- Keyboard accessible (arrow keys, Enter, Esc) and closes on outside click.
- The selected value drives the search (passed up to the parent search handler).

**Acceptance:** Opening "Study field" shows a polished, rounded, padded list of the fields above with hover and selected states, matching the look of the search bar — no native browser styling anywhere.

---

## FEATURE 3 — Live autocomplete results for "Role, skill or company" AND "City or remote"

### Current state (what's wrong)
Typing into the "Role, skill or company" box (e.g. "cyber sec") shows **nothing** — no suggestions, no live list. Same for "City or remote". The inputs are static; results only (presumably) appear after submitting. The user wants **live, as-you-type filtering** with a suggestion dropdown under each field.

### Reference / design intent (from the OriginUI search-input component the user provided)
The visual styling of the inputs should follow this OriginUI reference — a clean input with a leading icon, rounded corners, subtle shadow, and a focus ring:

```tsx
// Reference styling for the input (OriginUI). Adapt classes to the project's tokens.
<div className="relative">
  <Input className="peer pe-9 ps-9" placeholder="Search..." type="search" />
  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
    <Search size={16} strokeWidth={2} />
  </div>
</div>
```

Key styling cues to carry across both autocomplete inputs:
- Leading icon inside the field (`Search` for role, `MapPin` for city), positioned absolutely, `pointer-events-none`.
- Input padding that leaves room for the icon (`ps-9`).
- Rounded corners, soft shadow (`shadow-sm shadow-black/5`), and a focus ring (`focus-visible:ring-[3px] focus-visible:ring-ring/20`).

### Instruction
Add a **live autocomplete dropdown** to BOTH the "Role, skill or company" and "City or remote" inputs. Behaviour:

1. As the user types, filter a local data list **case-insensitively** and show matches in a dropdown directly under that input (same rounded/shadow panel style as Feature 2's dropdown).
2. Show results after **1+ characters**; if no matches, show a muted "No results for '…'" row.
3. Each suggestion row: `px-3 py-2.5`, `rounded-lg`, hover highlight, and (optional) a small icon or sublabel (e.g. role category, or "Remote" tag for the city field).
4. Clicking a suggestion fills the input and closes the dropdown. Keyboard: arrow up/down to move, Enter to select, Esc to close. Close on outside click.
5. Debounce the filtering slightly (e.g. 120ms) so it stays smooth.
6. Cap visible results (e.g. show top 8, `max-h-72 overflow-y-auto`).

Provide seed data arrays so it works out of the box (the agent can later swap these for API calls):

```ts
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
```

**Acceptance:** Typing "cyber" in the role field shows "Cyber Security Intern" live; typing "bris" in the city field shows "Brisbane, QLD" live. Both dropdowns look consistent with the Study-field dropdown, are keyboard-navigable, and close on outside click.

---

## Reference component the user supplied (OriginUI Input + Label)

Use this as the base input styling. Copy into `/components/ui/` if not already present.

**`/components/ui/input.tsx`**
```tsx
import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
```

**`/components/ui/label.tsx`**
```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-4 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
```

---

## Setup notes for the agent

- Target stack: **React + TypeScript + Tailwind CSS + shadcn/ui**. Icons via **lucide-react** (`Search`, `MapPin`, `GraduationCap`, `Check`, `ArrowRight`, `ChevronDown`).
- If shadcn isn't initialised: run the shadcn CLI to init, ensure `components.json` points components to `/components/ui` and that `@/lib/utils` exports `cn`. If Tailwind/TS aren't set up, set them up first.
- For the dropdowns (Feature 2 & 3), prefer shadcn's `Select` / `Command` (`Command` is ideal for the autocomplete in Feature 3) or `Popover` + filtered list. If you don't want extra deps, a small headless component using `useState` + outside-click handler is fine — keep the styling identical across all three dropdowns.
- Keep the four-segment layout on desktop (`flex` row with dividers between segments). On mobile, stack the segments vertically inside the white card and make the "Search internships" button full-width at the bottom.

## Overall acceptance checklist
- [ ] Search bar fully visible, never clipped, on desktop + mobile (Feature 1)
- [ ] Study-field dropdown is custom-styled, longer list, hover + selected states (Feature 2)
- [ ] Role field shows live suggestions as you type (Feature 3)
- [ ] City field shows live suggestions as you type (Feature 3)
- [ ] All three dropdowns share one consistent rounded/shadow/hover style
- [ ] Keyboard accessible, closes on outside click
- [ ] Matches the polished OriginUI input styling
