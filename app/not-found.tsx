import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mesh-dark flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center text-white">
      <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-blue-200 backdrop-blur">
        <Compass size={32} />
      </span>
      <p className="mt-8 font-heading text-7xl font-bold text-white/90">404</p>
      <h1 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
        This page took an internship elsewhere.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-950 transition hover:bg-blue-50"
        >
          <Home size={16} /> Back home
        </Link>
        <Link
          href="/browse"
          className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          <Search size={16} /> Browse internships
        </Link>
      </div>
    </div>
  );
}
