// ============================================================
// 🎨 CREATE STORY — Static data constants
// ============================================================

export const CREATE_STRINGS = {
  header: {
    title: "CREATE YOUR STORY",
    backArrow: "←",
  },
  button: {
    startStory: "START STORY",
  },
  sections: {
    world:       { emoji: "🌍", title: "1. Choose the World" },
    genre:       { emoji: "✨", title: "2. Choose a Genre" },
    mood:        { emoji: "😊", title: "3. Choose the Mood" },
    storyLength: { emoji: "⏳", title: "4. Choose Story Length" },
    listenerAge: { emoji: "🎂", title: "5. How Old Is the Listener?" },
    fear:        { emoji: "💛", title: "6. Any Fear to Overcome? (optional)" },
    inspiredBy:  { emoji: "✨", title: "7. Inspired By... (optional)" },
  },
  alerts: {
    errorTitle:   "Oops!",
    errorMessage: "Could not generate story. Please try again.",
  },
} as const;

export type GenreId = "fantasy" | "space" | "fairytale" | "adventure";
export type MoodId = "happy" | "scary" | "funny" | "magical";
export type LengthId = "short" | "medium" | "long";
export type WorldId =
  | "enchanted_forest"
  | "underwater"
  | "sky_kingdom"
  | "ancient_ruins";

export const AGE_GROUPS: { age: number; label: string; emoji: string }[] = [
  { age: 2,  label: "2+",  emoji: "👶" },
  { age: 4,  label: "4+",  emoji: "🧒" },
  { age: 6,  label: "6+",  emoji: "👧" },
  { age: 9,  label: "9+",  emoji: "🧑" },
];

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
    id: "fairy_tale",
    label: "Fairy Tale",
    image: require("@/assets/images/castle.png"),
  },
  {
    id: "fable",
    label: "Fable",
    image: require("@/assets/images/dragon.png"),
  },
  {
    id: "adventure",
    label: "Adventure",
    image: require("@/assets/images/card_adventure.png"),
  },
  {
    id: "bedtime",
    label: "Bedtime",
    image: require("@/assets/images/moon.png"),
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

export const FEARS: SelectOption[] = [
  { id: "dark",       label: "The Dark",       emoji: "🌑" },
  { id: "monsters",   label: "Monsters",       emoji: "👹" },
  { id: "thunder",    label: "Thunderstorms",  emoji: "⛈️" },
  { id: "alone",      label: "Being Alone",    emoji: "🥺" },
  { id: "dogs",       label: "Big Dogs",        emoji: "🐕" },
  { id: "heights",    label: "Heights",         emoji: "🏔️" },
  { id: "spiders",    label: "Spiders",         emoji: "🕷️" },
  { id: "water",      label: "Deep Water",      emoji: "🌊" },
  { id: "lost",       label: "Getting Lost",    emoji: "🗺️" },
  { id: "strangers",  label: "Strangers",       emoji: "🧍" },
];

export const FEARS_LABEL: Record<string, string> = Object.fromEntries(
  FEARS.map((f) => [f.id, f.label])
);

export const INSPIRATIONS: SelectOption[] = [
  // Classic fairy tales
  { id: "cinderella",     label: "Cinderella",        emoji: "👠", description: "Magic, kindness, and a glass slipper" },
  { id: "lion_king",      label: "The Lion King",     emoji: "🦁", description: "Courage, loss, and finding your destiny" },
  { id: "beauty_beast",   label: "Beauty & the Beast",emoji: "🌹", description: "Love sees past appearances" },
  { id: "little_mermaid", label: "The Little Mermaid",emoji: "🧜", description: "Dreams, longing, and the sea" },
  { id: "frozen",         label: "Frozen",            emoji: "❄️", description: "Sisterly love and letting go" },
  { id: "brave",          label: "Brave",             emoji: "🏹", description: "A fierce girl, a curse, and a mother's love" },
  { id: "moana",          label: "Moana",             emoji: "🌊", description: "The ocean, ancestry, and finding yourself" },
  { id: "spirited_away",  label: "Spirited Away",     emoji: "💉", description: "A mysterious spirit world and a brave girl" },
  { id: "pinocchio",      label: "Pinocchio",         emoji: "🪄", description: "Honesty, growing up, and becoming real" },
  { id: "jungle_book",    label: "The Jungle Book",   emoji: "🐺", description: "Wild friends, belonging, and home" },
  { id: "alice",          label: "Alice in Wonderland",emoji: "🎪", description: "Curiosity, nonsense, and magical madness" },
  { id: "peter_pan",      label: "Peter Pan",         emoji: "⭐", description: "Never growing up and the magic of imagination" },
  { id: "mulan",          label: "Mulan",             emoji: "🚔", description: "Honour, bravery, and proving yourself" },
  { id: "winnie_pooh",    label: "Winnie-the-Pooh",   emoji: "🍯", description: "Friendship, honey, and gentle adventures" },
  { id: "totoro",         label: "My Neighbor Totoro",emoji: "🌳", description: "Magical forest spirits and childhood wonder" },
];

export const INSPIRATIONS_PROMPTS: Record<string, string> = {
  cinderella:     "Draw inspiration from Cinderella: themes of kindness rewarded, magic transformation, and good triumphing over cruelty. Warm, hopeful tone.",
  lion_king:      "Draw inspiration from The Lion King: themes of courage, loss, identity, and destiny. Epic yet emotional tone.",
  beauty_beast:   "Draw inspiration from Beauty and the Beast: themes of looking beyond appearances, patience, and unexpected love. Enchanted castle atmosphere.",
  little_mermaid: "Draw inspiration from The Little Mermaid: themes of longing, dreams, and sacrifice. Underwater magic and adventure.",
  frozen:         "Draw inspiration from Frozen: themes of sisterly love, self-acceptance, and letting go of fear. Icy magical world.",
  brave:          "Draw inspiration from Brave: themes of independence, mother-daughter bonds, and breaking curses. Wild Scottish highlands feel.",
  moana:          "Draw inspiration from Moana: themes of self-discovery, ancestry, and the call of the ocean. Polynesian warmth and adventure.",
  spirited_away:  "Draw inspiration from Spirited Away: mysterious spirit world, transformation, and a brave child finding their way home. Dreamlike and magical.",
  pinocchio:      "Draw inspiration from Pinocchio: themes of honesty, temptation, and becoming truly real. Warm and morally meaningful.",
  jungle_book:    "Draw inspiration from The Jungle Book: themes of belonging, wild friendships, and the pull between two worlds. Lush jungle atmosphere.",
  alice:          "Draw inspiration from Alice in Wonderland: playful nonsense, curiosity, and magical impossible things. Whimsical and surprising.",
  peter_pan:      "Draw inspiration from Peter Pan: themes of imagination, not wanting to grow up, and the magic of childhood. Dreamy and adventurous.",
  mulan:          "Draw inspiration from Mulan: themes of honour, bravery, proving yourself, and family love. Determined and courageous tone.",
  winnie_pooh:    "Draw inspiration from Winnie-the-Pooh: gentle friendship, simple joys, and small cosy adventures. Soft, warm, and comforting.",
  totoro:         "Draw inspiration from My Neighbor Totoro: quiet wonder, magical forest spirits, childhood innocence, and gentle enchantment.",
};

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
