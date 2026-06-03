import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPTS: Record<string, string> = {
  email:
    "You are an expert professional email writer. Craft clear, courteous, well-structured emails. Output ONLY the email, formatted with a subject line on the first line as 'Subject: ...' then a blank line, then the body. Match the requested tone and length precisely.",
  meeting:
    "You are an expert meeting analyst. From the raw notes or transcript, produce: 1) a concise Summary (3-5 bullets), 2) Key Decisions, 3) Action Items (assignee — task — due date if known), 4) Open Questions. Use clean markdown-ish formatting with section headers.",
  planner:
    "You are an expert AI task planner. Break the user's goal into a prioritized, actionable plan. Return: Objective, Milestones, Day-by-day or step-by-step Tasks with estimated time, Dependencies, and Success Criteria. Be specific and realistic.",
  research:
    "You are an expert research assistant. Provide a structured briefing: Overview, Key Points (bulleted), Stakeholders/Players, Risks & Considerations, and Suggested Next Steps. Be neutral, factual, and note when information may be outdated or require verification.",
  chat:
    "You are a friendly, knowledgeable workplace productivity assistant. Be concise, practical, and helpful. Use markdown formatting where it improves clarity.",
};

const Message = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1).max(20000),
});

export const runAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      feature: z.enum(["email", "meeting", "planner", "research", "chat"]),
      messages: z.array(Message).min(1).max(40),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const system = SYSTEM_PROMPTS[data.feature];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 429) {
        throw new Error("Rate limit reached. Please try again in a moment.");
      }
      if (res.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
      }
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
