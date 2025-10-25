import { StyleSheet } from "react-native";
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  shadows,
  spacing,
} from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  bottomSection: {
    backgroundColor: colors.background,
    zIndex: 10,
    elevation: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.status.error,
    textAlign: "center",
    marginBottom: spacing.lg,
    fontWeight: fontWeight.semibold,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    width: 56,
    height: 56,
    ...shadows.md,
  },
  errorRetryText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.md,
    fontWeight: fontWeight.regular,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    textAlign: "center",
    marginTop: spacing.md,
    fontWeight: fontWeight.regular,
  },
});
