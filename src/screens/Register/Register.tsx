import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Logo } from "@components/Logo/Logo";
import {
  AUTH_MESSAGES,
  FORM_PLACEHOLDERS,
  INFO_MESSAGES,
  SUCCESS_MESSAGES,
} from "@constants/messages";
import { colors } from "@constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { showInfoToast, showSuccessToast } from "@utils/errorHandler";
import { type RegisterFormData, registerSchema } from "@utils/registerValidation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
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
import { LoginFooter } from "../Login/components/LoginFooter/LoginFooter";
import { styles } from "./styles.register";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  DailyQuote: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      showSuccessToast(SUCCESS_MESSAGES.REGISTER_SUCCESS, SUCCESS_MESSAGES.REGISTER_TITLE);

      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
      navigation.navigate("Login");
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
            <Text style={styles.title}>{AUTH_MESSAGES.CREATE_ACCOUNT_TITLE}</Text>
            <Text style={styles.subtitle}>{AUTH_MESSAGES.CREATE_ACCOUNT_SUBTITLE}</Text>
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
              name="email"
              render={({ field, fieldState: { error } }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.EMAIL}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  leftIcon={<Mail size={20} color={colors.text.tertiary} />}
                  editable={!isLoading}
                  containerStyle={styles.inputSpacing}
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
                  autoComplete="password-new"
                  textContentType="newPassword"
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
                  containerStyle={styles.inputSpacing}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, fieldState: { error } }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.CONFIRM_PASSWORD}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  textContentType="newPassword"
                  leftIcon={<Lock size={20} color={colors.text.tertiary} />}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      activeOpacity={0.7}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} color={colors.text.tertiary} />
                      ) : (
                        <Eye size={20} color={colors.text.tertiary} />
                      )}
                    </TouchableOpacity>
                  }
                  editable={!isLoading}
                  containerStyle={styles.inputSpacing}
                />
              )}
            />

            <Button
              title={AUTH_MESSAGES.REGISTER_BUTTON}
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              style={styles.registerButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>{AUTH_MESSAGES.ALREADY_HAVE_ACCOUNT}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>{AUTH_MESSAGES.LOGIN_LINK}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <LoginFooter onTermsPress={handleComingSoon} onPrivacyPress={handleComingSoon} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
