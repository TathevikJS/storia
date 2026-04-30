import { Colors } from "@/src/theme/colors";
import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import castleImg from "@/assets/images/castle1.png";
import characterImg from "@/assets/images/character.png";
import cloudsImg from "@/assets/images/clouds1.png";
import dragonImg from "@/assets/images/dragon.png";
import frameImg from "@/assets/images/frame_real_transparent.png";
import moonImg from "@/assets/images/moon.png";

const { width } = Dimensions.get("window");

// ── Image sources ───────────────────────────────────────────────────────────
const IMAGES = {
  clouds: cloudsImg,
  castle: castleImg,
  frame: frameImg,
  character: characterImg,
  dragon: dragonImg,
  moon: moonImg,
} as const;

// ── Shared layer size ───────────────────────────────────────────────────────
const LAYER_H = 300;

/**
 * ParallaxBackground
 *
 * Optimisations applied:
 *  1. `useDerivedValue` — gyroscope x/y extracted once; all worklets just
 *     read `gx.value` / `gy.value` instead of accessing the sensor directly.
 *  2. Static layers (frame, character) use plain StyleSheet transforms —
 *     no `useAnimatedStyle` worklet, zero UI-thread overhead for them.
 *  3. zIndex values live in StyleSheet, not as inline object literals.
 *  4. `memo()` — re-renders only when the parent forces it.
 *  5. `flex: 1` on the container — parent (HeroSection) controls the height.
 */
const ParallaxBackground = memo(function ParallaxBackground() {
  const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE, { interval: 16 });

  // ── Derive tilt axes once for all worklets ──────────────────────────────
  const gx = useDerivedValue(() => gyroscope.sensor.value?.y ?? 0);
  const gy = useDerivedValue(() => gyroscope.sensor.value?.x ?? 0);

  // ── Animated layers ─────────────────────────────────────────────────────
  const cloudsStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(gx.value, [-2, 2], [-5, 5]) },
      { translateY: interpolate(gy.value, [-2, 2], [-5, 5]) },
    ],
  }));

  const castleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: 20 },
      { translateX: 135 },
      { scale: 0.5 },
      { translateX: interpolate(gx.value, [-2, 2], [-30, 30]) },
      { translateY: interpolate(gy.value, [-2, 2], [-15, 15]) },
    ],
  }));

  const dragonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: 20 },
      { translateY: -45 },
      { scale: 0.5 },
      { translateX: interpolate(gx.value, [-2, 2], [-45, 45]) },
      { translateY: interpolate(gy.value, [-2, 2], [-35, 35]) },
    ],
  }));

  const moonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: 170 },
      { translateY: -45 },
      { scale: 0.4 },
      { translateX: interpolate(gx.value, [-2, 2], [-20, 20]) },
      { translateY: interpolate(gy.value, [-2, 2], [-30, 30]) },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* z1 — Clouds: subtle drift */}
      <Animated.Image
        source={IMAGES.clouds}
        style={[styles.layer, styles.z1, cloudsStyle]}
        resizeMode="cover"
      />
      {/* z2 — Castle: medium parallax */}
      <Animated.Image
        source={IMAGES.moon}
        style={[styles.layer, styles.z2, moonStyle]}
        resizeMode="cover"
      />
      {/* z1 — Dragon: strong parallax */}
      <Animated.Image
        source={IMAGES.dragon}
        style={[styles.layer, styles.z3, dragonStyle]}
        resizeMode="cover"
      />
      {/* z1 — Moon: gentle parallax */}
      <Animated.Image
        source={IMAGES.castle}
        style={[styles.layer, styles.z5, castleStyle]}
        resizeMode="contain"
      />
      {/* z3 — Frame: static overlay */}
      <Animated.Image
        source={IMAGES.frame}
        style={[styles.layer, styles.z3, styles.frame]}
        resizeMode="cover"
      />
      {/* z4 — Character: static foreground */}
      <Animated.Image
        source={IMAGES.character}
        style={[styles.layer, styles.z6, styles.character]}
        resizeMode="cover"
      />
    </View>
  );
});

export default ParallaxBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: Colors.bg.parallax,
    alignItems: "center",
    justifyContent: "center",
  },
  // ── Shared base for every layer ──────────────────────────────────────────
  layer: {
    position: "absolute",
    width: width * 1.2,
    height: LAYER_H * 1.2,
  },
  // ── Static transforms (no worklet needed) ────────────────────────────────
  frame: {
    transform: [{ translateX: -5 }, { translateY: 10 }, { scale: 0.9 }],
  },
  character: {
    transform: [{ translateX: -35 }, { translateY: 35 }, { scale: 0.6 }],
  },
  // ── zIndex helpers (avoids inline object allocation on every render) ─────
  z1: { zIndex: 1 },
  z2: { zIndex: 2 },
  z3: { zIndex: 3 },
  z4: { zIndex: 4 },
  z5: { zIndex: 5 },
  z6: { zIndex: 6 },
});