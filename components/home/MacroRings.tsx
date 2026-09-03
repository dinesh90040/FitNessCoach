import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { macros } from "@/data/mockData";

const items = [
  { key: "calories", label: "Calories", accessor: macros.calories, colorKey: "accentVolt" as const },
  { key: "protein", label: "Protein", accessor: macros.protein, colorKey: "accentPulse" as const },
  { key: "carbs", label: "Carbs", accessor: macros.carbs, colorKey: "stateWarning" as const },
  { key: "fat", label: "Fat", accessor: macros.fat, colorKey: "stateError" as const },
];

export function MacroRings() {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      {items.map((item) => {
        const pct = item.accessor.current / item.accessor.target;
        const color = colors[item.colorKey];
        return (
          <View key={item.key} style={styles.item}>
            <ProgressRing progress={pct} size={64} strokeWidth={6} color={color}>
              <Text style={[styles.pct, { color: colors.textPrimary }]}>{Math.round(pct * 100)}%</Text>
            </ProgressRing>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              {item.accessor.current}
              <Text style={{ color: colors.textTertiary }}>{item.accessor.unit}</Text>
            </Text>
            <Text style={[styles.caption, { color: colors.textSecondary }]}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  item: { alignItems: "center", gap: 6, flex: 1 },
  pct: { fontFamily: fontFamily.bodySemibold, fontSize: 12 },
  label: { fontFamily: fontFamily.bodySemibold, fontSize: 14, marginTop: 2 },
  caption: { fontFamily: fontFamily.body, fontSize: 11 },
});
