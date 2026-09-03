import { create } from "zustand";
import { meals as seedMeals, macros as seedMacros } from "@/data/mockData";

interface NutritionState {
  meals: typeof seedMeals;
  macros: typeof seedMacros;
}

export const useNutritionStore = create<NutritionState>(() => ({
  meals: seedMeals,
  macros: seedMacros,
}));
