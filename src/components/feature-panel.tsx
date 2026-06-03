import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { runAI } from "@/lib/api/ai.functions";

type Feature = "email" | "meeting" | "planner" | "research";

interface Field {
  id: string;
  label: string;
  placeholder: string;
  rows?: number;
  optional?: boolean;
}

interface FeaturePanelProps {
  feature: Feature;
  title: string;
  description: string;
  icon: ReactNode;
  fields: Field[];
  buildPrompt: (values: Record<string, string>) => string;
  cta?: string;
  outputLabel?: string;
}

export function FeaturePanel({
  feature,
  title,
  description,
  icon,
  fields,
  buildPrompt,
  cta = "Generate",
  outputLabel = "AI Output (editable)",
}: FeaturePanelProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, ""])),
  );
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const callAI = useServerFn(runAI);
  const mutation = useMutation({
    mutationFn: (prompt: string) =>
      callAI({ data: { feature, messages: [{ role: "user", content: prompt }] } }),
    onSuccess: (res) => setOutput(res.content),
    onError: (err: Error) => toast.error(err.message ?? "Something went wrong"),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = fields.filter((f) => !f.optional);
    for (const f of required) {
      if (!values[f.id]?.trim()) {
        toast.error(`Please fill in: ${f.label}`);
        return;
      }
    }
    mutation.mutate(buildPrompt(values));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant text-primary-foreground">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Provide context — be as specific as you can.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {fields.map((f) => (
                <div key={f.id} className="space-y-2">
                  <Label htmlFor={f.id}>
                    {f.label}
                    {f.optional && (
                      <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
                    )}
                  </Label>
                  <Textarea
                    id={f.id}
                    rows={f.rows ?? 3}
                    placeholder={f.placeholder}
                    value={values[f.id]}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.id]: e.target.value }))
                    }
                    className="resize-none"
                  />
                </div>
              ))}
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-elegant"
                size="lg"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> {cta}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">{outputLabel}</CardTitle>
              <CardDescription>Review and edit before using.</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyOutput}
              disabled={!output}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="ml-2">Copy</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder={
                mutation.isPending
                  ? "Thinking…"
                  : "Your AI-generated output will appear here. You can edit it freely."
              }
              className="min-h-[420px] resize-y font-mono text-sm leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        AI can make mistakes. Verify important details before sending or sharing.
      </p>
    </div>
  );
}
