import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

export default function Welcome() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.bgBase }]}>
      <View style={styles.content}>
        <View style={[styles.iconWrap, { backgroundColor: colors.accentVoltMuted }]}>
          <Sparkles size={28} color={colors.accentVolt} strokeWidth={2} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Your training and{"\n"}nutrition, remembered.
        </Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>
          Tell us who you are once. Your AI coach carries that context every day after —
          no re-explaining, no re-typing, just training.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Get Started" onPress={() => router.push("/(onboarding)/stats")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, justifyContent: "space-between" },
  content: { flex: 1, justifyContent: "center", paddingHorizontal: 28 },
  iconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  title: { fontFamily: fontFamily.display, fontSize: 34, lineHeight: 40, marginBottom: 16 },
  body: { fontFamily: fontFamily.body, fontSize: 16, lineHeight: 23 },
  footer: { padding: 24 },
});
