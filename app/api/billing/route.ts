import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaymentRecord = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Failed" | "Refunded";
};

// Simulated billing — no real payment processor. Persists plan + history.
export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const body = (await req.json()) ?? {};
  const { action } = body;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });

  const history = (user.paymentHistory as PaymentRecord[]) ?? [];

  if (action === "upgrade") {
    const { plan, method, amount, description } = body;
    const record: PaymentRecord = {
      id: `inv-${Date.now().toString(36)}`,
      date: new Date().toISOString().split("T")[0],
      description: description ?? plan,
      amount: Number(amount) || 0,
      status: "Paid",
    };
    const employer =
      user.role === "employer" && user.employer
        ? { ...(user.employer as Record<string, unknown>), plan }
        : user.employer ?? undefined;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        activePlan: plan,
        paymentMethod: method ?? user.paymentMethod ?? undefined,
        paymentHistory: [record, ...history],
        employer: employer as object | undefined,
      },
    });
    return NextResponse.json({
      ok: true,
      activePlan: updated.activePlan,
      paymentMethod: updated.paymentMethod ?? null,
      paymentHistory: updated.paymentHistory ?? [],
    });
  }

  if (action === "updateMethod") {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { paymentMethod: body.method ?? undefined },
    });
    return NextResponse.json({
      ok: true,
      activePlan: updated.activePlan,
      paymentMethod: updated.paymentMethod ?? null,
      paymentHistory: updated.paymentHistory ?? [],
    });
  }

  if (action === "cancel") {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { activePlan: "Basic" },
    });
    return NextResponse.json({
      ok: true,
      activePlan: updated.activePlan,
      paymentMethod: updated.paymentMethod ?? null,
      paymentHistory: updated.paymentHistory ?? [],
    });
  }

  return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
}
