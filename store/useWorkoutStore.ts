import { create } from "zustand";
import { todayWorkout as seedWorkout } from "@/data/mockData";

type Workout = typeof seedWorkout;

interface WorkoutState {
  workout: Workout;
  toggleSetDone: (exerciseId: string, setId: string) => void;
  completedSetCount: () => number;
  totalSetCount: () => number;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workout: seedWorkout,
  toggleSetDone: (exerciseId, setId) =>
    set((state) => ({
      workout: {
        ...state.workout,
        exercises: state.workout.exercises.map((ex) =>
          ex.id !== exerciseId
            ? ex
            : { ...ex, sets: ex.sets.map((s) => (s.id === setId ? { ...s, done: !s.done } : s)) }
        ),
      },
    })),
  completedSetCount: () =>
    get().workout.exercises.reduce((sum, ex) => sum + ex.sets.filter((s) => s.done).length, 0),
  totalSetCount: () =>
    get().workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0),
}));
