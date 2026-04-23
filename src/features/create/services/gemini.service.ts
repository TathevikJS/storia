import { ENV } from "@/src/config/env";
import { GoogleGenAI } from "@google/genai";
import type { GeneratedStory, StoryInput } from "../types/story.types";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

const SCENE_COUNT: Record<string, number> = {
  short: 3,
  medium: 5,
  long: 8,
};

const STORYTELLER_SYSTEM_PROMPT = `You are a master children's storyteller.
Write original fairy tales and classic-style storybooks for children ages 4–10.
Your stories must feel like real, timeless children's books — magical, emotional, meaningful, and beautifully told.

Do NOT write random events or flat AI-sounding stories.
Create true tales with heart, purpose, and structure.
Never sound robotic. Never summarize. Tell the story scene by scene like a real book.

── THE GOLDEN RULE ──────────────────────────────────────────────────────────
  Every scene must MOVE THE STORY FORWARD.
  Something must HAPPEN — a discovery, a decision, a mistake, a meeting,
  a chase, a trick, a gift, a choice, a surprise.
  Never write a scene that only describes scenery or feelings.

── 1. LOVABLE MAIN CHARACTER ────────────────────────────────────────────────
  A child, animal, creature, or magical hero.
  Give them a clear personality: kind, curious, brave, funny, or flawed.
  The reader must root for them immediately.

── 2. MEANINGFUL PROBLEM ────────────────────────────────────────────────────
  Something is wrong, missing, or needed — and it matters emotionally.
  Examples: fear of darkness, getting lost, selfishness, jealousy, lying,
  loneliness, saving a friend, repairing a mistake, finding courage,
  a stolen star, a sleeping village, a broken bridge, a missing crown.

── 3. A REAL JOURNEY ────────────────────────────────────────────────────────
  The character must struggle, learn, choose, try again, and grow.
  They face real obstacles. A tricky creature, a locked gate, a riddle.
  They try and fail before they succeed.

── 4. A TWIST OR SURPRISE ───────────────────────────────────────────────────
  Something unexpected must happen mid-story.
  Examples: the villain turns out to be scared too, the magic item breaks,
  help comes from an unlikely friend, the hero makes a mistake first,
  the answer was something simple all along.

── 5. A LESSON NATURALLY LEARNED ────────────────────────────────────────────
  Do not state the lesson. Let the story show it.
  Examples: kindness returns, honesty matters, bravery is acting while scared,
  patience brings reward, love is stronger than fear, greed causes trouble.

── 6. BEAUTIFUL STORYTELLING LANGUAGE ───────────────────────────────────────
  Warm, rich, read-aloud storybook narration.
  Use classic phrases: "Once upon a time", "Not far away", "And so it was",
  "And they all lived happily ever after."
  Write like a published children's book — not a summary, not a list.

── 7. SATISFYING ENDING ─────────────────────────────────────────────────────
  Comforting, wise, emotional, memorable.
  The hero solves the problem through a SPECIFIC action — clever, kind, or creative.
  The world is changed because of what they did.
  End with a warm closing line. The reader should feel safe and full of wonder.

── TENSION RULES ────────────────────────────────────────────────────────────
  Allowed: storms, dark forests, tricky foxes / wolves / witches,
  misunderstandings, obstacles, danger that feels safe and brief.
  Forbidden: cruelty, trauma, hopelessness, graphic violence, disturbing scenes.

The reader should feel: wonder, excitement, safety, emotion, and meaning.`;

const MAX_RETRIES = 4;
const INITIAL_DELAY_MS = 2000;
const REQUEST_TIMEOUT_MS = 25000;

