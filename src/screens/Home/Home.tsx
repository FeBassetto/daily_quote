import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button/Button";
import { colors } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";
import type { AppStackParamList } from "../../navigation/AppNavigator";
import { showErrorToast } from "../../utils/errorHandler";

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      showErrorToast("Não foi possível fazer logout. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Você está autenticado</Text>
        <Button
          title="Ver Frase do Dia"
          onPress={() => navigation.navigate("DailyQuote")}
          style={styles.button}
        />
        <Button title="Sair" variant="outline" onPress={handleLogout} style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  button: {
    minWidth: 200,
  },
});
