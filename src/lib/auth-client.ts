import { createAuthClient } from "better-auth/react";

/** Public origin for `/api/auth` requests. In production set NEXT_PUBLIC_BETTER_AUTH_URL (see .env.example). */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
    "https://cutie-cat-generator.vercel.app",
});
