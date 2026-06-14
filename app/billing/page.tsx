import type { Metadata } from "next";
import { BillingClient } from "@/components/billing/BillingClient";

export const metadata: Metadata = { title: "Billing & Payments — Interns Store" };

export default function BillingPage() {
  return <BillingClient />;
}
