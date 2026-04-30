import { ENV } from "@/src/config/env";
import { GoogleGenAI } from "@google/genai";
import type { GeneratedStory, StoryInput } from "../types/story.types";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

const SCENE_COUNT: Record<string, number> = {
  short: 3,
  medium: 5,
  long: 8,
};

const STORYTELLER_SYSTEM_PROMPT = `You are a master bedtime storyteller — in the tradition of the Brothers Grimm, Hans Christian Andersen, and Beatrix Potter.
Your stories feel like ones that have been told for a hundred years, passed from grandparent to grandchild beside a warm fire.
They are gentle, wise, full of wonder, and deeply satisfying to hear read aloud.

VOICE & STYLE
─────────────────────────────────────────────────────────────────────────────
Write in a warm, lyrical, read-aloud voice. Use flowing, musical sentences.
Use classic storytelling phrases naturally: "Once upon a time", "In a land far away",
"Now it happened that", "And so it was", "But little did they know",
"And from that day on", "They all lived happily ever after."
Paint the world with sensory detail — the smell of pine needles, the creak of a wooden door,
the warmth of candlelight, the sound of rain on cobblestones.
Give every character a distinct feeling — their hopes, their fears, their little habits.
The child listening must feel they are THERE, inside the story.

STORY STRUCTURE
─────────────────────────────────────────────────────────────────────────────
Every great bedtime story has these bones:

1. A WORLD WORTH ENTERING
   Open with atmosphere and wonder. Make the listener feel cosy and safe.
   Introduce the hero with warmth — we must love them before anything happens.

2. A PROBLEM THAT MATTERS
   Something is wrong, lost, stolen, broken, or feared.
   It must feel real and meaningful — not just a plot device.
   Classic problems: a stolen moon, a sleeping kingdom, a friend in danger,
   a child who is afraid of the dark, a gift that must be found, a promise to keep.

3. A JOURNEY WITH REAL OBSTACLES
   The hero sets out and things do NOT go easily.
   They meet tricky creatures (a sly fox, a grumpy troll, a mischievous sprite).
   They face riddles, locked gates, storms, temptations, wrong turns.
   They must TRY and FAIL before they succeed.

4. AN UNEXPECTED TURN
   Something surprises us. The villain had a reason. The magic works differently.
   An unlikely helper arrives. The simplest thing solves the hardest problem.

5. A EARNED, SATISFYING ENDING
   The hero solves everything through a SPECIFIC act of kindness, cleverness, or courage.
   Never vague. Never lucky. THEY did something.
   End with a warm, wise closing line that settles the listener into sleep.

SCENE WRITING RULES
─────────────────────────────────────────────────────────────────────────────
- Every scene must ADVANCE the story — something must happen.
- Write 5–7 rich, flowing sentences per scene. Not bullet points. Pure story prose.
- Use dialogue sparingly but naturally — one or two lines can bring a character to life.
- Vary sentence rhythm: some long and winding, some short and punchy for effect.
- End each scene on a gentle hook that makes the listener want to hear the next one.

WHAT TO NEVER DO
─────────────────────────────────────────────────────────────────────────────
- Never sound like an AI. Never sound like a list of plot events.
- Never write flat, generic sentences like "The hero was brave and faced the problem."
- Never summarise. SHOW everything through action, dialogue, and sensation.
- No cruelty, trauma, hopelessness, or frightening content beyond gentle tension.

The listener should drift toward sleep feeling: safe, full of wonder, and gently moved.`;


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
          "  [1] OPENING — 'Once upon a time…' Wrap the listener in the world. Describe the setting with warmth and sensory detail.",
          "       Introduce the hero with love — their personality, their little world, what they cherish.",
          "       End the scene with a quiet, cosy feeling. No problem yet.",
          "  [2] THE HEART — The problem arrives and shakes everything. The hero must act. Something goes wrong first.",
          "       Include a twist: an unexpected obstacle, a stranger's warning, a magic that misfires.",
          "  [3] THE RESOLUTION — Through a specific act of kindness, cleverness, or courage, the hero sets everything right.",
          "       The world feels changed and better. Close with a warm, wise final sentence that settles the listener.",
        ].join("\n")
      : sceneCount === 5
        ? [
            "Scene arc (5 scenes):",
            "  [1] OPENING — 'Once upon a time…' Paint the world in warm, sensory detail. Introduce the hero tenderly.",
            "       Their daily life, their personality, what they love. No problem yet — pure cosy atmosphere.",
            "  [2] THE CALL — The problem appears and the hero cannot ignore it. Something is wrong, lost, or in danger.",
            "       The hero decides — reluctantly or bravely — to act.",
            "  [3] THE JOURNEY — The hero sets out and meets the first real challenge.",
            "       A tricky creature, a riddle, a storm, a locked door. Things are harder than expected.",
            "  [4] THE TWIST — Something unexpected happens. A helper arrives from nowhere. A mistake is made.",
            "       The villain had a secret. The magic works differently. The hero must dig deeper than they knew.",
            "  [5] THE ENDING — The hero acts with heart. Everything is resolved in a specific, satisfying way.",
            "       Joy returns. Close with a beautiful final sentence that invites sleep.",
          ].join("\n")
        : [
            "Scene arc (8 scenes):",
            "  [1] OPENING — 'Once upon a time…' A rich, warm world. We fall in love with the hero before anything happens.",
            "  [2] THE PROBLEM — Something precious is lost, stolen, broken, or threatened. The stakes are clear and felt.",
            "  [3] THE DEPARTURE — The hero chooses to act. They leave what is familiar and enter the unknown.",
            "  [4] FIRST TRIAL — A creature, a riddle, a temptation. The hero tries and fails or only partly succeeds.",
            "  [5] THE HELPER — An unexpected ally appears — an old woman, a small animal, a talking tree.",
            "       They give the hero something: a clue, a gift, a truth they needed to hear.",
            "  [6] THE DARKEST MOMENT — Things look hopeless. The hero makes a mistake or the villain strikes back.",
            "       All seems lost. This is the emotional low point.",
            "  [7] THE TURNING — The hero remembers what they learned. They take one brave, specific, final action.",
            "  [8] THE ENDING — Everything is restored and more. The world is warmer for what happened.",
            "       Close with a final line that is wise, warm, and complete — like a lullaby ending.",
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
    "- Scene 1 MUST begin with \"Once upon a time\" — pure warmth and world-building, NO problem yet.",
    "- Every scene must contain at least ONE concrete event, action, or spoken line.",
    "- The story MUST have a specific problem, an unexpected twist, and a specific earned solution.",
    "- Write 5–7 flowing, read-aloud sentences per scene. Vary sentence length for rhythm.",
    "- Use classic fairy tale language naturally. Let the voice feel timeless and warm.",
    "- Dialogue is welcome — a single line from a character can bring a scene alive.",
    "- The last scene MUST end with a beautiful, complete closing sentence.",
    "- Never summarise. Never list. Only story prose.",
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