import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrendChart } from "@/components/progress/TrendChart";
import { PRList } from "@/components/progress/PRList";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { strengthTrend, weightTrend } from "@/data/mockData";

const views = ["Strength", "Weight", "Nutrition"];

export default function Progress() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Progress" subtitle="Last 7 weeks" />
        <SegmentedControl options={views} selectedIndex={selected} onChange={setSelected} />

        <View style={{ marginTop: 20 }}>
          <GlassCard>
            {selected === 0 && <TrendChart data={strengthTrend} color={colors.accentVolt} unit="kg est. 1RM" />}
            {selected === 1 && <TrendChart data={weightTrend} color={colors.accentPulse} unit="kg" />}
            {selected === 2 && <TrendChart data={strengthTrend.map((d) => ({ ...d, value: 70 + d.value / 3 }))} color={colors.stateWarning} unit="% adherence" />}
          </GlassCard>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Personal records</Text>
        <GlassCard>
          <PRList />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120 },
  sectionTitle: { fontFamily: fontFamily.bodySemibold, fontSize: 16, marginTop: 24, marginBottom: 12 },
});
