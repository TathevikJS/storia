import { Colors } from "@/src/theme/colors";
import { FontFamily, FontSize } from "@/src/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const MAX_NAME = 20;
const MAX_DESC = 100;

interface HeroModalProps {
  visible: boolean;
  initialName: string;
  initialDescription: string;
  onSave: (name: string, description: string) => void;
  onSkip: () => void;
  onClose: () => void;
}

export default function HeroModal({
  visible,
  initialName,
  initialDescription,
  onSave,
  onSkip,
  onClose,
}: HeroModalProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  // sync when modal opens
  useEffect(() => {
    if (visible) {
      setName(initialName);
      setDescription(initialDescription);
    }
  }, [visible, initialName, initialDescription]);

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    if (!trimmedName) return;
    onSave(trimmedName, trimmedDesc);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.keyboardView} pointerEvents="box-none">
        <View style={styles.sheetShadow}>
          <LinearGradient
            colors={[
              Colors.accent.magicPurple,
              "#C084FC",
              Colors.accent.brightBlue,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sheetBorder}
          >
            <View style={styles.sheet}>
              {/* Close button */}
              <Pressable
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={onClose}
              >
                <LinearGradient
                  colors={["#3B1F7A", "#5B21B6"]}
                  style={styles.closeBtnGradient}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </LinearGradient>
              </Pressable>

              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets
              >
                {/* Title */}
                <Text style={styles.title}>✨ Who is your hero? ✨</Text>
                <Text style={styles.subtitle}>
                  Give your hero a name and{"\n"}tell us a little bit about
                  them.
                </Text>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={[
                      Colors.accent.magicPurple,
                      Colors.accent.brightBlue,
                    ]}
                    style={styles.avatarRing}
                  >
                    <View style={styles.avatarInner}>
                      <Image
                        source={require("@/assets/images/character_default_avatar.png")}
                        style={styles.avatarImage}
                        resizeMode="contain"
                      />
                    </View>
                  </LinearGradient>

                  {/* Edit avatar button */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.avatarEditBtn,
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <LinearGradient
                      colors={["#5B21B6", "#7C3AED"]}
                      style={styles.avatarEditBtnGradient}
                    ></LinearGradient>
                  </Pressable>
                </View>

                {/* Name field */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>NAME </Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={(t) => setName(t.slice(0, MAX_NAME))}
                      placeholder="Enter hero name…"
                      placeholderTextColor={Colors.text.muted}
                      maxLength={MAX_NAME}
                      returnKeyType="next"
                    />
                    {name.length > 0 && (
                      <Pressable onPress={() => setName("")} hitSlop={8}>
                        <View style={styles.clearBtn}>
                          <Text style={styles.clearBtnText}>✕</Text>
                        </View>
                      </Pressable>
                    )}
                  </View>
                  <Text style={styles.charCount}>
                    {name.length}/{MAX_NAME}
                  </Text>
                </View>

                {/* Description field */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>DESCRIPTION</Text>
                  <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={description}
                      onChangeText={(t) => setDescription(t.slice(0, MAX_DESC))}
                      placeholder="A brave dragon who loves adventures and helping friends."
                      placeholderTextColor={Colors.text.muted}
                      multiline
                      numberOfLines={3}
                      maxLength={MAX_DESC}
                      textAlignVertical="top"
                    />
                  </View>
                  <Text style={styles.charCount}>
                    {description.length}/{MAX_DESC}
                  </Text>
                </View>

                {/* Save button */}
                <Pressable
                  onPress={handleSave}
                  style={({ pressed }) => [
                    styles.saveBtn,
                    pressed && { opacity: 0.88, transform: [{ scale: 0.97 }] },
                    !name.trim() && styles.saveBtnDisabled,
                  ]}
                  disabled={!name.trim()}
                >
                  <Image
                    source={require("@/assets/images/button.png")}
                    style={styles.saveBtnImage}
                    resizeMode="stretch"
                  />
                  <Text style={styles.saveBtnText}>SAVE HERO</Text>
                </Pressable>
              </ScrollView>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const AVATAR_SIZE = 130;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sheetShadow: {
    width: "100%",
    maxHeight: "90%",
    borderRadius: 28,
    shadowColor: "#C084FC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 22,
    elevation: 20,
  },
  sheetBorder: {
    width: "100%",
    borderRadius: 28,
    padding: 2,
  },
  sheet: {
    width: "100%",
    backgroundColor: "#1A0545",
    borderRadius: 26,
    overflow: "hidden",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    gap: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  closeBtnGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  topStar: {
    fontSize: 36,
    marginBottom: 8,
  },
  title: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize["2xl"],
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  // Avatar
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 24,
  },
  avatarRing: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    padding: 3,
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
  },
  avatarInner: {
    flex: 1,
    borderRadius: (AVATAR_SIZE - 6) / 2,
    overflow: "hidden",
    backgroundColor: Colors.bg.deep,
  },
  avatarImage: {
    width: "145%",
    height: "145%",
    position: "absolute",
    top: "-15%",
    left: "-22%",
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: 4,
    right: 4,
    borderRadius: 16,
    overflow: "hidden",
  },
  avatarEditBtnGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEditIcon: {
    fontSize: 14,
  },

  // Fields
  fieldGroup: {
    width: "100%",
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: FontFamily.headline,
    fontSize: FontSize.xs ?? 11,
    color: Colors.text.primary,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border.glowPurple,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  textAreaWrapper: {
    alignItems: "flex-start",
  },
  inputEmoji: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  textArea: {
    minHeight: 60,
    paddingTop: 2,
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: {
    color: Colors.text.secondary,
    fontSize: 10,
    fontWeight: "700",
  },
  charCount: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs ?? 11,
    color: Colors.text.muted,
    alignSelf: "flex-end",
    marginTop: 3,
  },

  // Save button
  saveBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 12,
    shadowColor: Colors.accent.magicPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
  },
  saveBtnDisabled: {
    opacity: 0.45,
  },
  saveBtnImage: {
    width: "100%",
    height: 80,
  },
  saveBtnText: {
    position: "absolute",
    fontFamily: FontFamily.button,
    fontSize: FontSize.xl,
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  skipText: {
    fontFamily: FontFamily.button,
    fontSize: FontSize.sm,
    color: Colors.accent.magicPurple,
    letterSpacing: 1.5,
  },
});
