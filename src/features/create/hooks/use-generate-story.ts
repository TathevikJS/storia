// ============================================================
// 🪝 useGenerateStory — hook to trigger story generation
// ============================================================

import { useState } from "react";
import { generateStory } from "../services/gemini.service";
import type { GeneratedStory, StoryInput } from "../types/story.types";

interface UseGenerateStoryResult {
  generate: (input: StoryInput) => Promise<GeneratedStory | null>;
  isLoading: boolean;
  error: string | null;
}

export function useGenerateStory(): UseGenerateStoryResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (input: StoryInput): Promise<GeneratedStory | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const story = await generateStory(input);
      return story;
    } catch (err: any) {
      console.error("❌ Story generation failed:", err);
      setError(err?.message ?? "Something went wrong. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error };
}
