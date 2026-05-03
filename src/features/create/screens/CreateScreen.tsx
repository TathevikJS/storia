import { Colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeroModal from "../components/HeroModal";
import CreateHeader from "../components/CreateHeader";
import StartStoryButton from "../components/StartStoryButton";
import WorldSection from "../components/sections/WorldSection";
import GenreSection from "../components/sections/GenreSection";
import MoodSection from "../components/sections/MoodSection";
import StoryLengthSection from "../components/sections/StoryLengthSection";
import ListenerAgeSection from "../components/sections/ListenerAgeSection";
import FearSection from "../components/sections/FearSection";
import InspiredBySection from "../components/sections/InspiredBySection";

import {
  FEARS_LABEL,
  INSPIRATIONS_PROMPTS,
  CREATE_STRINGS,
} from "../constants/create.constants";
import { useGenerateStory } from "../hooks/use-generate-story";

export default function CreateScreen() {
  const router = useRouter();

  // ── Hero ──────────────────────────────────────────────────
  const [characterName, setCharacterName] = useState("Aria");
  const [characterDescription, setCharacterDescription] = useState(
    "A brave princess who loves adventure.",
  );
  const [heroModalVisible, setHeroModalVisible] = useState(false);

  // ── Story options ─────────────────────────────────────────
  const [world, setWorld] = useState("enchanted_forest");
  const [genre, setGenre] = useState("fairy_tale");
  const [mood, setMood] = useState("happy");
  const [length, setLength] = useState("medium");
  const [listenerAge, setListenerAge] = useState(4);
  const [fear, setFear] = useState<string | null>(null);
  const [inspiredBy, setInspiredBy] = useState<string | null>(null);

  const { generate, isLoading, error } = useGenerateStory();

  // ── Actions ───────────────────────────────────────────────
  const handleStartStory = async () => {
    const story = await generate({
      characterName,
      characterDescription,
      genre,
      mood,
      world,
      length,
      fear: fear ? FEARS_LABEL[fear] : undefined,
      listenerAge,
      inspiredBy: inspiredBy ? INSPIRATIONS_PROMPTS[inspiredBy] : undefined,
    });

    if (story) {
      router.push({
        pathname: "/(tabs)/stories",
        params: { story: JSON.stringify(story) },
      });
    } else {
      Alert.alert(
        CREATE_STRINGS.alerts.errorTitle,
        error ?? CREATE_STRINGS.alerts.errorMessage,
      );
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        {/* ── Fixed header ──────────────────────────────────── */}
        <CreateHeader
          characterName={characterName}
          characterDescription={characterDescription}
          onEditHero={() => setHeroModalVisible(true)}
        />

        {/* ── Scrollable story options ──────────────────────── */}
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <WorldSection selected={world} onSelect={setWorld} />
          <GenreSection selected={genre} onSelect={setGenre} />
          <MoodSection selected={mood} onSelect={setMood} />
          <StoryLengthSection selected={length} onSelect={setLength} />
          <ListenerAgeSection
            selected={listenerAge}
            onSelect={setListenerAge}
          />
          <FearSection selected={fear} onSelect={setFear} />
          <InspiredBySection selected={inspiredBy} onSelect={setInspiredBy} />

          <StartStoryButton onPress={handleStartStory} isLoading={isLoading} />
        </ScrollView>

        {/* ── Hero editor modal ─────────────────────────────── */}
        <HeroModal
          visible={heroModalVisible}
          initialName={characterName}
          initialDescription={characterDescription}
          onSave={(name, desc) => {
            setCharacterName(name);
            setCharacterDescription(desc);
            setHeroModalVisible(false);
          }}
          onSkip={() => setHeroModalVisible(false)}
          onClose={() => setHeroModalVisible(false)}
        />
      </SafeAreaView>
    </View>
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
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 20,
  },
});
