import type { LucideIcon } from "lucide-react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../constants/theme";
import { styles } from "./styles.actionbutton";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
}

export const ActionButton = ({
  icon: Icon,
  label,
  onPress,
  disabled,
  loading = false,
}: ActionButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isDisabled && styles.buttonDisabled]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Icon size={24} color={isDisabled ? colors.text.tertiary : colors.primary} />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};
