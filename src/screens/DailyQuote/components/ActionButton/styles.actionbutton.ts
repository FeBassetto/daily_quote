import { borderRadius, colors, fontSize, fontWeight, shadows, spacing } from "@constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    width: 56,
    height: 56,
    ...shadows.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    fontWeight: fontWeight.medium,
  },
});
