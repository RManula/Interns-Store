"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BriefcaseBusiness, Check, Download, LayoutDashboard } from "lucide-react";
import { useApp } from "@/lib/store";
import { site } from "@/lib/siteConfig";

export function InvoicePage() {
  const params = useSearchParams();
  const { user } = useApp();

  const planName = params.get("plan") ?? "Growth";
  const total = parseFloat(params.get("total") ?? "165");
  const orderNumber = params.get("order") ?? "INV-2026-10001";
  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const gst = Math.round(total * (10 / 110) * 100) / 100;
  const subtotal = Math.round((total - gst) * 100) / 100;

  const employer = user?.employer;

  return (
    <div className="min-h-screen bg-surface pt-28 pb-24">
      {/* Success banner (hidden on print) */}
      <div className="container-shell mb-10 print:hidden">
        <div className="flex flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-full bg-mint-500/15">
            <Check size={28} className="text-emerald-600" />
          </span>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-navy-950">
            Payment confirmed!
          </h1>
          <p className="mt-2 text-muted">
            Your {planName} plan is now active. A tax invoice is below.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-900 hover:bg-blue-50"
            >
              <Download size={16} /> Download invoice
            </button>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              <LayoutDashboard size={16} /> Go to dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Invoice */}
      <div className="container-shell max-w-2xl">
        <div
          id="invoice"
          className="rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-sm)] print:shadow-none print:border-0 print:rounded-none"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-white">
                <BriefcaseBusiness size={20} />
              </span>
              <div>
                <p className="font-heading text-lg font-bold text-navy-950">Interns Store</p>
                <p className="text-xs text-muted">ABN {site.abn}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-bold uppercase tracking-wide text-navy-950">
                Tax Invoice
              </p>
              <p className="mt-1 text-xs text-muted">{orderNumber}</p>
              <p className="text-xs text-muted">{today}</p>
            </div>
          </div>

          <hr className="my-6 border-line" />

          {/* Addresses */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted">
                From
              </p>
              <p className="text-sm font-semibold text-navy-950">Interns Store Pty Ltd</p>
              <p className="text-sm text-muted">{site.address}</p>
              <p className="text-sm text-muted">{site.email}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted">
                Bill to
              </p>
              <p className="text-sm font-semibold text-navy-950">
                {employer?.companyName ?? user?.name ?? "Customer"}
              </p>
              {employer?.contactName && (
                <p className="text-sm text-muted">{employer.contactName}</p>
              )}
              {employer?.abn && (
                <p className="text-sm text-muted">ABN {employer.abn}</p>
              )}
              <p className="text-sm text-muted">{user?.email}</p>
            </div>
          </div>

          <hr className="my-6 border-line" />

          {/* Line items */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-xs font-bold uppercase tracking-wide text-muted">
                <th className="pb-2 text-left">Description</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line/50">
                <td className="py-3">
                  <p className="font-semibold text-navy-950">
                    Interns Store — {planName} Plan
                  </p>
                  <p className="text-xs text-muted">1 × subscription</p>
                </td>
                <td className="py-3 text-right font-semibold">${subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 text-muted">Subtotal (ex-GST)</td>
                <td className="py-2 text-right">${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 text-muted">GST (10%)</td>
                <td className="py-2 text-right">${gst.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-line text-base font-extrabold text-navy-950">
                <td className="pt-3">Total paid</td>
                <td className="pt-3 text-right">${total.toFixed(2)} AUD</td>
              </tr>
            </tfoot>
          </table>

          <hr className="my-6 border-line" />

          {/* Footer */}
          <div className="text-center text-xs text-muted">
            <p>Payment received in full on {today}.</p>
            <p className="mt-1">
              This is a tax invoice for GST purposes. ABN: {site.abn}
            </p>
            <p className="mt-3 italic">{site.disclaimer}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body > *:not(#__next) { display: none; }
          header, footer, nav { display: none !important; }
          #invoice { max-width: 100%; box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
