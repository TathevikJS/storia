import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import SparkleIcon from "@/assets/svgs/sparkle_icon.svg";
import StarIcon from "@/assets/svgs/star_icon.svg";
import CharacterCard from "./CharacterCard";
import { CREATE_STRINGS } from "../constants/create.constants";

interface CreateHeaderProps {
  characterName: string;
  characterDescription: string;
  onEditHero: () => void;
}

export default function CreateHeader({
  characterName,
  characterDescription,
  onEditHero,
}: CreateHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
        >
          <LinearGradient
            colors={["#5B21B6", "#7C3AED"]}
            style={styles.backBtnGradient}
          >
            <Text style={styles.backArrow}>
              {CREATE_STRINGS.header.backArrow}
            </Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.titleContainer}>
          <StarIcon width={24} height={24} />
          <Text style={styles.titleText}>{CREATE_STRINGS.header.title}</Text>
          <SparkleIcon width={24} height={24} />
        </View>

        {/* Spacer to balance the back button */}
        <View style={styles.backBtn} />
      </View>

      <CharacterCard
        name={characterName}
        description={characterDescription}
        onEdit={onEditHero}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  titleText: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.xl,
    color: Colors.text.primary,
    letterSpacing: 1,
    textShadowColor: Colors.accent.magicPurple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