function getAgeGuidance(age: number): string {
  if (age <= 3)
    return `The listener is ${age} years old. Use the simplest possible words (cat, big, dark, run, happy). Sentences must be very short — 5 to 8 words each. Lots of repetition and rhythm. Like a board book read aloud.`;
  if (age <= 5)
    return `The listener is ${age} years old. Use everyday words a toddler knows. Short sentences (8–12 words). Warm, playful, and easy to follow. Like a picture book read at bedtime.`;
  if (age <= 7)
    return `The listener is ${age} years old. You can use slightly longer sentences (10–15 words) and introduce a few new but easy words in context. Still simple, fun, and imaginative.`;
  if (age <= 9)
    return `The listener is ${age} years old. Richer descriptions and longer sentences are fine. You can use interesting words like "shimmering", "enormous", or "mysterious" as long as the meaning is clear from context.`;
  return `The listener is ${age} years old. You may use a wider vocabulary and more complex sentence structures. The story should still be engaging, fun, and age-appropriate for a child.`;
}

function buildPrompt(input: StoryInput): { prompt: string; sceneCount: number } {
  const sceneCount = SCENE_COUNT[input.length] ?? 5;

  const arcGuide =
    sceneCount === 3
      ? [
          "Scene arc (3 scenes):",
          "  [1] OPENING — Begin with 'Once upon a time'. Paint the world and the hero warmly.",
          "       Describe where they live, what they love, what makes them special.",
          "       NO problem yet. Just wonder, warmth, and invitation into the world.",
          "  [2] The problem arrives and the hero must face it. A twist or surprise makes it harder.",
          "  [3] Hero acts cleverly or kindly to fix everything. Warm happy ending.",
        ].join("\n")
      : sceneCount === 5
        ? [
            "Scene arc (5 scenes):",
            "  [1] OPENING — Begin with 'Once upon a time'. Paint the world and the hero warmly.",
            "       Describe the setting (sights, sounds, smells), the hero's personality and daily life.",
            "       NO problem yet. This scene is pure atmosphere, wonder, and character introduction.",
            "  [2] The problem appears — something goes wrong, is missing, or is needed. Hero decides to act.",
            "  [3] Hero sets off and meets a helper OR hits an obstacle. Things get harder.",
            "  [4] TWIST — something unexpected happens. Hero almost fails.",
            "  [5] Hero finds a clever or kind solution. Problem solved. Happily ever after.",
          ].join("\n")
        : [
            "Scene arc (8 scenes):",
            "  [1] OPENING — Begin with 'Once upon a time'. Describe the world in rich, warm detail.",
            "       Who is the hero? Where do they live? What do they love? What makes them unique?",
            "       Make the reader fall in love with the character before anything happens.",
            "       NO problem yet. Pure warmth and wonder.",
            "  [2] The problem appears — something is stolen, broken, lost, or in danger.",
            "  [3] Hero decides to act and sets off on a journey.",
            "  [4] First obstacle — a tricky creature, a riddle, a locked gate.",
            "  [5] A helper appears and gives the hero something useful (a clue, a gift, advice).",
            "  [6] TWIST — hero makes a mistake or the villain strikes back. Things look bad.",
            "  [7] Hero uses what they learned and takes a brave final action.",
            "  [8] Everything is fixed. Celebration. Warm happily-ever-after closing.",
          ].join("\n");

  const prompt = [
    `Write a children's fairytale storybook with exactly ${sceneCount} scenes.`,
    "",
    arcGuide,
    "",
    "Story details:",
    `- Hero: ${input.characterName} — ${input.characterDescription}`,
    `- World / Setting: ${input.world.replace(/_/g, " ")}`,
    `- Genre: ${input.genre}`,
    `- Mood: ${input.mood}`,
    ...(input.fear
      ? [
          `- Fear to overcome: "${input.fear}"`,
          `  → Weave this into scene 3 or 4. Hero faces it, feels scared, then conquers it through a specific action. Warm and empowering resolution.`,
        ]
      : []),
    ...(input.inspiredBy
      ? [
          `- Inspiration: ${input.inspiredBy}`,
        ]
      : []),
    "",
    "CRITICAL RULES:",
    `- LANGUAGE: ${getAgeGuidance(input.listenerAge)}`,
    "- Scene 1 MUST begin with \"Once upon a time\" and be ONLY a warm introduction.",
    "  Describe the world (colours, sounds, smells) and the hero's personality and daily life.",
    "  Do NOT introduce any problem or conflict in scene 1.",
    "- Last scene MUST end with a happy, warm closing sentence.",
    "- Every scene must contain at least ONE concrete event or action — not just description.",
    "- The story MUST have a specific problem, a twist, and a specific solution.",
    "- No scene may be only about how beautiful or magical a place looks.",
    "- Each scene: 3–4 sentences. No bullet points. Only story prose.",
    "",
    "Return ONLY a valid JSON object with this exact structure.",
    "Do not use markdown fences. Do not include explanations.",
    "{",
    '  "title": "a specific, interesting story title (not just the hero name)",',
    '  "scenes": [',
    "    {",
    '      "text": "scene text (3-4 sentences, read-aloud fairytale voice, age-appropriate words)",',
    '      "imagePrompt": "detailed visual description for an AI image generator, whimsical vintage childrens book illustration style, warm colours"',
    "    }",
    "  ]",
    "}",
  ].join("\n");

  return { prompt, sceneCount };
}

function isRetryableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();

  return (
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("deadline exceeded") ||
    msg.includes("timeout") ||
    msg.includes("429") ||
    msg.includes("rate limit")
  );
}

function normalizeModelText(raw: string): string {
  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function extractJsonObject(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model did not return a valid JSON object.");
  }

  return text.slice(start, end + 1);
}

function validateStory(data: unknown, expectedSceneCount: number): GeneratedStory {
  if (!data || typeof data !== "object") {
    throw new Error("Story payload is not an object.");
  }

  const story = data as GeneratedStory;

  if (typeof story.title !== "string" || !story.title.trim()) {
    throw new Error("Story title is missing or invalid.");
  }

  if (!Array.isArray(story.scenes)) {
    throw new Error("Story scenes are missing or invalid.");
  }

  if (story.scenes.length !== expectedSceneCount) {
    throw new Error(
      `Expected ${expectedSceneCount} scenes, got ${story.scenes.length}.`
    );
  }

  for (const [index, scene] of story.scenes.entries()) {
    if (!scene || typeof scene !== "object") {
      throw new Error(`Scene ${index + 1} is invalid.`);
    }

    if (typeof scene.text !== "string" || !scene.text.trim()) {
      throw new Error(`Scene ${index + 1} text is missing.`);
    }

    if (typeof scene.imagePrompt !== "string" || !scene.imagePrompt.trim()) {
      throw new Error(`Scene ${index + 1} imagePrompt is missing.`);
    }
  }

  return story;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export async function generateStory(input: StoryInput): Promise<GeneratedStory> {
  const { prompt, sceneCount } = buildPrompt(input);
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`📡 Sending request to Gemini... (${attempt}/${MAX_RETRIES})`);

      const response = await withTimeout(
        ai.models.generateContent({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: STORYTELLER_SYSTEM_PROMPT,
            responseMimeType: "application/json",
          },
          contents: prompt,
        }),
        REQUEST_TIMEOUT_MS
      );

      const raw = response.text ?? "";
      console.log("📝 Gemini raw text:", raw);

      const cleaned = normalizeModelText(raw);
      const jsonText = extractJsonObject(cleaned);

      const parsed = JSON.parse(jsonText);
      return validateStory(parsed, sceneCount);
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Story generation failed on attempt ${attempt}:`, error);

      if (attempt < MAX_RETRIES && isRetryableError(error)) {
        const delay = INITIAL_DELAY_MS * 2 ** (attempt - 1);
        await sleep(delay);
        continue;
      }

      break;
    }
  }

  console.error("❌ Story generation failed after retries:", lastError);
  throw new Error(
    "The storyteller is a little busy right now. Please try again in a moment."
  );
}