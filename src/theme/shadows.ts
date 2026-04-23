// ============================================================
// 💫 TELL THE STORY — Shadow & Glow System
// React Native shadows + text shadows for magical glow effects
// ============================================================
import { Platform } from "react-native";

// ── Box Shadows (React Native) ────────────────────────────
export const Shadows = {
  none: {},

  soft: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },
    android: { elevation: 4 },
    default: {},
  }),

  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
    },
    android: { elevation: 10 },
    default: {},
  }),

  // Colored glow shadows
  glowPurple: Platform.select({
    ios: {
      shadowColor: "#A855F7",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
    default: {},
  }),

  glowBlue: Platform.select({
    ios: {
      shadowColor: "#3B82F6",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
    default: {},
  }),

  glowGold: Platform.select({
    ios: {
      shadowColor: "#FACC15",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 20,
    },
    android: { elevation: 14 },
    default: {},
  }),

  glowGreen: Platform.select({
    ios: {
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
    default: {},
  }),
} as const;

// ── Text Shadows ──────────────────────────────────────────
export const TextShadows = {
  none: {},

  // Dark outline — gives "storybook" text pop
  outline: {
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  outlineStrong: {
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  // Colored glows for headings
  glowGold: {
    textShadowColor: "rgba(250,204,21,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },

  glowPurple: {
    textShadowColor: "rgba(168,85,247,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },

  glowWhite: {
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
} as const;
