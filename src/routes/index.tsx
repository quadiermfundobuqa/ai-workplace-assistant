import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  ClipboardList,
  ListChecks,
  Search,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workly AI" },
      {
        name: "description",
        content: "Your AI workplace productivity dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft polished emails in seconds with the right tone.",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into summaries, decisions, and action items.",
    url: "/meetings",
    icon: ClipboardList,
  },
  {
    title: "AI Task Planner",
    description: "Break down goals into prioritized, realistic plans.",
    url: "/planner",
    icon: ListChecks,
  },
  {
    title: "AI Research Assistant",
    description: "Get structured briefings on any topic, fast.",
    url: "/research",
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "Conversational helper for any workplace question.",
    url: "/chat",
    icon: MessageCircle,
  },
] as const;

const stats = [
  { label: "Avg. time saved", value: "4.2h", sub: "per week", icon: Clock },
  { label: "Faster drafting", value: "10×", sub: "vs. blank page", icon: Zap },
  { label: "Private & secure", value: "100%", sub: "review before send", icon: ShieldCheck },
];

function Dashboard() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-card sm:p-10">
        <div className="absolute inset-0 -z-10 opacity-[0.07] bg-gradient-primary" />
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Workplace Productivity Suite
        </div>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Automate the busywork.{" "}
          <span className="text-gradient">Focus on the real work.</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Five AI assistants designed for modern teams — drafting, summarizing,
          planning, researching, and answering, all in one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
            <Link to="/email">
              Start with Email <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/chat">Open AI Chat</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground">
                  {s.label} <span className="opacity-70">· {s.sub}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">AI Assistants</h2>
            <p className="text-sm text-muted-foreground">
              Pick a tool to get started.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full shadow-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-elegant">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Open <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-muted/40 p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Responsible AI Disclaimer</p>
        <p className="mt-1 leading-relaxed">
          Workly AI generates content using large language models. Outputs can
          be inaccurate, biased, or out of date. Always review and verify
          AI-generated content before sending, sharing, or acting on it.
          Do not enter confidential information you wouldn't share with a
          third-party AI provider.
        </p>
      </section>
    </div>
  );
}
