// ============================================================
// 📐 TELL THE STORY — Spacing & Layout Tokens
// ============================================================

// ── Spacing Scale ─────────────────────────────────────────
export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

// ── Border Radius ─────────────────────────────────────────
// Everything soft — rounded, friendly, game-like
export const Radius = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
  card: 28, // Cards: 28px
  button: 999, // Buttons: fully rounded pill
  input: 24, // Inputs: 24px
  badge: 999,
  icon: 16,
} as const;

// ── Z-Index ───────────────────────────────────────────────
export const ZIndex = {
  base: 0,
  card: 10,
  overlay: 50,
  modal: 100,
  toast: 200,
} as const;

// ── Layout ────────────────────────────────────────────────
export const Layout = {
  screenPaddingH: Spacing[5], // 20
  screenPaddingV: Spacing[4], // 16
  cardGap: Spacing[2], // 8
  sectionGap: Spacing[6], // 24
} as const;
