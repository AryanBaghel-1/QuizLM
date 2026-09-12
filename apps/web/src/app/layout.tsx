import { Initializer } from "@/components/clientInit";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { getConfig } from "@repo/shared/server";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "QuizLM",
    description: "Created with v0",
    generator: "v0.app",
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = getConfig();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased">
                <Initializer expressUrl={config.express.url} />
                <ClerkProvider publishableKey={config.clerk.publishableKey}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
