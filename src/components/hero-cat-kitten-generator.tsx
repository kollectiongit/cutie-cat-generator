"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const btnClass = cn(
  buttonVariants({ size: "lg" }),
  "h-11 rounded-full border-0 bg-gradient-to-br from-[#ffb5a7] via-[#ff8fab] to-[#d4c4f5] px-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(255,120,140,0.35)] sm:px-6 md:px-7 hover:from-[#ffb5a7]/90 hover:via-[#ff8fab]/90 hover:to-[#d4c4f5]/90 hover:shadow-[0_12px_28px_rgba(255,120,140,0.42)] hover:[transform:translateY(-2px)] focus-visible:ring-[#d4c4f5]/50 disabled:pointer-events-none disabled:opacity-70",
);

export function HeroCatKittenGenerator() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">(
    "idle",
  );
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    setStatus("loading");
    setError(null);
    setDataUrl(null);
    try {
      const res = await fetch("/api/generate-cat-image", { method: "POST" });
      const body = (await res.json()) as {
        error?: string;
        imageBase64?: string;
        mediaType?: string;
      };
      if (!res.ok) {
        setError(body.error ?? "Impossible de générer l’image.");
        setStatus("error");
        return;
      }
      if (!body.imageBase64 || !body.mediaType) {
        setError("Réponse incomplète du serveur.");
        setStatus("error");
        return;
      }
      setDataUrl(`data:${body.mediaType};base64,${body.imageBase64}`);
      setStatus("done");
    } catch {
      setError("Connexion interrompue. Réessaie.");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-10 pb-12 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-8">
      <div className="motion-safe:animate-[fade-up_0.8s_ease-out_both]">
        <h1
          id="hero-title"
          className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]"
        >
          Des minous trop cuties, à portée de clic
        </h1>
        <p className="mb-7 max-w-[36ch] text-lg text-[#6d5f66]">
          Cutie Cat Generator transforme tes idées en illustrations douces et
          colorées. Parfait pour des avatars, des cartes ou simplement sourire.
        </p>
        <div className="flex flex-wrap items-center gap-4 gap-y-3">
          <button
            type="button"
            onClick={onGenerate}
            disabled={status === "loading"}
            className={btnClass}
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2
                  className="size-5 shrink-0 motion-safe:animate-spin"
                  aria-hidden
                />
                Génération en cours…
              </span>
            ) : (
              "Génère-moi un chaton mignon"
            )}
          </button>
          {status === "idle" && (
            <span className="text-sm font-medium text-[#6d5f66]">
              Propulsé par l’API Vercel AI
            </span>
          )}
          {status === "error" && error && (
            <span
              className="max-w-[min(100%,28rem)] text-sm font-medium text-rose-600"
              role="alert"
            >
              {error}
            </span>
          )}
          {status === "done" && (
            <span className="text-sm font-medium text-[#4a7c59]">
              Voilà ton minou ! Tu peux en générer un autre.
            </span>
          )}
          {status === "loading" && (
            <span className="text-sm font-medium text-[#6d5f66]">
              Un instant — le modèle peaufine les poils…
            </span>
          )}
        </div>
      </div>

      <div className="motion-safe:animate-[fade-up_0.8s_0.15s_ease-out_both]">
        <Card className="mx-auto max-w-[380px] border-0 bg-white py-6 shadow-[0_18px_48px_rgba(120,90,110,0.12)] motion-safe:animate-[float-card_5s_ease-in-out_infinite]">
          <CardContent className="px-6 pt-0">
            <div className="relative aspect-square overflow-hidden rounded-[18px] bg-gradient-to-br from-[#ffe4ec] via-[#e8d5ff] to-[#fff0e5]">
              {dataUrl ? (
                <Image
                  src={dataUrl}
                  alt="Chaton mignon généré"
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="380px"
                />
              ) : (
                <div className="relative grid h-full w-full place-items-center">
                  <span className="select-none text-4xl drop-shadow-md sm:text-5xl">
                    (^・ω・^)
                  </span>
                  <Sparkle className="left-[14%] top-[18%] delay-0" />
                  <Sparkle className="right-[18%] top-[22%] delay-[0.6s]" />
                  <Sparkle className="bottom-[20%] left-[22%] delay-[1.2s]" />
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-[0.95rem] font-medium text-[#6d5f66]">
              {dataUrl
                ? "Ton prochain clique, un autre câlin en pixels"
                : "Ton prochain chat mignon t’attend ici"}
            </p>
          </CardContent>
        </Card>
      </div>
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
