import { config } from "dotenv";
import { resolve } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { blogPostsSeed } from "./blog-seed-raw";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

/** Libellés de dates du seed → instantané UTC (ordre d’affichage = listOrder). */
const FRENCH_DATE_TO_ISO: Record<string, string> = {
  "2 avr. 2026": "2026-04-02T12:00:00.000Z",
  "18 mars 2026": "2026-03-18T12:00:00.000Z",
  "1 mars 2026": "2026-03-01T12:00:00.000Z",
  "20 févr. 2026": "2026-02-20T12:00:00.000Z",
  "3 févr. 2026": "2026-02-03T12:00:00.000Z",
  "15 janv. 2026": "2026-01-15T12:00:00.000Z",
  "22 avr. 2026": "2026-04-22T12:00:00.000Z",
  "20 avr. 2026": "2026-04-20T12:00:00.000Z",
  "17 avr. 2026": "2026-04-17T12:00:00.000Z",
  "14 avr. 2026": "2026-04-14T12:00:00.000Z",
  "11 avr. 2026": "2026-04-11T12:00:00.000Z",
  "8 avr. 2026": "2026-04-08T12:00:00.000Z",
  "5 avr. 2026": "2026-04-05T12:00:00.000Z",
  "1 avr. 2026": "2026-04-01T12:00:00.000Z",
  "28 mars 2026": "2026-03-28T12:00:00.000Z",
  "24 mars 2026": "2026-03-24T12:00:00.000Z",
};

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL est requis pour le seed");
  }

  const pool = new Pool({ connectionString });
  const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
  });

  try {
    await prisma.blogPost.deleteMany();

    const data = blogPostsSeed.map((post, listOrder) => {
      const iso = FRENCH_DATE_TO_ISO[post.date];
      if (!iso) {
        throw new Error(`Date seed inconnue : ${post.date}`);
      }
      return {
        listOrder,
        title: post.title,
        excerpt: post.excerpt,
        longExcerpt: post.longExcerpt,
        publishedAt: new Date(iso),
        readTime: post.readTime,
        emoji: post.emoji,
        extraCute: post.extraCute,
        tags: post.tags,
      };
    });

    await prisma.blogPost.createMany({ data });
    console.log(`Seed blog : ${data.length} articles créés.`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
