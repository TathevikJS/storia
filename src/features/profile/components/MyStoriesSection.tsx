import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { Radius, Spacing } from "@/src/theme/spacing";
import { PROFILE_LAYOUT } from "../constants/profile.constants";
import type { StoryCard } from "../types/profile.types";

type MyStoriesSectionProps = {
  stories: StoryCard[];
  onSeeAll?: () => void;
  onStoryPress?: (story: StoryCard) => void;
  onNewStory?: () => void;
};

/**
 * MyStoriesSection — Horizontal story card scroll with a "New Story" trailing card.
 */
export default function MyStoriesSection({
  stories,
  onSeeAll,
  onStoryPress,
  onNewStory,
}: MyStoriesSectionProps) {
  return (
    <View style={styles.wrapper}>
      {/* Section header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>MY STORIES</Text>
          <Text style={styles.titleEmoji}>⚡</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>See all</Text>
          <Text style={styles.seeAllArrow}> ›</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {stories.map((story) => (
          <LinearGradient
            key={story.id}
            colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.storyCardBorder}
          >
            <TouchableOpacity
              style={styles.storyCard}
              onPress={() => onStoryPress?.(story)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: story.imageUri }}
                style={styles.storyImage}
                resizeMode="cover"
              />
              {/* Gradient overlay */}
              <View style={styles.storyOverlay} />

              {/* Favourite star */}
              {story.isFavorite && (
                <View style={styles.favBadge}>
                  <Text style={styles.favStar}>⭐</Text>
                </View>
              )}

              {/* More dots */}
              <TouchableOpacity style={styles.moreDots}>
                <Text style={styles.moreDotsText}>⋯</Text>
              </TouchableOpacity>

              {/* Title + date */}
              <View style={styles.storyInfo}>
                <Text style={styles.storyTitle} numberOfLines={2}>
                  {story.title}
                </Text>
                <Text style={styles.storyDate}>{story.date}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        ))}

        {/* New Story card */}
        <TouchableOpacity
          style={styles.newStoryCard}
          onPress={onNewStory}
          activeOpacity={0.8}
        >
          <Text style={styles.newStoryPlus}>+</Text>
          <Text style={styles.newStoryLabel}>New Story</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing[3],
  },

  // ── Header ────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing[4],
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[1],
  },
  sectionTitle: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  titleEmoji: {
    fontSize: FontSize.lg,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.accent.magicPurple,
  },
  seeAllArrow: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.base,
    color: Colors.accent.magicPurple,
  },

  // ── Scroll ────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: Spacing[4],
    gap: Spacing[3],
    paddingBottom: Spacing[1],
  },

  // ── Story card ────────────────────────────────────────────
  storyCardBorder: {
    borderRadius: Radius.md,
    padding: 1.5,
    opacity: 0.85,
  },
  storyCard: {
    width: PROFILE_LAYOUT.storyCardWidth,
    height: PROFILE_LAYOUT.storyCardHeight,
    borderRadius: Radius.md - 1,
    overflow: "hidden",
    backgroundColor: Colors.bg.card,
  },
  storyImage: {
    ...StyleSheet.absoluteFillObject,
  },
  storyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  favBadge: {
    position: "absolute",
    top: Spacing[2],
    right: Spacing[2],
  },
  favStar: {
    fontSize: 16,
  },
  moreDots: {
    position: "absolute",
    bottom: Spacing[5] + 24,
    right: Spacing[2],
  },
  moreDotsText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1,
  },
  storyInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing[2],
    paddingBottom: Spacing[2],
    gap: 2,
  },
  storyTitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.text.primary,
    lineHeight: FontSize.xs * 1.4,
  },
  storyDate: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: 10,
    color: Colors.text.muted,
  },

  // ── New Story card ────────────────────────────────────────
  newStoryCard: {
    width: PROFILE_LAYOUT.storyCardWidth * 0.8,
    height: PROFILE_LAYOUT.storyCardHeight,
    borderRadius: Radius.md,
    backgroundColor: Colors.bg.card,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing[1],
  },
  newStoryPlus: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize["3xl"],
    color: Colors.text.muted,
  },
  newStoryLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.text.muted,
  },
});
