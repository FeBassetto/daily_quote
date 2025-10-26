import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Logo } from "@components/Logo/Logo";
import {
  AUTH_MESSAGES,
  ERROR_MESSAGES,
  FORM_PLACEHOLDERS,
  INFO_MESSAGES,
  SUCCESS_MESSAGES,
} from "@constants/messages";
import { colors } from "@constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import type { NavigationProp } from "@models/navigation";
import { useNavigation } from "@react-navigation/native";
import { authAPI } from "@services/auth";
import { showErrorToast, showInfoToast, showSuccessToast } from "@utils/errorHandler";
import { type LoginFormData, loginSchema } from "@utils/loginValidation";
import { Eye, EyeOff, Lock, User } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginFooter } from "./components/LoginFooter/LoginFooter";
import { styles } from "./styles.login";

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(data);

      if (response.token) {
        await signIn(response.token, data.username);
        showSuccessToast(SUCCESS_MESSAGES.LOGIN_SUCCESS, SUCCESS_MESSAGES.WELCOME);
      } else {
        showErrorToast(ERROR_MESSAGES.INVALID_CREDENTIALS, "Erro no Login");
      }
    } catch {
      showErrorToast(ERROR_MESSAGES.NETWORK_ERROR, "Erro no Login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComingSoon = () => {
    showInfoToast(INFO_MESSAGES.COMING_SOON_MESSAGE, INFO_MESSAGES.COMING_SOON_TITLE);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Logo size="large" style={styles.logo} />
            <Text style={styles.title}>{AUTH_MESSAGES.WELCOME_BACK}</Text>
            <Text style={styles.subtitle}>{AUTH_MESSAGES.WELCOME_SUBTITLE}</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="username"
              render={({ field, fieldState: { error } }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.USERNAME}
                  autoCapitalize="none"
                  autoComplete="username"
                  textContentType="username"
                  leftIcon={<User size={20} color={colors.text.tertiary} />}
                  editable={!isLoading}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.PASSWORD}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  leftIcon={<Lock size={20} color={colors.text.tertiary} />}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={colors.text.tertiary} />
                      ) : (
                        <Eye size={20} color={colors.text.tertiary} />
                      )}
                    </TouchableOpacity>
                  }
                  editable={!isLoading}
                  containerStyle={styles.passwordInput}
                />
              )}
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPasswordText}>{AUTH_MESSAGES.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>

            <Button
              title={AUTH_MESSAGES.LOGIN_BUTTON}
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              style={styles.loginButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{AUTH_MESSAGES.DIVIDER_OR}</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title={AUTH_MESSAGES.CREATE_ACCOUNT}
              variant="outline"
              fullWidth
              size="large"
              onPress={() => navigation.navigate("Register")}
            />
          </View>

          <LoginFooter onTermsPress={handleComingSoon} onPrivacyPress={handleComingSoon} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
