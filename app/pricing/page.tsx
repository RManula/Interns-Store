import type { Metadata } from "next";
import { PricingClient } from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
  title: "Pricing — Interns Store",
  description: "Student and employer plans for Australia's internship marketplace.",
};

export default function PricingPage() {
  return <PricingClient />;
}
