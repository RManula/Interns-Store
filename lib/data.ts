import type { ApplicantVolume, Company, EmployerQuestion, Internship, WorkMode, WorkType } from "@/lib/types";

const RIGHT_TO_WORK_OPTIONS = [
  "I'm an Australian citizen",
  "I'm a permanent resident and/or NZ citizen",
  "I have a family/partner visa with no work restrictions",
  "I have a graduate temporary work visa",
  "I have a student visa with work rights",
  "I have a holiday working visa",
  "I require sponsorship to work for a new employer",
];

const STUDY_OPTIONS = [
  "Not yet enrolled",
  "Currently studying (1st year)",
  "Currently studying (2nd year)",
  "Currently studying (penultimate year)",
  "Currently studying (final year)",
  "Recently graduated",
];

function baseQuestions(extra: EmployerQuestion[] = []): EmployerQuestion[] {
  return [
    {
      id: "right-to-work",
      label: "Which of the following statements best describes your right to work in Australia?",
      type: "select",
      options: RIGHT_TO_WORK_OPTIONS,
      required: true,
    },
    {
      id: "study-status",
      label: "What is your current study status?",
      type: "select",
      options: STUDY_OPTIONS,
      required: true,
    },
    ...extra,
  ];
}

export const companies: Company[] = [
  {
    id: "atlassian",
    name: "Atlassian",
    industry: "Software & Technology",
    size: "10,000+ employees",
    employees: "10,000+",
    founded: "2002",
    location: "Sydney, NSW",
    website: "https://www.atlassian.com",
    rating: 4.6,
    about:
      "Atlassian builds tools like Jira, Confluence and Trello that help teams everywhere plan, track and ship work. Our internship program pairs students with senior engineers and designers on real product work, with mentoring from day one.",
    tagline: "Software that powers teamwork",
    verified: true,
    color: "#2684FF",
    logo: "/companies/logos/atlassian-logo-transparent.png",
    banner: "/companies/banners/atlassian-professional-banner-1920x640.jpg",
    tech: ["Java", "React", "Kotlin", "AWS", "Python", "GraphQL"],
    benefits: ["Senior engineer mentoring", "Real product work", "Flexible hybrid work", "Graduate program pathway"],
  },
  {
    id: "google",
    name: "Google",
    industry: "Technology",
    size: "180,000+ employees",
    employees: "180,000+",
    founded: "1998",
    location: "Sydney, NSW",
    website: "https://careers.google.com",
    rating: 4.7,
    about:
      "Google's mission is to organise the world's information and make it universally accessible and useful. Our Australian internships give students hands-on experience with large-scale systems, supported by structured mentoring and learning.",
    tagline: "Build for everyone",
    verified: true,
    color: "#4285F4",
    logo: "/companies/logos/google-logo-transparent.png",
    banner: "/companies/banners/google-professional-banner-1920x640.jpg",
    tech: ["Go", "C++", "Python", "TensorFlow", "Angular", "Kubernetes"],
    benefits: ["World-class mentoring", "Large-scale systems", "Learning budget", "Return-offer pathway"],
  },
  {
    id: "commbank",
    name: "CommBank",
    industry: "Banking & Financial Services",
    size: "50,000+ employees",
    employees: "50,000+",
    founded: "1911",
    location: "Sydney, NSW",
    website: "https://www.commbank.com.au/careers",
    rating: 4.3,
    about:
      "The Commonwealth Bank is one of Australia's leading providers of financial services and a major technology employer. Our internships span engineering, data and cyber, with real exposure to how a modern bank builds and protects its platforms.",
    tagline: "Building tomorrow's bank",
    verified: true,
    color: "#E8B600",
    logo: "/companies/logos/commbank-logo-transparent.png",
    banner: "/companies/banners/commbank-professional-banner-1920x640.jpg",
    tech: ["Java", "React", "AWS", "Python", "Kafka", "SQL"],
    benefits: ["Structured 12-week program", "Mentoring & buddy", "Tech & data exposure", "Graduate pathway"],
  },
  {
    id: "nab",
    name: "NAB",
    industry: "Banking & Financial Services",
    size: "38,000+ employees",
    employees: "38,000+",
    founded: "1858",
    location: "Melbourne, VIC",
    website: "https://www.nab.com.au/about-us/careers",
    rating: 4.1,
    about:
      "National Australia Bank is one of the country's largest banks, investing heavily in technology, data and customer experience. Our internships give students practical experience across engineering, analytics and business.",
    tagline: "More than money",
    verified: true,
    color: "#C8102E",
    logo: "/companies/logos/nab-logo-transparent.png",
    banner: "/companies/banners/nab-professional-banner-1920x640.jpg",
    tech: ["Java", "Python", "AWS", "Tableau", "SQL"],
    benefits: ["Hands-on team projects", "Mentoring", "Hybrid work", "Networking events"],
  },
  {
    id: "bhp",
    name: "BHP",
    industry: "Mining & Resources",
    size: "80,000+ employees",
    employees: "80,000+",
    founded: "1885",
    location: "Melbourne, VIC",
    website: "https://www.bhp.com/careers",
    rating: 4.2,
    about:
      "BHP is a leading global resources company. Beyond mining, BHP runs significant technology, data and engineering teams. Our vacation and internship programs give students real project work across sites and corporate functions.",
    tagline: "Resourcing the future",
    verified: true,
    color: "#E35205",
    logo: "/companies/logos/bhp-logo-transparent.png",
    banner: "/companies/banners/bhp-professional-banner-1920x640.jpg",
    tech: ["Python", "Azure", "Power BI", "SQL", "MATLAB"],
    benefits: ["Real site & project work", "Safety-first culture", "Mentoring", "Graduate pipeline"],
  },
  {
    id: "woolworths-group",
    name: "Woolworths Group",
    industry: "Retail & Technology",
    size: "200,000+ employees",
    employees: "200,000+",
    founded: "1924",
    location: "Bella Vista, NSW",
    website: "https://www.woolworthsgroup.com.au/careers",
    rating: 4.0,
    about:
      "Woolworths Group is one of Australia's largest retailers, powered by a huge technology, data and supply-chain operation. Our internships give students experience building the systems that serve millions of customers each week.",
    tagline: "Better together",
    verified: true,
    color: "#178841",
    logo: "/companies/logos/woolworths-group-logo-transparent.png",
    banner: "/companies/banners/woolworths-group-professional-banner-1920x640.jpg",
    tech: ["Java", "React", "GCP", "Python", "Snowflake"],
    benefits: ["Retail-scale systems", "Mentoring", "Hybrid work", "Team-member discounts"],
  },
  {
    id: "coles-group",
    name: "Coles Group",
    industry: "Retail",
    size: "120,000+ employees",
    employees: "120,000+",
    founded: "1914",
    location: "Melbourne, VIC",
    website: "https://www.colescareers.com.au",
    rating: 4.0,
    about:
      "Coles Group is one of Australia's most recognised retailers, investing in technology, data and a smarter supply chain. Our internships give students real experience across digital, analytics and store-support teams.",
    tagline: "Sustainably feeding all Australians",
    verified: true,
    color: "#E01A22",
    logo: "/companies/logos/coles-group-logo-transparent.png",
    banner: "/companies/banners/coles-group-professional-banner-1920x640.jpg",
    tech: ["Azure", "Python", "Power BI", "SQL", "React"],
    benefits: ["Real retail projects", "Mentoring", "Hybrid work", "Team-member discounts"],
  },
  {
    id: "jb-hi-fi",
    name: "JB Hi-Fi",
    industry: "Retail (Consumer Electronics)",
    size: "14,000+ employees",
    employees: "14,000+",
    founded: "1974",
    location: "Melbourne, VIC",
    website: "https://careers.jbhifi.com.au",
    rating: 4.1,
    about:
      "JB Hi-Fi is Australia's leading consumer electronics retailer with a fast-growing online business. Our internships give students hands-on experience across IT support, eCommerce and digital marketing.",
    tagline: "Australia's best-loved retailer",
    verified: true,
    color: "#E8C500",
    logo: "/companies/logos/jb-hi-fi-logo-transparent.png",
    banner: "/companies/banners/jb-hi-fi-professional-banner-1920x640.jpg",
    tech: ["Shopify", "JavaScript", "GA4", "SQL", "Azure"],
    benefits: ["Fast-moving retail", "Mentoring", "Team discounts", "Real ownership"],
  },
];

