export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type WorkType = "Full-time" | "Part-time" | "Casual" | "Contract" | "Vacation";
export type ApplicantVolume = "Low" | "Typical" | "High";

export type EmployerQuestion = {
  id: string;
  label: string;
  type: "select" | "radio" | "text";
  options?: string[];
  required?: boolean;
};

export type Company = {
  id: string;
  name: string;
  industry: string;
  size: string;
  about: string;
  verified: boolean;
  /** Logo background colour. */
  color: string;
  tagline: string;
};

export type Internship = {
  id: string;
  role: string;
  companyId: string;
  /** Denormalised company name for list cards. */
  company: string;
  location: string;
  mode: WorkMode;
  workType: WorkType;
  /** Study-field bucket used by the search filters (Technology, Business, ...). */
  field: string;
  /** SEEK-style classification line. */
  classification: string;
  salary: string;
  duration: string;
  postedDaysAgo: number;
  applicantVolume: ApplicantVolume;
  paid: boolean;
  friendly: boolean;
  credit: boolean;
  /** Accent + logo colour. */
  color: string;
  /** One-line teaser shown under the title in the results list. */
  summary: string;
  /** "Who are we" paragraph. */
  about: string;
  /** "What you'll get to do" paragraph. */
  responsibilities: string;
  /** "What you'll love" bullet list. */
  perks: string[];
  requirements: string[];
  questions: EmployerQuestion[];
};

export type UserRole = "student" | "employer";

export type Education = {
  id: string;
  qualification: string;
  institution: string;
  finished: string;
  detail?: string;
  fromResume?: boolean;
};

export type CareerRole = {
  id: string;
  title: string;
  organisation: string;
  period: string;
  location: string;
  detail?: string;
};

export type StudentProfile = {
  headline: string;
  location: string;
  phone: string;
  rightToWork: string;
  education: Education[];
  careerHistory: CareerRole[];
  skills: string[];
  resumeName: string | null;
  /** Richer profile fields (all optional for backward compatibility). */
  summary?: string;
  university?: string;
  degree?: string;
  graduationYear?: string;
  availability?: string;
  preferredLocations?: string;
  remotePreference?: WorkMode | "Any";
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  /** Privacy controls. */
  discoverable?: boolean;
};

export type EmployerProfile = {
  companyName: string;
  abn: string;
  industry: string;
  companySize: string;
  website: string;
  contactName: string;
  position: string;
  phone: string;
  plan: string;
};

export type User = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  createdAt: string;
  student?: StudentProfile;
  employer?: EmployerProfile;
};

export type ApplicationStatus = "Submitted" | "Under review" | "Interviewing" | "Offer" | "Closed";

export type Application = {
  id: string;
  jobId: string;
  jobRole: string;
  company: string;
  status: ApplicationStatus;
  submittedAt: string;
  resumeName: string | null;
  coverLetter: string | null;
  answers: Record<string, string>;
};

export type RecentSearch = {
  id: string;
  q: string;
  location: string;
  field: string;
  ts: number;
};

export type CartAddOn = { label: string; price: number };

export type CartItem = {
  plan: string;
  basePrice: number;
  period: string;
  addOns: CartAddOn[];
};

export type PaymentMethod = {
  type: string; // "Visa" | "Mastercard" | "Amex"
  last4: string;
  expiry: string; // "MM/YY"
};

export type PaymentRecord = {
  id: string;
  date: string; // ISO string
  description: string;
  amount: number;
  status: "Paid" | "Failed" | "Refunded";
};
