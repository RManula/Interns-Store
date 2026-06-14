import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = { title: "Checkout — Interns Store" };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-muted">Loading…</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
