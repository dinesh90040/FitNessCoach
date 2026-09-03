import "../global.css";
import React, { useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { BricolageGrotesque_600SemiBold, BricolageGrotesque_700Bold } from "@expo-google-fonts/bricolage-grotesque";
import { View } from "react-native";
import { useTheme } from "@/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colors } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: colors.bgBase }}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgBase } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="workout/active" options={{ presentation: "fullScreenModal", animation: "slide_from_bottom" }} />
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
}
