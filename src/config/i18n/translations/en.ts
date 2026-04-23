// ============================================================
// 🌍 TELL THE STORY — English Translations
// ============================================================

const en = {
  heroSection: {
    startCreatingButton: "START CREATING ✨",
  },
  magicStartSection: {
    sectionTitle: "Pick a Magic Start",
    cards: {
      draw: {
        label: "DRAW YOUR\nHERO",
        description: "I'll turn your drawing into a real character!",
      },
      adventure: {
        label: "RANDOM\nADVENTURE",
        description: "Surprise me with a cool story!",
      },
      stories: {
        label: "MY\nSTORIES",
        description: "Go back & play again!",
      },
    },
  },
} as const;

export default en;
export type TranslationKeys = typeof en;
