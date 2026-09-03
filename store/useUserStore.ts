import { create } from "zustand";

export type Goal = "lose_fat" | "build_muscle" | "recomp" | "strength" | "endurance";
export type Equipment = "full_gym" | "home_dumbbells" | "bodyweight_only";

interface OnboardingData {
  name: string;
  age: string;
  weightKg: string;
  heightCm: string;
  goal: Goal | null;
  daysPerWeek: number;
  equipment: Equipment | null;
  injuries: string;
}

interface UserState {
  hasOnboarded: boolean;
  onboarding: OnboardingData;
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  hasOnboarded: false,
  onboarding: {
    name: "",
    age: "",
    weightKg: "",
    heightCm: "",
    goal: null,
    daysPerWeek: 4,
    equipment: null,
    injuries: "",
  },
  setField: (key, value) =>
    set((state) => ({ onboarding: { ...state.onboarding, [key]: value } })),
  completeOnboarding: () => set({ hasOnboarded: true }),
}));
