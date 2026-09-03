import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Flame } from "lucide-react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { radius } from "@/theme/spacing";

export function StreakBadge({ days }: { days: number }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.accentVoltMuted }]}>
      <Flame size={14} color={colors.accentVolt} strokeWidth={2.5} />
      <Text style={[styles.text, { color: colors.accentVolt }]}>{days}-day streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.chip,
    alignSelf: "flex-start",
  },
  text: { fontFamily: fontFamily.bodySemibold, fontSize: 13 },
});
