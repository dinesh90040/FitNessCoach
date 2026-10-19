/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0B0E",
          surface: "#15171C",
          elevated: "#1D2027",
        },
        text: {
          primary: "#F5F6F7",
          secondary: "#9AA0A8",
          tertiary: "#5C6169",
        },
        accent: {
          volt: "#C6FF3D",
          pulse: "#4CC2FF",
        },
        state: {
          success: "#34D399",
          warning: "#FBBF24",
          error: "#FB6A6A",
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
        },
      },
    },
  },

  plugins: [],
};
