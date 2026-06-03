import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Send, Loader2, MessageCircle, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { runAI } from "@/lib/api/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Workly AI" },
      { name: "description", content: "Conversational AI for workplace questions." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Help me prepare for a tough 1:1 with my manager",
  "Draft a polite decline to a meeting invite",
  "Suggest agenda items for a kickoff meeting",
  "How do I prioritize when everything feels urgent?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const callAI = useServerFn(runAI);

  const mutation = useMutation({
    mutationFn: (history: Msg[]) =>
      callAI({ data: { feature: "chat", messages: history } }),
    onSuccess: (res) => {
      setMessages((prev) => [...prev, { role: "assistant", content: res.content }]);
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Something went wrong");
      setMessages((prev) => prev.slice(0, -1));
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant text-primary-foreground">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">AI Chat</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ask anything about your workday. Press Enter to send, Shift+Enter for newline.
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setMessages([])}>
            <RotateCcw className="mr-2 h-4 w-4" /> New chat
          </Button>
        )}
      </header>

      <Card className="flex flex-1 flex-col overflow-hidden shadow-card p-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">How can I help today?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try one of these prompts or ask your own.
              </p>
              <div className="mt-5 grid w-full gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-lg border bg-card p-3 text-left text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {mutation.isPending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex items-end gap-2 border-t bg-background/60 p-3 backdrop-blur"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask anything…"
            rows={1}
            className="max-h-48 min-h-[44px] resize-none"
          />
          <Button
            type="submit"
            disabled={mutation.isPending || !input.trim()}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95"
          >
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Card>

      <p className="text-xs text-muted-foreground">
        AI responses can be inaccurate. Verify important information independently.
      </p>
    </div>
  );
}
