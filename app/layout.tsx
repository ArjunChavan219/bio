import type { Metadata } from "next";
import "./globals.css";
import { ModeProvider } from "@/lib/ModeContext";

export const metadata: Metadata = {
  title: "Arjun Chavan — Software Engineer",
  description:
    "Software engineer building production backend and AI systems: distributed services, multi-agent orchestration, retrieval (RAG), and LLM infrastructure at scale.",
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
