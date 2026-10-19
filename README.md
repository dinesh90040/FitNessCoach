# Fitness Coach App — Phase 1 UI

A complete, production-structured Expo + React Native + TypeScript frontend
implementing the "Midnight Performance" design system: dark-first, glassmorphic,
two-accent-color, built for an AI-coached fitness & nutrition app.

This is a **UI-only prototype** — all data is mocked (`/data/mockData.ts`) and
held in local Zustand stores. There is no backend or real AI wired in yet;
every interaction works and animates, but "Send" in the AI Coach returns a
canned response, and logged sets/meals reset on app restart. That's the
correct scope for a Phase 1 UI milestone — Phase 2 is wiring in real state
persistence and an AI backend.

## Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)**: Complete step-by-step installation, platform running guides (Expo Go, Web, Android Emulator, iOS Simulator), hotkeys, and troubleshooting.
- **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)**: Complete frontend & design system documentation — "Midnight Performance" theme philosophy, color tokens (Dark/Light), typography scale, spacing tokens, component hierarchy, screens, and Zustand state architecture.

## Run it

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator (needs Xcode installed on a Mac), or
scan the QR code with the **Expo Go** app on your own iPhone — that's the
fastest way to see it on a real device without a Mac/simulator. You can also press `w` to open it in a web browser.

## What's included

- **7 screens**: Onboarding (5-step flow), Home/Today, Active Workout, Nutrition
  Log, AI Coach Chat, Progress/Analytics, Profile/Settings
- **Full design token system** in `/theme` — colors, typography, spacing — one
  source of truth every component reads from, with light-mode values ready to go
- **Custom floating glass tab bar**, animated segmented control, animated
  progress rings, spring-based button feedback, haptics on every log action
- **Reusable component library** in `/components` — cards, buttons, chips,
  charts — none of the screens hardcode one-off styles

## About the display font

The design spec called for **Clash Display** (Fontshare), which isn't
distributable via npm, so this scaffold ships with **Bricolage Grotesque**
(Google Fonts, same expressive-geometric character) as the bundled default —
loaded in `app/_layout.tsx` via `@expo-google-fonts/bricolage-grotesque`.

To switch to Clash Display instead:
1. Download the OTF/TTF files from fontshare.com/fonts/clash-display
2. Drop them in `/assets/fonts/`
3. In `app/_layout.tsx`, replace the `@expo-google-fonts/bricolage-grotesque`
   import with `useFonts({ ClashDisplay: require("../assets/fonts/ClashDisplay-Bold.otf") })`
4. Update `fontFamily.display` in `theme/typography.ts` to `"ClashDisplay"`

## Project structure

```
app/                  Expo Router screens (file-based routing)
  (onboarding)/        5-step intake flow
  (tabs)/               Home, Nutrition, Coach, Progress, Profile
  workout/active.tsx    Full-screen modal for a live logging session
components/           Reusable UI, grouped by feature area
theme/                 Colors, typography, spacing — single source of truth
store/                 Zustand stores (mock/local state only)
data/mockData.ts      All sample data driving the UI
```

## Next steps (Phase 2)

- Replace Zustand's in-memory state with persisted storage (e.g. a real backend
  + `@tanstack/react-query`, or `expo-sqlite`/`AsyncStorage` for local-first)
- Wire the AI Coach chat to a real LLM API call
- Wire meal photo logging to a vision model call
- Add Apple HealthKit / Health Connect integration for wearable data
