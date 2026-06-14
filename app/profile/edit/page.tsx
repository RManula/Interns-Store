import type { Metadata } from "next";
import { ProfileEditClient } from "@/components/profile/ProfileEditClient";

export const metadata: Metadata = { title: "Edit Profile — Interns Store" };

export default function ProfileEditPage() {
  return <ProfileEditClient />;
}
