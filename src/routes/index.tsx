import { createFileRoute } from "@tanstack/react-router";
import { FestivalPage } from "@/components/festival/FestivalSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Great Indian Dandiya Night Season 2.0 | Jaipur 2026" },
      { name: "description", content: "The Great Indian Dandiya Night Season 2.0 at Entertainment Paradise, Jaipur. 11–19 October 2026 from 7 PM. Early bird event tickets starting from ₹299." },
      { property: "og:title", content: "The Great Indian Dandiya Night Season 2.0 | Jaipur 2026" },
      { property: "og:description", content: "11–19 October 2026 at Entertainment Paradise, Jaipur. From 7 PM. Early bird event tickets starting from ₹299." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: FestivalPage,
});