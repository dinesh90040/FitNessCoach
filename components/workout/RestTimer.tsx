import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Timer } from "lucide-react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

// Simple visible countdown; auto-starts when mounted (i.e. right after a set
// is marked done) — the real trigger wiring happens where it's rendered.
export function RestTimer({ seconds = 90 }: { seconds?: number }) {
  const { colors } = useTheme();
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;

  return (
    <View style={[styles.wrap, { backgroundColor: colors.accentPulseMuted }]}>
      <Timer size={16} color={colors.accentPulse} strokeWidth={2.25} />
      <Text style={[styles.text, { color: colors.accentPulse }]}>
        Rest — {mm}:{ss.toString().padStart(2, "0")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, alignSelf: "flex-start" },
  text: { fontFamily: fontFamily.bodySemibold, fontSize: 14 },
});
