import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy — Interns Store" };

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="How Interns Store uses cookies and similar technologies to keep the site working and improve your experience."
      updated="14 June 2026"
      sections={[
        {
          heading: "What cookies are",
          body: "Cookies are small text files stored on your device. Similar technologies include local storage, which this demo uses to remember your session, saved internships and preferences.",
        },
        {
          heading: "Cookies we use",
          body: [
            "Essential: keep you signed in and remember your session.",
            "Functional: remember saved internships, recent searches and your plan.",
            "Analytics (illustrative): help us understand which pages are useful.",
          ],
        },
        {
          heading: "Managing cookies",
          body: "You can clear cookies and local storage in your browser settings at any time. Clearing them will sign you out and reset saved items on this demo.",
        },
        {
          heading: "Third parties",
          body: "Embedded content such as maps may set their own cookies. We do not control those cookies; review the relevant provider's policy for details.",
        },
      ]}
    />
  );
}
