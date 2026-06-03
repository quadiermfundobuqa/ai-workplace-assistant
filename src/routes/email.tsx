import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { FeaturePanel } from "@/components/feature-panel";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workly AI" },
      { name: "description", content: "Generate professional emails with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <FeaturePanel
      feature="email"
      title="Smart Email Generator"
      description="Draft clear, professional emails in seconds. Specify recipient, intent, and tone."
      icon={<Mail className="h-6 w-6" />}
      fields={[
        {
          id: "recipient",
          label: "Recipient & relationship",
          placeholder: "e.g. My manager Sarah; a prospective client at Acme Corp",
          rows: 2,
        },
        {
          id: "intent",
          label: "What do you want to say?",
          placeholder:
            "e.g. Request a 1-day deadline extension for the Q3 report due to a client escalation.",
          rows: 4,
        },
        {
          id: "tone",
          label: "Tone & length",
          placeholder: "e.g. Professional, warm, concise (under 150 words)",
          rows: 2,
        },
        {
          id: "context",
          label: "Extra context",
          placeholder: "Anything else the AI should know — prior conversations, dates, links…",
          rows: 3,
          optional: true,
        },
      ]}
      buildPrompt={(v) =>
        `Write a professional email.\n\nRecipient: ${v.recipient}\n\nIntent / message: ${v.intent}\n\nTone & length: ${v.tone}${v.context ? `\n\nAdditional context: ${v.context}` : ""}\n\nReturn ONLY the email with 'Subject: ...' on the first line.`
      }
      cta="Generate Email"
      outputLabel="Email Draft (editable)"
    />
  );
}
