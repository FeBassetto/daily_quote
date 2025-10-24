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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  quoteContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  quoteIconTop: {
    alignSelf: "flex-start",
    marginBottom: spacing.md,
    opacity: 0.3,
  },
  quoteText: {
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * 1.5,
    color: colors.text.primary,
    fontWeight: fontWeight.medium,
    textAlign: "center",
    marginVertical: spacing.md,
  },
  quoteIconBottom: {
    alignSelf: "flex-end",
    marginTop: spacing.md,
    opacity: 0.3,
    transform: [{ rotate: "180deg" }],
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
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
  actionButtonLabel: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    fontWeight: fontWeight.medium,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    textAlign: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    fontWeight: fontWeight.regular,
  },
});
