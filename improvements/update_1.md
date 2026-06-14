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

---
---

# FEATURE 4 — Top navigation bar: labels wrap, looks cramped + needs dropdown menus

> Same page, the **top header / navigation bar**. This is a separate feature from the hero search bar above.

## Current state (what's wrong)
The header is a dark navy bar with the **"Interns Store"** logo (blue briefcase icon + two-line wordmark) on the far left, a row of nav links in the middle, and an orange **"Post an Internship"** pill button on the far right.

The nav links are: **Home** (shown as a white rounded "active" pill), **For Students**, **For Employers**, **Pricing / Plans**, **Browse Internships**, **About**, **Blog**, **Contact**, **Find an Internship**, and the orange **Post an Internship**.

The problem: several labels are **long, two-word phrases** ("For Students", "For Employers", "Pricing / Plans", "Browse Internships", "Find an Internship", "Post an Internship") and they're crammed into one row, so each one **wraps onto two lines** (e.g. "For" on top, "Students" below). The result looks cramped, uneven, and unprofessional — the items have different heights and the spacing is tight. There are also simply **too many top-level items** competing for space.

## What the user wants
1. **Shorter, cleaner labels** so nothing wraps to two lines — simple, professional, single-line items.
2. **Fewer top-level items** by grouping related pages under **dropdown menus** that open on click/hover with an arrow chevron and a nicely designed list (using the dropdown-navigation reference below). This both fixes the crowding and adds an impressive, polished interaction to show the lecturer.

## Instruction — Part A: simplify & restyle the bar

Reduce and rename the top-level items to single words / short phrases. Suggested final top-level set:

