import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions — Interns Store" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms govern your use of Interns Store. By creating an account or using the site you agree to them."
      updated="14 June 2026"
      sections={[
        {
          heading: "1. About these terms",
          body: "Interns Store is a student-first internship marketplace operated as part of a university class assignment. These terms set out the rules for using the platform as a student, an employer or a visitor.",
        },
        {
          heading: "2. Using your account",
          body: [
            "You must provide accurate information when registering.",
            "You are responsible for keeping your password secure.",
            "You must be old enough to enter a binding agreement in your state or territory.",
            "One person or organisation per account unless we agree otherwise.",
          ],
        },
        {
          heading: "3. Acceptable use",
          body: [
            "Do not post false, misleading or discriminatory internship listings.",
            "Do not request payment from students to apply or to secure a placement.",
            "Do not scrape, resell or misuse data from the platform.",
            "Do not upload unlawful, harmful or infringing content.",
          ],
        },
        {
          heading: "4. Internship listings",
          body: "Employers are solely responsible for the accuracy and legality of their listings, including pay status and work rights requirements. Interns Store does not guarantee placement and is not party to any employment or placement agreement between students and employers.",
        },
        {
          heading: "5. Payments",
          body: "Paid plans and premium listings are billed as described on the Pricing page. See our Cancellation and Refund policies for how changes and refunds are handled.",
        },
        {
          heading: "6. Liability",
          body: "The platform is provided on an \"as is\" basis for educational purposes. To the extent permitted by law, we are not liable for losses arising from your use of the site or from interactions with other users.",
        },
        {
          heading: "7. Changes",
          body: "We may update these terms from time to time. Continued use after an update means you accept the revised terms.",
        },
      ]}
    />
  );
}
