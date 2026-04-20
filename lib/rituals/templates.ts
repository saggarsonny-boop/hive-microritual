export type RitualType = "reflection" | "reframe" | "permission" | "release" | "identity";

export type RitualTemplate = {
  id: string;
  type: RitualType;
  text: string;
};

export const ritualTypeLabels: Record<RitualType, string> = {
  reflection: "Micro-Reflection",
  reframe: "Micro-Reframe",
  permission: "Micro-Permission",
  release: "Micro-Release",
  identity: "Micro-Identity Mirror",
};

export const ritualTemplates: RitualTemplate[] = [
  { id: "reflection-01", type: "reflection", text: "The strange mood may not be confusion at all. It may be your attention asking to come back to one honest thing." },
  { id: "reflection-02", type: "reflection", text: "What feels off may simply be what you have not named yet. Naming it changes the weight of it." },
  { id: "reflection-03", type: "reflection", text: "You may not need a full answer today. You may just need the real question to stop hiding." },
  { id: "reflection-04", type: "reflection", text: "Sometimes the heaviness is just backlog in emotional form. One true sentence can clear more than momentum can." },
  { id: "reflection-05", type: "reflection", text: "The tension may be less about the day and more about the meaning you keep attaching to it." },
  { id: "reflection-06", type: "reflection", text: "What you keep circling might already be decided in your body. Your mind is only catching up." },
  { id: "reflection-07", type: "reflection", text: "This may not be a bad day. It may be a day where your nervous system wants simpler signals." },
  { id: "reflection-08", type: "reflection", text: "You do not always feel lost because you lack direction. Sometimes you feel lost because you have outgrown the old script." },
  { id: "reflection-09", type: "reflection", text: "The friction may be coming from pretending something small is not real. Small truths still shape the whole room." },
  { id: "reflection-10", type: "reflection", text: "What hurts today may be the gap between what you need and what you have been performing." },
  { id: "reframe-01", type: "reframe", text: "You do not have to turn this feeling into a verdict. It can just be weather passing through a real life." },
  { id: "reframe-02", type: "reframe", text: "Try holding this instead: this is information, not failure. Your system is speaking in sensation before words." },
  { id: "reframe-03", type: "reframe", text: "The pressure may not mean you are behind. It may mean you care enough to notice the edge." },
  { id: "reframe-04", type: "reframe", text: "You can let this be a pause, not a collapse. A pause still belongs to movement." },
  { id: "reframe-05", type: "reframe", text: "What if this is not stuckness. What if this is your pace asking to become more honest." },
  { id: "reframe-06", type: "reframe", text: "Try reading the ache as adjustment, not inadequacy. Growth rarely arrives with perfect emotional lighting." },
  { id: "reframe-07", type: "reframe", text: "You may not need a breakthrough. You may need a smaller frame around what matters right now." },
  { id: "reframe-08", type: "reframe", text: "Let the unfinished parts stay unfinished for a breath. Not everything urgent is actually immediate." },
  { id: "reframe-09", type: "reframe", text: "This might not be overthinking. It might be unspent honesty waiting for a cleaner shape." },
  { id: "reframe-10", type: "reframe", text: "Try seeing today as low tide instead of loss. Some things only become visible when the water pulls back." },
  { id: "permission-01", type: "permission", text: "You are allowed to stop translating your needs into something more acceptable. A clear need is already enough." },
  { id: "permission-02", type: "permission", text: "You are allowed to be tender without explaining why. Not every soft day needs a courtroom." },
  { id: "permission-03", type: "permission", text: "You are allowed to make today smaller. Small days still count as real days." },
  { id: "permission-04", type: "permission", text: "You are allowed to want relief before insight. Ease is not a reward you have to earn." },
  { id: "permission-05", type: "permission", text: "You are allowed to answer less today. Preservation is a valid language." },
  { id: "permission-06", type: "permission", text: "You are allowed to leave one thing untouched. Restraint can be mercy, not avoidance." },
  { id: "permission-07", type: "permission", text: "You are allowed to disappoint the version of you that only knows how to push." },
  { id: "permission-08", type: "permission", text: "You are allowed to need gentleness before strategy. Sequence matters." },
  { id: "permission-09", type: "permission", text: "You are allowed to return to basics. Simplicity is not regression." },
  { id: "permission-10", type: "permission", text: "You are allowed to let this be enough for one moment. Enough is not the enemy of becoming." },
  { id: "release-01", type: "release", text: "Drop the idea that every feeling needs immediate resolution. Some feelings only need room." },
  { id: "release-02", type: "release", text: "Release the extra story around this moment. The moment itself is already plenty." },
  { id: "release-03", type: "release", text: "Put down the inner urgency for one breath. What remains is usually the truer thing." },
  { id: "release-04", type: "release", text: "Drop the performance of being fine. Quiet honesty weighs less." },
  { id: "release-05", type: "release", text: "Release the need to understand yourself perfectly before you soften. Softening can come first." },
  { id: "release-06", type: "release", text: "Let go of the belief that you must solve the whole knot tonight. One loosened thread is enough." },
  { id: "release-07", type: "release", text: "Drop the borrowed timelines. Your body has its own clock for clarity." },
  { id: "release-08", type: "release", text: "Release one layer of self-surveillance. You do not need to monitor every inner movement." },
  { id: "release-09", type: "release", text: "Set down the version of the day that only exists in pressure. The real day is still here." },
  { id: "release-10", type: "release", text: "Drop the argument with what is already true. Acceptance creates the first inch of space." },
  { id: "identity-01", type: "identity", text: "Today you are moving like someone learning how to stay with themselves. That counts as strength." },
  { id: "identity-02", type: "identity", text: "Today you are moving like someone who no longer confuses intensity with depth." },
  { id: "identity-03", type: "identity", text: "Today you are moving like someone allowed to be whole before being polished." },
  { id: "identity-04", type: "identity", text: "Today you are moving like someone whose softness has become a form of precision." },
  { id: "identity-05", type: "identity", text: "Today you are moving like someone choosing truth over perfect timing." },
  { id: "identity-06", type: "identity", text: "Today you are moving like someone who notices the signal beneath the noise." },
  { id: "identity-07", type: "identity", text: "Today you are moving like someone rebuilding trust with their own pace." },
  { id: "identity-08", type: "identity", text: "Today you are moving like someone who can hold complexity without hardening." },
  { id: "identity-09", type: "identity", text: "Today you are moving like someone letting gentleness become a standard, not an exception." },
  { id: "identity-10", type: "identity", text: "Today you are moving like someone who is no longer abandoning themselves for speed." },
];