const DEFAULT_PERKS = [
  "Paid, mentored internship",
  "Real projects with a real team",
  "Flexible hybrid arrangement",
  "Reference and portfolio outcomes",
];

const DEFAULT_REQS = [
  "Currently studying or a recent graduate",
  "Genuine interest in the field",
  "Strong communication and teamwork",
  "Eligible to work in Australia",
];

function job(
  companyId: string,
  o: {
    id: string;
    role: string;
    field: string;
    classification: string;
    location?: string;
    mode: WorkMode;
    workType?: WorkType;
    salary: string;
    duration?: string;
    postedDaysAgo: number;
    applicantVolume?: ApplicantVolume;
    paid?: boolean;
    friendly?: boolean;
    credit?: boolean;
    summary: string;
    about?: string;
    responsibilities?: string;
    perks?: string[];
    requirements?: string[];
  },
): Internship {
  const c = companies.find((x) => x.id === companyId)!;
  return {
    id: o.id,
    role: o.role,
    companyId,
    company: c.name,
    location: o.location ?? c.location ?? "Australia",
    mode: o.mode,
    workType: o.workType ?? "Full-time",
    field: o.field,
    classification: o.classification,
    salary: o.salary,
    duration: o.duration ?? "12 weeks",
    postedDaysAgo: o.postedDaysAgo,
    applicantVolume: o.applicantVolume ?? "Typical",
    paid: o.paid ?? true,
    friendly: o.friendly ?? false,
    credit: o.credit ?? false,
    color: c.color,
    summary: o.summary,
    about: o.about ?? c.about,
    responsibilities:
      o.responsibilities ??
      `As a ${o.role} at ${c.name}, you'll work alongside experienced mentors on live projects, contribute to real outcomes, and learn how a high-performing team plans, builds and ships — with structured guidance throughout.`,
    perks: o.perks ?? c.benefits ?? DEFAULT_PERKS,
    requirements: o.requirements ?? DEFAULT_REQS,
    questions: baseQuestions(),
  };
}

