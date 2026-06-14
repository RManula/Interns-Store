import type { Metadata } from "next";
import { Suspense } from "react";
import { StudentCheckoutClient } from "@/components/checkout/StudentCheckoutClient";

export const metadata: Metadata = { title: "Student Checkout — Interns Store" };

export default function StudentCheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-muted">Loading…</div>}>
      <StudentCheckoutClient />
    </Suspense>
  );
}
