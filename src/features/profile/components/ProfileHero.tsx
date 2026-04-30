import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize, LetterSpacing } from "@/src/theme/typography";
import { Radius, Spacing } from "@/src/theme/spacing";
import { PROFILE_LAYOUT } from "../constants/profile.constants";
import type { ProfileUser } from "../types/profile.types";

import cloudsImg from "@/assets/images/clouds_profile.png";
import castleImg from "@/assets/images/castle1.png";
import moonImg from "@/assets/images/moon.png";
import StarIcon from "@/assets/svgs/star_icon.svg";
import SparkleIcon from "@/assets/svgs/sparkle_icon.svg";

const { width } = Dimensions.get("window");

type ProfileHeroProps = {
  user: ProfileUser;
  onEditAvatar?: () => void;
  onSettingsPress?: () => void;
};

/**
 * ProfileHero — Full hero section:
 * clouds BG · moon · castle (right) · avatar+glow · name/bio · title bar
 */
export default function ProfileHero({
  user,
  onEditAvatar,
  onSettingsPress,
}: ProfileHeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* ── Layer 1: clouds background ── */}
      <Image source={cloudsImg} style={styles.cloudsBg} resizeMode="cover" />

      {/* ── Layer 2: moon (top-right, behind castle) ── */}
      <Image source={moonImg} style={styles.moon} resizeMode="contain" />

      {/* ── Layer 3: castle (right side) ── */}
      <Image source={castleImg} style={styles.castle} resizeMode="contain" />

      {/* ── Bottom fade: multi-stop for a natural vignette-to-solid blend ── */}
      <LinearGradient
        colors={[
          "rgba(20, 25, 0, 0)",
          "rgba(3,0,25,0.18)",
          "rgba(3,0,25,0.52)",
          "rgba(3,0,25,0.82)",
          "rgba(3,0,25,0.96)",
          Colors.bg.hero,
        ]}
        locations={[0, 0.22, 0.48, 0.7, 0.88, 1]}
        style={styles.bottomFade}
        pointerEvents="none"
      />
      {/* ── Side vignettes to ground the scene edges ── */}
      <LinearGradient
        colors={[Colors.bg.hero, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.leftVignette}
        pointerEvents="none"
      />

      {/* ── Title bar row ── */}
      <View style={[styles.titleBar, { paddingTop: insets.top - Spacing[2] }]}>
        <View style={styles.titleRow}>
          <StarIcon width={28} height={28} style={styles.starIcon} />
          <Text style={styles.title}>YOUR PROFILE</Text>
          <SparkleIcon width={28} height={28} style={styles.sparkleIcon} />
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={onSettingsPress}
          activeOpacity={0.75}
          accessibilityLabel="Open settings"
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* ── Avatar + info row ── */}
      <View style={styles.contentRow}>
        {/* Avatar with glow ring */}
        <View style={styles.avatarCol}>
          <LinearGradient
            colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarRing}
          >
            <View style={styles.avatarInner}>
              <Image
                source={require("@/assets/images/character_default_avatar.png")}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.editBadge}
            onPress={onEditAvatar}
            activeOpacity={0.8}
            accessibilityLabel="Edit avatar"
          >
            <Text style={styles.editBadgeIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Name / subtitle / bio */}
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>{user.subtitle}</Text>
          </View>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
      </View>
    </View>
  );
}

const HERO_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: Colors.bg.hero,
    minHeight: HERO_HEIGHT,
    paddingBottom: Spacing[4],
  },

  // ── Background layers ──────────────────────────────────────
  cloudsBg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  moon: {
    position: "absolute",
    width: 200,
    height: 200,
    top: 10,
    left: 220,
  },
  castle: {
    position: "absolute",
    width: width * 0.4,
    height: HERO_HEIGHT * 0.75,
    right: -10,
    top: 75,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 110,
    zIndex: 2,
  },
  leftVignette: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 48,
    zIndex: 2,
  },

  // ── Title bar ──────────────────────────────────────────────
  titleBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[2],
    paddingBottom: Spacing[2],
    zIndex: 5,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[1],
  },
  starIcon: {
    transform: [{ rotate: "-15deg" }],
    marginRight: 4,
    marginTop: 4,
  },
  sparkleIcon: {
    marginLeft: 4,
    marginBottom: 4,
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
    backgroundColor: "rgba(42,13,102,0.75)",
    borderWidth: 1.5,
    borderColor: Colors.border.glowPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: FontSize.lg,
  },

  // ── Avatar + info ──────────────────────────────────────────
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing[4],
    gap: Spacing[3],
    zIndex: 5,
    // cap width so it doesn't overlap castle
    maxWidth: "75%",
  },
  avatarCol: {
    width: PROFILE_LAYOUT.avatarGlowSize,
    height: PROFILE_LAYOUT.avatarGlowSize,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
  },
  avatarRing: {
    width: PROFILE_LAYOUT.avatarGlowSize,
    height: PROFILE_LAYOUT.avatarGlowSize,
    borderRadius: PROFILE_LAYOUT.avatarGlowSize / 2,
    padding: 2.5,
  },
  avatarInner: {
    flex: 1,
    borderRadius: (PROFILE_LAYOUT.avatarGlowSize - 5) / 2,
    overflow: "hidden",
    backgroundColor: Colors.bg.deep,
  },
  avatar: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.5 }, { translateY: 15 }],
  },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: Radius.badge,
    backgroundColor: Colors.accent.neonViolet,
    borderWidth: 2,
    borderColor: Colors.bg.deep,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  editBadgeIcon: {
    fontSize: 13,
  },
  infoCol: {
    flex: 1,
    minWidth: 0,
    gap: Spacing[1],
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[1],
  },
  name: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize["2xl"],
    color: Colors.text.primary,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  nameEmoji: { fontSize: FontSize.lg },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subtitle: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.text.purple,
  },
  subtitleEmoji: { fontSize: FontSize.sm },
  bio: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: FontSize.sm * 1.55,
    marginTop: Spacing[1],
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
