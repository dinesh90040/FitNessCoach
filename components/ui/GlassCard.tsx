import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/theme";
import { radius } from "@/theme/spacing";

interface GlassCardProps extends ViewProps {
  padded?: boolean;
  elevated?: boolean;
}

// The app's single elevation device: frosted glass + a 1px border instead of
// a drop shadow, which is what keeps cards from reading as the generic
// "SaaS card kit" (identical rounded rectangles with a soft grey shadow).
export function GlassCard({ children, style, padded = true, elevated = false, ...rest }: GlassCardProps) {
  const { colors, mode } = useTheme();
  return (
    <View style={[styles.wrap, { borderColor: colors.borderSubtle }, style]} {...rest}>
      <BlurView
        intensity={elevated ? 55 : 40}
        tint={mode === "dark" ? "dark" : "light"}
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlayGlass }]}
      />
      <View style={padded ? styles.padding : undefined}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: radius.card, borderWidth: 1, overflow: "hidden" },
  padding: { padding: 16 },
});
