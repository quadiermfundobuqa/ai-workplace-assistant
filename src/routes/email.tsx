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
      description="Draft clear, professional emails in seconds using a structured Executive Communications framework."
      icon={<Mail className="h-6 w-6" />}
      fields={[
        {
          id: "senderRole",
          label: "Sender role",
          placeholder: "e.g. Product Manager at a B2B SaaS company",
          rows: 2,
        },
        {
          id: "recipient",
          label: "Recipient / audience",
          placeholder: "e.g. Client, Executive Board, Internal Team — include name & relationship",
          rows: 2,
        },
        {
          id: "objective",
          label: "Core message / objective",
          placeholder:
            "e.g. Request a 1-day deadline extension for the Q3 report due to a client escalation.",
          rows: 4,
        },
        {
          id: "tone",
          label: "Desired tone",
          placeholder: "Formal & Authoritative  |  Warm & Collaborative  |  Persuasive",
          rows: 1,
        },
        {
          id: "actions",
          label: "Key actions required",
          placeholder: "e.g. Approve revised timeline by EOD Friday; confirm new launch date.",
          rows: 2,
        },
        {
          id: "context",
          label: "Extra context",
          placeholder: "Prior conversations, dates, links, constraints…",
          rows: 3,
          optional: true,
        },
      ]}
      buildPrompt={(v) =>
        `Draft a professional email using these parameters:

- Sender Role: ${v.senderRole}
- Recipient/Audience: ${v.recipient}
- Core Message/Objective: ${v.objective}
- Desired Tone: ${v.tone}
- Key Actions Required: ${v.actions}${v.context ? `\n- Additional Context: ${v.context}` : ""}

Follow all constraints from your system instructions, including the two subject line options on the first lines.`
      }
      cta="Generate Email"
      outputLabel="Email Draft (editable)"
    />
  );
}
