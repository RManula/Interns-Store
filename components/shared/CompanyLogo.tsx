import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders a company logo on a clean white tile, falling back to a coloured
 * initial when no logo is available.
 */
export function CompanyLogo({
  logo,
  name,
  color,
  size = 44,
  className,
}: {
  logo?: string;
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  if (logo) {
    return (
      <span
        style={{ width: size, height: size }}
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white",
          className,
        )}
      >
        <Image src={logo} alt={`${name} logo`} fill sizes={`${size}px`} className="object-contain p-1.5" />
      </span>
    );
  }
  return (
    <span
      style={{ width: size, height: size, backgroundColor: color }}
      className={cn("grid shrink-0 place-items-center rounded-xl text-base font-extrabold text-white", className)}
    >
      {name.charAt(0)}
    </span>
  );
}
