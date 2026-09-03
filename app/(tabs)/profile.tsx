import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Watch, Ruler, Download, HelpCircle, ChevronRight, User } from "lucide-react-native";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useUserStore } from "@/store/useUserStore";

const sections = [
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications" },
      { icon: Watch, label: "Wearables & integrations" },
      { icon: Ruler, label: "Units" },
    ],
  },
  {
    title: "Data",
    items: [
      { icon: Download, label: "Export my data" },
      { icon: HelpCircle, label: "Support" },
    ],
  },
];

export default function Profile() {
  const { colors } = useTheme();
  const { onboarding } = useUserStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile" />

        <GlassCard>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: colors.accentVoltMuted }]}>
              <User size={24} color={colors.accentVolt} strokeWidth={2.25} />
            </View>
            <View>
              <Text style={[styles.name, { color: colors.textPrimary }]}>{onboarding.name || "Alex"}</Text>
              <Text style={[styles.meta, { color: colors.textSecondary }]}>
                {onboarding.weightKg || "78"}kg · {onboarding.heightCm || "178"}cm · {onboarding.daysPerWeek} days/week
              </Text>
            </View>
          </View>
        </GlassCard>

        {sections.map((section) => (
          <View key={section.title} style={{ marginTop: 24 }}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</Text>
            <GlassCard padded={false}>
              {section.items.map((item, i) => (
                <Pressable
                  key={item.label}
                  style={[
                    styles.row,
                    i < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
                  ]}
                >
                  <item.icon size={18} color={colors.textSecondary} strokeWidth={2} />
                  <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{item.label}</Text>
                  <ChevronRight size={16} color={colors.textTertiary} />
                </Pressable>
              ))}
            </GlassCard>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  name: { fontFamily: fontFamily.display, fontSize: 20 },
  meta: { fontFamily: fontFamily.body, fontSize: 13, marginTop: 3 },
  sectionTitle: { fontFamily: fontFamily.bodySemibold, fontSize: 13, marginBottom: 10, marginLeft: 4 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 16, paddingHorizontal: 16 },
  rowLabel: { flex: 1, fontFamily: fontFamily.bodyMedium, fontSize: 15 },
});
