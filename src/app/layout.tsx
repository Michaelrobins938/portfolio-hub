import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ 
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-mono'
});

export const metadata: Metadata = {
    title: "Attribution Command Hub | 10x Portfolio",
    description: "Unified dashboard for 10 high-fidelity attribution and data science products.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${mono.variable} font-mono antialiased`}>{children}</body>
        </html>
    );
}
