import { borderRadius, colors, fontSize, fontWeight, shadows, spacing } from "@constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  card: {
    height: height * 0.48,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    justifyContent: "center",
    ...shadows.lg,
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
});
