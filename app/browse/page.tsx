import type { Metadata } from "next";
import { BrowseClient } from "@/components/browse/BrowseClient";
import { companies, internships } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Internships",
  description: "Search and filter student-first internships across Australia.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; field?: string }>;
}) {
  const params = await searchParams;
  return (
    <BrowseClient
      internships={internships}
      companies={companies}
      initialQuery={params.q ?? ""}
      initialLocation={params.location ?? ""}
      initialField={params.field ?? ""}
    />
  );
}
