import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeUser, setSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) ?? {};
    if (!email?.trim() || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: {
        savedJobs: { select: { jobId: true } },
        applications: { orderBy: { submittedAt: "desc" } },
      },
    });
    if (!user) {
      return NextResponse.json({ ok: false, error: "No account found for that email." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
    }

    await setSession(user.id);
    return NextResponse.json({ ok: true, ...serializeUser(user) });
  } catch (err) {
    console.error("login error", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
