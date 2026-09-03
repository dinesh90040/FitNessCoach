import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Trophy } from "lucide-react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { personalRecords } from "@/data/mockData";

export function PRList() {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 2 }}>
      {personalRecords.map((pr) => (
        <View key={pr.id} style={[styles.row, { borderBottomColor: colors.borderSubtle }]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.accentVoltMuted }]}>
            <Trophy size={16} color={colors.accentVolt} strokeWidth={2.25} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.lift, { color: colors.textPrimary }]}>{pr.lift}</Text>
            <Text style={[styles.date, { color: colors.textSecondary }]}>{pr.date}</Text>
          </View>
          <Text style={[styles.value, { color: colors.textPrimary }]}>{pr.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1 },
  iconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  lift: { fontFamily: fontFamily.bodySemibold, fontSize: 14 },
  date: { fontFamily: fontFamily.body, fontSize: 12, marginTop: 1 },
  value: { fontFamily: fontFamily.bodySemibold, fontSize: 14 },
});
