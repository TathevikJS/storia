import React from "react";
import { View, StyleSheet } from "react-native";
import { SectionLabel, GenreGrid } from "../ChooseSections";
import { GENRES, CREATE_STRINGS } from "../../constants/create.constants";

interface GenreSectionProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function GenreSection({
  selected,
  onSelect,
}: GenreSectionProps) {
  return (
    <View style={styles.block}>
      <SectionLabel
        emoji={CREATE_STRINGS.sections.genre.emoji}
        title={CREATE_STRINGS.sections.genre.title}
      />
      <GenreGrid options={GENRES} selected={selected} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 0 },
});
