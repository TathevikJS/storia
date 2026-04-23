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
  /** Optional childhood fear to gently work through in the story */
  fear?: string;
  /** Age of the child listener, used to tune vocabulary difficulty */
  listenerAge: number;
  /** Optional famous story/cartoon to draw inspiration from */
  inspiredBy?: string;
}
