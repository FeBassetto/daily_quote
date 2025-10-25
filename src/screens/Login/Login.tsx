import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Logo } from "@components/Logo/Logo";
import {
  AUTH_MESSAGES,
  ERROR_MESSAGES,
  FORM_PLACEHOLDERS,
  SUCCESS_MESSAGES,
} from "@constants/messages";
import { colors } from "@constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import { authAPI } from "@services/auth";
import { showErrorToast, showSuccessToast } from "@utils/errorHandler";
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
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
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
    }
  };

  const handleCreateAccount = () => {};

  const handleForgotPassword = () => {};

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
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.USERNAME}
                  autoCapitalize="none"
                  autoComplete="username"
                  textContentType="username"
                  leftIcon={<User size={20} color={colors.text.tertiary} />}
                  editable={!isSubmitting}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={colors.text.tertiary} />
                      ) : (
                        <Eye size={20} color={colors.text.tertiary} />
                      )}
                    </TouchableOpacity>
                  }
                  containerStyle={styles.passwordInput}
                  editable={!isSubmitting}
                />
              )}
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              activeOpacity={0.7}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>{AUTH_MESSAGES.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>

            <Button
              title={AUTH_MESSAGES.LOGIN_BUTTON}
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              disabled={isSubmitting}
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
              onPress={handleCreateAccount}
            />
          </View>

          <LoginFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
