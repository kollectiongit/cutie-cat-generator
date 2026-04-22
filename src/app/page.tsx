import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: "🎀",
    title: "Styles tout doux",
    description:
      "Pastels, traits arrondis et ambiance kawaii pour des images qui font « aww » à chaque fois.",
  },
  {
    icon: "⚡",
    title: "Génération rapide",
    description:
      "Une idée, quelques secondes : obtiens une variante prête à partager ou à affiner.",
  },
  {
    icon: "📤",
    title: "Prêt à partager",
    description:
      "Export pensé pour les réseaux, les profils et les petits cadeaux numériques entre amis.",
  },
  {
    icon: "🛡️",
    title: "Confort d’usage",
    description:
      "Interface claire et rassurante : tu te concentres sur l’idée, on s’occupe du reste.",
  },
] as const;

export default function Home() {
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

      <header className="mx-auto w-full max-w-[1100px] px-6 pt-7 pb-2 text-center">
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
          <span className="text-xs md lg:text-3xl xl:text-4xl font-bold tracking-tight ">
            Cutie Cat Generator
          </span>
        </Link>
        <p className="mt-2.5 text-base font-medium text-[#6d5f66]">
          Des chats adorables, générés avec amour
        </p>
      </header>

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 pb-12 pt-8">
        <section
          className="grid gap-10 pb-12 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-8"
          aria-labelledby="hero-title"
        >
          <div className="motion-safe:animate-[fade-up_0.8s_ease-out_both]">
            <h1
              id="hero-title"
              className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]"
            >
              Des minous trop cuties, à portée de clic
            </h1>
            <p className="mb-7 max-w-[36ch] text-lg text-[#6d5f66]">
              Cutie Cat Generator transforme tes idées en illustrations douces
              et colorées. Parfait pour des avatars, des cartes ou simplement
              sourire.
            </p>
            <div className="flex flex-wrap items-center gap-4 gap-y-3">
              <Link
                href="#features"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full border-0 bg-gradient-to-br from-[#ffb5a7] via-[#ff8fab] to-[#d4c4f5] px-7 text-base font-semibold text-white shadow-[0_8px_24px_rgba(255,120,140,0.35)] hover:from-[#ffb5a7]/90 hover:via-[#ff8fab]/90 hover:to-[#d4c4f5]/90 hover:shadow-[0_12px_28px_rgba(255,120,140,0.42)] hover:[transform:translateY(-2px)] focus-visible:ring-[#d4c4f5]/50",
                )}
              >
                Découvrir
              </Link>
              <span className="text-sm font-medium text-[#6d5f66]">
                Bientôt : génération en ligne
              </span>
            </div>
          </div>

          <div
            className="motion-safe:animate-[fade-up_0.8s_0.15s_ease-out_both]"
            aria-hidden
          >
            <Card className="mx-auto max-w-[380px] border-0 bg-white py-6 shadow-[0_18px_48px_rgba(120,90,110,0.12)] motion-safe:animate-[float-card_5s_ease-in-out_infinite]">
              <CardContent className="px-6 pt-0">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#ffe4ec] via-[#e8d5ff] to-[#fff0e5]">
                  <span className="select-none text-4xl drop-shadow-md sm:text-5xl">
                    (^・ω・^)
                  </span>
                  <Sparkle className="left-[14%] top-[18%] delay-0" />
                  <Sparkle className="right-[18%] top-[22%] delay-[0.6s]" />
                  <Sparkle className="bottom-[20%] left-[22%] delay-[1.2s]" />
                </div>
                <p className="mt-4 text-center text-[0.95rem] font-medium text-[#6d5f66]">
                  Ton prochain chat mignon t’attend ici
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          id="features"
          className="pt-4"
          aria-labelledby="features-title"
        >
          <h2
            id="features-title"
            className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-[1.85rem]"
          >
            Pourquoi tu vas l’adorer
          </h2>
          <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <li key={item.title}>
                <Card className="h-full border border-white/80 bg-white/70 py-0 shadow-[0_12px_32px_rgba(100,70,90,0.08)] backdrop-blur-md transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(100,70,90,0.1)]">
                  <CardHeader className="gap-3 px-5 pt-6 pb-4">
                    <span className="text-2xl leading-none" aria-hidden>
                      {item.icon}
                    </span>
                    <CardTitle className="text-lg font-semibold leading-snug">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-[0.92rem] leading-normal text-[#6d5f66]">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
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

function Sparkle({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute text-sm text-white drop-shadow-[0_0_8px_rgba(255,180,200,0.8)] motion-safe:animate-[twinkle_2.5s_ease-in-out_infinite]",
        className,
      )}
      {...props}
    >
      ✦
    </span>
  );
}
