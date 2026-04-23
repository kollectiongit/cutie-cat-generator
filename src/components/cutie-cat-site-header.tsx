import { BookOpen, Home } from "lucide-react";
import Link from "next/link";

import { CutieCatAuthNav } from "@/components/cutie-cat-auth-nav";
import { CutieCatShortcutDialog } from "@/components/cutie-cat-shortcut-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const currentPageClass = cn(
  buttonVariants({ size: "sm" }),
  "inline-flex h-8 cursor-default items-center justify-center gap-1.5 rounded-full border-0 bg-white/60 font-semibold text-[#4a3f45] shadow-sm ring-1 ring-[#ffc8d8]/40",
);

const linkClass = cn(
  buttonVariants({ variant: "ghost", size: "sm" }),
  "h-8 rounded-full text-[#6d5f66] hover:bg-white/50",
);

type CurrentPage = "home" | "blog" | "login" | "signup" | "generations";

export function CutieCatSiteHeader({
  current,
  tagline: _tagline,
}: {
  tagline: string;
  current: CurrentPage;
}) {
  return (
    <header className="relative mx-auto w-full max-w-[1100px] px-6 pt-7 pb-2 text-center">
      <Link
        href="/"
        className="inline-flex items-center gap-2 no-underline text-inherit"
      >
        <span
          className="inline-block text-[1.75rem] leading-none motion-safe:animate-[gentle-bob_3.5s_ease-in-out_infinite]"
          aria-hidden
        >
          🐾
        </span>
        <span className="text-xs font-bold tracking-tight md:text-3xl xl:text-4xl">
          Cutie Cat Generator
        </span>
      </Link>

      <nav
        className="mt-5 flex flex-wrap items-center justify-center gap-3"
        aria-label="Navigation principale"
      >
        {current === "home" ? (
          <span className={currentPageClass} aria-current="page">
            <Home className="size-3.5" strokeWidth={2.25} aria-hidden />
            Accueil
          </span>
        ) : (
          <Link href="/" className={linkClass}>
            Accueil
          </Link>
        )}

        {current === "blog" ? (
          <span className={currentPageClass} aria-current="page">
            <BookOpen className="size-3.5" strokeWidth={2.25} aria-hidden />
            Blog
          </span>
        ) : (
          <Link
            href="/blog"
            className={cn(linkClass, "inline-flex items-center gap-1.5")}
          >
            <BookOpen className="size-3.5" strokeWidth={2.25} aria-hidden />
            Blog
          </Link>
        )}

        <CutieCatAuthNav current={current} />
      </nav>

      <CutieCatShortcutDialog />
    </header>
  );
}
