import { createGateway } from "@ai-sdk/gateway";
import { generateImage, NoImageGeneratedError } from "ai";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { auth } from "@/lib/auth";
import { buildCuteKittenImagePrompt } from "@/lib/cute-cat-image-prompt";
import { prisma } from "@/lib/prisma";
import { buildStorageFolderFromUserName } from "@/lib/storage-user-folder";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

export const maxDuration = 120;

function extensionFromMediaType(mediaType: string): string {
  if (mediaType === "image/png") return "png";
  if (mediaType === "image/jpeg" || mediaType === "image/jpg") return "jpg";
  if (mediaType === "image/webp") return "webp";
  if (mediaType === "image/gif") return "gif";
  return "bin";
}

export async function POST() {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return NextResponse.json(
      { error: "Clé API manquante. Ajoutez AI_GATEWAY_API_KEY." },
      { status: 503 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Configuration Supabase manquante. Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 },
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Tu dois être connecté·e pour générer un chaton." },
      { status: 401 },
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true },
  });

  if (!dbUser) {
    return NextResponse.json(
      { error: "Compte introuvable. Reconnecte-toi." },
      { status: 401 },
    );
  }

  const displayName =
    dbUser.name?.trim() ||
    session.user.name?.trim() ||
    session.user.email?.split("@")[0] ||
    "user";

  const storageFolder = buildStorageFolderFromUserName(
    displayName,
    dbUser.id,
  );

  const prompt = buildCuteKittenImagePrompt();

  try {
    const { image, warnings } = await generateImage({
      model: gateway.image("openai/gpt-image-1"),
      prompt,
      size: "1024x1024",
    });

    const ext = extensionFromMediaType(image.mediaType);
    const storageFilename = `${randomUUID()}.${ext}`;
    const objectPath = `${storageFolder}/${storageFilename}`;

    const buffer = Buffer.from(image.base64, "base64");
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(objectPath, buffer, {
        contentType: image.mediaType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        {
          error:
            "L’image a été générée mais l’enregistrement a échoué. Réessaie dans un instant.",
        },
        { status: 502 },
      );
    }

    await prisma.imageGeneration.create({
      data: {
        userId: dbUser.id,
        storageFolder,
        storageFilename,
        prompt,
      },
    });

    return NextResponse.json({
      imageBase64: image.base64,
      mediaType: image.mediaType,
      warnings,
    });
  } catch (error) {
    if (NoImageGeneratedError.isInstance(error)) {
      return NextResponse.json(
        {
          error: "Aucune image n’a pu être générée. Réessaie dans un instant.",
        },
        { status: 502 },
      );
    }
    const message =
      error instanceof Error ? error.message : "Erreur inattendue.";
    return NextResponse.json(
      { error: message || "Génération impossible." },
      { status: 500 },
    );
  }
}
