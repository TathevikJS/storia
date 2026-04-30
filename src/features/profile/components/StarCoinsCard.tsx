import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize, LetterSpacing } from "@/src/theme/typography";
import { Radius, Spacing } from "@/src/theme/spacing";

type StarCoinsCardProps = {
  coins: number;
  onGetFreeCoins?: () => void;
};

/**
 * StarCoinsCard — Treasure chest banner showing available coins + CTA.
 */
export default function StarCoinsCard({
  coins,
  onGetFreeCoins,
}: StarCoinsCardProps) {
  return (
    <LinearGradient
      colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.container}>
        {/* Subtle gradient bg */}
        <LinearGradient
          colors={["#2D0B6B", "#1A0850"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: Radius.lg - 1 }]}
        />

        {/* Treasure chest illustration */}
        <View style={styles.chestCol}>
          <Text style={styles.chestEmoji}>🪙</Text>
          <Text style={styles.chestBigEmoji}>📦</Text>
          <View style={styles.sparkleRow}>
            <Text style={styles.sparkle}>✨</Text>
            <Text style={styles.sparkle}>✨</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoCol}>
          <Text style={styles.title}>STAR COINS</Text>
          <View style={styles.coinsRow}>
            <Text style={styles.coinIcon}>⭐</Text>
            <Text style={styles.coinsValue}>{coins}</Text>
            <Text style={styles.available}>Available</Text>
          </View>
          <Text style={styles.description}>
            Create stories and unlock{"\n"}amazing rewards!
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={onGetFreeCoins}
          activeOpacity={0.8}
          accessibilityLabel="Get free star coins"
        >
          <LinearGradient
            colors={["transparent", "transparent"]}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.ctaText}>GET FREE COINS </Text>
          <Text style={styles.ctaStar}>⭐</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    marginHorizontal: Spacing[4],
    borderRadius: Radius.lg,
    padding: 1.5,
    shadowColor: Colors.accent.brightBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  container: {
    borderRadius: Radius.lg - 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[3],
    overflow: "hidden",
    gap: Spacing[2],
  },

  // ── Chest ─────────────────────────────────────────────────
  chestCol: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
  },
  chestBigEmoji: {
    fontSize: 44,
    marginTop: -8,
  },
  chestEmoji: {
    fontSize: 18,
    position: "absolute",
    top: -4,
    right: -2,
    zIndex: 2,
  },
  sparkleRow: {
    flexDirection: "row",
    gap: 2,
  },
  sparkle: {
    fontSize: 12,
  },

  // ── Info ──────────────────────────────────────────────────
  infoCol: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.base,
    color: Colors.text.primary,
    letterSpacing: LetterSpacing.wider,
  },
  coinsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  coinIcon: {
    fontSize: FontSize.base,
  },
  coinsValue: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.xl,
    color: Colors.text.primary,
  },
  available: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    marginLeft: 2,
  },
  description: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.xs,
    color: Colors.text.muted,
    lineHeight: FontSize.xs * 1.6,
  },

  // ── CTA ───────────────────────────────────────────────────
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.button,
    borderWidth: 2,
    borderColor: Colors.accent.magicPurple,
    gap: 4,
    minWidth: 120,
  },
  ctaText: {
    fontFamily: FontFamily.button,
    fontSize: FontSize.xs,
    color: Colors.text.primary,
    letterSpacing: LetterSpacing.wide,
  },
  ctaStar: {
    fontSize: 13,
  },
});
