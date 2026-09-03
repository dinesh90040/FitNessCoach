import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { radius } from "@/theme/spacing";

export function SuggestionChip({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.wrap, { backgroundColor: colors.bgSurface, borderColor: colors.borderSubtle }]}
    >
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.chip, borderWidth: 1, marginRight: 8 },
  label: { fontFamily: fontFamily.bodyMedium, fontSize: 13 },
});
