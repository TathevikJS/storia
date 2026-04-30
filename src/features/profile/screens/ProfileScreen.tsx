import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";

import ProfileHero from "../components/ProfileHero";
import ProfileStats from "../components/ProfileStats";
import StarCoinsCard from "../components/StarCoinsCard";
import MyStoriesSection from "../components/MyStoriesSection";
import ProfileMenuList from "../components/ProfileMenuList";

import { MOCK_USER } from "../data/profile.data";
import type { ProfileMenuItemData, StoryCard } from "../types/profile.types";

/**
 * ProfileScreen — thin orchestrator.
 * Owns navigation logic; delegates all UI to focused child components.
 */
export default function ProfileScreen() {
  const router = useRouter();

  // ── Handlers ──────────────────────────────────────────────
  const handleSettings = useCallback(() => {
    // router.push("/settings");
  }, []);

  const handleGetFreeCoins = useCallback(() => {
    // router.push("/coins/earn");
  }, []);

  const handleSeeAllStories = useCallback(() => {
    // router.push("/stories");
  }, []);

  const handleStoryPress = useCallback((story: StoryCard) => {
    // router.push(`/stories/${story.id}`);
  }, []);

  const handleNewStory = useCallback(() => {
    router.push("/(tabs)/create");
  }, [router]);

  const handleMenuItemPress = useCallback((item: ProfileMenuItemData) => {
    // Route based on item.id
  }, []);

  // ── Render ────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1 — Hero: clouds bg, moon, castle, avatar, name, bio, title bar */}
        <ProfileHero user={MOCK_USER} onSettingsPress={handleSettings} />

        {/* 2 — Stats row */}
        <ProfileStats
          storiesCount={MOCK_USER.storiesCount}
          starCoins={MOCK_USER.starCoins}
          dayStreak={MOCK_USER.dayStreak}
          dailyGiftsCount={MOCK_USER.dailyGiftsCount}
          onStarCoinsPress={handleGetFreeCoins}
        />

        {/* 3 — Star coins promo banner */}
        <StarCoinsCard
          coins={MOCK_USER.starCoins}
          onGetFreeCoins={handleGetFreeCoins}
        />

        {/* 4 — My stories horizontal scroll */}
        <MyStoriesSection
          stories={MOCK_USER.stories}
          onSeeAll={handleSeeAllStories}
          onStoryPress={handleStoryPress}
          onNewStory={handleNewStory}
        />

        {/* 5 — Settings menu list */}
        <ProfileMenuList onItemPress={handleMenuItemPress} />

        {/* Bottom breathing room */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg.hero,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: Spacing[4],
    paddingTop: 0,
  },
  bottomSpacer: {
    height: Spacing[8],
  },
});
