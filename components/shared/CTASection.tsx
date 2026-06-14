import { Button } from "@/components/ui/Button";
import { MotionSection } from "@/components/ui/MotionSection";

export function CTASection({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <MotionSection className="section-pad bg-white">
      <div className="container-shell">
        <div className="noise mesh-dark relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center text-white sm:px-12 lg:py-24">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="section-title mx-auto max-w-4xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/62">{text}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={primary.href}>{primary.label}</Button>
              {secondary && <Button href={secondary.href} variant="ghost">{secondary.label}</Button>}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
