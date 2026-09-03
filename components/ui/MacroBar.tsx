import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export function MacroBar({ label, current, target, unit, color }: MacroBarProps) {
  const { colors } = useTheme();
  const width = useSharedValue(0);
  const pct = Math.min(current / target, 1);

  useEffect(() => {
    width.value = withTiming(pct * 100, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, [pct]);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View style={{ gap: 6 }}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.textPrimary }]}>
          {current}
          <Text style={{ color: colors.textTertiary }}> / {target}{unit}</Text>
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.bgElevated }]}>
        <Animated.View style={[styles.fill, animatedStyle, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontFamily: fontFamily.bodyMedium, fontSize: 13 },
  value: { fontFamily: fontFamily.bodySemibold, fontSize: 13 },
  track: { height: 8, borderRadius: 999, overflow: "hidden" },
  fill: { height: 8, borderRadius: 999 },
});
