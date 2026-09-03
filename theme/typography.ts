// Display: Bricolage Grotesque — an expressive, slightly irregular geometric
// grotesk. It's the one place this app spends its typographic personality:
// big lifted-weight numbers, calorie totals, streak counts, PRs.
// Body/UI: Inter — tabular figures for aligned data, excellent at small sizes.
export const fontFamily = {
  display: "BricolageGrotesque_700Bold",
  displaySemibold: "BricolageGrotesque_600SemiBold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemibold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

export const type = {
  display56: { fontFamily: fontFamily.display, fontSize: 56, lineHeight: 60 },
  display40: { fontFamily: fontFamily.display, fontSize: 40, lineHeight: 46 },
  display28: { fontFamily: fontFamily.display, fontSize: 28, lineHeight: 34 },
  heading20: { fontFamily: fontFamily.bodySemibold, fontSize: 20, lineHeight: 26 },
  body16: { fontFamily: fontFamily.body, fontSize: 16, lineHeight: 22 },
  bodyMedium16: { fontFamily: fontFamily.bodyMedium, fontSize: 16, lineHeight: 22 },
  body14: { fontFamily: fontFamily.body, fontSize: 14, lineHeight: 20 },
  bodyMedium14: { fontFamily: fontFamily.bodyMedium, fontSize: 14, lineHeight: 20 },
  label12: { fontFamily: fontFamily.bodyMedium, fontSize: 12, lineHeight: 16 },
} as const;