| Old label | New top-level label | Becomes a dropdown? |
|---|---|---|
| Home | **Home** | no (link) |
| For Students | **Students** | yes — dropdown |
| For Employers | **Employers** | yes — dropdown |
| Browse Internships | **Browse** | yes — dropdown |
| Pricing / Plans | **Pricing** | no (link) |
| About | merge under **Company** | yes — dropdown (About, Blog, Contact) |
| Blog | merge under **Company** | (inside Company) |
| Contact | merge under **Company** | (inside Company) |
| Find an Internship | *(drop as nav link — it's redundant with the hero CTA + Browse)* | — |
| Post an Internship | **Post an Internship** (keep as orange CTA button, far right) | no (button) |

That collapses ~10 crowded items down to: **Home · Students · Employers · Browse · Pricing · Company** + the orange **Post an Internship** button. Single line, breathing room, professional.

Styling cues (adapt the **tubelight-navbar** reference below):
- Keep the dark navy header background and the left logo lockup.
- Each nav item: single line, `whitespace-nowrap`, `text-sm font-semibold`, comfortable horizontal padding (`px-4 py-2`), `rounded-full`.
- Active item: subtle pill highlight (the white "Home" pill is fine) **or** the tubelight active indicator (a small glowing bar above the active item) from the reference — pick one and keep it consistent.
- Hover: gentle background (`hover:bg-white/10`) and a slight colour lift.
- Keep the orange "Post an Internship" as the single primary CTA pill on the right.
- Ensure `whitespace-nowrap` on every item so **nothing ever wraps to two lines**.
- Mobile: collapse the links into a hamburger menu (or the bottom-bar icon style from the tubelight reference). Don't let the row overflow on small screens.

## Instruction — Part B: dropdown mega-menus

Use the **dropdown-navigation** reference component (pasted below) for the items marked "dropdown". On click/hover with a chevron, each opens a clean panel of grouped links with an icon, a label, and a one-line description per item — exactly like the reference.

Right now the site has no sub-pages to list, so **seed each dropdown with sensible Interns Store items** (the agent can wire real links later). Suggested content:

**Students** (icon ideas in lucide):
- *Browse Internships* — "Find roles built for students" (`Search`)
- *How It Works* — "From application to offer" (`BookOpen`)
- *Build Your Profile* — "Stand out to employers" (`User`)
- *Saved & Applications* — "Track everything in one place" (`FileText`)

**Employers**:
- *Post an Internship* — "Reach work-ready students" (`Rocket`)
- *Pricing & Plans* — "Subscriptions and listing fees" (`Box`)
- *Employer Dashboard* — "Screen and manage applicants" (`Briefcase`)
- *Why Interns Store* — "Australia's internship-only marketplace" (`Globe`)

**Browse**:
- *By Study Field* — "Technology, Business, Design…" (`GraduationCap`)
- *By Location* — "Brisbane, Sydney, Remote…" (`MapPin`)
- *Remote Internships* — "Work from anywhere" (`Globe`)
- *Newest Listings* — "Just posted" (`Newspaper`)

**Company**:
- *About* — "Our mission and team" (`User`)
- *Blog* — "Tips, news and updates" (`FileText`)
- *Contact* — "Get in touch" (`Newspaper`)

Behaviour: open on hover (desktop) with the chevron rotating 180°, animated panel (framer-motion as in the reference), closes when the pointer leaves. Keyboard accessible and closes on Esc / outside click. On mobile these become expandable accordion sections inside the hamburger menu.

**Acceptance (Feature 4):**
- [ ] No nav label wraps to two lines; bar looks clean and evenly spaced on one row
- [ ] Top-level items reduced/grouped as above
- [ ] Students / Employers / Browse / Company open polished dropdown panels with icon + title + description rows
- [ ] Chevron rotates, panel animates, closes on outside click / Esc
- [ ] Orange "Post an Internship" remains the single right-side CTA
- [ ] Collapses to a hamburger on mobile without overflowing

---

## Reference component — Tubelight Navbar (for the bar styling / active indicator)
Install deps: `lucide-react`, `framer-motion`. Copy to `/components/ui/tubelight-navbar.tsx`.

```tsx
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
```

> Note for the agent: this reference is `fixed` and centered; adapt positioning to fit the existing Interns Store header (logo left, CTA right) rather than copying the fixed/centered layout verbatim. Borrow the **active-indicator glow, rounded pills, hover colour, and `whitespace-nowrap` single-line styling**, not necessarily the layout.

## Reference component — Dropdown Navigation (for the mega-menus)
Install deps: `lucide-react`, `framer-motion`. Copy to `/components/ui/dropdown-navigation.tsx`.

```tsx
import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function DropdownNavigation({ navItems }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const handleHover = (menuLabel: string | null) => setOpenMenu(menuLabel);
  const [isHover, setIsHover] = useState<number | null>(null);

  return (
    <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="relative gap-5 flex flex-col items-center justify-center">
        <ul className="relative flex items-center space-x-0">
          {navItems.map((navItem) => (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => handleHover(navItem.label)}
              onMouseLeave={() => handleHover(null)}
            >
              <button
                className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span>{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform ${openMenu === navItem.label ? "rotate-180" : ""}`}
                  />
                )}
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-primary/10"
                    style={{ borderRadius: 99 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div className="w-auto absolute left-0 top-full pt-2">
                    <motion.div
                      className="bg-background border border-border p-4 w-max"
                      style={{ borderRadius: 16 }}
                      layoutId="menu"
                    >
                      <div className="w-fit shrink-0 flex space-x-9 overflow-hidden">
                        {navItem.subMenus.map((sub) => (
                          <motion.div layout className="w-full" key={sub.title}>
                            <h3 className="mb-4 text-sm font-medium capitalize text-muted-foreground">
                              {sub.title}
                            </h3>
                            <ul className="space-y-6">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <a href="#" className="flex items-start space-x-3 group">
                                      <div className="border border-border text-foreground rounded-md flex items-center justify-center size-9 shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                                        <Icon className="h-5 w-5 flex-none" />
                                      </div>
                                      <div className="leading-5 w-max">
                                        <p className="text-sm font-medium text-foreground shrink-0">{item.label}</p>
                                        <p className="text-xs text-muted-foreground shrink-0 group-hover:text-foreground transition-colors duration-300">{item.description}</p>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

type Props = {
  navItems: {
    id: number;
    label: string;
    link?: string;
    subMenus?: {
      title: string;
      items: { label: string; description: string; icon: React.ElementType }[];
    }[];
  }[];
};
```

> Note for the agent: the reference wraps everything in a full-screen `<main>` demo container — **don't** copy that; lift only the `<ul>` nav + dropdown logic into the real header. Items with no `subMenus` render as plain links (Home, Pricing); items with `subMenus` render the chevron + animated panel. Theme the panel to read well against the dark header (the reference uses `bg-background` / `border-border` tokens — make sure those resolve to a light, legible popover, or set explicit light panel colours).


---
---

# FEATURE 5 — Re-order the page: "Why Interns Store" comparison goes lower, not at the very end

## Current state
The page currently shows the **"Why Interns Store"** comparison section too early / in the wrong place. This section has:
- A small blue eyebrow label **"— WHY INTERNS STORE"**.
- A huge dark headline: **"General job boards make students search through the noise."**
- A grey paragraph about full-time roles and senior requirements burying the opportunities students need, and rebuilding the experience around a first internship.
- A blue **"See the student experience →"** button.
- On the right, **two stacked comparison cards**: a faint light card labelled **"GENERAL JOB BOARD"** listing greyed-out negatives ("5+ years experience", "Senior account manager", "Full-time only"), and a dark navy card labelled **"INTERNS STORE"** listing green-tick positives ("No experience required", "Paid · 12 weeks", "Credit eligible").

## What the user wants
The audience is **students**, so the homepage should **lead with the service** (let students search and see real internships) and only **then** make the "why we're different from SEEK / Indeed" argument. So:

1. Move the **"Why Interns Store" comparison section LOWER** on the page — it should come **after** the hero search and after the live internship listings.
2. But it should **not** be the very last section. Keep a closing section (e.g. the app-momentum / CTA / footer) after it.

## Instruction
Reorder the homepage sections to this flow (see Feature 7 for the full canonical order). The comparison section sits in the **lower-middle** of the page — after students have seen the search bar and the "Internships worth opening" listings, positioned as the persuasive "here's why we beat general job boards" beat, with the closing momentum + CTA + footer after it. Keep all existing content and styling of the comparison section; only its **position in the page order** changes.

**Acceptance:** Service-first ordering — hero/search → real internship listings → (other value sections) → "Why Interns Store" comparison → closing momentum/CTA → footer. The comparison is never the final section.

---

# FEATURE 6 — Phone "Student momentum" section: scroll animation too slow + add feature floating-boxes

## Current state
Near the end of the page is a **dark navy section** with:
- Left: white headline **"Student momentum, made visible."** and a paragraph: "Interns Store connects students with verified employers, keeps applications organised, and turns early-career progress into a journey worth celebrating."
- Centre: a **realistic iPhone mockup** showing an "Applications" screen with a circular progress ring reading **"1248 — STUDENTS PLACED"**, and stacked notification rows ("Application shortlisted — Canopy Labs · Product Intern", "New employer match — 92% aligned…").
- Floating **glass notification cards** overlapping the phone: **"First offer secured / Placement milestone"** (top-left) and **"Interview confirmed / Tuesday · 10:30 AM"** (bottom-right).
- Right: giant faded **"INTERNS STORE"** wordmark.

This section is **scroll-pinned** (sticky) with a scroll-driven animation as you scroll through it.

## Problem 1 — the scroll animation holds too long
The pinned scroll animation has **too long a scroll distance**. The user has to keep scrolling "more and more and more" to get past it, and once the animation has revealed everything, **continuing to scroll still shows the same frame** (it's pinned far longer than there's content to animate). It feels stuck.

### Instruction
- **Reduce the pinned scroll length** so the animation completes in a shorter scroll distance — make it move a bit faster, **but not drastically** (keep it smooth and premium, just tighter). Concretely: if it's a sticky/pin section (e.g. GSAP ScrollTrigger `end`, or a tall `h-[300vh]` spacer), **cut the scroll length roughly in half** (e.g. `300vh` → `150vh`, or shorten the ScrollTrigger `end` value), and ensure the animation's last keyframe lands **at the moment the pin releases** — no "dead" scroll where the same final frame is held with nothing changing.
- Make sure once the animation finishes, the section **unpins and the next section flows up normally** — no extra empty scrolling.
- Respect `prefers-reduced-motion`: show the final composed state immediately for users with reduced motion.

## Problem 2 — add more floating feature boxes (advertise other features)
Right now only two floating cards orbit the phone. The user wants **more floating boxes around the phone (outside the screen, like the existing ones)** that advertise other Interns Store features, so the audience is impressed and the section is more informative. Keep them tasteful — don't overcrowd.

### Instruction
Add 2–3 more floating glass cards positioned around the phone (not inside the screen), each advertising a real feature. Suggested cards (icon + title + subtitle), matching the existing glass style (frosted, subtle border, soft shadow, slight float animation):
- **AI Career Chatbot** — "Ask anything, 24/7" (lucide `Bot` / `MessageCircle`)
- **Smart Match** — "Roles ranked for you" (lucide `Sparkles` / `Target`)
- **Resume Builder** — "Stand out in minutes" (lucide `FileText`)
- *(optional)* **Application Tracker** — "Every stage in one place" (lucide `ListChecks`)

Give each a gentle, staggered float/parallax (small Y drift, looping) so they feel alive but not distracting. Make sure they don't overlap the phone's key content or each other on smaller screens — on mobile, drop to 1–2 cards or stack them below the phone.

**Acceptance:** Scroll past the section feels noticeably tighter (no stuck/dead scroll), animation ends exactly as the pin releases, and the phone is surrounded by tasteful floating cards that advertise the AI chatbot, smart match, resume builder, etc.

---

# FEATURE 7 — Build out the ENTIRE remaining website: all sections, fully functional, one consistent design system

> This is the big one. The user wants the full site finished — every remaining section built, wired up, and consistent with the polished sections already designed. Treat the items below as a **design system + section checklist**. Everything must share **one common visual language**: same fonts, colours, spacing scale, hover behaviour, scroll reveals, button styles, and alignment.

## 7.1 — Lock in a shared design system (apply everywhere)

Derive these tokens from the screens already designed and apply them across **every** section, new and existing, so the whole site reads as one product.

**Colour palette** (infer exact hexes from the existing components; these are the roles):
- **Deep navy** — primary dark background (hero, momentum section, dark cards). Roughly `#0f1f3d`–`#152a52` gradient.
- **Royal blue** — primary brand / CTA + links (the blue buttons, "Search internships"). Roughly `#2563eb`-ish.
- **Coral/orange** — secondary accent CTA ("Post an Internship", "Find an Internship" pill). Roughly `#f4663a`-ish.
- **Near-black ink** — headings on light sections (the very dark "General job boards…" type).
- **Slate grey** — body text / muted labels.
- **Off-white / very light blue** — light section backgrounds and card surfaces.
- **Success green** — positive ticks ("No experience required", "Paid"). 
- Define these as CSS variables / Tailwind theme tokens (e.g. `--navy`, `--brand`, `--accent`, `--ink`, `--muted`, `--surface`, `--success`) and use the tokens everywhere — no hard-coded one-off colours.

**Typography**:
- Keep the existing display font for big headlines (the heavy, slightly rounded geometric sans used in "Internships only." and "Internships worth opening."). List the actual family the project uses and reuse it for all H1/H2.
- A clean readable sans for body (likely the same family at lighter weights). 
- Define a type scale: display (H1) → section heading (H2) → card title (H3) → body → small/eyebrow label. The small uppercase blue eyebrow labels ("— WHY INTERNS STORE", "— FRESH OPPORTUNITIES") are a recurring motif — reuse that exact eyebrow style above every major section.
- Consistent weights, line-heights and letter-spacing across sections.

**Spacing & layout**:
- One spacing scale (e.g. Tailwind's 4-pt scale). Consistent section vertical padding (e.g. `py-24` desktop / `py-16` mobile).
- One max content width container (e.g. `max-w-7xl mx-auto px-6`) used by every section so left/right edges line up down the whole page.
- Consistent card radius (the existing cards use a large radius ~`rounded-2xl`) and shadow elevation — reuse the same radius + shadow tokens for all cards.

**Interactions (apply to every interactive element)**:
- **Hover**: buttons lift slightly + slightly darken/brighten; cards lift with a soft shadow increase (`hover:-translate-y-1 hover:shadow-xl transition`); links get an underline or colour shift; the heart/save icon on internship cards toggles filled/outlined.
- **Scroll reveals**: sections and cards fade/slide up subtly on enter (e.g. framer-motion `whileInView` with a small Y offset + stagger for grids). Keep durations short (~0.4–0.6s) and respect `prefers-reduced-motion`.
- **Focus states**: visible focus rings on all interactive elements for accessibility.
- Consistent transition timing/easing tokens everywhere.

## 7.2 — Canonical homepage section order (top → bottom)

1. **Header / nav** (Feature 4) — sticky, dropdown menus, single-line labels.
2. **Hero** — "Internships only. Your career starts here." + dual CTAs + **search bar** (Features 1–3).
3. **Trust strip** *(new, optional)* — small row of "trusted by" university/company logos or key stats (e.g. "1,200+ students placed · 300+ employers · 100% internship-focused"). Reinforces credibility right after the hero.
4. **Fresh Opportunities — internship cards** (Feature 8 below) — "Internships worth opening." with the 4 cards + "Browse all internships".
5. **How It Works** *(new)* — 3–4 step flow for students (Create profile → Search & filter → Apply in one tap → Track to offer), each step an icon + title + short line. Mirror an employer version or a toggle (Students / Employers) if time allows.
6. **Why Interns Store — comparison** (Feature 5) — job board vs Interns Store. Positioned here, lower-middle.
7. **Features / What we offer** *(new)* — grid of the platform's real features: Internship-only marketplace, AI Smart Match, AI Career Chatbot, Application Tracker, Resume Builder, Verified Employers, Credit-eligible & paid filters, Location/Remote search. Icon + title + one-line description cards, consistent with the rest.
8. **Student momentum phone section** (Feature 6) — tightened scroll animation + floating feature cards.
9. **Testimonials** *(new)* — student/employer quotes (the Part B rubric explicitly rewards a **Customer Feedback** element, so include real-looking testimonials with name, course/role, avatar). 3 cards or a slider.
10. **Pricing / Plans** *(new, important)* — since the marketplace's purchasable products are **employer-facing plans** (subscriptions + listing fees), show pricing tiers here (e.g. Free listing, Featured listing $49, Employer subscription ~$150/mo). Each plan card: name, price, feature list with ticks, CTA button. This is what connects to the e-commerce/cart requirement in the assignment.
11. **Newsletter / lead-capture** *(new)* — email subscription form (rubric: lead generation). Single email field + Subscribe button, with success state. "Get new internships in your inbox."
12. **Final CTA band** *(new)* — bold closing call: "Ready to land your first internship?" with primary + secondary buttons.
13. **Footer** *(new)* — multi-column: brand + tagline, quick links (Students, Employers, Browse, Pricing, About, Blog, Contact), legal (Privacy Policy, Terms, **the required class-assignment disclaimer**), social links (Facebook, Instagram, LinkedIn, TikTok), **ABN display**, and a small embedded **Google Map** / address (the Part B rubric requires ABN, Contact, and Maps — make sure these exist somewhere, footer or Contact page).

> Note: the Part B rubric requires these to appear on the site: **ABN/ACN number, Contact Us page, online payment method, marketing/promotion, list of services, social links, location maps, and the disclaimer** "This website/app is for a class assignment and not for commercial purposes." Ensure every one of these is present across the pages. Put the disclaimer in the footer on every page.

## 7.3 — Other pages (wire the nav + buttons to real routes)

Every nav link and button must go to a real, working route — no dead `#` links. Build these pages, each reusing the header, footer, and design system:

- **/students** (For Students landing) — pulls the How-It-Works + features framed for students.
- **/employers** (For Employers landing) — value prop + link to post + pricing.
- **/browse** (Browse Internships) — full searchable/filterable list of internship cards (reuse the card component; wire the hero search + study-field filter to land here with the query applied).
- **/internships/[id]** (Internship detail) — single listing page: role, company, location, duration, tags, description, "Apply" button.
- **/pricing** (Pricing / Plans) — the employer plans; **"Buy"/"Subscribe" buttons feed the cart/checkout** (the e-commerce flow the assignment requires).
- **/post** (Post an Internship) — employer form (the orange CTA target).
- **/about**, **/blog**, **/contact** (Company group) — About (mission/team), Blog (a few article cards), Contact (form + ABN + Google Map embed).
- **Cart + Checkout + Invoice** — the assignment needs a complete cart → payment → bill/invoice flow. Wire Pricing "Buy" → cart → checkout (PayPal/Stripe sandbox or a mock) → generated invoice/bill. This satisfies the rubric's "Single payment / Bill generation".
- **Auth** (login/register) for students & employers if time allows (the lecturer asked for admin credentials on submission — make sure an admin login exists and is documented).

## 7.4 — Functionality & quality bar

- **All links work** — header, footer, buttons, cards all route correctly; the logo returns home.
- **All buttons do something** — primary CTAs route or open the right thing; "Browse all internships" → /browse; card "Apply" → detail/apply; "Subscribe" submits the newsletter with a success message; pricing "Buy" → cart.
- **Forms validate** — search, newsletter, contact, post-an-internship: basic required-field validation + success/empty states.
- **Copy is professional and sensible everywhere** — no lorem ipsum, no placeholder gibberish. Every heading, label, and description should read like real, on-brand Interns Store marketing copy aimed at students and employers. Proofread for grammar.
- **Responsive** — every section works on mobile (stacks cleanly, no overflow, nav collapses to hamburger, search bar segments stack, card grids go 1-col).
- **Accessible** — semantic headings, alt text on images, labels on inputs, visible focus, keyboard-operable menus/dropdowns, `prefers-reduced-motion` honoured.
- **Consistent** — same fonts, colours, spacing, radii, shadows, hover and scroll-reveal behaviour on every section and every page. The whole site should feel like one continuous, intentional flow.

**Acceptance (Feature 7):** A complete, multi-page, fully-functional Interns Store site where every section follows one design system, every link/button works, the e-commerce cart→payment→invoice flow exists, all rubric-required elements (ABN, Contact, Maps, payment, disclaimer, social links, services list, marketing) are present, and all copy is professional. 

---

# FEATURE 8 — "Internships worth opening" cards: polish + make functional

## Current state
A light section with eyebrow **"— FRESH OPPORTUNITIES"**, heading **"Internships worth opening."**, and a blue **"Browse all internships"** button top-right. Below: **4 internship cards**, each with a coloured rounded company-initial badge (blue C, green N, orange S, purple C), a heart/save icon top-right, status tags (**"FIRST INTERNSHIP FRIENDLY"**, **"PAID"**, **"CREDIT PLACEMENT"**), a role title (Product Design Intern, Software Engineering Intern, Brand Marketing Intern, Sustainability Analyst Intern), a company name (Canopy Labs, Northstar Systems, Sunday Studio, ClearCurrent), and location + mode/duration rows (Brisbane QLD · Hybrid · 12 weeks, etc.).

These look good but are likely **static/non-functional**.

## Instruction
- Keep the visual design; make the cards a reusable `<InternshipCard>` component driven by data.
- **Hover**: card lifts with a soft shadow; the role title shifts to brand blue; the whole card is clickable → routes to the internship detail page (`/internships/[id]`).
- **Heart/save icon**: toggles filled/outlined on click (local state is fine), `stopPropagation` so it doesn't trigger the card navigation.
- **"Browse all internships"** button → `/browse`.
- Tags are data-driven chips with consistent colours (green = "first internship friendly", blue = "paid", purple/indigo = "credit placement").
- Equalise card heights (the "Brand Marketing Intern" card has fewer tags — make sure all cards align to the same height with consistent internal spacing).
- On mobile: 1 column; tablet: 2; desktop: 4. Consistent gaps.
- Add a subtle staggered scroll-reveal as the row enters the viewport.

**Acceptance:** Cards are uniform height, fully hover-interactive, save-toggle works, every card and the browse button route correctly, and the grid is responsive with a tasteful reveal.

