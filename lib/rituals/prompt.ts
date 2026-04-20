import type { MessageParam, TextBlock } from "@anthropic-ai/sdk/resources/messages";
import type Anthropic from "@anthropic-ai/sdk";
import type { RitualType } from "@/lib/rituals/templates";

export const ritualSystemPrompt = [
  "You write 10-second micro-rituals.",
  "Return exactly 1-2 sentences.",
  "Be emotionally precise, grounded, and screenshot-ready.",
  "No advice. No therapy language. No moralizing. No bullet points. No questions.",
  "Frame each response as identity, permission, clarity, resonance, or release.",
  "Avoid cliches, platitudes, or productivity language.",
  "Output only the ritual text.",
].join(" ");

const typeGuidance: Record<RitualType, string> = {
  reflection: "Offer clean clarity about what may be happening underneath the feeling.",
  reframe: "Offer a new frame that softens pressure without giving advice.",
  permission: "Give succinct permission that feels relieving, not indulgent.",
  release: "Name one thing the user can emotionally put down without sounding instructional.",
  identity: "Mirror the user as someone becoming steadier, softer, truer, or clearer.",
};

export function buildRitualMessages(input: string, type: RitualType): MessageParam[] {
  return [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: [
            `Input: ${input.trim()}`,
            `Ritual type: ${type}.`,
            typeGuidance[type],
            "Write one concise micro-ritual now.",
          ].join("\n"),
        },
      ],
    },
  ];
}

export function extractRitualText(message: Anthropic.Messages.Message) {
  const text = message.content
    .filter((block): block is TextBlock => block.type === "text")
    .map((block) => block.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = text.match(/[^.!?]+[.!?]?/g) ?? [text];
  return sentences.slice(0, 2).join(" ").trim();
}