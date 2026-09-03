import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { weekStrip } from "@/data/mockData";

export function WeekStrip() {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      {weekStrip.map((d) => {
        const bg = d.isToday ? colors.accentVolt : d.isDone ? colors.accentVoltMuted : "transparent";
        const textColor = d.isToday ? colors.bgBase : colors.textPrimary;
        return (
          <Pressable key={d.day} style={styles.dayWrap}>
            <Text style={[styles.dayLabel, { color: colors.textTertiary }]}>{d.day}</Text>
            <View style={[styles.dateCircle, { backgroundColor: bg }]}>
              <Text style={[styles.dateText, { color: d.isToday ? textColor : colors.textPrimary }]}>
                {d.date}
              </Text>
            </View>
            {d.isTrainingDay && !d.isToday && (
              <View style={[styles.dot, { backgroundColor: colors.accentPulse }]} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  dayWrap: { alignItems: "center", gap: 8, width: 40 },
  dayLabel: { fontFamily: fontFamily.bodyMedium, fontSize: 12 },
  dateCircle: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  dateText: { fontFamily: fontFamily.bodySemibold, fontSize: 14 },
  dot: { width: 4, height: 4, borderRadius: 2 },
});
