// ============================================================
// 🎨 TELL THE STORY — Brand Color Palette
// Theme: Fantasy + Wonder + Neon Magic + Cozy Adventure
// ============================================================

export const Colors = {
  // ── Backgrounds ──────────────────────────────────────────
  bg: {
    main: "#0A0320",     // Main dark background
    deep: "#18053A",     // Deep purple layer
    card: "#2A0D66",     // Card background
    darkBlue: "#12205F", // Secondary dark blue
    hero: "#030019",     // Deepest — hero section & screen root
    parallax: "#0a0520", // Parallax background scene
  },

  // ── Accents ───────────────────────────────────────────────
  accent: {
    magicPurple: "#A855F7",
    neonViolet: "#7C3AED",
    brightBlue: "#3B82F6",
    gold: "#FACC15",
    orangeGlow: "#F59E0B",
    mintSuccess: "#10B981",
  },

  // ── Text ──────────────────────────────────────────────────
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255,255,255,0.75)",
    muted: "rgba(255,255,255,0.45)",
    gold: "#FACC15",
    purple: "#C084FC",
  },

  // ── Borders ───────────────────────────────────────────────
  border: {
    subtle: "rgba(255,255,255,0.12)",
    glowPurple: "rgba(168,85,247,0.5)",
    glowBlue: "rgba(59,130,246,0.5)",
    glowGold: "rgba(250,204,21,0.5)",
  },

  // ── Shadows ───────────────────────────────────────────────
  shadow: {
    textDark: "rgba(0,0,0,0.4)",
  },

  // ── Gradients ─────────────────────────────────────────────
  gradient: {
    cta:        ["#7C3AED", "#A855F7", "#3B82F6"] as [string, string, string],
    titleText:  ["#FACC15", "#F59E0B"] as [string, string],
    blueCard:   ["#3B82F6", "#1D4ED8"] as [string, string],
    purpleCard: ["#A855F7", "#7C3AED"] as [string, string],
    greenCard:  ["#10B981", "#047857"] as [string, string],
  },

  // ── Magic Start card gradients ────────────────────────────
  // Each card owns its full gradient set so data and theme stay in one place.
  cardGradient: {
    draw: {
      main:         ["#4A8DFF", "#1E56D6", "#123AAE"] as [string, string, string],
      illustration: ["#8FC5FF", "#4A8DFF"] as [string, string],
      border:       ["#8BC5FF", "#4A8DFF", "#123AAE"] as [string, string, string],
      arrow:        "#0E3EAF",
    },
    adventure: {
      main:         ["#C14CFF", "#8B2BE2", "#5B189F"] as [string, string, string],
      illustration: ["#E18BFF", "#A855F7"] as [string, string],
      border:       ["#F0B3FF", "#C14CFF", "#5B189F"] as [string, string, string],
      arrow:        "#4B117F",
    },
    stories: {
      main:         ["#25C7B8", "#0E9F93", "#066B6F"] as [string, string, string],
      illustration: ["#73E6D7", "#20B8A8"] as [string, string],
      border:       ["#A0F0E5", "#25C7B8", "#066B6F"] as [string, string, string],
      arrow:        "#075B5F",
    },
  },
} as const;
