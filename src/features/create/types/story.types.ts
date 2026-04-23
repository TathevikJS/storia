// ============================================================
// 📖 Story types — shared across the app
// ============================================================

export interface StoryScene {
  /** Scene narrative text */
  text: string;
  /** Prompt to use for image generation (Replicate / Flux) */
  imagePrompt: string;
}

export interface GeneratedStory {
  title: string;
  scenes: StoryScene[];
}

export interface StoryInput {
  characterName: string;
  characterDescription: string;
  genre: string;
  mood: string;
  world: string;
  /** "short" | "medium" | "long" */
  length: string;
}
