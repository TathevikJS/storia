import SparkleIcon from "@/assets/svgs/sparkle_icon.svg";
import StarIcon from "@/assets/svgs/star_icon.svg";
import { Colors } from "@/src/theme/colors";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * SectionHeader — "Pick a Magic Start" title row.
 * Purely presentational, memoized.
 */
const SectionHeader = memo(function SectionHeader() {
  return (
    <View style={styles.row}>
      <StarIcon width={24} height={24} style={styles.icon} />
      <Text style={styles.title}> Pick a Magic Start </Text>
      <SparkleIcon width={24} height={24} style={styles.icon} />
    </View>
  );
});

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  icon: {
    transform: [{ rotate: "-15deg" }],
    marginRight: 6,
  },
  title: {
    fontFamily: "Chewy_400Regular",
    fontSize: 16,
    color: Colors.text.primary,
    transform: [{ rotate: "-2deg" }],
  },
});
