import type { TransformOptions } from "@supabase/storage-js";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

const BUCKET = "images";

export function imageGenerationObjectPath(
  storageFolder: string,
  storageFilename: string,
): string {
  return `${storageFolder}/${storageFilename}`;
}

export async function createSignedUrlForImageObject(
  objectPath: string,
  expiresInSeconds: number,
  options?: { transform?: TransformOptions },
): Promise<{ url: string } | { error: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      error:
        "Stockage des images indisponible (configuration Supabase incomplète).",
    };
  }

  const transform = options?.transform;
  const signOptions =
    transform && Object.keys(transform).length > 0
      ? { transform }
      : undefined;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(objectPath, expiresInSeconds, signOptions);

  if (error || !data?.signedUrl) {
    return {
      error:
        error?.message?.trim() ||
        "Impossible de générer un lien sécurisé vers cette image.",
    };
  }

  return { url: data.signedUrl };
}
