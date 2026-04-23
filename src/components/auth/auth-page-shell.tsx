import Link from "next/link";

import { CutieCatSiteHeader } from "@/components/cutie-cat-site-header";

export function AuthPageShell({
  current,
  children,
}: {
  current: "login" | "signup";
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden bg-[linear-gradient(165deg,#fff8f3_0%,#ffeef5_35%,#e8deff_100%)] text-[#4a3f45]">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 10% -10%, rgba(255, 200, 210, 0.45), transparent 55%),
            radial-gradient(ellipse 60% 45% at 95% 15%, rgba(200, 180, 255, 0.35), transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255, 220, 200, 0.4), transparent 45%)
          `,
        }}
      />

      <CutieCatSiteHeader
        current={current}
        tagline="Compte Cutie Cat"
      />

      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-6 pb-16 pt-4">
        {children}
      </main>

      <footer className="mx-auto mt-auto w-full max-w-[1100px] border-t border-white/50 px-6 py-6 text-center">
        <p className="text-sm text-[#6d5f66]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Retour à l’accueil
          </Link>
        </p>
      </footer>
    </div>
  );
}
