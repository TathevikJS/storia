import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
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
      colors={[
        "rgba(109,40,217,0.95)",
        "rgba(29,78,216,0.85)",
        "rgba(126,34,206,0.9)",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <BlurView intensity={100} tint="dark" style={styles.blurContainer}>
        {/* Top inner highlight — glass reflection */}
        <LinearGradient
          colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0.0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.innerHighlight}
          pointerEvents="none"
        />
        <View style={styles.container}>
          {/* Right side decorative background */}
          <View style={styles.rightBgWrapper} pointerEvents="none">
            <Image
              source={require("@/assets/images/coins_section_right_bg.png")}
              style={styles.rightBg}
              resizeMode="contain"
            />
          </View>
          {/* Treasure chest illustration */}
          <View style={styles.chestCol}>
            <Image
              source={require("@/assets/images/treasures4.png")}
              style={styles.chestImage}
              resizeMode="contain"
            />
          </View>

          {/* Info */}
          <View style={styles.infoCol}>
            <Text style={styles.title}>STAR COINS</Text>
            <View style={styles.coinsRow}>
              <Text style={styles.coinIcon}>⭐</Text>
              <Text style={styles.coinsValue}>{coins}</Text>
            </View>
            <Text style={styles.description}>
              Unlock amazing rewards!
            </Text>
          </View>

          {/* CTA */}
          <TouchableOpacity
            onPress={onGetFreeCoins}
            activeOpacity={0.8}
            accessibilityLabel="Get free star coins"
            style={styles.ctaGlow}
          >
            {/* Outer glow border */}
            <LinearGradient
              colors={["#C4B5FD", "#60A5FA", "#818CF8", "#7C3AED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaBorderGradient}
            >
              {/* Dark pill interior */}
              <View style={styles.ctaInner}>
                <Text style={styles.ctaText}>GET FREE COINS</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    marginHorizontal: Spacing[4],
    borderRadius: Radius.lg,
    padding: 1.5,
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 12,
  },
  blurContainer: {
    borderRadius: Radius.lg - 1,
    overflow: "hidden",
  },
  innerHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: Radius.lg - 1,
    borderTopRightRadius: Radius.lg - 1,
    zIndex: 1,
  },
  container: {
    borderRadius: Radius.lg - 1,
    paddingRight: Spacing[4],
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    gap: Spacing[2],
    backgroundColor: "rgba(12, 3, 40, 0.85)",
  },

  // ── Right bg ───────────────────────────────────────────────
  rightBgWrapper: {
    position: "absolute",
    right: -Spacing[3],
    top: 0,
    bottom: 0,
    width: 120,
    zIndex: 1,
  },
  rightBg: {
    width: "100%",
    height: "100%",
  },

  // ── Chest ─────────────────────────────────────────────────
  chestCol: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
  },
  chestImage: {
    width: 140,
    height: 90,
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
    fontSize: FontSize.md,
    color: Colors.text.primary,
    letterSpacing: LetterSpacing.wider,
  },
  coinsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  coinIcon: {
    fontSize: FontSize.sm,
  },
  coinsValue: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.md,
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
  ctaGlow: {
    shadowColor: "#60A5FA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 14,
    borderRadius: 50,
    zIndex: 1
  },
  ctaBorderGradient: {
    borderRadius: 50,
    padding: 2,
  },
  ctaInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(4, 3, 28, 0.95)",
    borderRadius: 48,
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    gap: 6,
  },
  ctaText: {
    fontFamily: FontFamily.button,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
    letterSpacing: LetterSpacing.wider,
  },
  ctaStar: {
    fontSize: 16,
  },
});
