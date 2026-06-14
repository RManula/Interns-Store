"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Application,
  CartItem,
  EmployerProfile,
  Internship,
  PaymentMethod,
  PaymentRecord,
  RecentSearch,
  Review,
  StudentProfile,
  User,
} from "@/lib/types";

type Account = {
  user: User;
  password: string;
  savedJobs: string[];
  applications: Application[];
  activePlan: string;
  paymentMethod: PaymentMethod | null;
  paymentHistory: PaymentRecord[];
};

type RegisterStudentInput = {
  name: string;
  email: string;
  password: string;
  profile: StudentProfile;
};

type RegisterEmployerInput = {
  name: string;
  email: string;
  password: string;
  profile: EmployerProfile;
};

type AppContextValue = {
  ready: boolean;
  user: User | null;
  savedJobs: string[];
  applications: Application[];
  recentSearches: RecentSearch[];
  postedListings: Internship[];
  cart: CartItem | null;
  activePlan: string;
  paymentMethod: PaymentMethod | null;
  paymentHistory: PaymentRecord[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  registerStudent: (input: RegisterStudentInput) => { ok: boolean; error?: string };
  registerEmployer: (input: RegisterEmployerInput) => { ok: boolean; error?: string };
  logout: () => void;
  toggleSave: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  addApplication: (application: Application) => void;
  hasApplied: (jobId: string) => boolean;
  updateStudentProfile: (patch: Partial<StudentProfile>) => void;
  addRecentSearch: (search: Omit<RecentSearch, "id" | "ts">) => void;
  clearRecentSearches: () => void;
  postListing: (listing: Internship) => void;
  setCart: (item: CartItem) => void;
  clearCart: () => void;
  upgradePlan: (plan: string, method: PaymentMethod, amount: number, description: string) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  cancelPlan: () => void;
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
};

const ACCOUNTS_KEY = "interns-store:accounts";
const SESSION_KEY = "interns-store:session";
const RECENT_KEY = "interns-store:recent-searches";
const LISTINGS_KEY = "interns-store:listings";
const CART_KEY = "interns-store:cart";
const REVIEWS_KEY = "interns-store:reviews";

const SEED_REVIEWS: Review[] = [
  { id: "rev-seed-1", companyId: "atlassian", companyName: "Atlassian", authorName: "Priya N.", authorRole: "student", rating: 5, title: "Best first experience", body: "Mentors actually invested time in me and I shipped real features. Felt like part of the team from week one.", date: "2026-05-20" },
  { id: "rev-seed-2", companyId: "commbank", companyName: "CommBank", authorName: "Liam R.", authorRole: "student", rating: 4, title: "Structured and supportive", body: "The 12-week program was well organised with clear goals. Great exposure to how a big bank builds software.", date: "2026-05-02" },
  { id: "rev-seed-3", companyId: "google", companyName: "Google", authorName: "Sam T.", authorRole: "student", rating: 5, title: "Learned an incredible amount", body: "Working on large-scale systems with world-class engineers was a genuine career accelerator.", date: "2026-04-18" },
];

const AppContext = createContext<AppContextValue | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedAccounts(): Account[] {
  return [
    {
      password: "password",
      savedJobs: [],
      applications: [],
      activePlan: "Free",
      paymentMethod: null,
      paymentHistory: [],
      user: {
        id: "demo-student",
        role: "student",
        name: "Alex Taylor",
        email: "student@demo.com",
        createdAt: "2026-01-12",
        student: {
          headline: "Final-year Computer Science student",
          location: "Brisbane, QLD",
          phone: "+61 400 000 000",
          rightToWork: "I'm an Australian citizen",
          resumeName: "Alex-Taylor-Resume.pdf",
          education: [
            {
              id: "edu-1",
              qualification: "Bachelor of Computer Science",
              institution: "Queensland University of Technology",
              finished: "Expected 2026",
              detail: "Majoring in software engineering and cyber security.",
            },
          ],
          careerHistory: [
            {
              id: "role-1",
              title: "IT Support Volunteer",
              organisation: "Campus Tech Help",
              period: "2025 - Present",
              location: "Brisbane, QLD",
              detail: "First-line support for students and staff.",
            },
          ],
          skills: ["JavaScript", "Python", "Teamwork", "Problem solving"],
        },
      },
    },
    {
      password: "password",
      savedJobs: [],
      applications: [],
      activePlan: "Growth",
      paymentMethod: { type: "Visa", last4: "4242", expiry: "12/28" },
      paymentHistory: [
        { id: "inv-001", date: "2026-05-14", description: "Growth Plan", amount: 165.00, status: "Paid" },
        { id: "inv-002", date: "2026-04-14", description: "Growth Plan", amount: 165.00, status: "Paid" },
        { id: "inv-003", date: "2026-03-14", description: "Growth Plan", amount: 165.00, status: "Paid" },
      ],
      user: {
        id: "demo-employer",
        role: "employer",
        name: "Jordan Wells",
        email: "employer@demo.com",
        createdAt: "2026-01-10",
        employer: {
          companyName: "Canopy Labs",
          abn: "12 345 678 901",
          industry: "Design & Product Studio",
          companySize: "51-200 employees",
          website: "https://canopylabs.example",
          contactName: "Jordan Wells",
          position: "People Lead",
          phone: "+61 7 3000 0000",
          plan: "Growth",
        },
      },
    },
    {
      password: "password",
      savedJobs: ["atlassian-software-engineering-intern", "google-ux-design-intern"],
      applications: [],
      activePlan: "Pro",
      paymentMethod: { type: "Mastercard", last4: "5678", expiry: "09/27" },
      paymentHistory: [
        { id: "inv-p01", date: "2026-06-01", description: "Student Pro Plan", amount: 24.99, status: "Paid" },
        { id: "inv-p02", date: "2026-05-01", description: "Student Pro Plan", amount: 24.99, status: "Paid" },
        { id: "inv-p03", date: "2026-04-01", description: "Student Pro Plan", amount: 24.99, status: "Paid" },
      ],
      user: {
        id: "demo-student-pro",
        role: "student",
        name: "Sam Rivera",
        email: "pro@demo.com",
        createdAt: "2026-03-01",
        student: {
          headline: "Master of Data Science student — AI & ML focus",
          location: "Sydney, NSW",
          phone: "+61 411 000 000",
          rightToWork: "I'm an Australian citizen",
          resumeName: "Sam-Rivera-Resume.pdf",
          education: [
            {
              id: "edu-1",
              qualification: "Master of Data Science",
              institution: "University of Sydney",
              finished: "Expected 2027",
              detail: "Specialising in machine learning and AI applications.",
            },
          ],
          careerHistory: [
            {
              id: "role-1",
              title: "Research Assistant",
              organisation: "USyd AI Lab",
              period: "2025 - Present",
              location: "Sydney, NSW",
              detail: "Assisted in NLP research and published two papers.",
            },
          ],
          skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning", "SQL", "Research"],
        },
      },
    },
  ];
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [postedListings, setPostedListings] = useState<Internship[]>([]);
  const [cart, setCartState] = useState<CartItem | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const stored = readJSON<Account[]>(ACCOUNTS_KEY, []);
    const initial = stored.length ? stored : seedAccounts();
    if (!stored.length) writeJSON(ACCOUNTS_KEY, initial);
    setAccounts(initial);
    setSessionId(readJSON<string | null>(SESSION_KEY, null));
    setRecentSearches(readJSON<RecentSearch[]>(RECENT_KEY, []));
    setPostedListings(readJSON<Internship[]>(LISTINGS_KEY, []));
    setCartState(readJSON<CartItem | null>(CART_KEY, null));
    const storedReviews = readJSON<Review[]>(REVIEWS_KEY, []);
    setReviews(storedReviews.length ? storedReviews : SEED_REVIEWS);
    setReady(true);
  }, []);

  const persistAccounts = useCallback((next: Account[]) => {
    setAccounts(next);
    writeJSON(ACCOUNTS_KEY, next);
  }, []);

  const persistSession = useCallback((id: string | null) => {
    setSessionId(id);
    writeJSON(SESSION_KEY, id);
  }, []);

  const persistRecent = useCallback((next: RecentSearch[]) => {
    setRecentSearches(next);
    writeJSON(RECENT_KEY, next);
  }, []);

  const currentAccount = useMemo(
    () => accounts.find((account) => account.user.id === sessionId) ?? null,
    [accounts, sessionId],
  );

  const updateCurrentAccount = useCallback(
    (mutate: (account: Account) => Account) => {
      if (!sessionId) return;
      persistAccounts(
        accounts.map((account) =>
          account.user.id === sessionId ? mutate(account) : account,
        ),
      );
    },
    [accounts, persistAccounts, sessionId],
  );

  const login = useCallback<AppContextValue["login"]>(
    (email, password) => {
      const match = accounts.find(
        (account) => account.user.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!match) return { ok: false, error: "No account found for that email." };
      if (match.password !== password) return { ok: false, error: "Incorrect password." };
      persistSession(match.user.id);
      return { ok: true };
    },
    [accounts, persistSession],
  );

  const registerStudent = useCallback<AppContextValue["registerStudent"]>(
    ({ name, email, password, profile }) => {
      const exists = accounts.some(
        (account) => account.user.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (exists) return { ok: false, error: "An account with that email already exists." };
      const id = uid("student");
      const account: Account = {
        password,
        savedJobs: [],
        applications: [],
        activePlan: "Free",
        paymentMethod: null,
        paymentHistory: [],
        user: {
          id,
          role: "student",
          name,
          email: email.trim(),
          createdAt: new Date().toISOString(),
          student: profile,
        },
      };
      persistAccounts([...accounts, account]);
      persistSession(id);
      return { ok: true };
    },
    [accounts, persistAccounts, persistSession],
  );

  const registerEmployer = useCallback<AppContextValue["registerEmployer"]>(
    ({ name, email, password, profile }) => {
      const exists = accounts.some(
        (account) => account.user.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (exists) return { ok: false, error: "An account with that email already exists." };
      const id = uid("employer");
      const account: Account = {
        password,
        savedJobs: [],
        applications: [],
        activePlan: profile.plan ?? "Starter",
        paymentMethod: null,
        paymentHistory: [],
        user: {
          id,
          role: "employer",
          name,
          email: email.trim(),
          createdAt: new Date().toISOString(),
          employer: profile,
        },
      };
      persistAccounts([...accounts, account]);
      persistSession(id);
      return { ok: true };
    },
    [accounts, persistAccounts, persistSession],
  );

  const logout = useCallback(() => persistSession(null), [persistSession]);

  const toggleSave = useCallback<AppContextValue["toggleSave"]>(
    (jobId) => {
      updateCurrentAccount((account) => ({
        ...account,
        savedJobs: account.savedJobs.includes(jobId)
          ? account.savedJobs.filter((id) => id !== jobId)
          : [...account.savedJobs, jobId],
      }));
    },
    [updateCurrentAccount],
  );

  const addApplication = useCallback<AppContextValue["addApplication"]>(
    (application) => {
      updateCurrentAccount((account) => ({
        ...account,
        applications: [
          application,
          ...account.applications.filter((item) => item.jobId !== application.jobId),
        ],
      }));
    },
    [updateCurrentAccount],
  );

  const updateStudentProfile = useCallback<AppContextValue["updateStudentProfile"]>(
    (patch) => {
      updateCurrentAccount((account) => {
        if (!account.user.student) return account;
        return {
          ...account,
          user: {
            ...account.user,
            student: { ...account.user.student, ...patch },
          },
        };
      });
    },
    [updateCurrentAccount],
  );

  const addRecentSearch = useCallback<AppContextValue["addRecentSearch"]>(
    (search) => {
      if (!search.q && !search.location && !search.field) return;
      const entry: RecentSearch = { ...search, id: uid("search"), ts: Date.now() };
      const deduped = recentSearches.filter(
        (item) =>
          item.q !== entry.q || item.location !== entry.location || item.field !== entry.field,
      );
      persistRecent([entry, ...deduped].slice(0, 6));
    },
    [persistRecent, recentSearches],
  );

  const clearRecentSearches = useCallback(() => persistRecent([]), [persistRecent]);

  const postListing = useCallback<AppContextValue["postListing"]>(
    (listing) => {
      const next = [listing, ...postedListings];
      setPostedListings(next);
      writeJSON(LISTINGS_KEY, next);
    },
    [postedListings],
  );

  const setCart = useCallback<AppContextValue["setCart"]>(
    (item) => {
      setCartState(item);
      writeJSON(CART_KEY, item);
    },
    [],
  );

  const clearCart = useCallback(() => {
    setCartState(null);
    writeJSON(CART_KEY, null);
  }, []);

  const upgradePlan = useCallback<AppContextValue["upgradePlan"]>(
    (plan, method, amount, description) => {
      if (!sessionId) return;
      persistAccounts(
        accounts.map((account) => {
          if (account.user.id !== sessionId) return account;
          const record: PaymentRecord = {
            id: `inv-${Date.now().toString(36)}`,
            date: new Date().toISOString().split("T")[0],
            description,
            amount,
            status: "Paid",
          };
          const updatedUser = account.user.role === "employer" && account.user.employer
            ? { ...account.user, employer: { ...account.user.employer, plan } }
            : account.user;
          return {
            ...account,
            activePlan: plan,
            paymentMethod: method,
            paymentHistory: [record, ...(account.paymentHistory ?? [])],
            user: updatedUser,
          };
        }),
      );
    },
    [accounts, persistAccounts, sessionId],
  );

  const updatePaymentMethod = useCallback<AppContextValue["updatePaymentMethod"]>(
    (method) => {
      updateCurrentAccount((account) => ({ ...account, paymentMethod: method }));
    },
    [updateCurrentAccount],
  );

  const cancelPlan = useCallback<AppContextValue["cancelPlan"]>(() => {
    updateCurrentAccount((account) => ({ ...account, activePlan: "Free" }));
  }, [updateCurrentAccount]);

  const addReview = useCallback<AppContextValue["addReview"]>((review) => {
    const entry: Review = { ...review, id: uid("review"), date: new Date().toISOString() };
    setReviews((prev) => {
      const next = [entry, ...prev];
      writeJSON(REVIEWS_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      user: currentAccount?.user ?? null,
      savedJobs: currentAccount?.savedJobs ?? [],
      applications: currentAccount?.applications ?? [],
      recentSearches,
      postedListings,
      cart,
      activePlan: currentAccount?.activePlan ??
        (currentAccount?.user.role === "employer"
          ? currentAccount.user.employer?.plan ?? "Starter"
          : "Free"),
      paymentMethod: currentAccount?.paymentMethod ?? null,
      paymentHistory: currentAccount?.paymentHistory ?? [],
      login,
      registerStudent,
      registerEmployer,
      logout,
      toggleSave,
      isSaved: (jobId) => Boolean(currentAccount?.savedJobs.includes(jobId)),
      addApplication,
      hasApplied: (jobId) =>
        Boolean(currentAccount?.applications.some((item) => item.jobId === jobId)),
      updateStudentProfile,
      addRecentSearch,
      clearRecentSearches,
      postListing,
      setCart,
      clearCart,
      upgradePlan,
      updatePaymentMethod,
      cancelPlan,
      reviews,
      addReview,
    }),
    [
      ready,
      currentAccount,
      recentSearches,
      postedListings,
      cart,
      reviews,
      addReview,
      login,
      registerStudent,
      registerEmployer,
      logout,
      toggleSave,
      addApplication,
      updateStudentProfile,
      addRecentSearch,
      clearRecentSearches,
      postListing,
      setCart,
      clearCart,
      upgradePlan,
      updatePaymentMethod,
      cancelPlan,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
