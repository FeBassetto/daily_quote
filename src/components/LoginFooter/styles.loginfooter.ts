import { StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, spacing } from "../../constants/theme";

export const styles = StyleSheet.create({
  footer: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  footerTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    lineHeight: 18,
  },
});
