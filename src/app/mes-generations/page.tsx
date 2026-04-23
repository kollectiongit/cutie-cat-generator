import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CutieCatSiteHeader } from "@/components/cutie-cat-site-header";
import { MesGenerationGalleryCard } from "@/components/mes-generation-gallery-card";
import { auth } from "@/lib/auth";
import {
  createSignedUrlForImageObject,
  imageGenerationObjectPath,
} from "@/lib/image-generation-storage";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Mes générations — Cutie Cat Generator",
  description:
    "Retrouve toutes les illustrations de chatons que tu as générées avec Cutie Cat Generator.",
};

const SIGNED_URL_TTL = 3600;

/** Grille : image redimensionnée côté Supabase ; le dialogue utilise l’URL sans transformation (pleine résolution). */
const THUMBNAIL_TRANSFORM = {
  width: 480,
  height: 480,
  resize: "cover" as const,
  quality: 82,
};

export default async function MesGenerationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const generations = await prisma.imageGeneration.findMany({
    where: { userId: session.user.id },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      prompt: true,
      created_at: true,
      storageFolder: true,
      storageFilename: true,
    },
  });

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const items = supabaseConfigured
    ? await Promise.all(
        generations.map(async (g) => {
          const objectPath = imageGenerationObjectPath(
            g.storageFolder,
            g.storageFilename,
          );
          const fullSigned = await createSignedUrlForImageObject(
            objectPath,
            SIGNED_URL_TTL,
          );
          const thumbSigned = await createSignedUrlForImageObject(
            objectPath,
            SIGNED_URL_TTL,
            { transform: THUMBNAIL_TRANSFORM },
          );

          const fullImageUrl =
            "url" in fullSigned ? fullSigned.url : null;
          let thumbnailUrl =
            "url" in thumbSigned ? thumbSigned.url : null;
          if (fullImageUrl && !thumbnailUrl) {
            thumbnailUrl = fullImageUrl;
          }

          const signError =
            !fullImageUrl && "error" in fullSigned
              ? fullSigned.error
              : null;

          return {
            id: g.id,
            prompt: g.prompt,
            createdAt: g.created_at,
            thumbnailUrl,
            fullImageUrl,
            signError,
          };
        }),
      )
    : generations.map((g) => ({
        id: g.id,
        prompt: g.prompt,
        createdAt: g.created_at,
        thumbnailUrl: null as string | null,
        fullImageUrl: null as string | null,
        signError: null as string | null,
      }));

  const dateFmt = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

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
        current="generations"
        tagline="Toutes tes créations mignonnes au même endroit"
      />

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 pb-12 pt-6">
        <header className="mb-8 motion-safe:animate-[fade-up_0.8s_ease-out_both]">
          <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Mes générations
          </h1>
          <p className="max-w-[42ch] text-lg text-[#6d5f66]">
            Chaque image est enregistrée ici après génération. Les liens
            d’aperçu sont valides environ une heure pour protéger ton espace.
          </p>
        </header>

        {!supabaseConfigured && (
          <p
            className="mb-6 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm font-medium text-amber-950"
            role="status"
          >
            Le stockage Supabase n’est pas configuré : les miniatures ne
            peuvent pas s’afficher. Vérifie{" "}
            <code className="rounded bg-white/80 px-1 py-0.5 text-xs">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            et{" "}
            <code className="rounded bg-white/80 px-1 py-0.5 text-xs">
              SUPABASE_SERVICE_ROLE_KEY
            </code>{" "}
            dans ton fichier d’environnement.
          </p>
        )}

        {generations.length === 0 ? (
          <div className="rounded-2xl border border-white/80 bg-white/70 px-6 py-12 text-center shadow-[0_12px_32px_rgba(100,70,90,0.08)] backdrop-blur-md">
            <p className="mb-4 text-[#6d5f66]">
              Tu n’as pas encore de génération enregistrée. Un clic sur l’accueil
              suffit pour créer ton premier chaton !
            </p>
            <Link
              href="/"
              className="inline-flex font-semibold text-[#ff7b9a] underline-offset-4 hover:underline"
            >
              Retour à l’accueil
            </Link>
          </div>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id}>
                <MesGenerationGalleryCard
                  thumbnailUrl={item.thumbnailUrl}
                  fullImageUrl={item.fullImageUrl}
                  dateLabel={dateFmt.format(item.createdAt)}
                  prompt={item.prompt}
                  noImageMessage={
                    !supabaseConfigured
                      ? "Miniature indisponible."
                      : (item.signError ?? "Aperçu indisponible.")
                  }
                />
              </li>
            ))}
          </ul>
        )}
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
