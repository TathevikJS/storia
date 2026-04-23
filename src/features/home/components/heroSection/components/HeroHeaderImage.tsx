import { Image } from "expo-image";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { HERO_IMAGES, HERO_LAYOUT } from "../constants/hero.constants";

/**
 * The decorative header image that sits on top of the parallax background.
 * Uses expo-image for:
 *  - async decoding (non-blocking UI thread)
 *  - native disk/memory caching
 *  - smooth fade-in via `transition`
 * Memoized — purely presentational, no local state.
 */
const HeroHeaderImage = memo(function HeroHeaderImage() {
  return (
    <Image
      source={HERO_IMAGES.header}
      style={styles.image}
      contentFit="contain"
      priority="high"
      transition={{ duration: 300, effect: "cross-dissolve" }}
    />
  );
});

export default HeroHeaderImage;

const styles = StyleSheet.create({
  image: {
    width: HERO_LAYOUT.headerImage.width,
    height: HERO_LAYOUT.headerImage.height,
    marginLeft: HERO_LAYOUT.headerImage.marginLeft,
    marginTop: HERO_LAYOUT.headerImage.marginTop,
  },
});
