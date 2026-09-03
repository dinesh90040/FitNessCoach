// Midnight Performance — dark-first palette.
// Two distinct accents (never one alone): Volt for performance/CTAs,
// Pulse for the AI Coach's voice, so the two are always visually separable.
export interface ThemeColors {
  bgBase: string;
  bgSurface: string;
  bgElevated: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accentVolt: string;
  accentVoltMuted: string;
  accentPulse: string;
  accentPulseMuted: string;
  stateSuccess: string;
  stateWarning: string;
  stateError: string;
  overlayGlass: string;
}

export const colors: { dark: ThemeColors; light: ThemeColors } = {
  dark: {
    bgBase: "#0A0B0E",
    bgSurface: "#15171C",
    bgElevated: "#1D2027",
    borderSubtle: "rgba(255,255,255,0.08)",
    textPrimary: "#F5F6F7",
    textSecondary: "#9AA0A8",
    textTertiary: "#5C6169",
    accentVolt: "#C6FF3D",
    accentVoltMuted: "rgba(198,255,61,0.16)",
    accentPulse: "#4CC2FF",
    accentPulseMuted: "rgba(76,194,255,0.16)",
    stateSuccess: "#34D399",
    stateWarning: "#FBBF24",
    stateError: "#FB6A6A",
    overlayGlass: "rgba(21,23,28,0.55)",
  },
  light: {
    bgBase: "#FAFAFA",
    bgSurface: "#FFFFFF",
    bgElevated: "#F1F2F4",
    borderSubtle: "rgba(20,22,26,0.08)",
    textPrimary: "#14161A",
    textSecondary: "#63676F",
    textTertiary: "#9BA0A8",
    accentVolt: "#8FBF00",
    accentVoltMuted: "rgba(143,191,0,0.12)",
    accentPulse: "#2E8FD9",
    accentPulseMuted: "rgba(46,143,217,0.12)",
    stateSuccess: "#1FA97E",
    stateWarning: "#D99B12",
    stateError: "#E14F4F",
    overlayGlass: "rgba(255,255,255,0.65)",
  },
} as const;

export type ThemeMode = "dark" | "light";
