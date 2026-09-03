import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  title: { fontFamily: fontFamily.display, fontSize: 28, lineHeight: 34 },
  subtitle: { fontFamily: fontFamily.body, fontSize: 14, marginTop: 4 },
});
