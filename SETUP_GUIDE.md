# 🚀 Fitness Coach App — Frontend Setup & Running Guide

Complete, step-by-step developer guide for setting up, running, and debugging the frontend of the **Fitness Coach App** on Windows, macOS, and Linux.

---

## 📌 1. Project Overview & Tech Stack

This project is a modern mobile frontend built with:
- **Framework:** [Expo](https://expo.dev/) (SDK 54) + [React Native](https://reactnative.dev/) (v0.81.5)
- **Language:** TypeScript 5.3+
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) v6 (File-based routing)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS 3.4) + Custom Design Tokens in `theme/`
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (In-memory mock state)
- **Icons & Animation:** Lucide React Native, React Native Reanimated v4, React Native Gesture Handler
- **Fonts:** Bricolage Grotesque & Inter (via Expo Google Fonts)

---

## 📋 2. Prerequisites

Make sure the following tools are installed on your machine:

| Requirement | Recommended Version | Verification Command | Notes |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 18.x` (LTS recommended) | `node -v` | Installed |
| **npm** | `>= 9.x` or `10.x` | `npm -v` | Bundled with Node |
| **Git** | Latest | `git --version` | For version control |

### Choose Your Testing Device / Platform:
1. **Physical Mobile Device (Fastest & Recommended):**
   - **iOS:** Install **Expo Go** from Apple App Store.
   - **Android:** Install **Expo Go** from Google Play Store.
2. **Web Browser (Quick desktop preview):**
   - Chrome, Edge, Safari, or Firefox.
3. **Android Emulator (Windows / Mac / Linux):**
   - Install **Android Studio** and configure an Android Virtual Device (AVD).
4. **iOS Simulator (macOS only):**
   - Requires Xcode installed on a Mac.

---

## ⚡ 3. Quick Start (TL;DR)

Open your terminal (PowerShell or Command Prompt) in the project root:

```bash
# 1. Install dependencies
npm install

# 2. Check TypeScript types
npm run typecheck

# 3. Start Metro bundler
npx expo start
```

Press `w` to open immediately in your web browser, or scan the QR code with your phone.

---

## 🛠️ 4. Detailed Step-by-Step Setup

### Step 1: Open Terminal in Project Directory
Navigate to the root directory where `package.json` is located:
```powershell
cd c:\Dinesh\fitness-coach-app
```

### Step 2: Install Dependencies
Run the installation command:
```bash
npm install
```
> [!NOTE]
> All core packages (Expo SDK 54, React 19, NativeWind, Reanimated, etc.) are pinned in `package.json` for full compatibility.

### Step 3: Verify TypeScript Types
Ensure all types and files compile cleanly:
```bash
npm run typecheck
```
*(You should see no errors).*

### Step 4: Launch the Expo Development Server
Run:
```bash
npm start
# or
npx expo start
```

Once running, Expo will display an interactive terminal dashboard with a QR code and available hotkeys.

---

## 📱 5. Running on Different Platforms

### Option A: Physical Phone with Expo Go (Recommended)

1. Connect your computer and your phone to the **same Wi-Fi network**.
2. Start the dev server:
   ```bash
   npx expo start
   ```
3. **On Android:**
   - Open the **Expo Go** app.
   - Tap **"Scan QR code"** and scan the QR code displayed in your terminal or Metro web page.
4. **On iPhone:**
   - Open the default **Camera app**.
   - Point at the QR code and tap the notification link to open in **Expo Go**.

> [!TIP]
> **If your phone cannot reach your computer** (e.g., guest Wi-Fi, VPN, or corporate firewall):
> Run with Tunnel mode:
> ```bash
> npx expo start --tunnel
> ```
> *(Expo will prompt to install `@expo/ngrok` automatically on first run).*

---

### Option B: Running in the Web Browser

You can test the UI directly in your browser:
```bash
npm run web
# or
npx expo start --web
```
- The app will automatically launch at `http://localhost:8081`.
- Press `F12` and switch to **Mobile Device Toolbar** (e.g., iPhone 14 / Pixel 7 view) for the best mobile aspect ratio.

---

