import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { FeaturePanel } from "@/components/feature-panel";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workly AI" },
      { name: "description", content: "Turn raw notes into summaries and action items." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <FeaturePanel
      feature="meeting"
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a structured summary, decisions, and action items."
      icon={<ClipboardList className="h-6 w-6" />}
      fields={[
        {
          id: "notes",
          label: "Raw notes or transcript",
          placeholder: "Paste meeting notes or transcript here…",
          rows: 12,
        },
        {
          id: "context",
          label: "Meeting context",
          placeholder: "e.g. Weekly product sync — 6 attendees, focus on Q4 roadmap",
          rows: 2,
          optional: true,
        },
      ]}
      buildPrompt={(v) =>
        `Summarize the following meeting notes.${v.context ? `\n\nContext: ${v.context}` : ""}\n\nNotes:\n${v.notes}`
      }
      cta="Summarize Meeting"
      outputLabel="Meeting Summary (editable)"
    />
  );
}
