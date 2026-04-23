import { Colors } from "@/src/theme/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { MagicCard } from "../types/magic-start.types";

type MagicCardItemProps = {
  card: MagicCard;
  onPress?: (id: string) => void;
};

/**
 * MagicCardItem — a single gradient card with border, illustration and labels.
 * - expo-image for lazy decode + fade-in
 * - memo'd: re-renders only when card data or onPress changes
 * - onPress is stable via useCallback in the parent
 */
const MagicCardItem = memo(function MagicCardItem({
  card,
  onPress,
}: MagicCardItemProps) {
  const handlePress = useCallback(() => onPress?.(card.id), [onPress, card.id]);

  return (
    <Pressable
      style={({ pressed }) => [styles.outer, pressed && styles.outerPressed]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={card.label.replace("\n", " ")}
    >
      {/* Gradient border */}
      <LinearGradient
        colors={card.borderGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >
        {/* Card body */}
        <LinearGradient
          colors={card.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card}
        >
          <Image
            source={card.image}
            style={styles.illustration}
            contentFit="cover"
            transition={{ duration: 300, effect: "cross-dissolve" }}
            priority="normal"
          />
          <Text style={styles.label}>{card.label}</Text>
          <Text style={styles.description}>{card.description}</Text>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
});

export default MagicCardItem;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  outerPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  border: {
    borderRadius: 20,
    padding: 1.5,
  },
  card: {
    borderRadius: 18,
    padding: 2,
    overflow: "hidden",
  },
  illustration: {
    width: "100%",
    height: 120,
    borderRadius: 18,
    marginBottom: 8,
  },
  label: {
    fontFamily: "FredokaOne_400Regular",
    fontSize: 13,
    color: Colors.text.primary,
    marginBottom: 4,
    lineHeight: 16,
  },
  description: {
    fontSize: 11,
    color: Colors.text.secondary,
    lineHeight: 14,
    marginBottom: 10,
  },
});
