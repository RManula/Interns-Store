import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, serializeUser, setSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, name, email, password, profile } = body ?? {};

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }
    if (role !== "student" && role !== "employer") {
      return NextResponse.json({ ok: false, error: "Invalid account type." }, { status: 400 });
    }

    const normEmail = email.trim().toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email: normEmail } });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "An account with that email already exists." },
        { status: 409 },
      );
    }

    const activePlan =
      role === "employer" ? (profile?.plan ?? "First listing") : "Basic";

    const user = await prisma.user.create({
      data: {
        role,
        name: name.trim(),
        email: normEmail,
        passwordHash: await hashPassword(password),
        student: role === "student" ? profile : undefined,
        employer: role === "employer" ? profile : undefined,
        activePlan,
      },
      include: { savedJobs: { select: { jobId: true } }, applications: true },
    });

    await setSession(user.id);
    return NextResponse.json({ ok: true, ...serializeUser(user) });
  } catch (err) {
    console.error("register error", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
