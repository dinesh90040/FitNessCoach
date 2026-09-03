import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { radius } from "@/theme/spacing";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: selected ? colors.accentVoltMuted : colors.bgSurface,
          borderColor: selected ? colors.accentVolt : colors.borderSubtle,
        },
      ]}
    >
      <Text style={[styles.label, { color: selected ? colors.accentVolt : colors.textSecondary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.chip,
    borderWidth: 1,
  },
  label: { fontFamily: fontFamily.bodyMedium, fontSize: 14 },
});
