"use client";

import { Maximize2 } from "lucide-react";
import { useCallback, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type MesGenerationGalleryCardProps = {
  /** Vignette (transformation Supabase ou repli sur l’URL pleine résolution). */
  thumbnailUrl: string | null;
  /** Original pour le dialogue (sans transformation). */
  fullImageUrl: string | null;
  dateLabel: string;
  prompt: string;
  noImageMessage: string;
};

export function MesGenerationGalleryCard({
  thumbnailUrl,
  fullImageUrl,
  dateLabel,
  prompt,
  noImageMessage,
}: MesGenerationGalleryCardProps) {
  const [open, setOpen] = useState(false);
  const gridSrc = thumbnailUrl ?? fullImageUrl;
  const canExpand = Boolean(fullImageUrl);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!canExpand) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
    },
    [canExpand],
  );

  return (
    <>
      <Card
        className={cn(
          "h-full gap-0 overflow-hidden border border-white/80 bg-white/75 py-0 shadow-[0_12px_32px_rgba(100,70,90,0.08)] backdrop-blur-md",
          canExpand &&
            "group cursor-pointer transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(100,70,90,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fab]/60 focus-visible:ring-offset-2",
        )}
        role={canExpand ? "button" : undefined}
        tabIndex={canExpand ? 0 : undefined}
        aria-label={
          canExpand
            ? "Agrandir l’illustration : ouvrir la photo en grand"
            : undefined
        }
        title={canExpand ? "Cliquer pour afficher la photo en grand" : undefined}
        onClick={canExpand ? () => setOpen(true) : undefined}
        onKeyDown={canExpand ? onKeyDown : undefined}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square bg-gradient-to-br from-[#ffe4ec] via-[#e8d5ff] to-[#fff0e5]">
            {gridSrc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- URL signée ; vignette légère */}
                <img
                  src={gridSrc}
                  alt="Illustration chaton généré"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                >
                  <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/95 px-3 py-1.5 text-xs font-semibold tracking-tight text-[#4a3f45] shadow-md">
                    <Maximize2
                      className="size-3.5 shrink-0 text-[#ff7b9a]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    Cliquer pour agrandir
                  </span>
                </div>
              </>
            ) : (
              <div className="grid h-full w-full place-items-center p-4 text-center text-sm font-medium text-[#6d5f66]">
                {noImageMessage}
              </div>
            )}
          </div>
          <div className="border-t border-[#ffeef5] px-3 py-3">
            <p className="mb-1 text-xs font-medium text-[#6d5f66]">
              {dateLabel}
            </p>
            <p className="line-clamp-3 text-sm leading-snug text-[#4a3f45]">
              {prompt}
            </p>
          </div>
        </CardContent>
      </Card>

      {canExpand && fullImageUrl ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            overlayClassName="bg-black/85 supports-backdrop-filter:backdrop-blur-sm"
            showCloseButton
            className={cn(
              "fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-none",
              "[&>button]:top-3 [&>button]:right-3 sm:[&>button]:top-5 sm:[&>button]:right-5",
              "[&>button]:border [&>button]:border-neutral-200/90 [&>button]:!bg-white [&>button]:!text-neutral-900 [&>button]:shadow-md",
              "[&>button]:hover:!bg-neutral-50 [&>button]:hover:!text-neutral-950 [&>button]:hover:border-neutral-300",
              "[&>button_svg]:!text-neutral-900 [&>button:hover_svg]:!text-neutral-950",
            )}
          >
            <DialogTitle className="sr-only">
              Photo en plein écran
            </DialogTitle>
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-4 pt-14 sm:px-4 sm:pb-6 sm:pt-16">
              {open ? (
                /* eslint-disable-next-line @next/next/no-img-element -- URL signée pleine résolution */
                <img
                  src={fullImageUrl}
                  alt="Chaton généré — affichage en grand"
                  className="h-auto w-auto max-h-full max-w-full object-contain"
                />
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
