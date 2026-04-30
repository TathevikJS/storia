import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { Radius, Spacing } from "@/src/theme/spacing";
import { PROFILE_MENU_ITEMS } from "../data/profile.data";
import type { ProfileMenuItemData } from "../types/profile.types";

type ProfileMenuListProps = {
  onItemPress?: (item: ProfileMenuItemData) => void;
};

/**
 * ProfileMenuList — Grouped menu rows: coins, history, favourites, settings.
 */
export default function ProfileMenuList({ onItemPress }: ProfileMenuListProps) {
  return (
    <LinearGradient
      colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.container}>
        {PROFILE_MENU_ITEMS.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => onItemPress?.(item)}
              activeOpacity={0.75}
              accessibilityLabel={item.label}
            >
              {/* Icon */}
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: item.iconBgColor + "33" },
                ]}
              >
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              {/* Text */}
              <View style={styles.textCol}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>

              {/* Chevron */}
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* Divider — skip after last */}
            {index < PROFILE_MENU_ITEMS.length - 1 && (
              <View style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    marginHorizontal: Spacing[4],
    borderRadius: Radius.lg,
    padding: 1.5,
    // Elevation shadow — creates the "floating forward" depth
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 16,
  },
  container: {
    // Semi-transparent glass — darker than card, lighter than deep
    backgroundColor: "rgba(30, 8, 60, 0.82)",
    borderRadius: Radius.lg - 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    gap: Spacing[3],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.icon,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.text.primary,
  },
  description: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.sm,
    color: Colors.text.muted,
  },
  chevron: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.xl,
    color: Colors.text.muted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginHorizontal: Spacing[4],
  },
});
