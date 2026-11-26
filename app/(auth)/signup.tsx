import React from "react";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";
import { type, fontFamily } from "@/theme/typography";
import { spacing, radius } from "@/theme/spacing";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react-native";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBase }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: spacing.xl }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                    <Pressable onPress={() => router.back()} style={{
                        marginTop: spacing.md,
                        marginBottom: spacing.lg,
                        alignSelf: 'flex-start'
                    }}>
                        <ArrowLeft size={24} color={colors.textPrimary}></ArrowLeft>
                    </Pressable>

                    <View style={{
                        position: 'absolute',
                        top: -60,
                        right: -60,
                        width: 240,
                        height: 240,
                        borderRadius: 120,
                        backgroundColor: colors.accentVolt,
                        opacity: 0.12
                    }}>

                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 80,
                        left: -80,
                        width: 260,
                        height: 260,
                        borderRadius: 130,
                        backgroundColor: colors.accentPulse,
                        opacity: 0.08
                    }}>

                    </View>

                    <View style={{
                        marginBottom: spacing.xxl
                    }}>
                        <Text style={{
                            fontFamily: fontFamily.display,
                            fontSize: 32,
                            color: colors.textPrimary,
                            letterSpacing: -0.5
                        }}>
                            Create Account
                        </Text>

                        <Text style={{
                            fontFamily: fontFamily.body,
                            fontSize: 15,
                            color: colors.textSecondary,
                            marginTop: spacing.xs,
                            lineHeight: 22
                        }}>
                            Start your personalized fitness and nutrition journey.
                        </Text>
                    </View>

                    <GlassCard elevated style={{
                        marginBottom: spacing.lg
                    }}>
                        <Text style={{
                            fontFamily: fontFamily.bodyMedium,
                            fontSize: 12,
                            color: colors.textSecondary,
                            letterSpacing: 1,
                            marginBottom: spacing.xs
                        }}>
                            FULL NAME
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 52,
                            backgroundColor: colors.bgSurface,
                            borderRadius: radius.button,
                            borderWidth: 1,
                            borderColor: colors.borderSubtle,
                            paddingHorizontal: spacing.lg
                        }}>
                            <User size={20} color={colors.textTertiary}> </User>
                            <TextInput style={{
                                flex: 1,
                                marginLeft: spacing.md,
                                color: colors.textPrimary,
                                fontFamily: fontFamily.body,
                                fontSize: 15
                            }} placeholder="Enter Your full name" placeholderTextColor={colors.textTertiary} value={name} onChangeText={setName} autoCapitalize="words" returnKeyType="next">

                            </TextInput>
                        </View>
                        <Text style={{
                            fontFamily: fontFamily.bodyMedium,
                            fontSize: 12,
                            color: colors.textSecondary,
                            letterSpacing: 1,
                            marginBottom: spacing.xs
                        }}>
                            EMAIL
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 52,
                            backgroundColor: colors.bgSurface,
                            borderRadius: radius.button,
                            borderWidth: 1,
                            borderColor: colors.borderSubtle,
                            paddingHorizontal: spacing.lg
                        }}>
                            <Mail size={20} color={colors.textTertiary}> </Mail>
                            <TextInput style={{
                                flex: 1,
                                marginLeft: spacing.md,
                                color: colors.textPrimary,
                                fontFamily: fontFamily.body,
                                fontSize: 15
                            }} placeholder="Enter Your Email" placeholderTextColor={colors.textTertiary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false}>

                            </TextInput>
                        </View>
                        <Text style={{
                            fontFamily: fontFamily.bodyMedium,
                            fontSize: 12,
                            color: colors.textSecondary,
                            letterSpacing: 1,
                            marginTop: spacing.lg
                        }}>
                            PASSWORD
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 52,
                            backgroundColor: colors.bgSurface,
                            borderRadius: radius.button,
                            borderWidth: 1,
                            borderColor: colors.borderSubtle,
                            paddingHorizontal: spacing.lg
                        }}>
                            <Lock size={20} color={colors.textTertiary}> </Lock>

                            <TextInput style={{
                                flex: 1,
                                marginLeft: spacing.md,
                                color: colors.textPrimary,
                                fontFamily: fontFamily.body,
                                fontSize: 15
                            }}
                                placeholder="Enter your password"
                                placeholderTextColor={colors.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            >
                            </TextInput>
                            <Pressable onPress={() => setShowPassword(!showPassword)}
                                style={{ padding: spacing.xs }}>
                                {showPassword ? (
                                    <EyeOff size={20} color={colors.textTertiary} />
                                ) : (
                                    <Eye size={20} color={colors.textTertiary} />
                                )}
                            </Pressable>

                        </View>
                        <Text style={{
                            fontFamily: fontFamily.bodyMedium,
                            fontSize: 12,
                            color: colors.textSecondary,
                            letterSpacing: 1,
                            marginTop: spacing.lg
                        }}>
                            CONFIRM PASSWORD
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 52,
                            backgroundColor: colors.bgSurface,
                            borderRadius: radius.button,
                            borderWidth: 1,
                            borderColor: colors.borderSubtle,
                            paddingHorizontal: spacing.lg
                        }}>
                            <Lock size={20} color={colors.textTertiary}> </Lock>

                            <TextInput style={{
                                flex: 1,
                                marginLeft: spacing.md,
                                color: colors.textPrimary,
                                fontFamily: fontFamily.body,
                                fontSize: 15
                            }}
                                placeholder="Confirm your password"
                                placeholderTextColor={colors.textTertiary}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                returnKeyType="done"
                            >
                            </TextInput>
                            <Pressable onPress={() => setShowPassword(!showPassword)}
                                style={{ padding: spacing.xs }}>
                                {showPassword ? (
                                    <EyeOff size={20} color={colors.textTertiary} />
                                ) : (
                                    <Eye size={20} color={colors.textTertiary} />
                                )}
                            </Pressable>

                        </View>
                    </GlassCard>

                    <PrimaryButton label="Sign Up" variant="volt" style={{
                        marginTop: spacing.xl
                    }} onPress={() => {
                        //handle signup
                    }}>

                    </PrimaryButton>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: spacing.xl,
                        marginBottom: spacing.xxl
                    }}>
                        <Text style={{
                            fontFamily: fontFamily.body,
                            fontSize: 14,
                            color: colors.textSecondary
                        }}>
                            Already have an account?{' '}
                        </Text>
                        <Pressable onPress={() => router.replace('/(auth)/login')}>
                            <Text style={{
                                fontFamily: fontFamily.bodyMedium,
                                fontSize: 14,
                                color: colors.accentVolt
                            }}>
                                Sign In
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );



}