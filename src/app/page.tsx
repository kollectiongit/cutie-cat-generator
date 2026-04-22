import { CutieCatSiteHeader } from "@/components/cutie-cat-site-header";
import { HeroCatKittenGenerator } from "@/components/hero-cat-kitten-generator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

      <CutieCatSiteHeader
        current="home"
        tagline="Des chats adorables, générés avec amour"
      />

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 pb-12 pt-8">
        <section aria-labelledby="hero-title">
          <HeroCatKittenGenerator />
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
