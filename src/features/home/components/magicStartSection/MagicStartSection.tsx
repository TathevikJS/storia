import SparkleIcon from "@/assets/svgs/sparkle_icon.svg";
import StarIcon from "@/assets/svgs/star_icon.svg";
import { useTranslation } from "@/src/config/i18n";
import { Colors } from "@/src/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MAGIC_CARDS } from "./constants/magic-start.constants";

export default function MagicStartSection() {
  const { t } = useTranslation();
  const cards = t.magicStartSection.cards;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <StarIcon width={32} height={32} style={styles.starIcon} />
        <Text style={styles.headerText}>
          {" "}
          {t.magicStartSection.sectionTitle}{" "}
        </Text>
        <SparkleIcon width={32} height={32} style={styles.sparkleIcon} />
      </View>
      <View style={styles.cardsRow}>
        {MAGIC_CARDS.map((card) => {
          const copy = cards[card.id as keyof typeof cards];
          return (
            <Pressable
              key={card.id}
              style={({ pressed }) => [
                styles.cardOuter,
                pressed && styles.cardPressed,
              ]}
            >
              <LinearGradient
                colors={card.borderGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardBorderGradient}
              >
                <LinearGradient
                  colors={card.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.card}
                >
                  <Image
                    source={card.image}
                    style={styles.illustrationImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.cardLabel}>{copy.label}</Text>
                  <Text
                    style={[
                      styles.cardDescription,
                      { color: card.descriptionColor },
                    ]}
                  >
                    {copy.description}
                  </Text>
                </LinearGradient>
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 2 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  starIcon: { transform: [{ rotate: "-15deg" }], marginTop: 8 },
  sparkleIcon: { marginBottom: 8 },
  headerText: {
    fontFamily: "Chewy_400Regular",
    fontSize: 16,
    transform: [{ rotate: "-2deg" }],
    color: Colors.text.primary,
  },
  wavyText: { fontSize: 18, color: Colors.text.purple },
  cardsRow: { flexDirection: "row", gap: 8 },
  cardOuter: { flex: 1, borderRadius: 20, overflow: "hidden" },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },
  cardBorderGradient: { borderRadius: 20, padding: 1.5 },
  card: {
    borderRadius: 18,
    padding: 2,
    overflow: "hidden",
  },
  illustrationImage: {
    width: "100%",
    height: 120,
    borderRadius: 18,
    marginBottom: 8,
  },
  cardLabel: {
    fontFamily: "FredokaOne_400Regular",
    fontSize: 13,
    color: Colors.text.primary,
    marginTop: 0,
    marginBottom: 4,
    lineHeight: 16,
    marginHorizontal: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: Colors.text.secondary,
    lineHeight: 14,
    marginBottom: 10,
    marginHorizontal: 4,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "700",
  },
});
