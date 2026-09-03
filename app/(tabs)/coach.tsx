import React, { useState, useRef } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowUp, Mic } from "lucide-react-native";
import { ChatBubble } from "@/components/coach/ChatBubble";
import { SuggestionChip } from "@/components/coach/SuggestionChip";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/typography";
import { useChatStore } from "@/store/useChatStore";
import { suggestionChips } from "@/data/mockData";

export default function Coach() {
  const { colors } = useTheme();
  const { messages, sendMessage } = useChatStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMessage(text);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }} edges={["top"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }} keyboardVerticalOffset={90}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>AI Coach</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Knows your full training & nutrition history</Text>
        </View>

        <ScrollView ref={scrollRef} contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} text={m.text} />
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {suggestionChips.map((c) => (
            <SuggestionChip key={c} label={c} onPress={() => handleSend(c)} />
          ))}
        </ScrollView>

        <View style={[styles.inputRow, { backgroundColor: colors.bgSurface, borderColor: colors.borderSubtle }]}>
          <Pressable style={styles.micButton}>
            <Mic size={20} color={colors.textSecondary} strokeWidth={2.25} />
          </Pressable>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message your coach"
            placeholderTextColor={colors.textTertiary}
            style={[styles.input, { color: colors.textPrimary }]}
          />
          <Pressable
            onPress={() => handleSend(input)}
            style={[styles.sendButton, { backgroundColor: input.trim() ? colors.accentPulse : colors.bgElevated }]}
          >
            <ArrowUp size={18} color={input.trim() ? colors.bgBase : colors.textTertiary} strokeWidth={2.5} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  title: { fontFamily: fontFamily.display, fontSize: 26 },
  subtitle: { fontFamily: fontFamily.body, fontSize: 13, marginTop: 4 },
  messages: { paddingHorizontal: 20, paddingBottom: 12 },
  chipRow: { paddingHorizontal: 20, paddingBottom: 12 },
  inputRow: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 100, borderRadius: 24, borderWidth: 1, paddingLeft: 6, paddingRight: 6, height: 52 },
  micButton: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  input: { flex: 1, fontFamily: fontFamily.body, fontSize: 15, paddingHorizontal: 8 },
  sendButton: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
});