export const internships: Internship[] = [
  // ── Atlassian (6) ─────────────────────────────────────────────
  job("atlassian", { id: "atlassian-software-engineering-intern", role: "Software Engineering Intern", field: "Technology", classification: "Information & Communication Technology → Engineering - Software", mode: "Hybrid", salary: "$38 - $44/hour", postedDaysAgo: 1, applicantVolume: "High", paid: true, friendly: true, summary: "Build features across Atlassian's products with a senior mentor by your side." }),
  job("atlassian", { id: "atlassian-frontend-engineering-intern", role: "Frontend Engineering Intern", field: "Technology", classification: "Information & Communication Technology → Developers/Programmers", mode: "Hybrid", salary: "$36 - $42/hour", postedDaysAgo: 3, summary: "Craft accessible, fast React interfaces used by millions of teams." }),
  job("atlassian", { id: "atlassian-cloud-platform-intern", role: "Cloud Platform Intern", field: "Technology", classification: "Information & Communication Technology → Networks & Systems Administration", mode: "Hybrid", salary: "$38 - $44/hour", postedDaysAgo: 5, summary: "Work on the AWS-based platform that keeps Atlassian Cloud reliable at scale." }),
  job("atlassian", { id: "atlassian-product-design-intern", role: "Product Design Intern", field: "Design", classification: "Design & Architecture → Digital & Search Marketing", mode: "Hybrid", salary: "$34 - $40/hour", postedDaysAgo: 6, summary: "Design real product flows and test them with users alongside a design mentor." }),
  job("atlassian", { id: "atlassian-data-engineering-intern", role: "Data Engineering Intern", field: "Data & Analytics", classification: "Information & Communication Technology → Database Development & Administration", mode: "Hybrid", salary: "$38 - $44/hour", postedDaysAgo: 8, summary: "Build data pipelines that power product analytics and decisions." }),
  job("atlassian", { id: "atlassian-security-engineering-intern", role: "Security Engineering Intern", field: "Cyber Security", classification: "Information & Communication Technology → Security", mode: "Hybrid", salary: "$38 - $44/hour", postedDaysAgo: 10, summary: "Help keep millions of customers safe by working with the security team." }),

  // ── Google (5) ────────────────────────────────────────────────
  job("google", { id: "google-software-engineering-intern", role: "Software Engineering Intern", field: "Technology", classification: "Information & Communication Technology → Engineering - Software", mode: "Hybrid", salary: "$40 - $48/hour", postedDaysAgo: 1, applicantVolume: "High", friendly: true, summary: "Solve real engineering problems on large-scale systems with world-class mentors." }),
  job("google", { id: "google-step-intern", role: "STEP Intern (1st & 2nd year)", field: "Technology", classification: "Information & Communication Technology → Developers/Programmers", mode: "Hybrid", salary: "$38 - $44/hour", postedDaysAgo: 2, friendly: true, summary: "An early-career program built for first and second-year students new to industry." }),
  job("google", { id: "google-ux-design-intern", role: "UX Design Intern", field: "Design", classification: "Design & Architecture → Other", mode: "Hybrid", salary: "$36 - $42/hour", postedDaysAgo: 4, summary: "Research and design experiences used by people around the world." }),
  job("google", { id: "google-data-science-intern", role: "Data Science Intern", field: "Data & Analytics", classification: "Science & Technology → Mathematics, Statistics & Information Sciences", mode: "Hybrid", salary: "$40 - $48/hour", postedDaysAgo: 7, summary: "Turn large datasets into insight that shapes real product decisions." }),
  job("google", { id: "google-cloud-solutions-intern", role: "Cloud Solutions Intern", field: "Technology", classification: "Information & Communication Technology → Consultants", mode: "Hybrid", salary: "$38 - $46/hour", postedDaysAgo: 9, summary: "Help customers build on Google Cloud with the solutions engineering team." }),

  // ── CommBank (4) ──────────────────────────────────────────────
  job("commbank", { id: "commbank-technology-summer-intern", role: "Technology Summer Intern", field: "Technology", classification: "Information & Communication Technology → Engineering - Software", mode: "Hybrid", salary: "$35 - $40/hour", postedDaysAgo: 2, applicantVolume: "High", friendly: true, summary: "A structured 12-week program building software inside Australia's biggest bank." }),
  job("commbank", { id: "commbank-cyber-security-intern", role: "Cyber Security Intern", field: "Cyber Security", classification: "Information & Communication Technology → Security", mode: "Hybrid", salary: "$35 - $40/hour", postedDaysAgo: 4, summary: "Learn how a major bank detects, responds to and prevents cyber threats." }),
  job("commbank", { id: "commbank-data-analytics-intern", role: "Data Analytics Intern", field: "Data & Analytics", classification: "Information & Communication Technology → Business/Systems Analysts", mode: "Hybrid", salary: "$34 - $39/hour", postedDaysAgo: 6, summary: "Use data to improve products and customer outcomes at scale." }),
  job("commbank", { id: "commbank-software-engineering-intern", role: "Software Engineering Intern", field: "Technology", classification: "Information & Communication Technology → Developers/Programmers", mode: "Hybrid", salary: "$35 - $40/hour", postedDaysAgo: 9, summary: "Ship features on customer-facing banking platforms with a mentor." }),

  // ── BHP (4) ───────────────────────────────────────────────────
  job("bhp", { id: "bhp-software-engineering-intern", role: "Software Engineering Intern", field: "Technology", classification: "Information & Communication Technology → Engineering - Software", location: "Brisbane, QLD", mode: "Hybrid", salary: "$36 - $42/hour", postedDaysAgo: 3, summary: "Build digital tools that support safe, efficient resource operations." }),
  job("bhp", { id: "bhp-data-analytics-intern", role: "Data & Analytics Intern", field: "Data & Analytics", classification: "Science & Technology → Mathematics, Statistics & Information Sciences", location: "Brisbane, QLD", mode: "Hybrid", salary: "$36 - $42/hour", postedDaysAgo: 5, summary: "Turn operational data into insight that improves performance and safety." }),
  job("bhp", { id: "bhp-cyber-security-intern", role: "Cyber Security Intern", field: "Cyber Security", classification: "Information & Communication Technology → Security", location: "Adelaide, SA", mode: "Hybrid", salary: "$36 - $42/hour", postedDaysAgo: 8, summary: "Protect critical infrastructure alongside BHP's security team." }),
  job("bhp", { id: "bhp-mechanical-engineering-vacation", role: "Mechanical Engineering Vacation Intern", field: "Engineering", classification: "Engineering → Mechanical Engineering", location: "Perth, WA", mode: "On-site", workType: "Vacation", salary: "Competitive stipend", duration: "10 weeks", postedDaysAgo: 11, credit: true, summary: "A summer vacation program with real site exposure and mentoring." }),

  // ── NAB (3) ───────────────────────────────────────────────────
  job("nab", { id: "nab-technology-intern", role: "Technology Intern", field: "Technology", classification: "Information & Communication Technology → Engineering - Software", mode: "Hybrid", salary: "$34 - $39/hour", postedDaysAgo: 2, friendly: true, summary: "Join a banking technology team building and improving real systems." }),
  job("nab", { id: "nab-business-analyst-intern", role: "Business Analyst Intern", field: "Business", classification: "Information & Communication Technology → Business/Systems Analysts", mode: "Hybrid", salary: "$33 - $38/hour", postedDaysAgo: 5, summary: "Bridge business and technology teams to deliver better outcomes." }),
  job("nab", { id: "nab-data-intern", role: "Data Intern", field: "Data & Analytics", classification: "Science & Technology → Mathematics, Statistics & Information Sciences", mode: "Hybrid", salary: "$34 - $39/hour", postedDaysAgo: 7, summary: "Build dashboards and analysis that drive decisions across the bank." }),

  // ── Woolworths Group (3) ──────────────────────────────────────
  job("woolworths-group", { id: "woolworths-software-engineering-intern", role: "Software Engineering Intern", field: "Technology", classification: "Information & Communication Technology → Developers/Programmers", location: "Sydney, NSW", mode: "Hybrid", salary: "$34 - $40/hour", postedDaysAgo: 3, friendly: true, summary: "Build retail-scale systems that serve millions of customers weekly." }),
  job("woolworths-group", { id: "woolworths-data-analytics-intern", role: "Data Analytics Intern", field: "Data & Analytics", classification: "Information & Communication Technology → Business/Systems Analysts", location: "Sydney, NSW", mode: "Hybrid", salary: "$34 - $40/hour", postedDaysAgo: 6, summary: "Use data to improve range, availability and the customer experience." }),
  job("woolworths-group", { id: "woolworths-supply-chain-intern", role: "Supply Chain Intern", field: "Supply Chain", classification: "Manufacturing, Transport & Logistics → Purchasing, Procurement & Inventory", location: "Sydney, NSW", mode: "Hybrid", salary: "$32 - $37/hour", postedDaysAgo: 9, credit: true, summary: "Learn how one of Australia's largest supply chains keeps shelves stocked." }),

  // ── Coles Group (3) ───────────────────────────────────────────
  job("coles-group", { id: "coles-technology-intern", role: "Technology Intern", field: "Technology", classification: "Information & Communication Technology → Engineering - Software", mode: "Hybrid", salary: "$33 - $39/hour", postedDaysAgo: 4, friendly: true, summary: "Help build the digital and in-store technology Coles runs on." }),
  job("coles-group", { id: "coles-data-analyst-intern", role: "Data Analyst Intern", field: "Data & Analytics", classification: "Information & Communication Technology → Business/Systems Analysts", mode: "Hybrid", salary: "$33 - $39/hour", postedDaysAgo: 7, summary: "Turn retail data into insight that improves the customer experience." }),
  job("coles-group", { id: "coles-marketing-intern", role: "Marketing Intern", field: "Marketing", classification: "Marketing & Communications → Marketing Assistants/Coordinators", mode: "Hybrid", salary: "$30 - $34/hour", postedDaysAgo: 10, friendly: true, summary: "Support campaigns for one of Australia's most recognised brands." }),

  // ── JB Hi-Fi (3) ──────────────────────────────────────────────
  job("jb-hi-fi", { id: "jb-hi-fi-it-support-intern", role: "IT Support Intern", field: "Technology", classification: "Information & Communication Technology → Help Desk & IT Support", mode: "On-site", salary: "$30 - $34/hour", postedDaysAgo: 2, friendly: true, summary: "First-line support keeping stores and the support office running." }),
  job("jb-hi-fi", { id: "jb-hi-fi-ecommerce-intern", role: "eCommerce Intern", field: "Business", classification: "Retail & Consumer Products → Management - Internal", mode: "Hybrid", salary: "$30 - $35/hour", postedDaysAgo: 6, summary: "Help run and grow Australia's leading consumer-electronics online store." }),
  job("jb-hi-fi", { id: "jb-hi-fi-digital-marketing-intern", role: "Digital Marketing Intern", field: "Marketing", classification: "Marketing & Communications → Digital & Search Marketing", mode: "Hybrid", salary: "$29 - $33/hour", postedDaysAgo: 9, friendly: true, summary: "Support performance and content campaigns across digital channels." }),
];

