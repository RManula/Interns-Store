import type { Metadata } from "next";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { internships } from "@/lib/data";

export const metadata: Metadata = { title: "Browse Internships" };

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; field?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() ?? "";
  const location = params.location?.toLowerCase() ?? "";
  const field = params.field?.toLowerCase() ?? "";
  const results = internships.filter((item) => {
    const matchesQuery = !query || `${item.role} ${item.company}`.toLowerCase().includes(query);
    const matchesLocation = !location || `${item.location} ${item.mode}`.toLowerCase().includes(location);
    const matchesField = !field || item.field.toLowerCase().includes(field.split("&")[0].trim());
    return matchesQuery && matchesLocation && matchesField;
  });

  return (
    <>
      <section className="mesh-dark pb-20 pt-36 text-white">
        <div className="container-shell">
          <span className="eyebrow !text-blue-100">Browse internships</span>
          <h1 className="display-title mt-5 max-w-4xl">Student-first opportunities across Australia.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Explore verified internships with the details students need before applying.</p>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-5">
            <div><p className="text-sm font-extrabold text-blue-700">{results.length} opportunities</p><h2 className="mt-2 text-3xl font-semibold text-navy-950">Matching internships</h2></div>
          </div>
          {results.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {results.map((internship) => <InternshipCard key={internship.id} internship={internship} />)}
            </div>
          ) : (
            <div className="soft-card mt-10 p-10 text-center"><h2 className="text-2xl font-semibold">No exact matches yet.</h2><p className="mt-3 text-muted">Try a broader role, location or study field.</p></div>
          )}
        </div>
      </section>
    </>
  );
}
