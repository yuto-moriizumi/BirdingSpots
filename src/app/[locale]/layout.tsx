import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BirdingSpots",
  description: "関東で今人気の探鳥地を見つけるサイト",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes((await params).locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={(await params).locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Force static generation of all paths.
 * Pages using dynamic functions (e.g. `new Date`) will be dynamical rendered by default even `generateStaticParams` is defined.
 * This behavior can be changed by setting `dynamic` to `"force-static"`.
 * Note that without `revalidate`, the page will be never rerendered.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
 */
export const dynamic = "force-static";
