import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CharacterCard from "./components/CharacterCard";
import {
  GenreGrid,
  MoodRow,
  SectionLabel,
  StoryLengthSteps,
  WorldGrid,
} from "./components/ChooseSections";
import {
  GENRES,
  MOODS,
  STORY_LENGTHS,
  WORLDS,
} from "./constants/create.constants";
import { useGenerateStory } from "./hooks/use-generate-story";

import SparkleIcon from "@/assets/svgs/sparkle_icon.svg";
import StarIcon from "@/assets/svgs/star_icon.svg";

export default function CreateScreen() {
  const router = useRouter();

  const [genre, setGenre] = useState("fantasy");
  const [mood, setMood] = useState("happy");
  const [length, setLength] = useState("medium");
  const [world, setWorld] = useState("enchanted_forest");

  const { generate, isLoading, error } = useGenerateStory();

  const handleStartStory = async () => {
    const story = await generate({
      characterName: "Noah",
      characterDescription:
        "A brave boy who loves adventures and helping friends.",
      genre,
      mood,
      world,
      length,
    });

    if (story) {
      // Navigate to stories tab and pass the generated story as a param
      router.push({
        pathname: "/(tabs)/stories",
        params: { story: JSON.stringify(story) },
      });
    } else {
      Alert.alert(
        "Oops!",
        error ?? "Could not generate story. Please try again.",
      );
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/create_bg.png")}
      style={[styles.root]}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        {/* ── SECTION 1 — Fixed header ──────────────────────── */}
        <View style={styles.header}>
          {/* Back + Title row */}
          <View style={styles.titleRow}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <LinearGradient
                colors={["#5B21B6", "#7C3AED"]}
                style={styles.backBtnGradient}
              >
                <Text style={styles.backArrow}>←</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.titleContainer}>
              <StarIcon width={24} height={24} />
              <Text style={styles.titleText}>CREATE YOUR STORY</Text>
              <SparkleIcon width={24} height={24} />
            </View>

            {/* Spacer to balance back button */}
            <View style={styles.backBtn} />
          </View>

          {/* Character card */}
          <View style={styles.characterCardWrapper}>
            <CharacterCard
              name="Noah"
              description="A brave boy who loves adventures and helping friends."
              onEdit={() => {}}
            />
          </View>
        </View>

        {/* ── SECTION 2 — Scrollable choices ───────────────────*/}
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. World */}
          <View style={styles.sectionBlock}>
            <SectionLabel emoji="🌍" title="1. Choose the World" />
            <WorldGrid options={WORLDS} selected={world} onSelect={setWorld} />
          </View>

          {/* 2. Genre */}
          <View style={styles.sectionBlock}>
            <SectionLabel emoji="✨" title="2. Choose a Genre" />
            <GenreGrid options={GENRES} selected={genre} onSelect={setGenre} />
          </View>

          {/* 3. Mood */}
          <View style={styles.sectionBlock}>
            <SectionLabel emoji="😊" title="3. Choose the Mood" />
            <MoodRow options={MOODS} selected={mood} onSelect={setMood} />
          </View>

          {/* 4. Story Length */}
          <View style={styles.sectionBlock}>
            <SectionLabel emoji="⏳" title="4. Choose Story Length" />
            <StoryLengthSteps
              options={STORY_LENGTHS}
              selected={length}
              onSelect={setLength}
            />
          </View>
        </ScrollView>

        {/* ── SECTION 3 — Fixed footer ──────────────────────── */}
        <View style={styles.footer}>
          <Pressable
            onPress={handleStartStory}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.startBtn,
              pressed && { opacity: 0.88, transform: [{ scale: 0.97 }] },
              isLoading && { opacity: 0.7 },
            ]}
          >
            <Image
              source={require("@/assets/images/button.png")}
              style={styles.startBtnImage}
              resizeMode="stretch"
            />
            {isLoading ? (
              <ActivityIndicator
                color="#FFFFFF"
                style={{ position: "absolute" }}
              />
            ) : (
              <Text style={styles.startBtnText}>START STORY</Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg.hero,
  },
  safe: {
    flex: 1,
  },

  // ── Header ────────────────────────────────────────────────
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  backBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: -2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  titleEmoji: {
    fontSize: 18,
  },
  titleText: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
    letterSpacing: 1,
    textShadowColor: Colors.accent.magicPurple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  characterCardWrapper: {},

  // ── Scrollable area ───────────────────────────────────────
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    gap: 20,
  },
  sectionBlock: {
    gap: 0,
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 2,
  },
  startBtn: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
  },
  startBtnImage: {
    width: "70%",
    height: 80,
  },
  startBtnText: {
    position: "absolute",
    fontFamily: FontFamily.button,
    fontSize: FontSize.xl,
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
