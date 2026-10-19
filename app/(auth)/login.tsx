import React from "react";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";
import { type, fontFamily } from "@/theme/typography";
import { spacing, radius } from "@/theme/spacing";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react-native";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { colors } = useTheme();

    return (
        <div>Home View</div>
    );
}