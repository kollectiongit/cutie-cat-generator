import { createGateway } from "@ai-sdk/gateway";
import { generateImage, NoImageGeneratedError } from "ai";
import { NextResponse } from "next/server";

import { buildCuteKittenImagePrompt } from "@/lib/cute-cat-image-prompt";

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

export const maxDuration = 120;

export async function POST() {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return NextResponse.json(
      { error: "Clé API manquante. Ajoutez AI_GATEWAY_API_KEY." },
      { status: 503 },
    );
  }

  try {
    const { image, warnings } = await generateImage({
      model: gateway.image("openai/gpt-image-1"),
      prompt: buildCuteKittenImagePrompt(),
      size: "1024x1024",
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
