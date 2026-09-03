import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { radius } from "@/theme/spacing";

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export function SegmentedControl({ options, selectedIndex, onChange }: SegmentedControlProps) {
  const { colors } = useTheme();
  const [segmentWidth, setSegmentWidth] = useState(0);
  const translateX = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width / options.length;
    setSegmentWidth(w);
    translateX.value = w * selectedIndex;
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value, { damping: 18, stiffness: 220 }) }],
  }));

  return (
    <View
      onLayout={onLayout}
      style={[styles.track, { backgroundColor: colors.bgSurface, borderColor: colors.borderSubtle }]}
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            indicatorStyle,
            { width: segmentWidth, backgroundColor: colors.bgElevated },
          ]}
        />
      )}
      {options.map((opt, i) => (
        <Pressable
          key={opt}
          style={styles.segment}
          onPress={() => {
            translateX.value = segmentWidth * i;
            onChange(i);
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.bodyMedium,
              fontSize: 14,
              color: i === selectedIndex ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {opt}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    borderRadius: radius.button,
    borderWidth: 1,
    padding: 4,
    position: "relative",
  },
  indicator: { position: "absolute", top: 4, bottom: 4, borderRadius: radius.button - 4 },
  segment: { flex: 1, paddingVertical: 10, alignItems: "center", justifyContent: "center" },
});
