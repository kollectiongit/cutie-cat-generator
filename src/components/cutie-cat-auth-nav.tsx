"use client";

import { Images, LogIn, UserPlus, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const currentPageClass = cn(
  buttonVariants({ size: "sm" }),
  "inline-flex h-8 cursor-default items-center justify-center gap-1.5 rounded-full border-0 bg-white/60 font-semibold text-[#4a3f45] shadow-sm ring-1 ring-[#ffc8d8]/40",
);

const linkClass = cn(
  buttonVariants({ variant: "ghost", size: "sm" }),
  "h-8 rounded-full text-[#6d5f66] hover:bg-white/50",
);

const triggerClass = cn(
  linkClass,
  "inline-flex max-w-[min(100vw-2rem,220px)] items-center gap-1.5",
);

const menuWrapperClass = cn(
  "absolute left-1/2 top-full z-50 flex min-w-[200px] -translate-x-1/2 -translate-y-1 flex-col items-stretch",
  "invisible opacity-0 transition-[opacity,visibility] duration-150",
  "group-hover:visible group-hover:opacity-100",
  "group-focus-within:visible group-focus-within:opacity-100",
);

const menuPanelClass = cn(
  "rounded-xl border border-white/80 bg-white/95 p-1.5 shadow-[0_12px_32px_rgba(100,70,90,0.12)] backdrop-blur-md",
);

type AuthNavCurrent = "home" | "blog" | "login" | "signup" | "generations";

export function CutieCatAuthNav({ current }: { current: AuthNavCurrent }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function onSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Tu es bien déconnecté·e.");
          router.refresh();
        },
        onError: () => {
          toast.error("La déconnexion a échoué. Réessaie.");
        },
      },
    });
  }

  if (session?.user) {
    const displayName =
      session.user.name?.trim() ||
      session.user.email?.split("@")[0] ||
      "Compte";

    return (
      <div className="group relative inline-flex">
        <button
          type="button"
          className={triggerClass}
          aria-haspopup="menu"
        >
          <UserRound className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
          <span className="truncate">{displayName}</span>
        </button>
        <div className={menuWrapperClass}>
          <div className={menuPanelClass} role="menu" aria-orientation="vertical">
            <Link
              href="/mes-generations"
              role="menuitem"
              className={cn(
                "flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#4a3f45] no-underline transition-colors",
                "hover:bg-[#ffeef5] focus:bg-[#ffeef5] focus:outline-none",
                current === "generations" && "bg-[#ffeef5]/80 font-semibold",
              )}
            >
              <Images className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
              Mes générations
            </Link>
            <button
              type="button"
              role="menuitem"
              className={cn(
                "flex w-full cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-[#4a3f45] transition-colors",
                "hover:bg-[#ffeef5] focus:bg-[#ffeef5] focus:outline-none",
              )}
              onClick={() => void onSignOut()}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {current === "login" ? (
        <span className={currentPageClass} aria-current="page">
          <LogIn className="size-3.5" strokeWidth={2.25} aria-hidden />
          Connexion
        </span>
      ) : (
        <Link
          href="/login"
          className={cn(linkClass, "inline-flex items-center gap-1.5")}
        >
          <LogIn className="size-3.5" strokeWidth={2.25} aria-hidden />
          Connexion
        </Link>
      )}

      {current === "signup" ? (
        <span className={currentPageClass} aria-current="page">
          <UserPlus className="size-3.5" strokeWidth={2.25} aria-hidden />
          Créer un compte
        </span>
      ) : (
        <Link
          href="/signup"
          className={cn(linkClass, "inline-flex items-center gap-1.5")}
        >
          <UserPlus className="size-3.5" strokeWidth={2.25} aria-hidden />
          Créer un compte
        </Link>
      )}
    </>
  );
}
