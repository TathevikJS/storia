// ============================================================
// 🔠 TELL THE STORY — Typography System
// Headlines: Fredoka Bold
// Body: Nunito Medium/SemiBold
// Special: Chewy (magic titles), Baloo 2 (buttons)
// ============================================================

export const FontFamily = {
  // Primary headline — playful bold rounded
  headline: "Fredoka_700Bold",
  headlineMedium: "Fredoka_500Medium",
  headlineLight: "Fredoka_400Regular",

  // Body — friendly and readable
  body: "Nunito_600SemiBold",
  bodyMedium: "Nunito_500Medium",
  bodyRegular: "Nunito_400Regular",
  bodyBold: "Nunito_700Bold",
  bodyBlack: "Nunito_900Black",

  // Special — magic/story titles
  magic: "Chewy_400Regular",

  // Buttons
  button: "Baloo2_700Bold",

  // Legacy
  brand: "Montserrat_800ExtraBold",
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 34,
  "5xl": 40,
  "6xl": 48,
} as const;

export const LineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

// ── Pre-built text styles ──────────────────────────────────
export const TextStyles = {
  // Titles
  heroTitle: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize["5xl"],
    letterSpacing: LetterSpacing.wide,
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontFamily: FontFamily.magic,
    fontSize: FontSize.xl,
    letterSpacing: LetterSpacing.normal,
    color: "#F8E8FF",
  },
  cardTitle: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.base,
    letterSpacing: LetterSpacing.wide,
    color: "#FFFFFF",
    lineHeight: FontSize.base * LineHeight.tight,
  },

  // Body
  bodyLarge: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.lg,
    color: "rgba(255,255,255,0.85)",
  },
  bodySmall: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.75)",
    lineHeight: FontSize.sm * LineHeight.normal,
  },

  // Button
  buttonLabel: {
    fontFamily: FontFamily.button,
    fontSize: FontSize.lg,
    letterSpacing: LetterSpacing.wide,
    color: "#FFFFFF",
  },

  // Badge / Label
  badge: {
    fontFamily: FontFamily.bodyBold,
    fontSize: FontSize.xs,
    letterSpacing: LetterSpacing.widest,
    color: "#FACC15",
  },
} as const;
