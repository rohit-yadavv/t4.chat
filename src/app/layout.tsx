import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const proximaVara = localFont({
  src: "../assets/fonts/proxima_vara.woff2",
  variable: "--font-proxima-vara",
  display: "swap",
});

const berkeleyMono = localFont({
  src: "../assets/fonts/berkeley_mono.woff2",
  variable: "--font-berkeley-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "T4 Chat - Power clone of T3.Chat",
  description:
    "A powerful, feature-rich clone of t3.chat with advanced AI capabilities and seamless tool integration. Access 100+ LLM models with dynamic tool system, pixel-perfect UI, and smart prompt engineering.",
  keywords: [
    "t3 chat clone",
    "AI chat",
    "LLM models",
    "chat interface",
    "AI assistant",
    "openrouter",
    "dynamic tools",
    "multi-model chat",
    "t4 chat",
    "artificial intelligence",
  ],
  authors: [{ name: "T4 Chat" }],
  metadataBase: new URL("https://t4-chat.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "T4 Chat - Power clone of T4.Chat",
    description:
      "A powerful, feature-rich clone of t3.chat with advanced AI capabilities and seamless tool integration. Access 100+ LLM models with dynamic tool system, pixel-perfect UI, and smart prompt engineering.",
    url: "https://t4-chat.vercel.app",
    siteName: "T4 Chat",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "T4 Chat - Power clone of T3.Chat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T4 Chat - Power clone of T3.Chat",
    description:
      "A powerful, feature-rich clone of t3.chat with advanced AI capabilities and seamless tool integration. Access 100+ LLM models with dynamic tool system, pixel-perfect UI, and smart prompt engineering.",
    creator: "@t4chat",
    images: {
      url: "/banner.png",
      alt: "T4 Chat - Power clone of T3.Chat",
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${proximaVara.variable} ${berkeleyMono.variable} selection:text-white selection:bg-primary font-proxima-vara antialiased min-h-dvh`}
      >
        <ThemeProvider attribute="class">
          <QueryProvider>
            <SessionProvider>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  classNames: {
                    toast: "!bg-sidebar !text-popover-foreground !border ",
                    success:
                      "!bg-sidebar !text-popover-foreground !border !border-input",
                    error:
                      "!bg-sidebar !text-popover-foreground !border !border-input",
                    warning:
                      "!bg-sidebar !text-popover-foreground !border !border-input",
                    info: "!bg-sidebar !text-popover-foreground !border !border-input",
                    default:
                      "!bg-sidebar !text-popover-foreground !border !border-input",
                  },
                }}
              />
            </SessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
