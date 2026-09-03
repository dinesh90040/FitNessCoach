import React, { useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { MealCard } from "@/components/nutrition/MealCard";
import { LogMealSheet } from "@/components/nutrition/LogMealSheet";
import { MacroBar } from "@/components/ui/MacroBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTheme } from "@/theme";
import { useNutritionStore } from "@/store/useNutritionStore";

export default function Nutrition() {
  const { colors } = useTheme();
  const { meals, macros } = useNutritionStore();
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Nutrition"
          subtitle="Wednesday, September 3"
          right={
            <Pressable
              onPress={() => sheetRef.current?.expand()}
              style={[styles.addButton, { backgroundColor: colors.accentVolt }]}
            >
              <Plus size={20} color={colors.bgBase} strokeWidth={2.5} />
            </Pressable>
          }
        />

        <GlassCard>
          <View style={{ gap: 16 }}>
            <MacroBar label="Calories" current={macros.calories.current} target={macros.calories.target} unit="" color={colors.accentVolt} />
            <MacroBar label="Protein" current={macros.protein.current} target={macros.protein.target} unit="g" color={colors.accentPulse} />
            <MacroBar label="Carbs" current={macros.carbs.current} target={macros.carbs.target} unit="g" color={colors.stateWarning} />
            <MacroBar label="Fat" current={macros.fat.current} target={macros.fat.target} unit="g" color={colors.stateError} />
          </View>
        </GlassCard>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Logged today</Text>
        <View style={{ gap: 10 }}>
          {meals.map((m) => (
            <MealCard key={m.id} {...m} />
          ))}
        </View>
      </ScrollView>
      <LogMealSheet ref={sheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120 },
  addButton: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16, marginTop: 24, marginBottom: 12 },
});
