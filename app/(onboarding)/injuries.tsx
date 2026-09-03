import React from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShieldCheck } from "lucide-react-native";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useUserStore } from "@/store/useUserStore";

export default function InjuriesScreen() {
  const { colors } = useTheme();
  const { onboarding, setField, completeOnboarding } = useUserStore();

  const finish = () => {
    completeOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.bgBase }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <View style={styles.header}>
          <StepIndicator total={4} current={3} />
        </View>
        <View style={styles.content}>
          <View style={[styles.iconWrap, { backgroundColor: colors.accentPulseMuted }]}>
            <ShieldCheck size={22} color={colors.accentPulse} strokeWidth={2.25} />
          </View>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Anything we should know?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Past injuries, mobility limits, or movements to avoid. Your coach will route around these
            automatically — you can always update this later.
          </Text>
          <TextInput
            value={onboarding.injuries}
            onChangeText={(v) => setField("injuries", v)}
            placeholder="e.g. Lower back tweak in 2023, avoid heavy spinal loading"
            placeholderTextColor={colors.textTertiary}
            multiline
            style={[styles.textarea, { color: colors.textPrimary, backgroundColor: colors.bgSurface, borderColor: colors.borderSubtle }]}
          />
        </View>
        <View style={styles.footer}>
          <PrimaryButton label="Finish setup" onPress={finish} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 12 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  iconWrap: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  title: { fontFamily: fontFamily.display, fontSize: 28, marginBottom: 8 },
  subtitle: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21, marginBottom: 24 },
  textarea: { minHeight: 120, borderRadius: 14, borderWidth: 1, padding: 16, fontFamily: fontFamily.body, fontSize: 15, textAlignVertical: "top" },
  footer: { padding: 24 },
});