export const studentPlans = [
  {
    name: "Basic",
    price: "$0",
    priceNum: 0,
    period: "forever",
    description: "Everything you need to start your internship search.",
    features: [
      "Browse all internships",
      "Apply with your profile",
      "Save up to 5 internships",
      "Basic application tracker",
    ],
    featured: false,
    badge: null as string | null,
    ctaLabel: "Get started free",
    ctaHref: "/register",
  },
  {
    name: "Plus",
    price: "$9.99",
    priceNum: 9.99,
    period: "per month",
    description: "Stand out to employers and track your progress.",
    features: [
      "Everything in Basic",
      "Featured profile — 2× employer views",
      "Unlimited saved internships",
      "Application analytics & insights",
      "Monthly résumé review",
      "Early access to new listings",
      "Priority email support",
      "AI Career Bot — basic queries",
    ],
    featured: true,
    badge: "Most popular" as string | null,
    ctaLabel: "Start Plus",
    ctaHref: "/checkout/student?plan=Plus",
  },
  {
    name: "Pro",
    price: "$24.99",
    priceNum: 24.99,
    period: "per month",
    description: "Maximum visibility and personalised career coaching.",
    features: [
      "Everything in Plus",
      "Top placement in employer searches",
      "Unlimited résumé reviews",
      "Interview preparation toolkit",
      "Direct message employers",
      "Monthly career coaching session",
      "Dedicated career advisor",
      "AI Career Bot — unlimited + priority",
    ],
    featured: false,
    badge: "AI Included" as string | null,
    ctaLabel: "Start Pro",
    ctaHref: "/checkout/student?plan=Pro",
  },
];

