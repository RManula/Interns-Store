export const site = {
  name: "Interns Store",
  tagline: "Internships only. Your career starts here.",
  description:
    "Australia's student-first internship marketplace. Find, apply for and track internships in one place, free.",
  abn: "00 000 000 000",
  email: "hello@internsstore.com.au",
  phone: "+61 7 3000 2026",
  address: "Brisbane, Queensland, Australia",
  disclaimer:
    "This website/app is for a class assignment and not for commercial purposes.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "For Students", href: "/for-students" },
  { label: "For Employers", href: "/for-employers" },
  { label: "Pricing / Plans", href: "/pricing" },
  { label: "Browse Internships", href: "/browse" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// TEAM ACTION REQUIRED: Replace these with real social media page URLs once created.
// At minimum create a LinkedIn Company Page for "Interns Store" — rubric requires live links.
export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/interns-store" },
  { label: "Instagram", href: "https://www.instagram.com/internsstore.au" },
  { label: "Facebook", href: "https://www.facebook.com/internsstore" },
  { label: "TikTok", href: "https://www.tiktok.com/@internsstore" },
] as const;
