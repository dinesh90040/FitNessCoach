import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, Mic, Type } from "lucide-react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

interface MealCardProps {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  source: "photo" | "voice" | "text";
}

const sourceIcon = { photo: Camera, voice: Mic, text: Type };

export function MealCard({ name, time, calories, protein, carbs, fat, source }: MealCardProps) {
  const { colors } = useTheme();
  const Icon = sourceIcon[source];
  return (
    <GlassCard>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: colors.accentPulseMuted }]}>
          <Icon size={18} color={colors.accentPulse} strokeWidth={2.25} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text>
          <Text style={[styles.time, { color: colors.textSecondary }]}>{time}</Text>
        </View>
        <Text style={[styles.calories, { color: colors.textPrimary }]}>{calories} kcal</Text>
      </View>
      <View style={[styles.macroRow, { borderTopColor: colors.borderSubtle }]}>
        <Text style={[styles.macroText, { color: colors.textSecondary }]}>P {protein}g</Text>
        <Text style={[styles.macroText, { color: colors.textSecondary }]}>C {carbs}g</Text>
        <Text style={[styles.macroText, { color: colors.textSecondary }]}>F {fat}g</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  name: { fontFamily: fontFamily.bodySemibold, fontSize: 15 },
  time: { fontFamily: fontFamily.body, fontSize: 12, marginTop: 2 },
  calories: { fontFamily: fontFamily.bodySemibold, fontSize: 15 },
  macroRow: { flexDirection: "row", gap: 16, marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
  macroText: { fontFamily: fontFamily.bodyMedium, fontSize: 12 },
});
