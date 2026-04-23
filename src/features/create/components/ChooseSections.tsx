import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { SelectOption } from "../constants/create.constants";

// ─── Section Label ────────────────────────────────────────────────────────────

interface SectionLabelProps {
  emoji: string;
  title: string;
}

export function SectionLabel({ emoji, title }: SectionLabelProps) {
  return (
    <View style={labelStyles.row}>
      <Text style={labelStyles.emoji}>{emoji}</Text>
      <Text style={labelStyles.title}>{title}</Text>
    </View>
  );
}

const labelStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  emoji: { fontSize: 20 },
  title: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.base,
    color: Colors.text.primary,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});

// ─── Genre Grid ───────────────────────────────────────────────────────────────

interface GenreGridProps {
  options: SelectOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export function GenreGrid({ options, selected, onSelect }: GenreGridProps) {
  return (
    <View style={gridStyles.row}>
      {options.map((opt) => {
        const isSelected = opt.id === selected;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onSelect(opt.id)}
            style={({ pressed }) => [
              gridStyles.cell,
              isSelected && gridStyles.cellGlow,
              pressed && { opacity: 0.85 },
            ]}
          >
            {/* Single stable tree — no conditional mounting, image never reloads */}
            <LinearGradient
              colors={
                isSelected
                  ? [Colors.accent.magicPurple, Colors.accent.brightBlue]
                  : ["transparent", "transparent"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[gridStyles.glowRing, { padding: isSelected ? 2 : 0 }]}
            >
              <View
                style={[
                  gridStyles.cellInner,
                  !isSelected && gridStyles.cellUnselected,
                ]}
              >
                <Image
                  source={opt.image}
                  style={gridStyles.image}
                  resizeMode="cover"
                />
                {isSelected && (
                  <View style={gridStyles.checkBadge}>
                    <Text style={gridStyles.checkText}>✓</Text>
                  </View>
                )}
                <Text style={gridStyles.label}>{opt.label}</Text>
              </View>
            </LinearGradient>
          </Pressable>
        );
      })}
    </View>
  );
}

const gridStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    flex: 1,
    borderRadius: 16,
  },
  cellGlow: {
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  glowRing: {
    borderRadius: 16,
    padding: 2,
  },
  cellInner: {
    borderRadius: 14,
    overflow: "hidden",
    paddingBottom: 8,
  },
  cellUnselected: {
    borderRadius: 16,
    overflow: "hidden",
    paddingBottom: 8,
    backgroundColor: "#1A0840",
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
  },
  glowRingHidden: {
    padding: 0,
    // transparent gradient acts as a plain border-less container
    opacity: 0,
  },
  hidden: {
    display: "none",
  },
  image: {
    width: "100%",
    height: 76,
  },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent.magicPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.text.primary,
    textAlign: "center",
    marginTop: 6,
  },
});

// ─── Mood Row ─────────────────────────────────────────────────────────────────

interface MoodRowProps {
  options: SelectOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export function MoodRow({ options, selected, onSelect }: MoodRowProps) {
  return (
    <View style={moodStyles.row}>
      {options.map((opt) => {
        const isSelected = opt.id === selected;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onSelect(opt.id)}
            style={({ pressed }) => [
              moodStyles.cell,
              isSelected && moodStyles.cellGlow,
              pressed && { opacity: 0.85 },
            ]}
          >
            {isSelected ? (
              <LinearGradient
                colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={moodStyles.glowRing}
              >
                <LinearGradient
                  colors={["#2A0D66", "#1A0840"]}
                  style={moodStyles.cellGradient}
                >
                  <Text style={moodStyles.emoji}>{opt.emoji}</Text>
                  <View style={moodStyles.checkSmall}>
                    <Text style={moodStyles.checkSmallText}>✓</Text>
                  </View>
                  <Text style={[moodStyles.label, moodStyles.labelSelected]}>
                    {opt.label}
                  </Text>
                </LinearGradient>
              </LinearGradient>
            ) : (
              <View style={moodStyles.cellUnselected}>
                <Text style={moodStyles.emoji}>{opt.emoji}</Text>
                <Text style={moodStyles.label}>{opt.label}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const moodStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    flex: 1,
    borderRadius: 16,
  },
  cellGlow: {
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  glowRing: {
    borderRadius: 16,
    padding: 2,
  },
  cellGradient: {
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 4,
  },
  cellUnselected: {
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 4,
    backgroundColor: "#1E0850",
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
  },
  emoji: { fontSize: 28 },
  checkSmall: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkSmallText: {
    color: Colors.accent.neonViolet,
    fontSize: 10,
    fontWeight: "800",
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  labelSelected: {
    color: Colors.text.primary,
    fontFamily: FontFamily.bodyBold,
  },
});

// ─── Story Length Steps ───────────────────────────────────────────────────────

interface StoryLengthStepsProps {
  options: SelectOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export function StoryLengthSteps({
  options,
  selected,
  onSelect,
}: StoryLengthStepsProps) {
  return (
    <View style={lengthStyles.track}>
      {options.map((opt, idx) => {
        const isSelected = opt.id === selected;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onSelect(opt.id)}
            style={({ pressed }) => [
              lengthStyles.segment,
              isSelected && lengthStyles.segmentGlow,
              pressed && { opacity: 0.85 },
            ]}
          >
            {isSelected ? (
              <LinearGradient
                colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={lengthStyles.glowRing}
              >
                <LinearGradient
                  colors={["#5B21B6", "#A855F7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={lengthStyles.segmentGradient}
                >
                  <Text style={lengthStyles.segmentLabel}>{opt.label}</Text>
                  <Text style={lengthStyles.stars}>
                    {"⭐".repeat(opt.stars ?? 1)}
                  </Text>
                  <View style={lengthStyles.checkBadge}>
                    <Text style={lengthStyles.checkText}>✓</Text>
                  </View>
                </LinearGradient>
              </LinearGradient>
            ) : (
              <View style={lengthStyles.segmentInner}>
                <Text style={lengthStyles.segmentLabel}>{opt.label}</Text>
                <Text style={lengthStyles.stars}>
                  {"⭐".repeat(opt.stars ?? 1)}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const lengthStyles = StyleSheet.create({
  track: {
    flexDirection: "row",
    backgroundColor: "#12053A",
    borderRadius: 50,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  segment: {
    flex: 1,
    borderRadius: 46,
  },
  segmentGlow: {
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  glowRing: {
    borderRadius: 46,
    padding: 2,
  },
  segmentGradient: {
    alignItems: "center",
    paddingVertical: 10,
    gap: 2,
    borderRadius: 44,
  },
  segmentInner: {
    alignItems: "center",
    paddingVertical: 10,
    gap: 2,
  },
  segmentLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
  },
  stars: { fontSize: 10 },
  checkBadge: {
    position: "absolute",
    top: 4,
    right: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    color: Colors.accent.neonViolet,
    fontSize: 10,
    fontWeight: "800",
  },
});

// ─── World Grid (same layout as GenreGrid) ────────────────────────────────────

export const WorldGrid = GenreGrid;
