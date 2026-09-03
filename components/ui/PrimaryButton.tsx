import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { radius } from "@/theme/spacing";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: "volt" | "pulse" | "outline";
  disabled?: boolean;
  style?: ViewStyle;
}

// Every tap gets the same spring-in feedback + haptic tick — the app's one
// consistent "you did something" gesture, rather than a different animation
// per screen.
export function PrimaryButton({ label, onPress, variant = "volt", disabled, style }: PrimaryButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const bg =
    variant === "volt" ? colors.accentVolt : variant === "pulse" ? colors.accentPulse : "transparent";
  const textColor = variant === "outline" ? colors.textPrimary : colors.bgBase;
  const borderColor = variant === "outline" ? colors.borderSubtle : "transparent";

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={disabled}
        onPressIn={() => (scale.value = withSpring(0.97, { damping: 14, stiffness: 300 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14, stiffness: 300 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        style={[
          styles.base,
          { backgroundColor: bg, borderColor, opacity: disabled ? 0.4 : 1 },
          style,
        ]}
      >
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radius.button,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: { fontFamily: fontFamily.bodySemibold, fontSize: 16 },
});
