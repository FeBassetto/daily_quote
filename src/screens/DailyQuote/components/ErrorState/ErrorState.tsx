import { colors } from "@constants/theme";
import { AlertCircle, RefreshCw } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.errorstate";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorIconContainer}>
        <AlertCircle size={60} color={colors.status.error} />
      </View>
      <Text style={styles.errorTitle}>Ops! Algo deu errado</Text>
      <Text style={styles.errorText}>
        Não conseguimos carregar as frases no momento. Verifique sua conexão e tente novamente.
      </Text>
      <TouchableOpacity style={styles.actionButton} onPress={onRetry} activeOpacity={0.8}>
        <RefreshCw size={20} color={colors.text.inverse} />
        <Text style={styles.actionButtonText}>Tentar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
};
