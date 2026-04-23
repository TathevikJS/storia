// ============================================================
// 🌍 TELL THE STORY — i18n / Translation System
// ============================================================
// Lightweight translation helper — no external dependencies.
// To add a language: create translations/<lang>.ts and add it
// to the `translations` map below.
// ============================================================

import en, { TranslationKeys } from "./translations/en";

// ── Supported locales ─────────────────────────────────────
export type Locale = "en";

const translations: Record<Locale, TranslationKeys> = {
  en,
};

// ── Active locale (swap out for a context/state if needed) ─
let currentLocale: Locale = "en";

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

// ── Hook ──────────────────────────────────────────────────
export function useTranslation() {
  const t = translations[currentLocale];
  return { t, locale: currentLocale };
}

export default translations;
