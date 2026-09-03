import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme";

// Onboarding genuinely is a sequence, so a step indicator earns its place
// here (unlike numbered 01/02/03 markers scattered on non-sequential content).
export function StepIndicator({ total, current }: { total: number; current: number }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.segment,
            { backgroundColor: i <= current ? colors.accentVolt : colors.bgElevated },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6 },
  segment: { flex: 1, height: 4, borderRadius: 2 },
});
