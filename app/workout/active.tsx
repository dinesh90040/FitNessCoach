import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, RefreshCw } from "lucide-react-native";
import { ExerciseSetRow } from "@/components/workout/ExerciseSetRow";
import { RestTimer } from "@/components/workout/RestTimer";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useWorkoutStore } from "@/store/useWorkoutStore";

export default function ActiveWorkout() {
  const { colors } = useTheme();
  const { workout, toggleSetDone, completedSetCount, totalSetCount } = useWorkoutStore();
  const [showRestTimer, setShowRestTimer] = useState(false);

  const completed = completedSetCount();
  const total = totalSetCount();
  const progressPct = total > 0 ? completed / total : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={[styles.closeButton, { backgroundColor: colors.bgSurface }]}>
          <X size={18} color={colors.textPrimary} strokeWidth={2.25} />
        </Pressable>
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <View style={[styles.progressTrack, { backgroundColor: colors.bgElevated }]}>
            <View style={[styles.progressFill, { width: `${progressPct * 100}%`, backgroundColor: colors.accentVolt }]} />
          </View>
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>{completed}/{total}</Text>
      </View>

      {showRestTimer && (
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <RestTimer seconds={90} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.workoutTitle, { color: colors.textPrimary }]}>{workout.name}</Text>

        {workout.exercises.map((exercise) => (
          <GlassCard key={exercise.id} style={{ marginBottom: 16 }}>
            <View style={styles.exerciseHeader}>
              <Text style={[styles.exerciseName, { color: colors.textPrimary }]}>{exercise.name}</Text>
              <Pressable style={styles.swapButton}>
                <RefreshCw size={15} color={colors.textSecondary} strokeWidth={2.25} />
              </Pressable>
            </View>
            {exercise.sets.map((set, i) => (
              <ExerciseSetRow
                key={set.id}
                index={i + 1}
                targetReps={set.targetReps}
                weight={set.weight}
                unit={set.unit}
                done={set.done}
                onToggle={() => {
                  toggleSetDone(exercise.id, set.id);
                  setShowRestTimer(true);
                }}
              />
            ))}
          </GlassCard>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Finish Workout" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  closeButton: { width: 34, height: 34, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: 6, borderRadius: 3 },
  progressText: { fontFamily: fontFamily.bodySemibold, fontSize: 13, width: 44, textAlign: "right" },
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 },
  workoutTitle: { fontFamily: fontFamily.display, fontSize: 24, marginBottom: 20 },
  exerciseHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  exerciseName: { fontFamily: fontFamily.bodySemibold, fontSize: 16 },
  swapButton: { padding: 6 },
  footer: { padding: 20 },
});
