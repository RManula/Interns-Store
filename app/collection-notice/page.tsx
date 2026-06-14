import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Collection Notice — Interns Store" };

export default function CollectionNoticePage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Collection Notice"
      intro="A short summary of what personal information we collect and why, at the point you provide it."
      updated="14 June 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "Account details: name, email and password.",
            "Student profile: education, skills, work rights, résumé and preferences.",
            "Employer details: company name, ABN, contact person and listings.",
            "Usage: saved internships, searches and applications.",
          ],
        },
        {
          heading: "Why we collect it",
          body: "To create your account, match students with internships, let employers manage applicants, and operate core features such as saved items and application tracking.",
        },
        {
          heading: "Who can see it",
          body: "Employers can see student profiles and applications submitted to their listings. You control whether your profile is discoverable from your privacy settings.",
        },
        {
          heading: "Your choices",
          body: "You can view, edit or delete your information from your profile and settings. For full detail see our Privacy Policy.",
        },
      ]}
    />
  );
}
