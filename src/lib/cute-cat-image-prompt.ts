/**
 * Prompt for image models (Gateway / Vercel AI) — short, very descriptive.
 * Randomized facets so each generation differs while staying on-brand (cute, safe).
 */

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

const EXPRESSION_LINES = [
  "very large round glossy eyes, tiny pink nose, small fluffy ears slightly tilted, innocent wonder",
  "enormous sparkling eyes with soft highlights, small pink nose, ears perked with curiosity",
  "dreamy half-lidded eyes, tiny smile, rosy nose, one ear slightly folded",
  "bright playful eyes, tiny fangs barely visible, mischievous but sweet face",
  "soft sleepy eyes, relaxed whiskers, peaceful relaxed smile",
] as const;

const FUR_PALETTES = [
  "impossibly soft short-to-medium fur: warm cream, peach, and light ginger, subtle rosy cheek blush",
  "silky fur: cool gray and white tuxedo patches, soft pink inner ears",
  "fluffy coat: warm golden tabby stripes on cream, snow-white mittens and chest",
  "ultra-soft fur: chocolate and tan mocha mix, small white blaze on nose",
  "plush short fur: blue-gray and silver, faint lavender undertones, white socks",
  "downy medium fur: classic calico in soft pastels (cream, muted peach, dove gray)",
  "sleek soft fur: Siamese-style cream body with warm seal-brown points, sapphire eye hint",
] as const;

const STYLE_LINES = [
  "kawaii, gentle 3D illustration, premium children's book, Pixar-influenced cuteness, smooth shapes, no harsh lines",
  "soft felted / needle-felt diorama look, gentle fibers, rounded forms, storybook charm",
  "pastel watercolor with controlled edges, light paper texture, airy and tender",
  "cel-shaded 3D with soft gradients, warm highlights, clean silhouettes, studio-quality cute",
  "claymation-inspired 3D, subtle fingerprints smoothed, toy-like, wholesome",
  "gentle Ghibli-adjacent painted look, soft linework, lush but calm colors, cozy atmosphere",
] as const;

const LIGHTING_LINES = [
  "warm soft key light with delicate rim, cozy glow, gentle contact shadows",
  "cool diffused window light, airy highlights, soft blue fill, peaceful morning",
  "golden-hour side light, honeyed tones, long soft shadows, cuddly mood",
  "overcast even lighting, no harsh speculars, creamy flat pastels, nursery calm",
  "candle-warm tungsten with faint sparkle catchlights, intimate and snug",
] as const;

const BACKGROUND_LINES = [
  "pastel background with soft bokeh orbs, shallow depth, airy negative space",
  "gradient from soft rose to warm ivory, minimal props, uncluttered",
  "mint and lavender haze, subtle sparkles optional, fairytale softness",
  "blurred sun-dappled leaves, gentle green bokeh, natural sweet vibe",
  "soft knit or quilt texture very out of focus, hygge cozy, no readable pattern",
] as const;

const POSE_NOTES = [
  "sitting upright, tiny paws together, looking slightly toward the viewer",
  "playful low crouch, tail a soft curve, alert happy posture",
  "loafed comfortably, paws tucked, serene and squishable",
  "slight head tilt, one paw raised as if to boop, endearing and lively",
  "curled in a small circle, looking up with big eyes, maximum softness",
] as const;

const MOOD_AWW = [
  "adorable, safe, family-friendly, maximum « aww » factor, wholesome joy",
  "heartwarming, comfort object energy, impossibly huggable, gentle cheer",
  "serene and sweet, lullaby calm, no edge, pure coziness",
  "bouncy lighthearted cuteness, tiny spark of mischief, still kid-safe and kind",
] as const;

/**
 * Builds a new prompt for each call — use one per image generation request.
 */
export function buildCuteKittenImagePrompt(): string {
  return [
    "Full-body portrait of one kitten, single subject, no humans.",
    `Ultra-cute, heart-melting expression: ${pick(EXPRESSION_LINES)}.`,
    `Fur: ${pick(FUR_PALETTES)}.`,
    `Style: ${pick(STYLE_LINES)}.`,
    `Lighting: ${pick(LIGHTING_LINES)}.`,
    `Background: ${pick(BACKGROUND_LINES)}.`,
    `Pose: ${pick(POSE_NOTES)}.`,
    "Centered composition, clean negative space, no text, no watermark, no frame, no logo.",
    `Mood: ${pick(MOOD_AWW)}.`,
  ].join(" ");
}
