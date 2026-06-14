import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Community Guidelines — Interns Store" };

export default function CommunityGuidelinesPage() {
  return (
    <LegalPage
      eyebrow="Trust & safety"
      title="Community Guidelines"
      intro="Interns Store is a respectful, student-first community. These guidelines keep it safe and useful for everyone."
      updated="14 June 2026"
      sections={[
        {
          heading: "Be respectful",
          body: "Treat students, employers and staff with respect. Harassment, hate speech and discrimination are not tolerated.",
        },
        {
          heading: "Be honest",
          body: [
            "Employers: post real internships with accurate pay and requirements.",
            "Students: represent your skills and experience truthfully.",
            "Never impersonate another person or organisation.",
          ],
        },
        {
          heading: "Keep it safe",
          body: [
            "Never ask students to pay money to apply or to secure a placement.",
            "Do not share another person's private information.",
            "Report listings or messages that feel unsafe or suspicious.",
          ],
        },
        {
          heading: "What happens if guidelines are broken",
          body: "We may warn, restrict or remove accounts and listings that break these guidelines. Serious or illegal behaviour may be reported to the relevant authorities.",
        },
        {
          heading: "Reporting",
          body: "Use the Report option on any listing, or our Report a listing page, to flag content. Our team reviews reports and acts where needed.",
        },
      ]}
    />
  );
}
