import { Colors } from "@/src/theme/colors";
import { CREATE_STRINGS } from "../constants/create.constants";
import { FontFamily, FontSize } from "@/src/theme/typography";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface StartStoryButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export default function StartStoryButton({
  onPress,
  isLoading,
}: StartStoryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={({ pressed }) => [
        styles.btn,
        pressed && { opacity: 0.88, transform: [{ scale: 0.97 }] },
        isLoading && { opacity: 0.7 },
      ]}
    >
      <Image
        source={require("@/assets/images/button.png")}
        style={styles.btnImage}
        resizeMode="stretch"
      />
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" style={{ position: "absolute" }} />
      ) : (
        <Text style={styles.btnText}>{CREATE_STRINGS.button.startStory}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
  },
  btnImage: {
    width: "85%",
    height: 80,
  },
  btnText: {
    position: "absolute",
    fontFamily: FontFamily.button,
    fontSize: FontSize.xl,
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
