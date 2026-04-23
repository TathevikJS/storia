import { Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import { Chewy_400Regular } from "@expo-google-fonts/chewy";
import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import {
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/src/features/home/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    // Brand
    Montserrat_800ExtraBold,
    // Headlines
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_700Bold,
    FredokaOne_400Regular,
    // Body
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_900Black,
    // Special
    Chewy_400Regular,
    Baloo2_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" translucent backgroundColor="transparent" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
