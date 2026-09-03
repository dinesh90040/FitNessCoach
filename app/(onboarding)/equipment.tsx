import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Building2, Home, PersonStanding } from "lucide-react-native";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Chip } from "@/components/ui/Chip";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useUserStore, Equipment } from "@/store/useUserStore";

const equipmentOptions: { key: Equipment; label: string; sub: string; icon: any }[] = [
  { key: "full_gym", label: "Full gym access", sub: "Barbells, machines, cables", icon: Building2 },
  { key: "home_dumbbells", label: "Home — dumbbells", sub: "Dumbbells and/or bands at home", icon: Home },
  { key: "bodyweight_only", label: "Bodyweight only", sub: "No equipment needed", icon: PersonStanding },
];

export default function EquipmentScreen() {
  const { colors } = useTheme();
  const { onboarding, setField } = useUserStore();

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.bgBase }]}>
      <View style={styles.header}>
        <StepIndicator total={4} current={2} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>What do you train with?</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your coach only ever suggests exercises you can actually do.
        </Text>
        <View style={{ gap: 10, marginBottom: 32 }}>
          {equipmentOptions.map((opt) => {
            const selected = onboarding.equipment === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setField("equipment", opt.key)}
                style={[
                  styles.row,
                  { backgroundColor: selected ? colors.accentVoltMuted : colors.bgSurface, borderColor: selected ? colors.accentVolt : colors.borderSubtle },
                ]}
              >
                <View style={[styles.iconWrap, { backgroundColor: selected ? colors.accentVolt : colors.bgElevated }]}>
                  <opt.icon size={18} color={selected ? colors.bgBase : colors.textSecondary} strokeWidth={2.25} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{opt.label}</Text>
                  <Text style={[styles.rowSub, { color: colors.textSecondary }]}>{opt.sub}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textPrimary }]}>Days available per week</Text>
        <View style={styles.chipRow}>
          {[2, 3, 4, 5, 6].map((d) => (
            <Chip key={d} label={String(d)} selected={onboarding.daysPerWeek === d} onPress={() => setField("daysPerWeek", d)} />
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Continue" disabled={!onboarding.equipment} onPress={() => router.push("/(onboarding)/injuries")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 12 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  title: { fontFamily: fontFamily.display, fontSize: 28, marginBottom: 8 },
  subtitle: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21, marginBottom: 24 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, padding: 14, borderRadius: 16, borderWidth: 1 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rowLabel: { fontFamily: fontFamily.bodySemibold, fontSize: 15 },
  rowSub: { fontFamily: fontFamily.body, fontSize: 12, marginTop: 2 },
  sectionLabel: { fontFamily: fontFamily.bodySemibold, fontSize: 15, marginBottom: 12 },
  chipRow: { flexDirection: "row", gap: 8 },
  footer: { padding: 24 },
});
