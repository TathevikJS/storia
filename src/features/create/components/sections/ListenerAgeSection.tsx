import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, AgePicker } from "../ChooseSections";
import { AGE_GROUPS, CREATE_STRINGS } from "../../constants/create.constants";

interface ListenerAgeSectionProps {
  selected: number;
  onSelect: (value: number) => void;
}

export default function ListenerAgeSection({
  selected,
  onSelect,
}: ListenerAgeSectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.listenerAge.emoji}
        title={CREATE_STRINGS.sections.listenerAge.title}
      />
      <AgePicker ages={AGE_GROUPS} selected={selected} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
