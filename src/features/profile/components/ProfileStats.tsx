import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { Radius, Spacing } from "@/src/theme/spacing";

type StatItem = {
  icon: string;
  value: string | number;
  label: string;
  onPress?: () => void;
  /** Optional action slot on the right side of the value */
  action?: React.ReactNode;
};

type ProfileStatsProps = {
  storiesCount: number;
  starCoins: number;
  dayStreak: number;
  dailyGiftsCount: number;
  onStarCoinsPress?: () => void;
  onDailyGiftsPress?: () => void;
};

/**
 * ProfileStats — 4-up stat grid: Stories · Star Coins · Day Streak · Daily Gifts.
 */
export default function ProfileStats({
  storiesCount,
  starCoins,
  dayStreak,
  dailyGiftsCount,
  onStarCoinsPress,
  onDailyGiftsPress,
}: ProfileStatsProps) {
  const stats: StatItem[] = [
    {
      icon: "📖",
      value: storiesCount,
      label: "Stories",
    },
    {
      icon: "⭐",
      value: starCoins,
      label: "Star Coins",
      onPress: onStarCoinsPress,
      action: (
        <TouchableOpacity onPress={onStarCoinsPress} style={styles.plusBtn}>
          <Text style={styles.plusBtnText}>+</Text>
        </TouchableOpacity>
      ),
    },
    {
      icon: "🔥",
      value: dayStreak,
      label: "Day Streak",
    },
    {
      icon: "🎁",
      value: dailyGiftsCount,
      label: "Daily Gifts",
      onPress: onDailyGiftsPress,
    },
  ];

  return (
    <LinearGradient
      colors={[Colors.accent.magicPurple, Colors.accent.brightBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.container}>
        {stats.map((stat, index) => (
          <TouchableOpacity
            key={stat.label}
            style={[
              styles.statCell,
              index < stats.length - 1 && styles.statCellBorder,
            ]}
            activeOpacity={stat.onPress ? 0.7 : 1}
            onPress={stat.onPress}
            disabled={!stat.onPress}
          >
            {/* Gift badge overlay */}
            {stat.label === "Daily Gifts" && dailyGiftsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{dailyGiftsCount}</Text>
              </View>
            )}

            <Text style={styles.icon}>{stat.icon}</Text>

            <View style={styles.valueRow}>
              <Text style={styles.value}>{stat.value}</Text>
              {stat.action}
            </View>

            <Text style={styles.label}>{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    marginTop: -50,
    marginHorizontal: Spacing[4],
    borderRadius: Radius.lg,
    padding: 1.5,
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(36, 10, 80, 0.90)",
    borderRadius: Radius.lg - 1,
    paddingVertical: Spacing[3],
  },
  statCell: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    position: "relative",
    paddingVertical: Spacing[1],
  },
  statCellBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.border.subtle,
  },
  icon: {
    fontSize: 26,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.xl,
    color: Colors.text.primary,
  },
  label: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.xs,
    color: Colors.text.muted,
    textAlign: "center",
  },
  plusBtn: {
    width: 18,
    height: 18,
    borderRadius: Radius.badge,
    backgroundColor: Colors.accent.neonViolet,
    alignItems: "center",
    justifyContent: "center",
  },
  plusBtnText: {
    fontFamily: FontFamily.headline,
    fontSize: 13,
    color: Colors.text.primary,
    lineHeight: 16,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: Radius.badge,
    backgroundColor: Colors.accent.magicPurple,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    zIndex: 5,
  },
  badgeText: {
    fontFamily: FontFamily.bodyBold,
    fontSize: 10,
    color: Colors.text.primary,
  },
});