export const studentFeatures = [
  {
    category: "Search & Discovery",
    rows: [
      { label: "Browse all internships", values: [true, true, true] },
      { label: "Advanced search filters", values: [false, true, true] },
      { label: "AI Smart Match recommendations", values: [false, true, true] },
      { label: "Early access to new listings", values: [false, true, true] },
    ],
  },
  {
    category: "Profile & Applications",
    rows: [
      { label: "Student profile", values: [true, true, true] },
      { label: "Save internships", values: ["Up to 5", "Unlimited", "Unlimited"] },
      { label: "Application tracker", values: ["Basic", "Full", "Full + Analytics"] },
      { label: "Featured profile (2× employer views)", values: [false, true, true] },
      { label: "Direct message employers", values: [false, false, true] },
    ],
  },
  {
    category: "AI Career Bot",
    rows: [
      { label: "AI career chatbot", values: [false, "Basic queries", "Unlimited + priority"] },
      { label: "Personalised internship recommendations", values: [false, true, true] },
      { label: "Interview preparation with AI", values: [false, false, true] },
      { label: "CV feedback via AI", values: [false, false, true] },
    ],
  },
  {
    category: "Career Support",
    rows: [
      { label: "Résumé review", values: [false, "Monthly", "Unlimited"] },
      { label: "Career coaching session", values: [false, false, "Monthly"] },
      { label: "Dedicated career advisor", values: [false, false, true] },
      { label: "Priority email support", values: [false, true, true] },
    ],
  },
];

