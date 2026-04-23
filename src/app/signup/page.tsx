import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Créer un compte — Cutie Cat Generator",
  description: "Inscris-toi pour créer ton compte Cutie Cat Generator.",
};

export default function SignupPage() {
  return (
    <AuthPageShell current="signup">
      <SignupForm className="w-full max-w-md" />
    </AuthPageShell>
  );
}
