import { HapticTab } from "@/src/shared/components/navigation/haptic-tab";
import { Colors } from "@/src/theme/colors";
import { Tabs } from "expo-router";
import React from "react";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent.magicPurple,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    />
  );
}
