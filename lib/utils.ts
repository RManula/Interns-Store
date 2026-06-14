export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function postedLabel(days: number) {
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  if (days < 7) return `Posted ${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "Posted 1 week ago" : `Posted ${weeks} weeks ago`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
