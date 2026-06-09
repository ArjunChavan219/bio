import type { Metadata } from "next";
import "./globals.css";
import { ModeProvider } from "@/lib/ModeContext";

export const metadata: Metadata = {
  title: "Arjun Chavan — Applied AI Engineer",
  description:
    "Applied AI engineer building production LLM systems: multi-agent orchestration, retrieval (RAG), and AI infrastructure at scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
