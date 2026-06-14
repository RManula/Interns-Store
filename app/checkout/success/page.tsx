import type { Metadata } from "next";
import { Suspense } from "react";
import { InvoicePage } from "@/components/checkout/InvoicePage";

export const metadata: Metadata = { title: "Order Confirmed — Interns Store" };

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-muted">Loading…</div>}>
      <InvoicePage />
    </Suspense>
  );
}
