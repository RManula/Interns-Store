import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Safe Internship Searching — Interns Store" };

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Trust & safety"
      title="Safe Internship Searching"
      intro="How to spot internship scams and protect yourself while searching and applying on Interns Store."
      updated="14 June 2026"
      sections={[
        {
          heading: "Never pay to get an internship",
          body: "Legitimate employers never ask students to pay money to apply, to be 'considered', or to receive a placement. Treat any request for payment, gift cards or crypto as a scam.",
        },
        {
          heading: "Warning signs of a fake employer",
          body: [
            "Pressure to act immediately or share bank details up front.",
            "Vague company info, free email addresses and no website.",
            "Offers that seem too good to be true or skip interviews.",
            "Requests to move off-platform to private messaging straight away.",
          ],
        },
        {
          heading: "Protect your personal information",
          body: [
            "Don't share bank, tax file number or ID until you've verified the employer and signed a real agreement.",
            "Verify the employer's domain and official website.",
            "Keep early conversations on the platform where possible.",
          ],
        },
        {
          heading: "Report suspicious listings",
          body: "If something feels wrong, use the Report option on the listing or our Report a listing page. Our team reviews every report.",
        },
        {
          heading: "What happens after you report",
          body: "We review the listing and employer, may request more information, and can remove listings or restrict accounts that breach our guidelines.",
        },
      ]}
    />
  );
}
