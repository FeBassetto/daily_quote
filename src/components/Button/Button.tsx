import { colors } from "@constants/theme";
import {
  ActivityIndicator,
  Text,
  type TextStyle,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";
import { styles } from "./styles.button";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  fullWidth = false,
  disabled,
  style,
  textStyle,
  ...props
}: ButtonProps) => {
  const buttonStyle: ViewStyle[] = [styles.base, styles[variant], styles[`${size}Size`]];
  if (fullWidth) buttonStyle.push(styles.fullWidth);
  if (disabled) buttonStyle.push(styles.disabled);
  if (style) buttonStyle.push(style);

  const textStyles: TextStyle[] = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
  if (disabled) textStyles.push(styles.disabledText);
  if (textStyle) textStyles.push(textStyle);

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost" ? colors.primary : colors.text.inverse
          }
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