### Option C: Android Emulator (Windows / Mac)

1. Open **Android Studio** -> **Device Manager** and start your virtual device.
2. In your terminal where Expo is running, press:
   ```text
   a
   ```
   *(Or run directly: `npm run android`)*.
3. Expo will automatically install Expo Go on the emulator and stream the bundle.

---

### Option D: iOS Simulator (macOS only)

1. Open Simulator from Xcode.
2. In your Expo terminal, press:
   ```text
   i
   ```
   *(Or run directly: `npm run ios`)*.

---

## ⌨️ 6. Useful Terminal Hotkeys (Metro Bundler)

While `expo start` is running in your terminal, press any of these keys:

| Key | Action |
| :---: | :--- |
| `r` | **Reload** app bundle on connected devices |
| `m` | Toggle the in-app **Developer Menu** |
| `w` | Open in **Web Browser** |
| `a` | Open in **Android Emulator** / USB device |
| `i` | Open in **iOS Simulator** (Mac only) |
| `c` | Display QR code in terminal again |
| `j` | Open Chrome DevTools Debugger |
| `q` | Quit development server |

---

## 📂 7. Project Architecture

Understanding where everything lives:

```text
fitness-coach-app/
├── app/                      # Expo Router screens (file-based navigation)
│   ├── _layout.tsx           # Root layout: font loading, splash screen, theme
│   ├── (onboarding)/         # 5-step user onboarding intake flow
│   ├── (tabs)/               # Bottom tab screens:
│   │   ├── index.tsx         # Today / Home dashboard
│   │   ├── nutrition.tsx     # Calorie & macro logging
│   │   ├── coach.tsx         # AI Coach interactive chat
│   │   ├── progress.tsx      # Analytics & weekly charts
│   │   └── profile.tsx       # Settings & preferences
│   └── workout/
│       └── active.tsx        # Live workout logging modal
├── components/               # Modular reusable UI components
│   ├── common/               # Buttons, Cards, Inputs, Glassmorphism elements
│   ├── home/                 # Daily target rings, stat cards
│   ├── workout/              # Set counters, exercise cards
│   ├── nutrition/            # Macro bars, food entry cards
│   └── coach/                # Chat bubbles, quick prompts
├── data/
│   └── mockData.ts           # Initial mock data driving the screens
├── store/                    # Zustand state management stores
│   ├── workoutStore.ts       # Active workout tracking
│   ├── nutritionStore.ts     # Daily meal & macro entries
│   └── chatStore.ts          # AI Coach messaging state
├── theme/                    # Single source of truth for design tokens
│   ├── colors.ts             # Midnight Performance dark & light palettes
│   ├── typography.ts         # Font families, sizes, line heights
│   └── spacing.ts            # Margins, paddings, border radii
├── tailwind.config.js        # NativeWind Tailwind configuration
└── package.json              # Scripts and project dependencies
```

---

## 🔧 8. Troubleshooting & Common Issues

### 1. Metro Bundler Cache Issue
If you see stale code or strange Babel/Bundler errors:
```bash
npx expo start -c
```
*(The `-c` flag clears Metro cache).*

### 2. Network Timeout on Mobile (Expo Go)
- **Cause:** PC and phone are on different Wi-Fi bands (e.g. 2.4GHz vs 5GHz) or Windows Firewall blocks incoming Node connections.
- **Fix:**
  1. Ensure both devices are on the exact same Wi-Fi.
  2. Or run via Tunnel:
     ```bash
     npx expo start --tunnel
     ```

### 3. Reinstalling Clean Dependencies
If `node_modules` becomes corrupted:
```powershell
# Windows PowerShell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### 4. Port 8081 is Already in Use
If another process is using port 8081:
```bash
npx expo start --port 8082
```

---

## 🚢 9. Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Starts the Expo dev server |
| `npm run web` | Starts the app in a web browser |
| `npm run android` | Starts and launches on Android emulator |
| `npm run ios` | Starts and launches on iOS simulator |
| `npm run typecheck` | Checks TypeScript compilation without emitting JS |

---

Enjoy building with **Fitness Coach App**! 🏋️‍♂️💪
