import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint } from "lucide-react";

import { BlogArticleList } from "@/components/blog-article-list";
import { CutieCatSiteHeader } from "@/components/cutie-cat-site-header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export const metadata: Metadata = {
  title: "Blog — mignons à souhait | Cutie Cat Generator",
  description:
    "Articles, astuces et douceur féline : le blog de Cutie Cat parle de chats adorables, de ronrons et de câlins virtuels.",
};

export default function BlogPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden bg-[linear-gradient(165deg,#fff8f3_0%,#ffeef5_35%,#e8deff_100%)] text-[#4a3f45]">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 10% -10%, rgba(255, 200, 210, 0.45), transparent 55%),
            radial-gradient(ellipse 60% 45% at 95% 15%, rgba(200, 180, 255, 0.35), transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255, 220, 200, 0.4), transparent 45%)
          `,
        }}
      />

      <CutieCatSiteHeader
        current="blog"
        tagline="Le blog : chats trop mignons, histoires douces & minous qui réchauffent"
      />

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 pb-12 pt-6">
        <section
          className="mb-10 grid gap-8 motion-safe:animate-[fade-up_0.8s_ease-out_both] md:grid-cols-2 md:items-stretch md:gap-10"
          aria-labelledby="blog-hero-title"
        >
          <div className="min-w-0">
            <h1
              id="blog-hero-title"
              className="mb-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              Tout sur les chats mignons (sans retenue)
            </h1>
            <p className="mb-4 text-lg text-[#6d5f66]">
              Des papiers doux, des félins célèbres dans ton canapé, et toute
              l’amabilité d’un ronron — pour t’accompagner quand tu as envie
              d’un peu de douceur.
            </p>
            <p className="m-0 text-sm text-[#6d5f66]">
              Pour t’offrir un poil de confort lecture, tu peux agrandir le texte
              du navigateur (souvent{" "}
              <KbdGroup className="inline" aria-label="Agrandir">
                <Kbd>⌘</Kbd>
                <Kbd>+</Kbd>
              </KbdGroup>{" "}
              sur Mac, <Kbd>Ctrl</Kbd> + <Kbd>+</Kbd> sur Windows) — et revenir
              sur l’
              <Link
                href="/"
                className="ml-0.5 font-medium text-[#ff7b9a] underline-offset-2 hover:underline"
              >
                accueil
              </Link>{" "}
              quand tu veux.
            </p>
          </div>

          <Card
            className="h-full min-h-[12rem] border-0 bg-white/80 py-0 shadow-[0_18px_48px_rgba(120,90,110,0.1)] ring-1 ring-white/60 motion-safe:animate-[float-card_5s_ease-in-out_infinite]"
            size="sm"
          >
            <CardHeader className="pt-5 pb-2">
              <CardTitle className="flex items-center gap-2.5 pr-0 text-base sm:text-lg">
                <PawPrint
                  className="size-5 shrink-0 text-[#ff8fab]"
                  strokeWidth={2.25}
                  aria-hidden
                />
                Coin lecture mignon
              </CardTitle>
              <CardDescription className="text-[0.92rem] text-[#6d5f66]">
                Chaque article est un petit câlin de texte : moustaches, siestes
                et cœur qui chavire.
              </CardDescription>
              <CardAction>
                <span className="inline-flex max-w-[10rem] items-center justify-center rounded-full border border-[#ffe4ec] bg-gradient-to-r from-[#fff5fb] to-[#f0e7ff] px-2.5 py-0.5 text-center text-xs font-semibold text-[#6d5f66] shadow-sm sm:max-w-none">
                  100% chats adorables
                </span>
              </CardAction>
            </CardHeader>
            <CardContent className="pb-5">
              <div
                className="grid min-h-[7rem] place-items-center overflow-hidden rounded-[16px] bg-gradient-to-br from-[#ffe4ec] via-[#e8d5ff] to-[#fff0e5] px-4"
                aria-hidden
              >
                <span className="select-none text-2xl sm:text-3xl drop-shadow-sm">
                  (=^･^=)
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="blog-list-title">
          <h2
            id="blog-list-title"
            className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-[1.75rem]"
          >
            La liste de lecture féline
          </h2>
          <BlogArticleList />
        </section>
      </main>

      <footer className="mx-auto mt-auto w-full max-w-[1100px] border-t border-white/50 px-6 py-8 pb-10 text-center">
        <p className="text-sm text-[#6d5f66]">Cutie Cat Generator — 2026</p>
        <p className="mt-1.5 text-[0.85rem] text-[#6d5f66]">
          Fait avec des câlins virtuels 🐱
        </p>
      </footer>
    </div>
  );
}
