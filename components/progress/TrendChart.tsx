import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

interface TrendChartProps {
  data: { label: string; value: number }[];
  color: string;
  unit: string;
}

export function TrendChart({ data, color, unit }: TrendChartProps) {
  const { colors } = useTheme();
  const chartData = data.map((d) => ({ value: d.value, label: d.label }));
  const latest = data[data.length - 1];
  const first = data[0];
  const delta = latest.value - first.value;

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={[styles.value, { color: colors.textPrimary }]}>
          {latest.value}
          <Text style={{ fontSize: 16, color: colors.textSecondary }}> {unit}</Text>
        </Text>
        <Text style={{ fontFamily: fontFamily.bodySemibold, fontSize: 13, color: delta >= 0 ? colors.stateSuccess : colors.stateError }}>
          {delta >= 0 ? "+" : ""}{delta.toFixed(1)} this period
        </Text>
      </View>
      <LineChart
        data={chartData}
        color={color}
        thickness={3}
        curved
        hideDataPoints={false}
        dataPointsColor={color}
        dataPointsRadius={4}
        xAxisColor={colors.borderSubtle}
        yAxisColor="transparent"
        yAxisTextStyle={{ color: colors.textTertiary, fontSize: 10 }}
        xAxisLabelTextStyle={{ color: colors.textTertiary, fontSize: 10 }}
        rulesColor={colors.borderSubtle}
        rulesType="solid"
        noOfSections={3}
        height={140}
        initialSpacing={10}
        spacing={44}
        backgroundColor="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 },
  value: { fontFamily: fontFamily.display, fontSize: 32 },
});
