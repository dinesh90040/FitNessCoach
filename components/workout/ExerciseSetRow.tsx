import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

interface SetRowProps {
  index: number;
  targetReps: number;
  weight: number;
  unit: string;
  done: boolean;
  onToggle: () => void;
}

export function ExerciseSetRow({ index, targetReps, weight, unit, done, onToggle }: SetRowProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.row, { borderBottomColor: colors.borderSubtle }]}>
      <Text style={[styles.setIndex, { color: colors.textTertiary }]}>{index}</Text>
      <Text style={[styles.cell, { color: colors.textPrimary }]}>
        {weight}
        <Text style={{ color: colors.textTertiary }}> {unit}</Text>
      </Text>
      <Text style={[styles.cell, { color: colors.textPrimary }]}>
        {targetReps}
        <Text style={{ color: colors.textTertiary }}> reps</Text>
      </Text>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onToggle();
        }}
        style={[
          styles.checkbox,
          {
            backgroundColor: done ? colors.accentVolt : "transparent",
            borderColor: done ? colors.accentVolt : colors.borderSubtle,
          },
        ]}
      >
        {done && <Check size={16} color={colors.bgBase} strokeWidth={3} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, gap: 12 },
  setIndex: { fontFamily: fontFamily.bodyMedium, fontSize: 13, width: 18 },
  cell: { fontFamily: fontFamily.bodySemibold, fontSize: 15, flex: 1 },
  checkbox: { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
});
