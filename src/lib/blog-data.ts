import { prisma } from "@/lib/prisma";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  longExcerpt: string;
  /** Libellé affiché (ex. « 2 avr. 2026 »). */
  date: string;
  /** Date ISO `YYYY-MM-DD` pour l’attribut `dateTime` de `<time>`. */
  dateIso: string;
  readTime: string;
  emoji: string;
  extraCute: boolean;
  tags: string[];
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    orderBy: { listOrder: "asc" },
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    longExcerpt: row.longExcerpt,
    readTime: row.readTime,
    emoji: row.emoji,
    extraCute: row.extraCute,
    tags: row.tags,
    date: dateFormatter.format(row.publishedAt),
    dateIso: row.publishedAt.toISOString().slice(0, 10),
  }));
}