const typeOrder: RitualType[] = ["reflection", "reframe", "permission", "release", "identity"];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function cleanInput(input: string) {
  return input.trim().replace(/\s+/g, " ").slice(0, 88);
}

export function pickRandomTemplate(excludedId?: string, preferredType?: RitualType) {
  const pool = ritualTemplates.filter((template) => {
    if (excludedId && template.id === excludedId) {
      return false;
    }

    if (preferredType) {
      return template.type === preferredType;
    }

    return true;
  });

  return randomItem(pool.length > 0 ? pool : ritualTemplates);
}

export function nextType(after?: RitualType): RitualType {
  if (!after) {
    return randomItem(typeOrder);
  }

  const index = typeOrder.indexOf(after);
  return typeOrder[(index + 1) % typeOrder.length];
}

export function buildFallbackRitual(input?: string, preferredType?: RitualType): RitualTemplate {
  const cleaned = cleanInput(input ?? "");
  const type = preferredType ?? randomItem(typeOrder);

  if (!cleaned) {
    return pickRandomTemplate(undefined, type);
  }

  const quoted = `\"${cleaned}\"`;

  const copyByType: Record<RitualType, string[]> = {
    reflection: [
      `${quoted} may be your body asking for simpler truth, not a bigger explanation. Notice what becomes quieter when you stop trying to solve all of it.`,
      `Inside ${quoted} there may be one clean signal under the static. Let the signal be enough for this moment.`,
    ],
    reframe: [
      `${quoted} does not have to mean something is wrong with you. It may only mean your system wants a kinder frame.`,
      `Try holding ${quoted} as information instead of proof. The feeling can stay real without becoming a verdict.`,
    ],
    permission: [
      `You are allowed to meet ${quoted} without fixing it first. Gentleness still counts as movement.`,
      `You are allowed to let ${quoted} be true for one breath. You do not need a more impressive response.`,
    ],
    release: [
      `Drop the extra pressure around ${quoted}. The pressure is not the same thing as the truth.`,
      `Release the urge to force ${quoted} into clarity right now. Space may be the clearest move available.`,
    ],
    identity: [
      `Today you are moving like someone who can notice ${quoted} without abandoning themselves. That is a real form of steadiness.`,
      `Today you are moving like someone learning to hold ${quoted} with less fear and more truth.`,
    ],
  };

  return {
    id: `fallback-${type}-${Date.now()}`,
    type,
    text: randomItem(copyByType[type]),
  };
}