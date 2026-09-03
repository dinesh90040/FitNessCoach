import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";
import { WeekStrip } from "@/components/home/WeekStrip";
import { TodayWorkoutCard } from "@/components/home/TodayWorkoutCard";
import { MacroRings } from "@/components/home/MacroRings";
import { GlassCard } from "@/components/ui/GlassCard";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { streak } from "@/data/mockData";

export default function Home() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Wednesday, September 3</Text>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Good morning, Alex</Text>
          </View>
          <StreakBadge days={streak.days} />
        </View>

        <WeekStrip />

        <View style={{ marginTop: 24 }}>
          <TodayWorkoutCard />
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Today's nutrition</Text>
          <GlassCard>
            <MacroRings />
          </GlassCard>
        </View>

        <Pressable onPress={() => router.push("/(tabs)/coach")} style={{ marginTop: 16 }}>
          <GlassCard style={{ borderColor: colors.accentPulseMuted }}>
            <View style={styles.coachRow}>
              <View style={[styles.coachIcon, { backgroundColor: colors.accentPulseMuted }]}>
                <Sparkles size={18} color={colors.accentPulse} strokeWidth={2.25} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.coachTitle, { color: colors.textPrimary }]}>Ask your coach</Text>
                <Text style={[styles.coachSub, { color: colors.textSecondary }]}>
                  "How's my protein trending this week?"
                </Text>
              </View>
            </View>
          </GlassCard>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  greeting: { fontFamily: fontFamily.bodyMedium, fontSize: 13, marginBottom: 4 },
  title: { fontFamily: fontFamily.display, fontSize: 26, lineHeight: 32 },
  sectionTitle: { fontFamily: fontFamily.bodySemibold, fontSize: 16, marginBottom: 12 },
  coachRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  coachIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  coachTitle: { fontFamily: fontFamily.bodySemibold, fontSize: 15 },
  coachSub: { fontFamily: fontFamily.body, fontSize: 13, marginTop: 2 },
});
