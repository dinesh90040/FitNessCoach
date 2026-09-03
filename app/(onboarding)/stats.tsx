import React from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useUserStore } from "@/store/useUserStore";

export default function Stats() {
  const { colors } = useTheme();
  const { onboarding, setField } = useUserStore();

  const canContinue = onboarding.age && onboarding.weightKg && onboarding.heightCm;

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.bgBase }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <View style={styles.header}>
          <StepIndicator total={4} current={0} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>The basics</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            This grounds every plan your coach builds — you won't need to repeat it.
          </Text>

          <Field label="Name" value={onboarding.name} onChangeText={(v) => setField("name", v)} placeholder="Alex" colors={colors} />
          <Field label="Age" value={onboarding.age} onChangeText={(v) => setField("age", v)} placeholder="28" keyboardType="number-pad" colors={colors} />
          <Field label="Weight (kg)" value={onboarding.weightKg} onChangeText={(v) => setField("weightKg", v)} placeholder="78" keyboardType="decimal-pad" colors={colors} />
          <Field label="Height (cm)" value={onboarding.heightCm} onChangeText={(v) => setField("heightCm", v)} placeholder="178" keyboardType="number-pad" colors={colors} />
        </View>
        <View style={styles.footer}>
          <PrimaryButton label="Continue" disabled={!canContinue} onPress={() => router.push("/(onboarding)/goal")} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: "default" | "number-pad" | "decimal-pad";
  colors: ReturnType<typeof useTheme>["colors"];
}

function Field({ label, value, onChangeText, placeholder, keyboardType, colors }: FieldProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[fs.label, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        keyboardType={keyboardType}
        style={[fs.input, { color: colors.textPrimary, backgroundColor: colors.bgSurface, borderColor: colors.borderSubtle }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 12 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  title: { fontFamily: fontFamily.display, fontSize: 28, marginBottom: 8 },
  subtitle: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21, marginBottom: 28 },
  footer: { padding: 24 },
});

const fs = StyleSheet.create({
  label: { fontFamily: fontFamily.bodyMedium, fontSize: 13, marginBottom: 8 },
  input: { height: 52, borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, fontFamily: fontFamily.body, fontSize: 16 },
});
