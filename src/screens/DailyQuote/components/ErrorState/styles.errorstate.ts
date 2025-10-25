import { borderRadius, colors, fontSize, fontWeight, shadows, spacing } from "@constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  errorIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${colors.status.error}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  errorTitle: {
    fontSize: fontSize.xxl,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
    fontWeight: fontWeight.bold,
  },
  errorText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.xl,
    fontWeight: fontWeight.regular,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
    ...shadows.lg,
  },
  actionButtonText: {
    fontSize: fontSize.md,
    color: colors.text.inverse,
    fontWeight: fontWeight.semibold,
  },
});
