import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface CharacterCardProps {
  name: string;
  description: string;
  onEdit?: () => void;
}

const AVATAR_SIZE = 114;
const CARD_HEIGHT = 100;

export default function CharacterCard({
  name,
  description,
  onEdit,
}: CharacterCardProps) {
  return (
    <View style={styles.container}>
      {/* Card — sits at the bottom of the container */}
      <LinearGradient
        colors={["#2A0D66", "#1A0840"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Spacer for avatar column */}
        <View style={styles.avatarSpacer} />

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {/* Edit button */}
        <Pressable
          onPress={onEdit}
          style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.7 }]}
        >
          <LinearGradient
            colors={["#5B21B6", "#7C3AED"]}
            style={styles.editBtnGradient}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </LinearGradient>
        </Pressable>
      </LinearGradient>

      {/* Avatar — bottom flush with card bottom, top overflows above card */}
      <View style={styles.avatarWrapper}>
        <LinearGradient
          colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarRing}
        >
          <View style={styles.avatarInner}>
            <Image
              source={require("@/assets/images/character_default_avatar.png")}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: AVATAR_SIZE, // total height = avatar height; card is shorter inside
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: CARD_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border.glowPurple,
  },
  avatarSpacer: {
    width: AVATAR_SIZE + 4,
  },
  avatarWrapper: {
    position: "absolute",
    top: 0, // avatar top = container top → overflows above the card
    left: 10,
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
    zIndex: 10,
  },
  avatarRing: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    padding: 2.5,
  },
  avatarInner: {
    flex: 1,
    borderRadius: (AVATAR_SIZE - 5) / 2,
    overflow: "hidden",
    backgroundColor: Colors.bg.deep,
  },
  avatarImage: {
    width: "145%",
    height: "145%",
    position: "absolute",
    top: "-15%",
    left: "-22%",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.xl,
    color: Colors.text.primary,
  },
  dragonEmoji: {
    fontSize: 18,
  },
  description: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  editBtn: {
    borderRadius: 20,
    overflow: "hidden",
  },
  editBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    fontSize: 16,
  },
});
