import type { Metadata } from "next";
import { ProfileClient } from "@/components/profile/ProfileClient";

export const metadata: Metadata = { title: "My Profile — Interns Store" };

export default function ProfilePage() {
  return <ProfileClient />;
}
