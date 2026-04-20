import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/ai/client";
import { env } from "@/lib/env";
import { buildRitualMessages, extractRitualText, ritualSystemPrompt } from "@/lib/rituals/prompt";
import { buildFallbackRitual, type RitualType } from "@/lib/rituals/templates";

type RitualRequestBody = {
  input?: string;
  preferredType?: RitualType;
};

function isRitualType(value: unknown): value is RitualType {
  return value === "reflection" || value === "reframe" || value === "permission" || value === "release" || value === "identity";
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as RitualRequestBody;
  const input = typeof body.input === "string" ? body.input : "";
  const preferredType = isRitualType(body.preferredType) ? body.preferredType : undefined;
  const fallback = buildFallbackRitual(input, preferredType);
  const client = getAnthropicClient();

  if (!input.trim() || !client) {
    return NextResponse.json({ ...fallback, source: "template" });
  }

  try {
    const message = await client.messages.create({
      model: env.anthropicModel,
      max_tokens: 120,
      temperature: 0.95,
      system: ritualSystemPrompt,
      messages: buildRitualMessages(input, fallback.type),
    });

    const text = extractRitualText(message);
    if (!text) {
      return NextResponse.json({ ...fallback, source: "template" });
    }

    return NextResponse.json({
      id: `ai-${Date.now()}`,
      type: fallback.type,
      text,
      source: "ai",
    });
  } catch (error) {
    console.error("[ritual]", error);
    return NextResponse.json({ ...fallback, source: "template" });
  }
}