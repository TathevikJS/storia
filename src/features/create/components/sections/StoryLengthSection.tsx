import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, StoryLengthSteps } from "../ChooseSections";
import {
  STORY_LENGTHS,
  CREATE_STRINGS,
} from "../../constants/create.constants";

interface StoryLengthSectionProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function StoryLengthSection({
  selected,
  onSelect,
}: StoryLengthSectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.storyLength.emoji}
        title={CREATE_STRINGS.sections.storyLength.title}
      />
      <StoryLengthSteps
        options={STORY_LENGTHS}
        selected={selected}
        onSelect={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
