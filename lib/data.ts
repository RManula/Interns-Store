export const internships = [
  {
    id: "product-design-intern",
    role: "Product Design Intern",
    company: "Canopy Labs",
    location: "Brisbane, QLD",
    mode: "Hybrid",
    duration: "12 weeks",
    field: "Design",
    paid: true,
    friendly: true,
    credit: true,
    color: "#246bfe",
  },
  {
    id: "software-engineering-intern",
    role: "Software Engineering Intern",
    company: "Northstar Systems",
    location: "Sydney, NSW",
    mode: "Remote",
    duration: "8 weeks",
    field: "Technology",
    paid: true,
    friendly: true,
    credit: false,
    color: "#22c7a9",
  },
  {
    id: "brand-marketing-intern",
    role: "Brand Marketing Intern",
    company: "Sunday Studio",
    location: "Melbourne, VIC",
    mode: "On-site",
    duration: "12 weeks",
    field: "Marketing",
    paid: true,
    friendly: false,
    credit: true,
    color: "#ff6b4a",
  },
  {
    id: "sustainability-analyst-intern",
    role: "Sustainability Analyst Intern",
    company: "ClearCurrent",
    location: "Perth, WA",
    mode: "Hybrid",
    duration: "6 weeks",
    field: "Environment",
    paid: false,
    friendly: true,
    credit: true,
    color: "#8b5cf6",
  },
] as const;

export const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "per listing",
    description: "A focused launch for one internship opportunity.",
    features: ["1 active listing", "Verified employer badge", "Applicant inbox"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$150",
    period: "per month",
    description: "For growing teams building a repeatable intern pipeline.",
    features: ["5 active listings", "Featured placement", "Candidate insights"],
    featured: true,
  },
  {
    name: "Scale",
    price: "$390",
    period: "per month",
    description: "High-volume university and graduate recruitment.",
    features: ["Unlimited listings", "Priority campaigns", "Team analytics"],
    featured: false,
  },
] as const;

export const testimonials = [
  {
    quote:
      "The filters understood what I actually needed as a student. I found a paid, credit-eligible design internship in three days.",
    name: "Maya Chen",
    role: "UX student, QUT",
    initials: "MC",
  },
  {
    quote:
      "We stopped paying agency rates to reach the wrong audience. Interns Store put our role directly in front of motivated students.",
    name: "Jordan Wells",
    role: "People Lead, Canopy Labs",
    initials: "JW",
  },
  {
    quote:
      "The application tracker made my first search feel manageable. I always knew what to do next.",
    name: "Isaac Brown",
    role: "Business graduate, UQ",
    initials: "IB",
  },
] as const;

export const studentFaqs = [
  {
    q: "Is Interns Store completely free for students?",
    a: "Yes. Searching, saving roles, building a profile, applying and tracking applications are free for students and recent graduates.",
  },
  {
    q: "Can I apply if I have no previous experience?",
    a: "Absolutely. Look for the First Internship Friendly and No Experience Required badges. These roles are intentionally designed for first-time applicants.",
  },
  {
    q: "Can I find internships eligible for academic credit?",
    a: "Yes. Academic-credit eligibility is a dedicated filter and is clearly shown on every relevant listing.",
  },
  {
    q: "How does the application tracker work?",
    a: "Saved, applied, interviewing and offer stages appear in one simple timeline, so you can manage every opportunity without spreadsheets.",
  },
  {
    q: "Does Interns Store support international students?",
    a: "Yes. Employers can show work-right requirements clearly, and our guidance explains what to check before applying.",
  },
] as const;

export const posts = [
  {
    slug: "first-internship-cv",
    title: "How to write your first internship CV",
    excerpt:
      "No industry experience yet? Build a credible CV from projects, coursework, volunteering and transferable skills.",
    category: "CV Lab",
    date: "2026-06-08",
    read: "7 min read",
    color: "from-blue-700 to-blue-500",
  },
  {
    slug: "industries-hiring-interns-2026",
    title: "The Australian industries hiring interns in 2026",
    excerpt:
      "Technology, renewables, healthcare and professional services are opening more structured student pathways.",
    category: "Market Guide",
    date: "2026-05-29",
    read: "6 min read",
    color: "from-emerald-600 to-mint-500",
  },
  {
    slug: "paid-vs-unpaid-internships",
    title: "Paid vs unpaid internships in Australia",
    excerpt:
      "Understand the difference between a lawful vocational placement and productive work that should be paid.",
    category: "Know Your Rights",
    date: "2026-05-19",
    read: "8 min read",
    color: "from-orange-600 to-coral-500",
  },
  {
    slug: "host-a-great-internship",
    title: "How employers can host an internship students recommend",
    excerpt:
      "Clear outcomes, real mentorship and useful feedback turn a short placement into a lasting talent pipeline.",
    category: "For Employers",
    date: "2026-05-03",
    read: "5 min read",
    color: "from-violet-700 to-blue-500",
  },
] as const;

export const team = [
  { name: "Manula Ranasinghage", role: "Product & Experience", initials: "MR" },
  { name: "Vanshil Radadiya", role: "Marketplace Operations", initials: "VR" },
  { name: "Joao Albuquerque", role: "Employer Growth", initials: "JA" },
  { name: "Riad Hossain", role: "Trust & Marketing", initials: "RH" },
] as const;
