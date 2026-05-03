import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, InspiredByPicker } from "../ChooseSections";
import { INSPIRATIONS, CREATE_STRINGS } from "../../constants/create.constants";

interface InspiredBySectionProps {
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export default function InspiredBySection({
  selected,
  onSelect,
}: InspiredBySectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.inspiredBy.emoji}
        title={CREATE_STRINGS.sections.inspiredBy.title}
      />
      <InspiredByPicker
        options={INSPIRATIONS}
        selected={selected}
        onSelect={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
