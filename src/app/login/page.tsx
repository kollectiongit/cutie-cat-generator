import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Connexion — Cutie Cat Generator",
  description: "Connecte-toi pour accéder à ton compte Cutie Cat Generator.",
};

export default function LoginPage() {
  return (
    <AuthPageShell current="login">
      <LoginForm className="w-full max-w-md" />
    </AuthPageShell>
  );
}
