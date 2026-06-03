import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { FeaturePanel } from "@/components/feature-panel";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workly AI" },
      { name: "description", content: "Break goals into prioritized, actionable plans." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <FeaturePanel
      feature="planner"
      title="AI Task Planner"
      description="Describe a goal or project. Get a structured plan with milestones, tasks, and time estimates."
      icon={<ListChecks className="h-6 w-6" />}
      fields={[
        {
          id: "goal",
          label: "Goal or project",
          placeholder: "e.g. Launch a new onboarding flow for our SaaS product",
          rows: 3,
        },
        {
          id: "timeline",
          label: "Timeline",
          placeholder: "e.g. 3 weeks, by end of November",
          rows: 1,
        },
        {
          id: "resources",
          label: "Team & resources",
          placeholder: "e.g. Myself (PM), 1 designer, 2 engineers part-time",
          rows: 2,
          optional: true,
        },
        {
          id: "constraints",
          label: "Constraints & priorities",
          placeholder: "e.g. Must integrate with existing auth; mobile is a priority",
          rows: 2,
          optional: true,
        },
      ]}
      buildPrompt={(v) =>
        `Create a detailed plan.\n\nGoal: ${v.goal}\n\nTimeline: ${v.timeline}${v.resources ? `\n\nTeam & resources: ${v.resources}` : ""}${v.constraints ? `\n\nConstraints & priorities: ${v.constraints}` : ""}`
      }
      cta="Generate Plan"
      outputLabel="Plan (editable)"
    />
  );
}
