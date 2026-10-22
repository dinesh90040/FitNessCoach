# 🎨 Fitness Coach App — Complete Frontend & Design System Guide

A comprehensive architectural and design specification of the **Fitness Coach App** frontend. This document covers the design philosophy, complete color palette, typography hierarchy, UI tokens, component architecture, screens, and state management.

---

## 🌟 1. Design Theme & Philosophy: "Midnight Performance"

The frontend design is built around the **"Midnight Performance"** aesthetic:
- **Dark-First, High Contrast:** A dark canvas engineered for focus, stamina, and reduced eye strain during workouts in low-light gyms or late-night logging.
- **Intentional Dual-Accent Color System:** Unlike generic apps that use a single primary color, this app strictly pairs two high-contrast accents with distinct semantic purposes:
  1. ⚡ **Volt (`#C6FF3D`):** High-energy electric lime reserved for **physical performance, workouts, completion, streaks, and primary CTAs**.
  2. 💬 **Pulse (`#4CC2FF`):** Deep electric cyan reserved for the **AI Coach's voice, intelligence, suggestions, and conversation**.
  *Rule: A user can instantly tell whether an element belongs to workout action (Volt) or AI guidance (Pulse) at a glance.*
- **Glassmorphism Elevation:** Eliminates generic flat card kits and muddy drop shadows. Elevation is achieved through frosted glass (`expo-blur` BlurView) combined with a crisp `1px` translucent border (`rgba(255, 255, 255, 0.08)`).
- **Physical Feedback (Springs + Haptics):** Every tap triggers a tactile micro-interaction using React Native Reanimated spring physics (`damping: 14, stiffness: 300`) and subtle iOS/Android haptic feedback (`expo-haptics`).

---

## 🎨 2. Color Palette & Theme Tokens

