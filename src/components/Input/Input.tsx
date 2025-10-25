import { colors } from "@constants/theme";
import { type ReactNode, useState } from "react";
import {
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";
import { styles } from "./styles.input";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  editable = true,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles: TextStyle[] = [styles.input];
  if (leftIcon) inputStyles.push(styles.inputWithLeftIcon);
  if (rightIcon) inputStyles.push(styles.inputWithRightIcon);
  if (!editable) inputStyles.push(styles.inputDisabled);
  if (style) inputStyles.push(style as TextStyle);

  const handleFocus: TextInputProps["onFocus"] = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur: TextInputProps["onBlur"] = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={inputStyles}
          placeholderTextColor={colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
