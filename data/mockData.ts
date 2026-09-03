export const weekStrip = [
  { day: "Mon", date: 1, isToday: false, isTrainingDay: true, isDone: true },
  { day: "Tue", date: 2, isToday: false, isTrainingDay: false, isDone: false },
  { day: "Wed", date: 3, isToday: true, isTrainingDay: true, isDone: false },
  { day: "Thu", date: 4, isToday: false, isTrainingDay: false, isDone: false },
  { day: "Fri", date: 5, isToday: false, isTrainingDay: true, isDone: false },
  { day: "Sat", date: 6, isToday: false, isTrainingDay: true, isDone: false },
  { day: "Sun", date: 7, isToday: false, isTrainingDay: false, isDone: false },
];

export const todayWorkout = {
  name: "Push Day — Chest, Shoulders, Triceps",
  splitLabel: "Push / Pull / Legs",
  estimatedMinutes: 55,
  exerciseCount: 6,
  exercises: [
    { id: "e1", name: "Barbell Bench Press", sets: [
      { id: "s1", targetReps: 8, weight: 70, unit: "kg", done: true },
      { id: "s2", targetReps: 8, weight: 70, unit: "kg", done: true },
      { id: "s3", targetReps: 6, weight: 75, unit: "kg", done: false },
      { id: "s4", targetReps: 6, weight: 75, unit: "kg", done: false },
    ]},
    { id: "e2", name: "Incline Dumbbell Press", sets: [
      { id: "s5", targetReps: 10, weight: 24, unit: "kg", done: false },
      { id: "s6", targetReps: 10, weight: 24, unit: "kg", done: false },
      { id: "s7", targetReps: 10, weight: 24, unit: "kg", done: false },
    ]},
    { id: "e3", name: "Seated Shoulder Press", sets: [
      { id: "s8", targetReps: 10, weight: 18, unit: "kg", done: false },
      { id: "s9", targetReps: 10, weight: 18, unit: "kg", done: false },
      { id: "s10", targetReps: 10, weight: 18, unit: "kg", done: false },
    ]},
    { id: "e4", name: "Cable Lateral Raise", sets: [
      { id: "s11", targetReps: 15, weight: 7, unit: "kg", done: false },
      { id: "s12", targetReps: 15, weight: 7, unit: "kg", done: false },
      { id: "s13", targetReps: 15, weight: 7, unit: "kg", done: false },
    ]},
    { id: "e5", name: "Triceps Rope Pushdown", sets: [
      { id: "s14", targetReps: 12, weight: 25, unit: "kg", done: false },
      { id: "s15", targetReps: 12, weight: 25, unit: "kg", done: false },
      { id: "s16", targetReps: 12, weight: 25, unit: "kg", done: false },
    ]},
    { id: "e6", name: "Overhead Triceps Extension", sets: [
      { id: "s17", targetReps: 12, weight: 16, unit: "kg", done: false },
      { id: "s18", targetReps: 12, weight: 16, unit: "kg", done: false },
      { id: "s19", targetReps: 12, weight: 16, unit: "kg", done: false },
    ]},
  ],
};

export const macros = {
  calories: { current: 1450, target: 2400, unit: "kcal" },
  protein: { current: 98, target: 170, unit: "g" },
  carbs: { current: 140, target: 260, unit: "g" },
  fat: { current: 42, target: 75, unit: "g" },
};

export const streak = { days: 12, label: "day logging streak" };

export const meals = [
  { id: "m1", name: "Greek Yogurt & Berries", time: "7:40 AM", calories: 320, protein: 28, carbs: 34, fat: 8, source: "photo" as const },
  { id: "m2", name: "Chicken, Rice & Broccoli", time: "12:50 PM", calories: 610, protein: 52, carbs: 68, fat: 12, source: "photo" as const },
  { id: "m3", name: "Protein Shake", time: "3:15 PM", calories: 220, protein: 40, carbs: 12, fat: 3, source: "voice" as const },
  { id: "m4", name: "Almonds (30g)", time: "4:30 PM", calories: 300, protein: 11, carbs: 9, fat: 26, source: "text" as const },
];

export const chatMessages = [
  { id: "c1", role: "assistant" as const, text: "Morning. You're on a 12-day streak — nice. Push day is loaded for today, chest/shoulders/triceps, about 55 minutes." },
  { id: "c2", role: "user" as const, text: "Can we swap incline dumbbell press for machine press? Shoulder's a little tight." },
  { id: "c3", role: "assistant" as const, text: "Done — swapped to Machine Chest Press at a moderate angle, and I dropped lateral raise volume by one set today. I'll keep an eye on that shoulder this week before adding load back." },
];

export const suggestionChips = [
  "How's my week looking?",
  "Swap today's workout",
  "Am I eating enough protein?",
  "Explain my split",
];

export const strengthTrend = [
  { label: "W1", value: 62 }, { label: "W2", value: 64 }, { label: "W3", value: 66 },
  { label: "W4", value: 65 }, { label: "W5", value: 69 }, { label: "W6", value: 72 },
  { label: "W7", value: 75 },
];

export const weightTrend = [
  { label: "W1", value: 82.4 }, { label: "W2", value: 82.1 }, { label: "W3", value: 81.9 },
  { label: "W4", value: 81.6 }, { label: "W5", value: 81.3 }, { label: "W6", value: 81.0 },
  { label: "W7", value: 80.6 },
];

export const personalRecords = [
  { id: "pr1", lift: "Barbell Bench Press", value: "82.5 kg × 5", date: "Aug 27" },
  { id: "pr2", lift: "Back Squat", value: "110 kg × 5", date: "Aug 22" },
  { id: "pr3", lift: "Deadlift", value: "140 kg × 3", date: "Aug 15" },
];
