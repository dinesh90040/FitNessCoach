import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { House, UtensilsCrossed, Sparkles, TrendingUp, User } from "lucide-react-native";
import { useTheme } from "@/theme";

const icons = { index: House, nutrition: UtensilsCrossed, coach: Sparkles, progress: TrendingUp, profile: User };

function CustomTabBar({ state, navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom || 12 }]} pointerEvents="box-none">
      <BlurView intensity={50} tint="dark" style={[styles.bar, { backgroundColor: colors.overlayGlass, borderColor: colors.borderSubtle }]}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const Icon = icons[route.name as keyof typeof icons];
          const isCoach = route.name === "coach";
          return (
            <Pressable
              key={route.key}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              }}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.iconWrap,
                  focused && {
                    backgroundColor: isCoach ? colors.accentPulseMuted : colors.accentVoltMuted,
                  },
                ]}
              >
                <Icon
                  size={22}
                  color={focused ? (isCoach ? colors.accentPulse : colors.accentVolt) : colors.textTertiary}
                  strokeWidth={2.25}
                />
              </View>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Today" }} />
      <Tabs.Screen name="nutrition" options={{ title: "Nutrition" }} />
      <Tabs.Screen name="coach" options={{ title: "Coach" }} />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20 },
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    borderRadius: 28,
    borderWidth: 1,
    overflow: "hidden",
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  iconWrap: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
});
