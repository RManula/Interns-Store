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

type Result = { ok: boolean; error?: string };

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
  login: (email: string, password: string) => Promise<Result>;
  registerStudent: (input: RegisterStudentInput) => Promise<Result>;
  registerEmployer: (input: RegisterEmployerInput) => Promise<Result>;
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

// Recent searches and the checkout cart stay device-local (ephemeral UX state).
const RECENT_KEY = "interns-store:recent-searches";
const CART_KEY = "interns-store:cart";

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

async function postJSON(url: string, body?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json().catch(() => ({}));
}

type MeResponse = {
  user: User | null;
  savedJobs?: string[];
  applications?: Application[];
  activePlan?: string;
  paymentMethod?: PaymentMethod | null;
  paymentHistory?: PaymentRecord[];
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activePlan, setActivePlan] = useState<string>("Basic");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [postedListings, setPostedListings] = useState<Internship[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [cart, setCartState] = useState<CartItem | null>(null);

  // Apply a /api/me-shaped payload to local state.
  const applySession = useCallback((data: MeResponse) => {
    setUser(data.user ?? null);
    setSavedJobs(data.savedJobs ?? []);
    setApplications(data.applications ?? []);
    setActivePlan(data.activePlan ?? (data.user?.role === "employer" ? "First listing" : "Basic"));
    setPaymentMethod(data.paymentMethod ?? null);
    setPaymentHistory(data.paymentHistory ?? []);
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setSavedJobs([]);
    setApplications([]);
    setActivePlan("Basic");
    setPaymentMethod(null);
    setPaymentHistory([]);
  }, []);

  useEffect(() => {
    setRecentSearches(readJSON<RecentSearch[]>(RECENT_KEY, []));
    setCartState(readJSON<CartItem | null>(CART_KEY, null));

    let cancelled = false;
    (async () => {
      try {
        const [meRes, listRes, revRes] = await Promise.all([
          fetch("/api/me").then((r) => r.json()).catch(() => ({ user: null })),
          fetch("/api/listings").then((r) => r.json()).catch(() => ({ listings: [] })),
          fetch("/api/reviews").then((r) => r.json()).catch(() => ({ reviews: [] })),
        ]);
        if (cancelled) return;
        applySession(meRes as MeResponse);
        setPostedListings((listRes?.listings ?? []) as Internship[]);
        setReviews((revRes?.reviews ?? []) as Review[]);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applySession]);

  // ---- Auth -------------------------------------------------------------

  const login = useCallback<AppContextValue["login"]>(async (email, password) => {
    const data = await postJSON("/api/auth/login", { email, password });
    if (!data.ok) return { ok: false, error: data.error ?? "Unable to sign in." };
    applySession(data as MeResponse);
    return { ok: true };
  }, [applySession]);

  const registerStudent = useCallback<AppContextValue["registerStudent"]>(
    async (input) => {
      const data = await postJSON("/api/auth/register", { role: "student", ...input });
      if (!data.ok) return { ok: false, error: data.error ?? "Unable to create account." };
      applySession(data as MeResponse);
      return { ok: true };
    },
    [applySession],
  );

  const registerEmployer = useCallback<AppContextValue["registerEmployer"]>(
    async (input) => {
      const data = await postJSON("/api/auth/register", { role: "employer", ...input });
      if (!data.ok) return { ok: false, error: data.error ?? "Unable to create account." };
      applySession(data as MeResponse);
      return { ok: true };
    },
    [applySession],
  );

  const logout = useCallback(() => {
    clearSession();
    void postJSON("/api/auth/logout");
  }, [clearSession]);

  // ---- Saved jobs -------------------------------------------------------

  const toggleSave = useCallback<AppContextValue["toggleSave"]>((jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId],
    );
    void postJSON("/api/saved", { jobId });
  }, []);

  // ---- Applications -----------------------------------------------------

  const addApplication = useCallback<AppContextValue["addApplication"]>((application) => {
    setApplications((prev) => [
      application,
      ...prev.filter((item) => item.jobId !== application.jobId),
    ]);
    void postJSON("/api/applications", application);
  }, []);

  // ---- Student profile --------------------------------------------------

  const updateStudentProfile = useCallback<AppContextValue["updateStudentProfile"]>((patch) => {
    setUser((prev) =>
      prev && prev.student ? { ...prev, student: { ...prev.student, ...patch } } : prev,
    );
    void postJSON("/api/profile", { patch });
  }, []);

  // ---- Recent searches (local) -----------------------------------------

  const persistRecent = useCallback((next: RecentSearch[]) => {
    setRecentSearches(next);
    writeJSON(RECENT_KEY, next);
  }, []);

  const addRecentSearch = useCallback<AppContextValue["addRecentSearch"]>(
    (search) => {
      if (!search.q && !search.location && !search.field) return;
      const entry: RecentSearch = { ...search, id: uid("search"), ts: Date.now() };
      setRecentSearches((prev) => {
        const deduped = prev.filter(
          (item) =>
            item.q !== entry.q || item.location !== entry.location || item.field !== entry.field,
        );
        const next = [entry, ...deduped].slice(0, 6);
        writeJSON(RECENT_KEY, next);
        return next;
      });
    },
    [],
  );

  const clearRecentSearches = useCallback(() => persistRecent([]), [persistRecent]);

  // ---- Posted listings --------------------------------------------------

  const postListing = useCallback<AppContextValue["postListing"]>((listing) => {
    setPostedListings((prev) => [listing, ...prev]);
    void postJSON("/api/listings", { listing });
  }, []);

  // ---- Cart (local) -----------------------------------------------------

  const setCart = useCallback<AppContextValue["setCart"]>((item) => {
    setCartState(item);
    writeJSON(CART_KEY, item);
  }, []);

  const clearCart = useCallback(() => {
    setCartState(null);
    writeJSON(CART_KEY, null);
  }, []);

  // ---- Billing (simulated) ---------------------------------------------

  const upgradePlan = useCallback<AppContextValue["upgradePlan"]>(
    (plan, method, amount, description) => {
      const record: PaymentRecord = {
        id: `inv-${Date.now().toString(36)}`,
        date: new Date().toISOString().split("T")[0],
        description,
        amount,
        status: "Paid",
      };
      setActivePlan(plan);
      setPaymentMethod(method);
      setPaymentHistory((prev) => [record, ...prev]);
      setUser((prev) =>
        prev && prev.role === "employer" && prev.employer
          ? { ...prev, employer: { ...prev.employer, plan } }
          : prev,
      );
      void postJSON("/api/billing", { action: "upgrade", plan, method, amount, description });
    },
    [],
  );

  const updatePaymentMethod = useCallback<AppContextValue["updatePaymentMethod"]>((method) => {
    setPaymentMethod(method);
    void postJSON("/api/billing", { action: "updateMethod", method });
  }, []);

  const cancelPlan = useCallback<AppContextValue["cancelPlan"]>(() => {
    setActivePlan("Basic");
    void postJSON("/api/billing", { action: "cancel" });
  }, []);

  // ---- Reviews ----------------------------------------------------------

  const addReview = useCallback<AppContextValue["addReview"]>((review) => {
    const entry: Review = { ...review, id: uid("review"), date: new Date().toISOString() };
    setReviews((prev) => [entry, ...prev]);
    void postJSON("/api/reviews", review);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      user,
      savedJobs,
      applications,
      recentSearches,
      postedListings,
      cart,
      activePlan,
      paymentMethod,
      paymentHistory,
      login,
      registerStudent,
      registerEmployer,
      logout,
      toggleSave,
      isSaved: (jobId) => savedJobs.includes(jobId),
      addApplication,
      hasApplied: (jobId) => applications.some((item) => item.jobId === jobId),
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
      user,
      savedJobs,
      applications,
      recentSearches,
      postedListings,
      cart,
      activePlan,
      paymentMethod,
      paymentHistory,
      reviews,
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
      addReview,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
