import { useTranslation } from "@/src/config/i18n";
import { Colors } from "@/src/theme/colors";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { HERO_IMAGES, HERO_LAYOUT } from "../constants/hero.constants";

type HeroCtaButtonProps = {
  onPress?: () => void;
};

/**
 * The primary CTA button in the hero section.
 * Accepts an `onPress` handler so the parent controls navigation logic.
 * Memoized — re-renders only when `onPress` reference changes.
 */
const HeroCtaButton = memo(function HeroCtaButton({ onPress }: HeroCtaButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      style={({ pressed }) => [styles.wrapper, pressed && styles.wrapperPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t.heroSection.startCreatingButton}
    >
      <Image
        source={HERO_IMAGES.button}
        style={styles.image}
        contentFit="contain"
        priority="normal"
        transition={{ duration: 250, effect: "cross-dissolve" }}
      />
      <Text style={styles.label}>{t.heroSection.startCreatingButton}</Text>
    </Pressable>
  );
});

export default HeroCtaButton;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: HERO_LAYOUT.buttonImage.width,
    height: HERO_LAYOUT.buttonImage.height,
  },
  label: {
    position: "absolute",
    color: Colors.text.primary,
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: Colors.shadow.textDark,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
