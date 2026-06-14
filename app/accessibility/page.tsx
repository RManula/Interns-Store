import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Accessibility — Interns Store" };

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Inclusion"
      title="Accessibility"
      intro="We want every student and employer to be able to use Interns Store, whatever their ability or device."
      updated="14 June 2026"
      sections={[
        {
          heading: "Our commitment",
          body: "We aim to meet the spirit of WCAG 2.1 AA and to keep improving. Accessibility is considered as we design and build new features.",
        },
        {
          heading: "What we do",
          body: [
            "Semantic headings and landmarks for screen readers.",
            "Keyboard-operable navigation, menus and dialogs.",
            "Visible focus styles on interactive elements.",
            "Colour contrast checked on key text and buttons.",
            "Respect for the reduce-motion setting for animations.",
          ],
        },
        {
          heading: "Using assistive technology",
          body: "The site is designed to work with common screen readers and browser zoom. You can navigate menus and forms using the keyboard alone.",
        },
        {
          heading: "Known limitations",
          body: "As a student project, some richer interactions are still being refined. We welcome feedback so we can prioritise fixes.",
        },
        {
          heading: "Tell us about a barrier",
          body: "If you hit an accessibility barrier, contact us with the page and what happened, and we'll do our best to help and to fix it.",
        },
      ]}
    />
  );
}
