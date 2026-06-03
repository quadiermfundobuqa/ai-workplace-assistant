import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { FeaturePanel } from "@/components/feature-panel";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workly AI" },
      { name: "description", content: "Structured briefings on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <FeaturePanel
      feature="research"
      title="AI Research Assistant"
      description="Get a structured briefing on a topic, company, market, or concept."
      icon={<Search className="h-6 w-6" />}
      fields={[
        {
          id: "topic",
          label: "Topic or question",
          placeholder: "e.g. Overview of the European e-bike market in 2024",
          rows: 3,
        },
        {
          id: "angle",
          label: "Focus or angle",
          placeholder: "e.g. Competitive landscape and pricing trends",
          rows: 2,
          optional: true,
        },
        {
          id: "audience",
          label: "Audience for the briefing",
          placeholder: "e.g. Executive team, non-technical",
          rows: 1,
          optional: true,
        },
      ]}
      buildPrompt={(v) =>
        `Prepare a research briefing.\n\nTopic: ${v.topic}${v.angle ? `\n\nFocus: ${v.angle}` : ""}${v.audience ? `\n\nAudience: ${v.audience}` : ""}\n\nNote any areas where information may need to be verified or could be outdated.`
      }
      cta="Run Research"
      outputLabel="Briefing (editable)"
    />
  );
}
