"use client";

import { Heart, Sparkles } from "lucide-react";
import * as React from "react";

import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function BlogArticleList() {
  const [extraCuteOnly, setExtraCuteOnly] = React.useState(false);
  const [preview, setPreview] = React.useState<BlogPost | null>(null);

  const posts = extraCuteOnly
    ? blogPosts.filter((p) => p.extraCute)
    : blogPosts;

  return (
    <>
      <div
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        role="search"
        aria-label="Filtre des articles"
      >
        <p className="m-0 flex items-center gap-2 text-sm font-medium text-[#6d5f66]">
          <Sparkles
            className="size-4 text-[#ff8fab] shrink-0"
            strokeWidth={2}
            aria-hidden
          />
          {posts.length} article{posts.length > 1 ? "s" : ""} à câliner
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="text-xs font-medium uppercase tracking-wide text-[#8a7a82]"
            id="filter-extra-cute"
          >
            Filtre
          </span>
          <Toggle
            size="default"
            variant="outline"
            className="rounded-full border-white/80 bg-white/50 px-3.5 data-[state=on]:border-[#ffc8d8]/80 data-[state=on]:bg-gradient-to-r data-[state=on]:from-[#fff5fb] data-[state=on]:to-[#f6ecff] data-[state=on]:text-[#4a3f45]"
            pressed={extraCuteOnly}
            onPressedChange={setExtraCuteOnly}
            aria-labelledby="filter-extra-cute"
          >
            <Heart
              className="size-4 text-[#ff7b9a]"
              fill={extraCuteOnly ? "currentColor" : "none"}
              strokeWidth={2}
              aria-hidden
            />
            <span className="text-[0.8rem] font-medium">Extra mignon</span>
          </Toggle>
        </div>
      </div>

      <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Card
              className={cn(
                "h-full border border-white/80 bg-white/70 py-0 shadow-[0_12px_32px_rgba(100,70,90,0.08)] backdrop-blur-md transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(100,70,90,0.1)]",
                post.extraCute &&
                  "ring-1 ring-[#ffc8d8]/30 ring-inset",
              )}
            >
              <CardHeader className="space-y-3 border-b border-white/60 px-5 pt-6 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-2.5">
                    <span className="text-2xl leading-none" aria-hidden>
                      {post.emoji}
                    </span>
                    <CardTitle className="pr-0 text-base font-semibold leading-snug text-[#4a3f45] sm:text-lg">
                      {post.title}
                    </CardTitle>
                  </div>
                  <time
                    className="shrink-0 rounded-full border border-white/80 bg-white/50 px-2.5 py-0.5 text-xs font-medium text-[#6d5f66] shadow-sm"
                    dateTime={post.date}
                  >
                    {post.date}
                  </time>
                </div>
                <CardDescription className="m-0 text-[0.92rem] leading-normal text-[#6d5f66]">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 pt-4">
                <p className="m-0 text-sm font-medium text-[#8a7a82]">
                  Lecture · {post.readTime}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-3 border-t border-white/50 bg-gradient-to-b from-white/40 to-[#fff8f6]/50 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[#ffe4ec]/80 px-2 py-0.5 text-xs font-medium text-[#6d5f66]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  type="button"
                  className="w-full rounded-full border-0 bg-gradient-to-br from-[#ffb5a7] via-[#ff8fab] to-[#d4c4f5] text-white shadow-[0_6px_20px_rgba(255,120,140,0.28)] hover:from-[#ffb5a7]/90 hover:via-[#ff8fab]/90 hover:to-[#d4c4f5]/90 sm:w-auto"
                  onClick={() => setPreview(post)}
                >
                  Aperçu
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/60 bg-white/50 px-4 py-8 text-center text-sm font-medium text-[#6d5f66]">
          Aucun article ici — désactive le filtre pour revoir toute la douceur
          féline.
        </p>
      )}

      <Dialog open={preview !== null} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent
          className="max-w-[min(calc(100%-2rem),26rem)] gap-4 border-0 bg-gradient-to-br from-[#fff5fb] via-[#f6ecff] to-[#fff0eb] p-6 text-[#4a3f45] shadow-[0_24px_60px_rgba(120,90,110,0.18)] ring-1 ring-[#ffc8d8]/50"
          showCloseButton
        >
          {preview && (
            <>
              <DialogHeader>
                <span className="text-2xl" aria-hidden>
                  {preview.emoji}
                </span>
                <DialogTitle className="pr-6 text-left text-lg">
                  {preview.title}
                </DialogTitle>
                <DialogDescription className="text-left text-[0.92rem] text-[#6d5f66] leading-relaxed">
                  {preview.longExcerpt}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mx-0 -mb-2 -mt-1 border-0 bg-transparent p-0 sm:justify-start">
                <p className="m-0 text-xs text-[#8a7a82]">
                  {preview.date} · {preview.readTime} de lecture
                </p>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
