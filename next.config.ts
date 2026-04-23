import type { NextConfig } from "next";

function supabaseStorageRemotePattern():
  | { protocol: "https"; hostname: string; pathname: string }
  | undefined {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return undefined;
  try {
    const hostname = new URL(raw).hostname;
    if (!hostname) return undefined;
    return {
      protocol: "https",
      hostname,
      pathname: "/storage/v1/**",
    };
  } catch {
    return undefined;
  }
}

const supabasePattern = supabaseStorageRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabasePattern ? [supabasePattern] : [],
  },
};

export default nextConfig;
