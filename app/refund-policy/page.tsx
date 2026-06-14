import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Refund Policy — Interns Store" };

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Billing"
      title="Refund Policy"
      intro="When you can request a refund for paid plans and premium listings, and how to do it."
      updated="14 June 2026"
      sections={[
        {
          heading: "Refund eligibility",
          body: [
            "Duplicate charges for the same plan or listing.",
            "A technical fault on our side that prevented your ad from publishing.",
            "A charge made after a valid, on-time cancellation.",
          ],
        },
        {
          heading: "Non-refundable services",
          body: "Premium placement and featured listing fees are generally non-refundable once the ad has gone live and received visibility, except where required by Australian Consumer Law.",
        },
        {
          heading: "Duplicate payments",
          body: "If you were charged twice for the same item, we refund the duplicate in full.",
        },
        {
          heading: "How to request a refund",
          body: "Contact support with your account email, the invoice number from Billing, and a short description of the issue.",
        },
        {
          heading: "Processing time",
          body: "Approved refunds are processed back to your original payment method, typically within 5–10 business days depending on your provider.",
        },
        {
          heading: "Your consumer rights",
          body: "Nothing in this policy limits your rights under the Australian Consumer Law.",
        },
      ]}
    />
  );
}
