// ============================================================
// 🎨 CREATE STORY — Static data constants
// ============================================================

export type GenreId = "fantasy" | "space" | "fairytale" | "adventure";
export type MoodId = "happy" | "scary" | "funny" | "magical";
export type LengthId = "short" | "medium" | "long";
export type WorldId =
  | "enchanted_forest"
  | "underwater"
  | "sky_kingdom"
  | "ancient_ruins";

export interface SelectOption {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  image?: any;
  stars?: number;
}

export const GENRES: SelectOption[] = [
  {
    id: "fantasy",
    label: "Fantasy",
    image: require("@/assets/images/castle.png"),
  },
  {
    id: "space",
    label: "Space",
    image: require("@/assets/images/card_adventure.png"),
  },
  {
    id: "fairytale",
    label: "Fairy Tale",
    image: require("@/assets/images/card_stories.png"),
  },
  {
    id: "adventure",
    label: "Adventure",
    image: require("@/assets/images/card_draw.png"),
  },
];

export const MOODS: SelectOption[] = [
  { id: "happy", label: "Happy", emoji: "😄" },
  { id: "scary", label: "Scary", emoji: "👻" },
  { id: "funny", label: "Funny", emoji: "🤣" },
  { id: "magical", label: "Magical", emoji: "🧙" },
];

export const STORY_LENGTHS: SelectOption[] = [
  { id: "short", label: "Short", stars: 1 },
  { id: "medium", label: "Medium", stars: 2 },
  { id: "long", label: "Long", stars: 3 },
];

export const WORLDS: SelectOption[] = [
  {
    id: "enchanted_forest",
    label: "Enchanted Forest",
    description:
      "A magical forest filled with glowing trees, fairy lights, and hidden creatures waiting to be discovered.",
    image: require("@/assets/images/card_draw.png"),
  },
  {
    id: "underwater",
    label: "Underwater",
    description:
      "Dive into a shimmering ocean kingdom where mermaids sing and ancient sea treasures lie buried in the deep.",
    image: require("@/assets/images/card_adventure.png"),
  },
  {
    id: "sky_kingdom",
    label: "Sky Kingdom",
    description:
      "A floating realm high above the clouds where castles drift on moonbeams and dragons soar freely.",
    image: require("@/assets/images/card_stories.png"),
  },
  {
    id: "ancient_ruins",
    label: "Ancient Ruins",
    description:
      "Explore crumbling temples and forgotten cities where powerful magic sleeps, waiting to be awakened.",
    image: require("@/assets/images/castle.png"),
  },
];
