import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, MoodRow } from "../ChooseSections";
import { MOODS, CREATE_STRINGS } from "../../constants/create.constants";

interface MoodSectionProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function MoodSection({ selected, onSelect }: MoodSectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.mood.emoji}
        title={CREATE_STRINGS.sections.mood.title}
      />
      <MoodRow options={MOODS} selected={selected} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
