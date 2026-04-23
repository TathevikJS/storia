import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/src/theme/colors";
import HeroBackground from "./components/HeroBackground";
import HeroCtaButton from "./components/HeroCtaButton";
import HeroHeaderImage from "./components/HeroHeaderImage";
import { HERO_LAYOUT } from "./constants/hero.constants";

type HeroSectionProps = {
  onStartCreating?: () => void;
};

/**
 * HeroSection — thin orchestrator.
 * Parallax is gyroscope-driven (see ParallaxBackground), so no ScrollView needed.
 */
export default function HeroSection({ onStartCreating }: HeroSectionProps) {
  const insets = useSafeAreaInsets();

  const handleStartCreating = useCallback(() => {
    onStartCreating?.();
  }, [onStartCreating]);

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          paddingTop: insets.top,
        },
      ]}
    >
      {/* Layer 1 – Parallax background */}
      <View style={StyleSheet.absoluteFill}>
        <HeroBackground />
      </View>

      {/* Layer 2 – Decorative header image */}
      <View style={styles.headerImageContainer}>
        <HeroHeaderImage />
      </View>

      {/* Layer 3 – CTA button */}
      <View style={styles.ctaContainer}>
        <HeroCtaButton onPress={handleStartCreating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg.hero,
    overflow: "hidden",
    zIndex: 0,
  },
  headerImageContainer: {
    position: "absolute",
    left: HERO_LAYOUT.svgContainer.left,
    top: HERO_LAYOUT.svgContainer.top,
    zIndex: 5,
  },
  ctaContainer: {
    position: "absolute",
    left: HERO_LAYOUT.buttonContainer.left,
    top: HERO_LAYOUT.buttonContainer.top,
    zIndex: 5,
    transform: [{ rotate: "-3deg" }],
  },
});
