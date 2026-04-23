// ============================================================
// 🤖 Gemini story generation service
// ============================================================

import { ENV } from "@/src/config/env";
import { GoogleGenAI } from "@google/genai";
import type { GeneratedStory, StoryInput } from "../types/story.types";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

/** Map length id to number of scenes */
const SCENE_COUNT: Record<string, number> = {
  short: 3,
  medium: 5,
  long: 8,
};

function buildPrompt(input: StoryInput): string {
  const sceneCount = SCENE_COUNT[input.length] ?? 5;
  const lines = [
    `You are a creative children's story writer. Write an engaging, age-appropriate story with exactly ${sceneCount} scenes.`,
    "",
    "Story details:",
    `- Main character: ${input.characterName} - ${input.characterDescription}`,
    `- World / Setting: ${input.world.replace(/_/g, " ")}`,
    `- Genre: ${input.genre}`,
    `- Mood: ${input.mood}`,
    "",
    "Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):",
    "{",
    '  "title": "story title here",',
    '  "scenes": [',
    "    {",
    '      "text": "scene narrative text (2-4 sentences, child-friendly)",',
    '      "imagePrompt": "detailed visual description for an AI image generator, whimsical childrens book illustration style"',
    "    }",
    "  ]",
    "}",
  ];
  return lines.join("\n");
}

export async function generateStory(
  input: StoryInput,
): Promise<GeneratedStory> {
  const prompt = buildPrompt(input);

  console.log("📡 Sending request to Gemini...");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const raw = response.text ?? "";
  console.log("📝 Gemini raw text:", raw);

  // Strip potential markdown code fences
  const cleaned = raw.replace(/```json|```/g, "").trim();
  console.log("🧹 Cleaned JSON:", cleaned);

  const story: GeneratedStory = JSON.parse(cleaned);
  return story;
}