The design system maintains strict tokens defined in [`theme/colors.ts`](file:///c:/Dinesh/fitness-coach-app/theme/colors.ts) and extended into [`tailwind.config.js`](file:///c:/Dinesh/fitness-coach-app/tailwind.config.js). The app supports both **Dark** (default) and **Light** modes via the central `useTheme()` hook.

### Complete Color Palette Reference

| Token Name | Dark Mode (Default) | Light Mode | Semantic Usage & Purpose |
| :--- | :--- | :--- | :--- |
| `bgBase` | `#0A0B0E` | `#FAFAFA` | Main screen background canvas |
| `bgSurface` | `#15171C` | `#FFFFFF` | Standard card surface & container background |
| `bgElevated` | `#1D2027` | `#F1F2F4` | Elevated modal sheets, dropdowns & pill containers |
| `borderSubtle` | `rgba(255,255,255,0.08)` | `rgba(20,22,26,0.08)` | 1px border on cards, inputs, and tab bars |
| `textPrimary` | `#F5F6F7` | `#14161A` | Main headings, key metrics, bold titles |
| `textSecondary` | `#9AA0A8` | `#63676F` | Subtitles, descriptions, secondary data |
| `textTertiary` | `#5C6169` | `#9BA0A8` | Placeholder text, inactive icons, timestamps |
| `accentVolt` | `#C6FF3D` | `#8FBF00` | Primary action buttons, workout logs, completed sets |
| `accentVoltMuted` | `rgba(198,255,61,0.16)` | `rgba(143,191,0,0.12)` | Active tab pill background, selection glow |
| `accentPulse` | `#4CC2FF` | `#2E8FD9` | AI Coach chat bubbles, sparkle badges, prompt chips |
| `accentPulseMuted`| `rgba(76,194,255,0.16)` | `rgba(46,143,217,0.12)` | AI Coach active tab highlight, chip container |
| `stateSuccess` | `#34D399` | `#1FA97E` | Completed goals, positive macro targets |
| `stateWarning` | `#FBBF24` | `#D99B12` | Rest timer alert, approaching calorie limits |
| `stateError` | `#FB6A6A` | `#E14F4F` | Missed set, input error, injury alert |
| `overlayGlass` | `rgba(21,23,28,0.55)` | `rgba(255,255,255,0.65)` | Frosted glass background tint under BlurView |

### Tailwind CSS Mapping
All colors are mapped to NativeWind classes in [`tailwind.config.js`](file:///c:/Dinesh/fitness-coach-app/tailwind.config.js):
```tsx
// Examples of Tailwind classes available:
// Background: bg-bg-base, bg-bg-surface, bg-bg-elevated
// Text:       text-text-primary, text-text-secondary, text-text-tertiary
// Accents:    bg-accent-volt, text-accent-volt, bg-accent-pulse, text-accent-pulse
// Borders:    border-border-subtle
// States:     text-state-success, bg-state-error
```

---

## 🔤 3. Typography & Font System

The app couples an expressive display font for numbers and performance with a clean, highly legible grotesque body font for dense UI.

### Font Families
Defined in [`theme/typography.ts`](file:///c:/Dinesh/fitness-coach-app/theme/typography.ts) and loaded in [`app/_layout.tsx`](file:///c:/Dinesh/fitness-coach-app/app/_layout.tsx):

1. **Display: Bricolage Grotesque** (`@expo-google-fonts/bricolage-grotesque`)
   - `BricolageGrotesque_700Bold`: Heavy, expressive geometric grotesk. Used for big hero metrics (calories remaining, lifted weight, streak counter, PRs).
   - `BricolageGrotesque_600SemiBold`: Section hero titles and modal highlights.
   - *(Note: Fully compatible drop-in replacement for Clash Display).*
2. **Body / Interface: Inter** (`@expo-google-fonts/inter`)
   - `Inter_400Regular`: Explanatory text, notes, descriptions.
   - `Inter_500Medium`: Table values, navigation labels, button secondary text.
   - `Inter_600SemiBold`: Card headings, button text, active chips.
   - `Inter_700Bold`: Section titles and key callouts.

### Type Scale Specification

| Token | Font Family | Size | Line Height | Usage |
| :--- | :--- | :---: | :---: | :--- |
| `type.display56` | Bricolage Grotesque Bold | **56px** | 60px | Daily Calorie target, Hero weight stat |
| `type.display40` | Bricolage Grotesque Bold | **40px** | 46px | Large timer readout, screen hero metric |
| `type.display28` | Bricolage Grotesque Bold | **28px** | 34px | Card hero numbers, streak counter |
| `type.heading20` | Inter SemiBold | **20px** | 26px | Screen titles, card group headers |
| `type.body16` | Inter Regular | **16px** | 22px | Chat body text, long descriptions |
| `type.bodyMedium16` | Inter Medium | **16px** | 22px | Primary button labels, input fields |
| `type.body14` | Inter Regular | **14px** | 20px | Subtitle text, secondary metrics |
| `type.bodyMedium14` | Inter Medium | **14px** | 20px | Macro grams, exercise reps & sets |
| `type.label12` | Inter Medium | **12px** | 16px | Badge labels, tab bar captions, timestamps |

---

## 📐 4. Spacing, Radii & Grid System

All layout rhythm is defined in [`theme/spacing.ts`](file:///c:/Dinesh/fitness-coach-app/theme/spacing.ts):

### Spacing Scale (8pt Grid System)
```typescript
export const spacing = {
  xs: 4,     // Micro padding, icon gaps
  sm: 8,     // Tight gaps, badge padding
  md: 12,    // Inner card spacing, chip gaps
  lg: 16,    // Standard container padding
  xl: 24,    // Section separation, screen padding
  xxl: 32,   // Major card blocks
  xxxl: 48,  // Screen hero margins
  huge: 64,  // Safe bottom tab bar padding
};
```

### Corner Radii
```typescript
export const radius = {
  chip: 999,   // Full pills (filter chips, streak badges)
  button: 16,  // Primary action buttons
  card: 22,    // GlassCard and content containers
  sheet: 28,   // Bottom sheets, modal dialogs, tab bar
};
```

---

## 🧱 5. Reusable Component Library (`components/ui/`)

The design system is implemented through modular, production-ready atomic components:

### 1. `GlassCard`
- **Location:** [`components/ui/GlassCard.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/GlassCard.tsx)
- **Role:** Frosted glass container using `expo-blur`.
- **Props:** `padded?: boolean`, `elevated?: boolean`.
- **Styling:** Blur intensity `40` (default) or `55` (elevated) with `borderSubtle` and `overlayGlass`.

### 2. `PrimaryButton`
- **Location:** [`components/ui/PrimaryButton.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/PrimaryButton.tsx)
- **Role:** Main tactile button with haptic feedback and spring compression (`scale: 0.97`).
- **Variants:**
  - `volt`: Solid Volt lime background with dark text for primary workout actions.
  - `pulse`: Solid Pulse cyan background for AI interactions.
  - `outline`: Translucent subtle border for secondary actions.

### 3. `ProgressRing`
- **Location:** [`components/ui/ProgressRing.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/ProgressRing.tsx)
- **Role:** Circular SVG progress arc showing completion percentage (e.g., daily calorie ring, hydration ring).

### 4. `MacroBar`
- **Location:** [`components/ui/MacroBar.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/MacroBar.tsx)
- **Role:** Horizontal segmented progress bar displaying distribution of Protein, Carbs, and Fats with target limits.

### 5. `SegmentedControl`
- **Location:** [`components/ui/SegmentedControl.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/SegmentedControl.tsx)
- **Role:** iOS-style animated sliding pill selector for switching time ranges (7D, 30D, 90D) or workout categories.

### 6. `StreakBadge`
- **Location:** [`components/ui/StreakBadge.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/StreakBadge.tsx)
- **Role:** Flame icon with active workout day streak counter.

### 7. `Chip`
- **Location:** [`components/ui/Chip.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/Chip.tsx)
- **Role:** Interactive pill for filter selection, equipment tags, and workout muscle groups.

### 8. `ScreenHeader`
- **Location:** [`components/ui/ScreenHeader.tsx`](file:///c:/Dinesh/fitness-coach-app/components/ui/ScreenHeader.tsx)
- **Role:** Universal top header supporting optional back button, title, and right-hand action icon.

---

## 📱 6. Screen Architecture & File-Based Routing (`app/`)

Navigation is organized using **Expo Router v6**:

```text
app/
├── _layout.tsx                     # Global App Provider (Fonts, Splash, Root Stack)
├── index.tsx                       # Entry redirect (Onboarding check -> Today tab)
├── (onboarding)/                   # 5-Step Intake Flow
│   ├── _layout.tsx                 # Onboarding stack wrapper
│   ├── welcome.tsx                 # Step 1: Value proposition & CTA
│   ├── goal.tsx                    # Step 2: Primary fitness goal selection
│   ├── stats.tsx                   # Step 3: Height, weight, age, activity level
│   ├── equipment.tsx               # Step 4: Available gym/home equipment
│   └── injuries.tsx                # Step 5: Injury restrictions & intake completion
├── (tabs)/                         # Main App Experience (Floating Glass Tab Bar)
│   ├── _layout.tsx                 # Custom floating tab bar navigation
│   ├── index.tsx                   # TAB 1: Today / Home Dashboard
│   ├── nutrition.tsx               # TAB 2: Nutrition & Calorie Tracking
│   ├── coach.tsx                   # TAB 3: AI Fitness Coach Conversation
│   ├── progress.tsx                # TAB 4: Analytics, Charts & PR Records
│   └── profile.tsx                 # TAB 5: Profile, Preferences & Theme Settings
└── workout/
    └── active.tsx                  # Full-screen active workout execution modal
```

### Screen Details

#### 1. Home / Today Screen (`app/(tabs)/index.tsx`)
- Displays current date, day streak badge, and greeting.
- **`WeekStrip`**: Horizontal scrollable 7-day calendar strip showing completed and scheduled workout days.
- **`TodayWorkoutCard`**: Featured glass card displaying today's scheduled workout (e.g., "Push Power A"), estimated duration, exercises count, and a direct "Start Workout" button.
- **`MacroRings`**: Circular calorie summary alongside protein, carb, and fat ring meters.

#### 2. Nutrition Screen (`app/(tabs)/nutrition.tsx`)
- Daily calorie budget card with remaining energy breakdown.
- Segmented macro breakdowns (Protein, Carbohydrates, Fats) with interactive progress bars.
- Meal log breakdown divided by Breakfast, Lunch, Dinner, and Snacks via `MealCard`.
- Action to open `LogMealSheet` bottom sheet for quick macro logging.

#### 3. AI Coach Screen (`app/(tabs)/coach.tsx`)
- AI conversational interface styled with `accentPulse`.
- **`SuggestionChip`**: Contextual suggestion pills (e.g., *"How do I improve my bench press?"*, *"Suggest a high-protein dinner"*).
- Chat message history rendered via `ChatBubble` (differentiating user messages from AI Coach responses).
- Bottom glass input bar with voice button and send trigger.

#### 4. Progress Screen (`app/(tabs)/progress.tsx`)
- Timeframe switchers (1W, 1M, 3M, 1Y) using `SegmentedControl`.
- **`TrendChart`**: Visual line graph for bodyweight trends using `react-native-gifted-charts`.
- **`PRList`**: Personal Record milestones for core compound movements (Bench Press, Squat, Deadlift, Overhead Press).

#### 5. Profile Screen (`app/(tabs)/profile.tsx`)
- User stats summary, fitness level badge, and active membership tier.
- Theme mode switch preview (Dark / Light mode).
- Preferences: Health data integration, notification toggles, and equipment profile adjustments.

#### 6. Active Workout Modal (`app/workout/active.tsx`)
- Full-screen modal (`presentation: "fullScreenModal"`).
- Exercise-by-exercise navigation with set logs via `ExerciseSetRow`.
- Animated countdown **`RestTimer`** triggered after completing a set.
- Finish workout button with workout summary calculation.

---

## 🗄️ 7. State Management & Data Architecture

The application uses **Zustand** stores for fast, modular, and lightweight state management:

| Store Name | File Path | Responsibilities |
| :--- | :--- | :--- |
| `useUserStore` | [`store/useUserStore.ts`](file:///c:/Dinesh/fitness-coach-app/store/useUserStore.ts) | User profile, fitness goals, completed onboarding status, units (kg/lbs) |
| `useWorkoutStore` | [`store/useWorkoutStore.ts`](file:///c:/Dinesh/fitness-coach-app/store/useWorkoutStore.ts) | Current active workout, completed sets, reps, weight logs, rest timer state |
| `useNutritionStore` | [`store/useNutritionStore.ts`](file:///c:/Dinesh/fitness-coach-app/store/useNutritionStore.ts) | Logged meals, calorie totals, consumed macronutrients |
| `useChatStore` | [`store/useChatStore.ts`](file:///c:/Dinesh/fitness-coach-app/store/useChatStore.ts) | AI Coach chat message history and active suggestion queries |

All mock data driving the prototype lives in a single source of truth at [`data/mockData.ts`](file:///c:/Dinesh/fitness-coach-app/data/mockData.ts).

---

## 🔄 8. Theme Hook Usage (`useTheme()`)

To consume theme colors and dynamic light/dark values anywhere in the app:

```tsx
import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/theme";
import { type } from "@/theme/typography";

export function ExampleCard() {
  const { colors, mode } = useTheme();

  return (
    <View style={{ backgroundColor: colors.bgSurface, borderColor: colors.borderSubtle }}>
      <Text style={[type.heading20, { color: colors.textPrimary }]}>
        Workout Summary
      </Text>
      <Text style={[type.body14, { color: colors.textSecondary }]}>
        Theme active: {mode}
      </Text>
    </View>
  );
}
```

---

## 📑 9. Summary Cheatsheet

- **Theme Name:** Midnight Performance
- **Primary Mood:** Dark, focused, athletic, high-contrast, premium
- **Workouts / Actions Accent:** `Volt` (`#C6FF3D`)
- **AI Coach Accent:** `Pulse` (`#4CC2FF`)
- **Display Font:** `Bricolage Grotesque` (700 Bold / 600 SemiBold)
- **Body Font:** `Inter` (400 Regular / 500 Medium / 600 SemiBold / 700 Bold)
- **Elevation Mechanism:** Frosted Blur (`expo-blur`) + 1px subtle border (`borderSubtle`)
- **Haptics & Springs:** Standardized on every interactive tap and button press
