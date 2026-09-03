import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sparkles } from "lucide-react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

export function ChatBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const { colors } = useTheme();
  const isAssistant = role === "assistant";
  return (
    <View style={[styles.row, { justifyContent: isAssistant ? "flex-start" : "flex-end" }]}>
      {isAssistant && (
        <View style={[styles.avatar, { backgroundColor: colors.accentPulseMuted }]}>
          <Sparkles size={14} color={colors.accentPulse} strokeWidth={2.25} />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isAssistant ? colors.accentPulseMuted : colors.bgSurface,
            borderColor: isAssistant ? "transparent" : colors.borderSubtle,
            borderWidth: isAssistant ? 0 : 1,
          },
        ]}
      >
        <Text style={[styles.text, { color: isAssistant ? colors.textPrimary : colors.textPrimary }]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end", gap: 8, marginBottom: 14 },
  avatar: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  bubble: { maxWidth: "78%", borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  text: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21 },
});
