import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Create an Account" };

export default function RegisterPage() {
  return <ComingSoon eyebrow="Join Interns Store" title="Student and employer registration is ready to plug in." description="The front-of-house routes already point here; account creation and dashboard onboarding can now be added without changing the design system." owner="Member 3" />;
}
