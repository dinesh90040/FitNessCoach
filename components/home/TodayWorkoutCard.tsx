import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Dumbbell, Clock } from "lucide-react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { todayWorkout } from "@/data/mockData";

export function TodayWorkoutCard() {
  const { colors } = useTheme();
  return (
    <GlassCard elevated style={{ borderColor: colors.accentVoltMuted }}>
      <View style={styles.metaRow}>
        <Dumbbell size={16} color={colors.accentVolt} strokeWidth={2.25} />
        <Text style={[styles.eyebrow, { color: colors.accentVolt }]}>{todayWorkout.splitLabel}</Text>
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{todayWorkout.name}</Text>
      <View style={styles.metaRow}>
        <Clock size={14} color={colors.textSecondary} />
        <Text style={[styles.meta, { color: colors.textSecondary }]}>
          {todayWorkout.estimatedMinutes} min · {todayWorkout.exerciseCount} exercises
        </Text>
      </View>
      <PrimaryButton
        label="Start Workout"
        onPress={() => router.push("/workout/active")}
        style={{ marginTop: 16 }}
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  eyebrow: { fontFamily: fontFamily.bodySemibold, fontSize: 13 },
  title: { fontFamily: fontFamily.display, fontSize: 22, lineHeight: 28, marginBottom: 10 },
  meta: { fontFamily: fontFamily.body, fontSize: 13 },
});