export const plans = [
  {
    name: "First listing",
    price: "$0",
    priceNum: 0,
    period: "free",
    description: "Post your very first internship at no cost.",
    features: ["1 internship listing", "Verified employer badge", "Applicant inbox", "Manage from your dashboard"],
    featured: true,
  },
  {
    name: "Per listing",
    price: "$49",
    priceNum: 49,
    period: "per listing",
    description: "Each additional internship after your free first listing.",
    features: ["Everything in your first listing", "Featured placement option", "Candidate insights", "Pay only for what you post"],
    featured: false,
  },
];

export const employerFeatures = [
  {
    category: "Listings",
    rows: [
      { label: "Active internship listings", values: ["1", "5", "Unlimited"] as const },
      { label: "Listing duration", values: ["30 days", "60 days", "90 days"] as const },
      { label: "Featured placement", values: [false, true, "Premium"] as const },
    ],
  },
  {
    category: "Applicants",
    rows: [
      { label: "Applicant management", values: ["Basic inbox", "Advanced", "Enterprise"] as const },
      { label: "Candidate shortlisting", values: [false, true, true] as const },
      { label: "Candidate filters & insights", values: [false, true, "Advanced"] as const },
    ],
  },
  {
    category: "Branding & reach",
    rows: [
      { label: "Branded employer profile page", values: [false, true, true] as const },
      { label: "University partnerships", values: [false, false, true] as const },
      { label: "Team member logins", values: ["1", "3", "Unlimited"] as const },
    ],
  },
  {
    category: "Support & analytics",
    rows: [
      { label: "Customer support", values: ["Email", "Priority email", "Dedicated manager"] as const },
      { label: "Analytics dashboard", values: [false, true, "Advanced"] as const },
      { label: "Onboarding session", values: [false, false, true] as const },
    ],
  },
];

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
  {
    quote:
      "I found a paid internship that counted towards my degree. The filters made it so easy to find the right fit.",
    name: "Aisha Khan",
    role: "Engineering student, RMIT",
    initials: "AK",
  },
  {
    quote:
      "The AI assistant helped me tidy up my CV before I applied. I got an interview the same week.",
    name: "Daniel Lee",
    role: "IT student, Monash",
    initials: "DL",
  },
  {
    quote:
      "As a first-year I didn't think I'd qualify for anything. The beginner-friendly roles changed that.",
    name: "Sophie Turner",
    role: "Science student, UNSW",
    initials: "ST",
  },
  {
    quote:
      "Posting our first internship was free and simple. We had quality applicants within days.",
    name: "Marcus Webb",
    role: "Hiring Manager, Northstar",
    initials: "MW",
  },
  {
    quote:
      "Everything in one place — search, apply and track. It saved me so much time during exams.",
    name: "Priya Nair",
    role: "Data student, USyd",
    initials: "PN",
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

export const employerFaqs = [
  {
    q: "How do I post an internship?",
    a: "Create an employer account, then use Post an internship. The wizard walks you through role details, requirements, screening questions and a preview before you publish.",
  },
  {
    q: "Can I edit or close a listing after it goes live?",
    a: "Yes. Manage every listing from your dashboard — pause, close or edit at any time. Closing stops new applications immediately while keeping existing applicants visible.",
  },
  {
    q: "How do I manage applicants?",
    a: "Each listing has an applicant view where you can review profiles, résumés and screening answers, and move candidates through your pipeline.",
  },
  {
    q: "Do you verify employers?",
    a: "Verified employers display a badge. We review company details and act on reports to keep the marketplace safe for students.",
  },
  {
    q: "What does it cost to hire?",
    a: "You can start free. Paid plans add featured placement, more active listings and candidate insights — see Pricing for the full comparison.",
  },
  {
    q: "Can I post unpaid or credit-bearing internships?",
    a: "Yes, but pay status must be disclosed clearly. Unpaid roles require confirmation and should meet your legal obligations.",
  },
] as const;

export const pricingFaqs = [
  {
    q: "Is Interns Store free?",
    a: "The core platform is always free for students. Plus and Pro plans add extras like the AI career assistant and profile boosts. Employers can start free and upgrade for more reach.",
  },
  {
    q: "Can I change or cancel my plan?",
    a: "Yes. Manage your plan from Billing at any time. Cancelling keeps your plan active until the end of the current period, then reverts to Free. See our Cancellation policy.",
  },
  {
    q: "How do refunds work?",
    a: "Duplicate charges and failed publishing are refundable. Featured placement is generally non-refundable once live, except where required by Australian Consumer Law. See our Refund policy.",
  },
  {
    q: "Is GST included?",
    a: "Prices include GST where applicable. Employer invoices show a GST breakdown and your ABN so you can claim it back.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Visa, Mastercard and Amex. Card details are validated client-side in this demo — no real charge is made.",
  },
  {
    q: "Do students need a paid plan to apply?",
    a: "No. Searching, saving and applying are free. Paid student plans only add visibility and career tools like the AI assistant.",
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

export const studyFields = [
  "Technology",
  "Business",
  "Design",
  "Engineering",
  "Health",
  "Science",
  "Law",
  "Education",
  "Finance",
  "Marketing",
] as const;

export const locations = [
  "Remote",
  "Brisbane, QLD",
  "Sydney, NSW",
  "Melbourne, VIC",
  "Perth, WA",
  "Adelaide, SA",
  "Canberra, ACT",
  "Gold Coast, QLD",
  "Hobart, TAS",
] as const;

export function getCompany(id: string): Company | undefined {
  return companies.find((company) => company.id === id);
}

export function getInternship(id: string): Internship | undefined {
  return internships.find((item) => item.id === id);
}
