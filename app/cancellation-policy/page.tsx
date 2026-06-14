import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Cancellation Policy — Interns Store" };

export default function CancellationPolicyPage() {
  return (
    <LegalPage
      eyebrow="Billing"
      title="Cancellation Policy"
      intro="How to cancel internship ads, pause listings and end subscriptions on Interns Store."
      updated="14 June 2026"
      sections={[
        {
          heading: "Cancelling before publishing",
          body: "Draft internship ads can be cancelled at any time before publishing at no cost. Drafts are saved to your employer dashboard.",
        },
        {
          heading: "Cancelling a published ad",
          body: "You can close or pause a published ad from Manage internships. Closing stops new applications immediately; existing applicants remain visible in your dashboard.",
        },
        {
          heading: "Pausing vs closing",
          body: [
            "Pause: temporarily hides the ad from search; you can re-publish later.",
            "Close: ends the ad and marks it as closed.",
          ],
        },
        {
          heading: "Subscription cancellation",
          body: "You can cancel a paid plan from Billing. Your plan stays active until the end of the current billing period, then reverts to Free. Cancel before the renewal date to avoid the next charge.",
        },
        {
          heading: "Effect on applicants and data",
          body: "Cancelling an ad does not delete applications already received. You remain responsible for handling applicant data in line with our Privacy Policy.",
        },
        {
          heading: "Need help?",
          body: "Contact support and we'll help you cancel or make changes.",
        },
      ]}
    />
  );
}
