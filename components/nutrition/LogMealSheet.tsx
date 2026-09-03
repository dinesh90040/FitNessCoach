import React, { forwardRef } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Camera, Mic, Keyboard, Barcode } from "lucide-react-native";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";

const options = [
  { icon: Camera, label: "Take a photo", sub: "AI reads calories & macros from your plate" },
  { icon: Mic, label: "Describe it out loud", sub: "Speak naturally, just like talking to a coach" },
  { icon: Keyboard, label: "Type it in", sub: "Search or enter a meal manually" },
  { icon: Barcode, label: "Scan a barcode", sub: "For packaged food, fastest & most exact" },
];

export const LogMealSheet = forwardRef<BottomSheet>((_props, ref) => {
  const { colors } = useTheme();
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={["45%"]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: colors.bgSurface }}
      handleIndicatorStyle={{ backgroundColor: colors.borderSubtle, width: 40 }}
    >
      <BottomSheetView style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Log a meal</Text>
        {options.map((opt) => (
          <Pressable key={opt.label} style={[styles.row, { borderColor: colors.borderSubtle }]}>
            <View style={[styles.iconWrap, { backgroundColor: colors.accentVoltMuted }]}>
              <opt.icon size={18} color={colors.accentVolt} strokeWidth={2.25} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{opt.label}</Text>
              <Text style={[styles.rowSub, { color: colors.textSecondary }]}>{opt.sub}</Text>
            </View>
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
});
LogMealSheet.displayName = "LogMealSheet";

const styles = StyleSheet.create({
  content: { padding: 20, gap: 10 },
  title: { fontFamily: fontFamily.display, fontSize: 22, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 12, borderBottomWidth: 1 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rowLabel: { fontFamily: fontFamily.bodySemibold, fontSize: 15 },
  rowSub: { fontFamily: fontFamily.body, fontSize: 12, marginTop: 2 },
});
