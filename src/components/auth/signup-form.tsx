"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmMismatch, setConfirmMismatch] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setConfirmMismatch(false);

    if (password !== confirmPassword) {
      setConfirmMismatch(true);
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setPending(true);
    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message ?? "Inscription impossible.");
          },
        },
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Card
      className={cn(
        "border border-white/80 bg-white/70 shadow-[0_12px_32px_rgba(100,70,90,0.08)] backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-xl text-[#4a3f45]">
          Créer un compte
        </CardTitle>
        <CardDescription className="text-[#6d5f66]">
          Quelques infos et tu pourras garder trace de tes chats adorables.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            {error ? <FieldError>{error}</FieldError> : null}
            <Field>
              <FieldLabel htmlFor={nameId}>Prénom ou pseudo</FieldLabel>
              <Input
                id={nameId}
                type="text"
                autoComplete="name"
                placeholder="Camille"
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                disabled={pending}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={emailId}>E-mail</FieldLabel>
              <Input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="toi@exemple.com"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={pending}
                aria-invalid={error ? true : undefined}
              />
              <FieldDescription>
                On l’utilise pour ton compte. Promis, pas de spam.
              </FieldDescription>
            </Field>
            <Field data-invalid={error && !confirmMismatch ? true : undefined}>
              <FieldLabel htmlFor={passwordId}>Mot de passe</FieldLabel>
              <Input
                id={passwordId}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={pending}
                aria-invalid={error && !confirmMismatch ? true : undefined}
              />
              <FieldDescription>Au moins 8 caractères.</FieldDescription>
            </Field>
            <Field data-invalid={confirmMismatch ? true : undefined}>
              <FieldLabel htmlFor={confirmId}>
                Confirmer le mot de passe
              </FieldLabel>
              <Input
                id={confirmId}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(ev) => {
                  setConfirmPassword(ev.target.value);
                  setConfirmMismatch(false);
                }}
                disabled={pending}
                aria-invalid={confirmMismatch || undefined}
              />
              <FieldDescription>Saisis le même mot de passe.</FieldDescription>
            </Field>
            <Field>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Création…" : "Créer mon compte"}
              </Button>
              <FieldDescription className="text-center">
                Déjà inscrit·e ?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#ff8fab] underline-offset-4 hover:underline"
                >
                  Se connecter
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
