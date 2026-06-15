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

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/interns.store" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590761306993" },
] as const;
