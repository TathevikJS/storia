import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, WorldGrid } from "../ChooseSections";
import { WORLDS, CREATE_STRINGS } from "../../constants/create.constants";

interface WorldSectionProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function WorldSection({
  selected,
  onSelect,
}: WorldSectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.world.emoji}
        title={CREATE_STRINGS.sections.world.title}
      />
      <WorldGrid options={WORLDS} selected={selected} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
