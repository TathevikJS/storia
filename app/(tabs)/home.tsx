import HeroSection from "@/src/features/home/components/heroSection/HeroSection";
import MagicStartSection from "@/src/features/home/components/magicStartSection/MagicStartSection";
import { Colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      {/* Region 1 — Hero (3/10 of screen) */}
      <View style={styles.heroRegion}>
        <HeroSection onStartCreating={() => router.push("/(tabs)/create")} />
      </View>

      {/* Region 2 — Magic Start cards (5/10 of screen) */}
      <View style={{ flex: 3 }}>
        <MagicStartSection />
      </View>

      {/* Region 3 — Progress / Coins (2/10 of screen) */}
      <View style={{ flex: 2 }}>{/* ProgressSection goes here */}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg.hero,
  },
  heroRegion: {
    flex: 3,
    overflow: "hidden",
    zIndex: 0,
  },
});
