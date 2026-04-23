import React, { memo } from "react";
import ParallaxBackground from "./ParallaxBackground";

/**
 * Renders the animated parallax background layer of the hero section.
 * Memoized — re-renders only when the parent forces it.
 */
const HeroBackground = memo(function HeroBackground() {
  return <ParallaxBackground />;
});

export default HeroBackground;
