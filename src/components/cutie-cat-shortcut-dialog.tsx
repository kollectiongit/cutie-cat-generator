"use client";

import { Cat } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

const MIAOU_SRC = "/audio/miaou.mp3";

export function CutieCatShortcutDialog() {
  const [open, setOpen] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playMiaou = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play().catch(() => {});
  }, []);

  const pauseMiaou = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  React.useEffect(() => {
    if (!open) {
      pauseMiaou();
    }
  }, [open, pauseMiaou]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.code !== "KeyC") return;
      if (!e.ctrlKey || !e.altKey || !e.metaKey) return;
      if (e.shiftKey) return;

      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
      playMiaou();
    }

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [playMiaou]);

  return (
    <>
      <audio
        ref={audioRef}
        src={MIAOU_SRC}
        loop
        preload="auto"
        playsInline
        className="hidden"
        aria-hidden
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          setOpen(true);
          playMiaou();
        }}
        className={cn(
          "fixed top-[10px] right-[10px] z-50 hidden h-auto max-w-[min(100%,11rem)] flex-col items-center gap-1 border-[#ffc8d8]/70 bg-white/75 px-2 py-1.5 text-[#6d5f66] shadow-sm backdrop-blur-sm sm:flex",
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Raccourci surprise : ouvrir le chat secret (même effet que Contrôle, Option, Commande, C)"
      >
        <span className="flex flex-col items-center gap-1" aria-hidden>
          <span className="text-center text-[0.65rem] font-semibold leading-tight">
            Surprise
          </span>
          <KbdGroup className="justify-center">
            <Kbd>Ctrl</Kbd>
            <Kbd>Option</Kbd>
            <Kbd>⌘</Kbd>
            <Kbd>C</Kbd>
          </KbdGroup>
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "max-w-[min(calc(100%-2rem),22rem)] gap-5 border-0 bg-gradient-to-br from-[#fff5fb] via-[#f6ecff] to-[#fff0eb] p-6 text-center shadow-[0_24px_60px_rgba(120,90,110,0.18)] ring-[#ffc8d8]/60",
          )}
          showCloseButton
        >
          <DialogHeader className="items-center gap-1 text-center sm:text-center">
            <DialogTitle className="text-lg font-semibold text-[#4a3f45]">
              Miaou !
            </DialogTitle>
            <DialogDescription className="text-[0.9rem] text-[#6d5f66]">
              Tu as trouvé le chat secret. Prends-en soin.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <div
              className="grid size-28 place-items-center rounded-2xl bg-white/80 shadow-inner ring-1 ring-white/90"
              aria-hidden
            >
              <Cat
                className="size-16 text-[#ff8fab] drop-shadow-[0_6px_18px_rgba(255,143,171,0.45)]"
                strokeWidth={1.75}
              />
            </div>
            <p className="text-xs font-medium text-[#8a7a82]">
              (^・ω・^) cutie mode activé
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
