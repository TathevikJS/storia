import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize, LetterSpacing } from "@/src/theme/typography";
import { Radius, Spacing } from "@/src/theme/spacing";
import cloudsImg from "@/assets/images/clouds1.png";

type ProfileHeaderProps = {
  onSettingsPress?: () => void;
};

/**
 * ProfileHeader — Top bar with clouds background, title + settings button.
 */
export default function ProfileHeader({ onSettingsPress }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Clouds background */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image source={cloudsImg} style={styles.cloudsBg} resizeMode="cover" />
      </View>

      {/* Left spacer to balance the layout */}
      <View style={styles.sideSlot} />

      {/* Center title */}
      <View style={styles.titleRow}>
        <Text style={styles.spark}>✨</Text>
        <Text style={styles.title}>YOUR PROFILE</Text>
        <Text style={styles.spark}>✨</Text>
      </View>

      {/* Right — settings button */}
      <View style={styles.sideSlot}>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={onSettingsPress}
          activeOpacity={0.75}
          accessibilityLabel="Open settings"
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing[4],
    paddingBottom: Spacing[2],
    overflow: "hidden",
  },
  cloudsBg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.35,
  },
  sideSlot: {
    width: 44,
    alignItems: "flex-end",
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing[1],
  },
  spark: {
    fontSize: FontSize.lg,
  },
  title: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize["2xl"],
    color: Colors.text.primary,
    letterSpacing: LetterSpacing.wider,
    textShadowColor: Colors.accent.magicPurple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.badge,
    backgroundColor: Colors.bg.card,
    borderWidth: 1.5,
    borderColor: Colors.border.glowPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: FontSize.lg,
  },
});
