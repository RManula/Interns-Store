import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "is_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret() {
  return process.env.APP_SECRET || "dev-insecure-secret-change-me";
}

// ---- Passwords ----------------------------------------------------------

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// ---- Signed session token ----------------------------------------------

function sign(userId: string) {
  const sig = createHmac("sha256", secret()).update(userId).digest("hex");
  return `${userId}.${sig}`;
}

function unsign(token: string | undefined): string | null {
  if (!token) return null;
  const idx = token.lastIndexOf(".");
  if (idx < 1) return null;
  const userId = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = createHmac("sha256", secret()).update(userId).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return userId;
}

export async function setSession(userId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, sign(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentUserId(): Promise<string | null> {
  const store = await cookies();
  return unsign(store.get(COOKIE_NAME)?.value);
}

// ---- Current user (shaped for the client) ------------------------------

/** Maps a Prisma User row + relations into the shape the app's store expects. */
export function serializeUser(user: {
  id: string;
  role: string;
  name: string;
  email: string;
  createdAt: Date;
  student: unknown;
  employer: unknown;
  activePlan: string;
  paymentMethod: unknown;
  paymentHistory: unknown;
  savedJobs?: { jobId: string }[];
  applications?: unknown[];
}) {
  return {
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      student: user.student ?? undefined,
      employer: user.employer ?? undefined,
    },
    savedJobs: (user.savedJobs ?? []).map((s) => s.jobId),
    applications: user.applications ?? [],
    activePlan: user.activePlan,
    paymentMethod: user.paymentMethod ?? null,
    paymentHistory: user.paymentHistory ?? [],
  };
}

export async function getCurrentUser() {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      savedJobs: { select: { jobId: true } },
      applications: { orderBy: { submittedAt: "desc" } },
    },
  });
  if (!user) return null;
  return serializeUser(user);
}
