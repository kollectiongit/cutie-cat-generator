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

export type LoginFormProps = React.ComponentProps<typeof Card> & {
  /** When set (e.g. modal), called instead of navigating to `/` after success. */
  onAuthenticated?: () => void;
};

export function LoginForm({
  className,
  onAuthenticated,
  ...props
}: LoginFormProps) {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await authClient.signIn.email(
        {
          email,
          password,
          rememberMe,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            void router.refresh();
            if (onAuthenticated) {
              onAuthenticated();
            } else {
              router.push("/");
            }
          },
          onError: (ctx) => {
            setError(ctx.error.message ?? "Connexion impossible.");
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
        <CardTitle className="text-xl text-[#4a3f45]">Connexion</CardTitle>
        <CardDescription className="text-[#6d5f66]">
          Entre ton e-mail et ton mot de passe pour accéder à ton compte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            {error ? <FieldError>{error}</FieldError> : null}
            <Field data-invalid={error ? true : undefined}>
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
            </Field>
            <Field data-invalid={error ? true : undefined}>
              <FieldLabel htmlFor={passwordId}>Mot de passe</FieldLabel>
              <Input
                id={passwordId}
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={pending}
                aria-invalid={error ? true : undefined}
              />
            </Field>
            <Field orientation="horizontal" className="items-center gap-2">
              <input
                id={rememberId}
                type="checkbox"
                checked={rememberMe}
                onChange={(ev) => setRememberMe(ev.target.checked)}
                disabled={pending}
                className="size-4 rounded border-input accent-[#ff8fab]"
              />
              <FieldLabel htmlFor={rememberId} className="font-normal">
                Rester connecté·e
              </FieldLabel>
              <FieldDescription className="sr-only">
                Garde la session active après fermeture du navigateur.
              </FieldDescription>
            </Field>
            <Field>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Connexion…" : "Se connecter"}
              </Button>
              <FieldDescription className="text-center">
                Pas encore de compte ?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#ff8fab] underline-offset-4 hover:underline"
                >
                  Créer un compte
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
