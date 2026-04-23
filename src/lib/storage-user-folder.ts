/**
 * Builds a single path segment for Supabase Storage under bucket `images`.
 * Uses a slug of the display name plus a stable userId prefix to avoid collisions.
 */
export function buildStorageFolderFromUserName(
  displayName: string,
  userId: string,
): string {
  const slug = slugifyPathSegment(displayName);
  const suffix = userId.slice(0, 8);
  return `${slug}-${suffix}`;
}

function slugifyPathSegment(raw: string): string {
  const trimmed = raw.trim().normalize("NFKD");
  const ascii = trimmed.replace(/\p{M}/gu, "");
  const lower = ascii.toLowerCase();
  const collapsed = lower
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  const limited = collapsed.slice(0, 64);
  return limited.length > 0 ? limited : "user";
}
