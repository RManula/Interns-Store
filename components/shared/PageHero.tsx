import { Button } from "@/components/ui/Button";

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  primary,
  secondary,
  visual,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual: React.ReactNode;
}) {
  return (
    <section className="noise mesh-dark relative overflow-hidden pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
        <div>
          <span className="eyebrow !text-blue-100">{eyebrow}</span>
          <h1 className="display-title mt-6">
            {title} <span className="text-gradient">{accent}</span>
          </h1>
          <p className="body-lg mt-7 max-w-2xl text-white/65">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-12 rounded-full bg-blue-500/20 blur-[80px]" />
          <div className="relative">{visual}</div>
        </div>
      </div>
    </section>
  );
}
