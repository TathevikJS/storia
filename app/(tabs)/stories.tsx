import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { GeneratedStory } from "@/src/features/create/types/story.types";

export default function StoriesScreen() {
  const { story } = useLocalSearchParams<{ story?: string }>();

  const parsed: GeneratedStory | null = story ? JSON.parse(story) : null;

  if (!parsed) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>✨ No story yet.</Text>
        <Text style={styles.emptySubtext}>Go to Create and generate your first story!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{parsed.title}</Text>

      {parsed.scenes.map((scene, index) => (
        <View key={index} style={styles.scene}>
          <Text style={styles.sceneNumber}>Scene {index + 1}</Text>
          <Text style={styles.sceneText}>{scene.text}</Text>
          {/* Image will go here once Replicate is integrated */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🖼️ Image coming soon</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export const options = {
  title: "Stories",
  // tabBarIcon: ({ color, focused }) => (
  //   <IconSymbol size={28} name="book.fill" color={color} />
  // ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0A1E",
  },
  content: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#F0E6FF",
    textAlign: "center",
    marginBottom: 8,
  },
  scene: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  sceneNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A78BFA",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sceneText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#E9D5FF",
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: 12,
    backgroundColor: "rgba(124,58,237,0.15)",
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    color: "#A78BFA",
    fontSize: 14,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#0F0A1E",
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F0E6FF",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#A78BFA",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
