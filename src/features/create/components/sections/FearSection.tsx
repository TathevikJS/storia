import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, FearPicker } from "../ChooseSections";
import { FEARS, CREATE_STRINGS } from "../../constants/create.constants";

interface FearSectionProps {
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export default function FearSection({ selected, onSelect }: FearSectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.fear.emoji}
        title={CREATE_STRINGS.sections.fear.title}
      />
      <FearPicker options={FEARS} selected={selected} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
