import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flame, Dumbbell, RefreshCw, TrendingUp, Wind } from "lucide-react-native";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useUserStore, Goal } from "@/store/useUserStore";

const goals: { key: Goal; label: string; sub: string; icon: any }[] = [
  { key: "lose_fat", label: "Lose fat", sub: "Calorie deficit, preserve muscle", icon: Flame },
  { key: "build_muscle", label: "Build muscle", sub: "Calorie surplus, progressive overload", icon: Dumbbell },
  { key: "recomp", label: "Recomposition", sub: "Lose fat and gain muscle together", icon: RefreshCw },
  { key: "strength", label: "Get stronger", sub: "Prioritize 1RM on the big lifts", icon: TrendingUp },
  { key: "endurance", label: "Endurance", sub: "Cardio capacity and conditioning", icon: Wind },
];

export default function GoalScreen() {
  const { colors } = useTheme();
  const { onboarding, setField } = useUserStore();

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.bgBase }]}>
      <View style={styles.header}>
        <StepIndicator total={4} current={1} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>What's the goal?</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your split and macro targets follow from this.
        </Text>
        <View style={{ gap: 10 }}>
          {goals.map((g) => {
            const selected = onboarding.goal === g.key;
            return (
              <Pressable
                key={g.key}
                onPress={() => setField("goal", g.key)}
                style={[
                  styles.row,
                  { backgroundColor: selected ? colors.accentVoltMuted : colors.bgSurface, borderColor: selected ? colors.accentVolt : colors.borderSubtle },
                ]}
              >
                <View style={[styles.iconWrap, { backgroundColor: selected ? colors.accentVolt : colors.bgElevated }]}>
                  <g.icon size={18} color={selected ? colors.bgBase : colors.textSecondary} strokeWidth={2.25} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{g.label}</Text>
                  <Text style={[styles.rowSub, { color: colors.textSecondary }]}>{g.sub}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Continue" disabled={!onboarding.goal} onPress={() => router.push("/(onboarding)/equipment")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 12 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  title: { fontFamily: fontFamily.display, fontSize: 28, marginBottom: 8 },
  subtitle: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21, marginBottom: 24 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, padding: 14, borderRadius: 16, borderWidth: 1 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rowLabel: { fontFamily: fontFamily.bodySemibold, fontSize: 15 },
  rowSub: { fontFamily: fontFamily.body, fontSize: 12, marginTop: 2 },
  footer: { padding: 24 },
});
